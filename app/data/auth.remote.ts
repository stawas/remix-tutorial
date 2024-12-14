import { User } from "~/model/users.model";
import { baseUrl, scheme, userAPI } from "./api.endpoint";
import { LoginResponse } from "./response/login.response";
import { devLog } from "~/utils";

export async function login(user: User): Promise<LoginResponse> {
    const url: URL = new URL(`${scheme}${baseUrl}${userAPI}/login`);
    const body: string = JSON.stringify(user);
    const request: Request = new Request(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: body,
    });
    const response: Response = await fetch(request);
    if(!response.ok) {
        return {
            isSuccess: false,
            accessToken: null,
            errorMessage: `Error: ${response.status}`,
            expired: null,
        }
    }

    const token: string[] | null = response.headers.getSetCookie();
    const cliams = token[0].split("; ");
    // login response: jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzQ0NTA2OTQsInVzZXJfaWQiOjF9._u_TQUTOKnjhFza5lFyCvASyXwpudD6BBuq9iO3-k0c,expires=Tue, 17 Dec 2024 15:51:34 GMT,path=/,HttpOnly,SameSite=Lax
    const jwt = cliams[0].split("=")[1];
    const expired = cliams[1].split("=")[1];
    devLog(`
        login response:\n
        jwt: ${jwt}\n
        expired: ${expired}\n
        `);

    const loginResponse: LoginResponse = {
        isSuccess: response.ok,
        accessToken: jwt ?? "",
        errorMessage: null,
        expired: new Date(expired),
    };

    return loginResponse;
}