// https://remix.run/docs/en/main/start/tutorial#data-mutations
import type {
    LoaderFunctionArgs,
  } from "@remix-run/node";
  import {
    Form,
    Navigation,
    NavLink,
    Outlet,
    redirect,
    Scripts,
    ScrollRestoration,
    SubmitFunction,
    useLoaderData,
    useNavigation,
    useSubmit,
  } from "@remix-run/react";
  import { FunctionComponent, useEffect } from "react";
  
  import { ContactRecord, createEmptyContact, getContacts } from "app/data";
import { getBooks } from "~/data/books.remote";
import { devLog } from "~/utils";
import { BookResponse } from "~/data/response/book.response";

  
  export const action = async () => {
    const contact: ContactRecord = await createEmptyContact();
    return redirect(`/contacts/${contact.id}/edit`);
  };
  
  export const loader = async ({
    request,
  }: LoaderFunctionArgs) => {
    const url: URL = new URL(request.url);
    const q: string | null = url.searchParams.get("q");
    const contacts: ContactRecord[] = await getContacts(q);
    const books = await getBooks(request);
    return Response.json({ contacts, books, q });
  }
  
  export default function Contacts() {
    const { books, q }: {
      books: BookResponse[],
      q: string,
    } = useLoaderData<typeof loader>();
    const navigation: Navigation = useNavigation();
    const submit: SubmitFunction = useSubmit();
    const searching = navigation.location && new URLSearchParams(navigation.location.search).has("q");
  
    useEffect(() => {
      const searchField = document.getElementById("q");
      if (searchField instanceof HTMLInputElement) {
        searchField.value = q || "";
      }
    }, [q]);
  
    return (
        <div id="contact-list">
          <div id="sidebar">
            <h1>Remix Books</h1>
            <div>
              <Form
                id="search-form"
                onChange={(event) => {
                  const isFirstSearch = q === null;
                  submit(event.currentTarget, {
                    replace: !isFirstSearch,
                  });
                }}
                role="search"
              >
                <input
                  id="q"
                  aria-label="Search books"
                  className={searching ? "loading" : ""}
                  defaultValue={q || ""}
                  placeholder="Search"
                  type="search"
                  name="q"
                />
                <div id="search-spinner" aria-hidden hidden={!searching} />
              </Form>
              <Form method="post">
                <button type="submit">New</button>
              </Form>
            </div>
            <nav>
              <BookList books={books} />
            </nav>
          </div>
          <div
            className={
              navigation.state === "loading" && !searching
                ? "loading"
                : ""
            }
            id="detail">
            <Outlet />
          </div>
          <ScrollRestoration />
          <Scripts />
          </div>
    );
  }

  const BookList: FunctionComponent<{ books: BookResponse[] }> = ({ books }) => {
    if (books.length) {
      return (
        <ul>
          {books.map((book) => (
            <li key={book.ID}>
              <NavLink
                className={({ isActive, isPending }) =>
                  isActive
                    ? "active"
                    : isPending
                      ? "pending"
                      : ""
                }
                to={`./${book.ID}`}>
                {book.name ? (
                  <>
                    {book.name} by <br />{book.authors?.map(item=> item.name + "\n")}
                  </>
                ) : (
                  <i>No Name</i>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      );
    } else {
      return (
        <p>
          <i>No books</i>
        </p>
      );
    }
  }