import { UserModel } from "@/interfaces/auth/userModel";

import useLogin from "./useLogin";
import pb from "@/interfaces/auth/pocketBase";

function useSignup(
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    setUserData?: (userData: UserModel | undefined) => void,
    setAuthed?: (isAuthed: boolean) => void,
    setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>,
    setErrorMessages?: React.Dispatch<React.SetStateAction<string[] | null>>,
) {
    setIsLoading?.(true);

    const data = {
        username: username,
        email: email,
        emailVisibility: true,
        password: password,
        passwordConfirm: confirmPassword,
        name: username,
        user_templates: [
            "waxxopaxrgdpkki",
            "8gnqdsso46yp6pm",
            "mqcpw4e0qdb0tg6",
        ],
        user_files: [],
        tokens: 50,
        current_plan: "kemt0gtyrxjahfh",
    };

    pb.collection("users")
        .create<UserModel>(data)
        .then(() => {
            useLogin(
                username,
                password,
                true,
                setUserData,
                setAuthed,
                setIsLoading,
                setErrorMessages,
            );
        })
        .catch((err) => {
            setAuthed?.(false);
            const error = Object.entries(err.data.data).map(([key, value]) => {
                return `${key} - ${(value as { message: string }).message}`;
            });

            setErrorMessages?.([err.message, ...error]);
            return err;
        })
        .finally(() => {
            setIsLoading?.(false);
        });
}

export default useSignup;
