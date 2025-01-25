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

        const data = {
            ...authData.record,
            user_templates: [
                "waxxopaxrgdpkki",
                "8gnqdsso46yp6pm",
                "mqcpw4e0qdb0tg6",
            ],
            user_files: [],
            tokens: 50,
            current_plan: "kemt0gtyrxjahfh",
        };

        console.log(authData.record.id);

        await pb.collection("users").update(authData.record.id, data);

        registerUserCache(
            data,
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
