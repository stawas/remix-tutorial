import { baseUrl, bookAPI, scheme } from "app/data/api.endpoint";
import { devLog } from "app/utils";
import { BookListResponse } from "app/data/response/book.response";
import { getAccessToken } from "~/sessions";

export async function getBooks(request: Request): Promise<BookListResponse> {
    const url: URL = new URL(`${scheme}${baseUrl}${bookAPI}/list`);
    const accessToken = await getAccessToken(request);
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