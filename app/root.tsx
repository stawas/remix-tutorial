// https://remix.run/docs/en/main/start/tutorial#data-mutations
import type { LinksFunction } from "@remix-run/node";
import { Links, Meta, Outlet, Scripts, useRouteError } from "@remix-run/react";

import appStyleHref from "./app.css?url";
import { devLog } from "./utils";

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: appStyleHref },
];

// TODO search book
// TODO register
export default function App() {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
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

export function ErrorBoundary() {
	const error = useRouteError();
	devLog(error);

	return (
		<html lang="en">
			<head>
				<title>Oh no!</title>
				<Meta />
				<Links />
			</head>
			<body>
				{/* add the UI you want your users to see */}
				<h1>Error no no no 😭</h1>
				<Scripts />
			</body>
		</html>
	);
}
