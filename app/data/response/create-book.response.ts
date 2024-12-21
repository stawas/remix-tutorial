import { BaseErrorResponse } from "./base-error.response";
import { Result } from "./result.response";

export type CreateBookResponse = BaseErrorResponse & Result & {
    bookId?: number;
};
