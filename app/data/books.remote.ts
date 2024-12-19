import { baseUrl, bookAPI, scheme } from "app/data/api.endpoint";
import { devLog } from "app/utils";
import { BookListResponse, BookResponse } from "app/data/response/book.response";
import { requireUserSession } from "~/sessions";


export async function requestAllBooks(request: Request): Promise<BookListResponse> {
    const url: URL = new URL(`${scheme}${baseUrl}${bookAPI}/list`);
    const accessToken = await requireUserSession(request);
    const requestOptions: Request = new Request(url, {
        method: "GET",
        headers: {
            "Cookie": `jwt=${accessToken}`,
            "Content-Type": "application/json",
        },
    });
    const response: Response = await fetch(requestOptions);
    if(!response.ok) {
        return await response.json();
    }

    const responseContent = await response.json();
    devLog(responseContent);

    const result: BookListResponse = responseContent;

    return result;
}

export async function requestBook(request: Request, id: string): Promise<BookResponse> {
    const url: URL = new URL(`${scheme}${baseUrl}${bookAPI}/get/${id}`);
    const accessToken = await requireUserSession(request);
    const requestOptions: Request = new Request(url, {
        method: "GET",
        headers: {
            "Cookie": `jwt=${accessToken}`,
            "Content-Type": "application/json",
        },
    });
    const response: Response = await fetch(requestOptions);
    if(!response.ok) {
        return await response.json();
    }

    const responseContent = await response.json();
    devLog(responseContent);
    const result: BookResponse = responseContent;

    return result;
}