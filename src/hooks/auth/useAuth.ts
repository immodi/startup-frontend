import { User } from "@/interfaces/userModel";
import PocketBase from "pocketbase";
import { useGetToken, UserAuthCookie, useSetToken } from "./useGetToken";

function setAuth(
    username: string,
    password: string,
    setUserData?: React.Dispatch<React.SetStateAction<User | undefined>>,
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
                const user: User = {
                    ...(res.record as unknown as User),
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

export default setAuth;
