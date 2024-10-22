import Cookies from "universal-cookie";

export interface UserAuthCookie {
    username: string;
    email: string;
    joinedAt: string;
    token: string;
}

export function useGetToken(): UserAuthCookie | undefined {
    const cookies = new Cookies();
    const token: UserAuthCookie | undefined = cookies.get("userToken");

    return token;
}

export function useSetToken(
    username: string,
    email: string,
    joinedAt: string,
    token: string,
): boolean {
    const cookies = new Cookies();
    const userAuthCookie: UserAuthCookie = {
        username: username,
        token: token,
        email: email,
        joinedAt: joinedAt,
    };

    cookies.set("userToken", userAuthCookie, {
        path: "/",
        sameSite: "none",
        secure: true,
        maxAge: 60 * 60 * 24 * 30,
    });

    return true;
}
