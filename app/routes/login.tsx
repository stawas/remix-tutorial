import {
    ActionFunctionArgs,
    LoaderFunctionArgs,
    redirect,
} from "@remix-run/node";
import {
    useLoaderData,
} from "@remix-run/react";
import { login } from "app/data/auth.remote";
import { devLog, toUserModel } from "app/utils";
import { accessToken, commitSession, error, getSession } from "app/sessions";

export async function loader({
    request,
}: LoaderFunctionArgs) {
    const session = await getSession(
        request.headers.get("Cookie")
    );

    if (session.has(accessToken)) {
        // Redirect to the home page if they are already signed in.
        return redirect("/contacts");
    }

    const data = { error: session.get(error) };
    devLog(data);
    
    return Response.json(data, {
        headers: {
            "Set-Cookie": await commitSession(session, {
                
            }),
        },
    });
}

export const action = async ({ request }: ActionFunctionArgs) => {
    const session = await getSession(
        request.headers.get("Cookie")
    );
    const formData: FormData = await request.formData();
    const response = await login(toUserModel({ formData: formData }));
    if (response.isSuccess === false && response.accessToken == null) {
        session.flash(error, "Invalid username/password");
        // Redirect back to the login page with errors.
        return redirect("/login", {
            headers: {
                "Set-Cookie": await commitSession(session),
            },
        });
    }
    session.set(accessToken, response!.accessToken!);

    // Login succeeded, send them to the home page.
    return redirect("/login", {
        headers: {
            "Set-Cookie": await commitSession(session, {
                expires: response.expired ?? undefined,
            }),
        },
    });
};

/*
Test user
Email:spock@example.com
Password:ldoiekr983lko39
*/

export default function Login() {
    const { error } = useLoaderData<typeof loader>();
    return (
        <div>
            <p>Login</p>
            {error ? <div className="error">{error}</div> : null}
            <form method="post">
                <label htmlFor="email">
                    Email
                </label>
                <input id="email" name="email" type="email" value={`spock@example.com`}/>
                <label htmlFor="password">
                    Password
                </label>
                <input id="password" name="password" type="password" value={`ldoiekr983lko39`}/>
                <button>Login</button>
            </form>
        </div>
    );
}