import { UserModel } from "@/interfaces/userModel";
import PocketBase from "pocketbase";
import useLogin from "./useLogin";

function useSignup(
    username: string,
    email: string,
    password: string,
    confirmPassword: string,
    setUserData?: React.Dispatch<React.SetStateAction<UserModel | undefined>>,
    setAuthed?: React.Dispatch<React.SetStateAction<boolean>>,
    // setToken?: React.Dispatch<React.SetStateAction<UserAuthCookie | undefined>>,
) {
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
            useLogin(username, password, true, setUserData, setAuthed);
        })
        .catch((err) => {
            setAuthed?.(false);
            return err;
        });
}

export default useSignup;
