import { UserModel } from "@/interfaces/userModel";
import PocketBase from "pocketbase";
import { useGetToken, UserAuthCookie, useSetToken } from "./useToken";

function useSignup(
    username: string,
    password: string,
    setUserData?: React.Dispatch<React.SetStateAction<UserModel | undefined>>,
    setAuthed?: React.Dispatch<React.SetStateAction<boolean>>,
    setToken?: React.Dispatch<React.SetStateAction<UserAuthCookie | undefined>>,
) {
    const pb = new PocketBase(import.meta.env.VITE_BACKEND_URL);
}

export default useSignup;
