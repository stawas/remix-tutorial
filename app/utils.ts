import { User } from "app/model/users.model"

export function toUserModel({ formData }: { formData: FormData }): User {
    const email = formData.get("email");
    const password = formData.get("password");
    if (email! instanceof String && password! instanceof String) {
        return {
            Email: "",
            Password: "",
        }
    }
    return {
        Email: email as string,
        Password: password as string,
    }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function devLog(message?: any, ...optionalParams: any[]) {
    if(process.env.NODE_ENV === "production") return;
    console.log(message, ...optionalParams);
}

