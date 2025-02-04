import { useGetToken, UserAuthCookie } from "@/hooks/auth/useToken";
import { UserModel } from "@/interfaces/auth/userModel";

export default function getLocalUser() {
    const localUser: UserAuthCookie | undefined = useGetToken();
    if (localUser !== undefined) {
        const user: UserModel = {
            username: localUser.username,
            email: localUser.email,
            created: localUser.joinedAt,
            token: localUser.token,
            avatar: "",
            collectionId: "",
            collectionName: "",
            emailVisibility: true,
            id: "",
            name: "",
            updated: "",
            user_templates: localUser.user_templates,
            user_files: localUser.user_files,
            current_plan: "kemt0gtyrxjahfh",
            tokens: 50,
            verified: false,
        };

        return user;
    }

    return undefined;
}
