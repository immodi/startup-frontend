import { UserModel } from "@/interfaces/auth/userModel";
import PocketBase from "pocketbase";
import { useGetToken, useSetToken } from "./useToken";

function useLogin(
    username: string,
    password: string,
    rememberMe: boolean,
    setUserData?: (userData: UserModel | undefined) => void,
    setAuthed?: (isAuthed: boolean) => void,
    setIsLoading?: React.Dispatch<React.SetStateAction<boolean>>,
    setErrorMessages?: React.Dispatch<React.SetStateAction<string[] | null>>,
) {
    setIsLoading?.(true);

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
                // const userAuthToken: UserAuthCookie = {
                //     username: user.username,
                //     email: user.email,
                //     joinedAt: user.created,
                //     token: user.token,
                // };
                // setToken?.(userAuthToken);

                // save token if the user chooses to me remebered
                rememberMe &&
                    useSetToken(
                        user.username,
                        user.email,
                        user.created,
                        user.token,
                    );
            })
            .catch((err) => {
                setAuthed?.(false);
                const error = Object.entries(err.data.data).map(
                    ([key, value]) => {
                        return `${key} - ${(value as { message: string }).message}`;
                    },
                );

                setErrorMessages?.([err.message, ...error]);
                return err;
            })
            .finally(() => {
                setIsLoading?.(false);
            });
    }
}

export default useLogin;
