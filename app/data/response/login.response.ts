import { BaseResponse } from "./base.response";

export type LoginResponse = BaseResponse & {
    accessToken: string | null;
    expired: Date | null;
}