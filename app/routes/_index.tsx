import { ActionFunctionArgs } from "@remix-run/node";
import {
    useFetcher,
} from "@remix-run/react";
import { login } from "app/data/auth.remote";
import { toUserModel } from "app/utils";
export const action = async ({ request }: ActionFunctionArgs) => {
    const formData: FormData = await request.formData();
    const isLoginSuccess = await login(toUserModel({ formData: formData }));
    console.log(`isLoginSuccess: ${isLoginSuccess.accessToken}`);
    //TODO call api to get books
};

export default function Index() {
    const fetcher = useFetcher();
    return (
        <div>
            <p>Login</p>
            <fetcher.Form method="post">
                <label htmlFor="email">
                    Email
                </label>
                <input id="email" name="email" type="email" />
                <label htmlFor="password">
                    Password
                </label>
                <input id="password" name="password" type="password" />
                <button>Login</button>
            </fetcher.Form>
        </div>
    );
}