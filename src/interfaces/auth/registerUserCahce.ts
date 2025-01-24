import { useSetToken } from "@/hooks/auth/useToken";
import { UserModel } from "./userModel";

export default function registerUserCache(
    userModel: UserModel,
    rememberMe: boolean,
    token: string,
    setUserData?: (userData: UserModel | undefined) => void,
    setAuthed?: (isAuthed: boolean) => void,
) {
    // change the application state to authed
    setAuthed?.(true);

    // auth the user to the application itself
    const user: UserModel = {
        ...userModel,
        collectionId: "",
        id: "",
        collectionName: "",
        token: token,
    };

    setUserData?.(user);

    // save token if the user chooses to me remebered
    rememberMe && useSetToken(user);
}
