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
            .authWithPassword<UserModel>(username, password)
            .then((res) => {
                // change the application state to authed
                setAuthed?.(true);

                // auth the user to the application itself
                const user: UserModel = {
                    ...res.record,
                    collectionId: "",
                    id: "",
                    collectionName: "",
                    token: res.token,
                };
                setUserData?.(user);

                // set the token and other local data for the other sign ins
                const userAuthToken: UserAuthCookie = {
                    username: user.username,
                    email: user.email,
                    joinedAt: user.created,
                    token: user.token,
                };
                setToken?.(userAuthToken);

                useSetToken(
                    user.username,
                    user.email,
                    user.created,
                    user.token,
                );
            })
            .catch((err) => {
                setAuthed?.(false);
                return err;
            });
    }
}

export default useLogin;
