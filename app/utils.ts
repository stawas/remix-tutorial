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

