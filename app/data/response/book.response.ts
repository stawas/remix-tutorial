import { BaseResponse } from "./base.response";
/*
 Name        string `json:"name"`
	Description string `json:"description"`
	Price       uint   `json:"price"`
	PublisherID uint   `json:"publisherID"`
	Publisher   Publisher `json:"publisher"`
	Authors     []Author `json:"authors" gorm:"many2many:author_books;"` 
*/
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

export type BookResponse =
	BaseResponse
	& {
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