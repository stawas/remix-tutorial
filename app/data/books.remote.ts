import { baseUrl, bookAPI, scheme } from "app/data/api.endpoint";
import { devLog } from "app/utils";
import { BookResponse } from "app/data/response/book.response";
import { getAccessToken } from "~/sessions";

export async function getBooks(request: Request): Promise<BookResponse[]> {
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
        return [{
            isSuccess: false,
            errorMessage: `Error: ${response.status} ${response.statusText}`,
        }];
    }

    const responseContent: BookResponse[] = await response.json();
    // devLog(responseContent[0].authors[0].name);
    // responseContent.map((item) => {
    //     return item.authors;
    // });

    const result: BookResponse[] = responseContent;

    return result;
}