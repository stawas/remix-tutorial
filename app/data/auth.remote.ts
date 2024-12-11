import { User } from "~/model/users.model";
import { baseUrl, scheme, userAPI } from "./api.endpoint";
import { LoginResponse } from "./response/login.response";

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
        throw new Error(`Response status: ${response.status}`);
    }

    const token: string[] | null = response.headers.getSetCookie();
    console.log(`login response: ${token[0]}`);

    const loginResponse: LoginResponse = {
        isSuccess: response.ok,
        accessToken: token[0] ?? "",
    };

    return loginResponse;
}