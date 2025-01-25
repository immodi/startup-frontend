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

        const user_templates =
            pb.authStore.model?.user_templates.length > 3
                ? pb.authStore.model?.user_templates
                : ["waxxopaxrgdpkki", "8gnqdsso46yp6pm", "mqcpw4e0qdb0tg6"];

        const user_files =
            pb.authStore.model?.user_files.length > 0
                ? pb.authStore.model?.user_files
                : [];

        const tokens =
            pb.authStore.model?.user_files.length > 0
                ? pb.authStore.model?.tokens
                : 50;

        const current_plan =
            pb.authStore.model?.current_plan !== ""
                ? pb.authStore.model?.current_plan
                : "kemt0gtyrxjahfh";

        const data = {
            ...authData.record,
            user_templates: user_templates,
            user_files: user_files,
            tokens: tokens,
            current_plan: current_plan,
        };

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
