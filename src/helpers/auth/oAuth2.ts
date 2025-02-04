import pb from "@/interfaces/auth/pocketBase";
import registerUserCache from "@/interfaces/auth/registerUserCahce";
import { UserModel } from "@/interfaces/auth/userModel";

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

        registerUserCache(
            authData.record,
            rememberMe,
            authData.token,
            setUserData,
            setAuthed,
        );
    } catch (error) {
        console.error("OAuth Error:", error);
        throw error;
    }
}
