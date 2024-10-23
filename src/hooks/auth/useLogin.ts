import { UserModel } from "@/interfaces/userModel";
import PocketBase from "pocketbase";
import { useGetToken, UserAuthCookie, useSetToken } from "./useToken";

function useLogin(
    username: string,
    password: string,
    setUserData?: React.Dispatch<React.SetStateAction<UserModel | undefined>>,
    setAuthed?: React.Dispatch<React.SetStateAction<boolean>>,
    setToken?: React.Dispatch<React.SetStateAction<UserAuthCookie | undefined>>,
) {
    const pb = new PocketBase(import.meta.env.VITE_BACKEND_URL);
    const userAuthToken = useGetToken();
    if (userAuthToken !== undefined) {
        setAuthed?.(true);
    } else {
        pb.collection("users")
            .authWithPassword(username, password)
            .then((res) => {
                const user: UserModel = {
                    ...(res.record as unknown as UserModel),
                    collectionId: "",
                    id: "",
                    collectionName: "",
                    token: res.token,
                };
                setUserData?.(user);
                setAuthed?.(true);
                useSetToken(
                    user.username,
                    user.email,
                    user.created,
                    user.token,
                );
                const userAuthToken: UserAuthCookie = {
                    username: user.username,
                    email: user.email,
                    joinedAt: user.created,
                    token: user.token,
                };
                setToken?.(userAuthToken);
            })
            .catch((err) => {
                setAuthed?.(false);
                return err;
            });
    }
}

export default useLogin;
