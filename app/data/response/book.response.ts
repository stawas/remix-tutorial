import { BaseErrorResponse } from "./base-error.response";

type Author = {
	ID: number | null;
	CreatedAt: string | null;
	UpdatedAt: string | null;
	name: string | null;
}

type Publisher = {
	ID: number | null;
	CreatedAt: string | null;
	UpdatedAt: string | null;
	DeletedAt: string | null;
	details: string | null;
	name: string | null;
}

export type BookResponse = {
	ID?: number | null;
	CreatedAt?: string | null;
	UpdatedAt?: string | null;
	DeletedAt?: string | null;
	name?: string | null;
	description?: string | null;
	price?: number | null;
	publisherID?: number | null;
	publisher?: Publisher | null;
	authors?: Author[] | null;
}

export type BookListResponse =
	BaseErrorResponse
	& {
		books?: BookResponse[];
	}