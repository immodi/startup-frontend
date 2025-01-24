import { UserModel } from "@/interfaces/auth/userModel";
import Cookies from "universal-cookie";

export interface UserAuthCookie {
    id: string;
    username: string;
    email: string;
    joinedAt: string;
    token: string;
    user_files: string[]; // Array of strings
    user_templates: string[]; // Array of strings
    // tokens: number;
    // current_plan: string;
}

export function useGetToken(): UserAuthCookie | undefined {
    const cookies = new Cookies();
    const token: UserAuthCookie | undefined = cookies.get("userToken");

    return token;
}

export function useSetToken(user: UserModel): boolean {
    const cookies = new Cookies();
    const userAuthCookie: UserAuthCookie = {
        id: user.id,
        username: user.username,
        token: user.token,
        email: user.email,
        joinedAt: user.created,
        // current_plan: user.current_plan,
        // tokens: user.tokens,
        user_files: user.user_files,
        user_templates: user.user_templates,
    };

    cookies.set("userToken", userAuthCookie, {
        path: "/",
        sameSite: "lax",
        secure: false,
        maxAge: 60 * 60 * 24 * 30,
    });

    return true;
}

export function useDeleteToken(): void {
    const cookies = new Cookies();
    cookies.remove("userToken");
}
