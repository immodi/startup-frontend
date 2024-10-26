import { UserModel } from "@/interfaces/userModel";
import PocketBase from "pocketbase";
import useLogin from "./useLogin";
import { AuthErrorResponse } from "@/interfaces/authResponses";

function useSignup(
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    setUserData?: React.Dispatch<React.SetStateAction<UserModel | undefined>>,
    setAuthed?: React.Dispatch<React.SetStateAction<boolean>>,
    setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>,
    setErrorMessage?: React.Dispatch<React.SetStateAction<string>>,
) {
    setIsLoading?.(true);

    const pb = new PocketBase(import.meta.env.VITE_BACKEND_URL);
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
                setErrorMessage,
            );
        })
        .catch((err) => {
            setAuthed?.(false);
            const error = Object.entries(err.data.data).map(([key, value]) => {
                return `${key} - ${(value as { message: string }).message}`;
            });

            setErrorMessage?.(err.message + "\n" + error.join("\n"));
            return err;
        })
        .finally(() => {
            setIsLoading?.(false);
        });
}

export default useSignup;
