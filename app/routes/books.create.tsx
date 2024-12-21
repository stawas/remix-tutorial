import { LoaderFunctionArgs } from "@remix-run/node";
import {
	Form,
	useLoaderData,
	useNavigate,
	useRouteError,
} from "@remix-run/react";
import { requestAllAuthors } from "~/data/authors.remote";
import { requestAllPublishers } from "~/data/publishers.remote";
import {
	AuthorListResponse,
	AuthorResponse,
} from "~/data/response/author.response";
import {
	PublisherListResponse,
	PublisherResponse,
} from "~/data/response/publisher.response";
import { getErrorMessage, isNullOrEmpty } from "~/utils";

export const loader = async ({ request }: LoaderFunctionArgs) => {
	const publishers: PublisherListResponse | null = await requestAllPublishers(
		request
	);
	const authors: AuthorListResponse | null = await requestAllAuthors(request);
	if (publishers.isError) {
		throw new Response("Not Found publisher", { status: 404 });
	}
	if (authors.isError) {
		throw new Response("Not Found author", { status: 404 });
	}
	return Response.json({ publishers, authors });
};

export default function CreateBook() {
	const {
		publishers,
		authors,
	}: { publishers: PublisherListResponse; authors: AuthorListResponse } =
		useLoaderData<typeof loader>();
	const showPublishers: boolean = !isNullOrEmpty(publishers.publishers);
	const showAuthors: boolean = !isNullOrEmpty(authors.authors);
	const navigate = useNavigate();
	return (
		<div>
			<h1>Create book!</h1>
			<Form
				className="container direction-column spacing-v-16"
				method="post"
			>
				<label className="container direction-column">
					<span>Name</span>
					<input
						aria-label="Book name"
						name="name"
						placeholder="Book name"
						type="text"
					/>
				</label>
				<label className="container direction-column">
					<span>Description</span>
					<textarea
						aria-label="Book description"
						name="description"
						placeholder="Book description"
					/>
				</label>
				<label className="container direction-column">
					<span>Price (THB)</span>
					<input
						aria-label="Book price"
						name="price"
						placeholder="Book price"
						type="number"
					/>
				</label>
				{showPublishers ? (
					<label className="container direction-column">
						<span>Publisher</span>
						<select name="publisher">
							{publishers.publishers?.map(
								(item: PublisherResponse) => (
									<option
										key={item.ID}
										value={item.name ?? ""}
									>
										{item.name ?? ""}
									</option>
								)
							)}
						</select>
					</label>
				) : (
					<p>
						No publisher in system. plase contact support to create
						publisher first
					</p>
				)}
				{showAuthors ? (
					<label className="container direction-column">
						<span>Author</span>
						<select
							name="author"
							size={authors.authors?.length}
							multiple
						>
							{authors.authors?.map((item: AuthorResponse) => (
								<option
									key={item.ID}
									value={item.name ?? ""}
								>
									{item.name ?? ""}
								</option>
							))}
						</select>
                        <span>Hold down the Ctrl (windows) / Command (Mac) button to select multiple options. You can drag mouse to select multiple options.</span>
					</label>
				) : (
					<p>
						No author in system. plase contact support to create
						author first
					</p>
				)}
				<button type="submit">Save</button>
				<button
					onClick={() => navigate(-1)}
					type="button"
				>
					Cancel
				</button>
			</Form>
		</div>
	);
}

export function ErrorBoundary() {
	const error = useRouteError();

	const errorMessage: string = getErrorMessage(error);

	return <h1>{`Error: ${errorMessage} 😡`}</h1>;
}
