// https://remix.run/docs/en/main/start/tutorial#data-mutations
import type {
  LinksFunction,
} from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
} from "@remix-run/react";

import appStyleHref from "./app.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStyleHref },
];

// TODO create book detail
// TODO edit book detail
// TODO delete book detail
// TODO search book
// TODO register
export default function App() {

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}