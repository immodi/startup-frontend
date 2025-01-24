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
            username: authData.record.username,
            emailVisibility: authData.record.emailVisibility,
            name: authData.record.username,
            user_templates: authData.record.user_templates ?? [
                "8gnqdsso46yp6pm",
                "waxxopaxrgdpkki",
                "mqcpw4e0qdb0tg6",
            ],
            user_files: authData.record.user_files ?? [],
            current_plan: authData.record.current_plan ?? "kemt0gtyrxjahfh",
            tokens:
                authData.record.current_plan === undefined
                    ? 50
                    : authData.record.tokens,
        };

        pb.collection("users")
            .update(authData.record.id, data)
            .then(() => {
                registerUserCache(
                    data,
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
