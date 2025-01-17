import { useSetToken } from "@/hooks/auth/useToken";
import { UserModel } from "@/interfaces/auth/userModel";
import PocketBase from "pocketbase";
const pb = new PocketBase(import.meta.env.VITE_BACKEND_URL);

// interface OAuth2Mode {
//     name: string;
//     id: string;
//     token: string;
// }

export default async function oAuth2WithGoogle(
    rememberMe: boolean,
    setUserData?: (userData: UserModel | undefined) => void,
    setAuthed?: (isAuthed: boolean) => void,
) {
    try {
        const authData = await pb
            .collection("users")
            .authWithOAuth2<UserModel>({ provider: "google" });

        const data = {
            username: authData.record.username,
            emailVisibility: authData.record.emailVisibility,
            name: "",
            user_templates: [
                "8gnqdsso46yp6pm",
                "waxxopaxrgdpkki",
                "mqcpw4e0qdb0tg6",
            ],
            user_files: [],
        };

        pb.collection("users")
            .update(authData.record.id, data)
            .then(() => {
                registerUserCache(
                    authData.record,
                    rememberMe,
                    authData.token,
                    setUserData,
                    setAuthed,
                );
            });
    } catch (error) {
        console.error("OAuth Error:", error);
        throw error;
    }
}

function registerUserCache(
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
    rememberMe &&
        useSetToken(user.username, user.email, user.created, user.token);
}
