import pb from "@/interfaces/auth/pocketBase";
import registerUserCache from "@/interfaces/auth/registerUserCahce";
import { UserModel } from "@/interfaces/auth/userModel";
import { useGetToken } from "./useToken";

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

    const userAuthToken = useGetToken();
    if (userAuthToken !== undefined) {
        setAuthed?.(true);
    } else {
        pb.collection("users")
            .authWithPassword<UserModel>(username, password)
            .then((res) => {
                // change the application state to authed
                setAuthed?.(true);

                const user = res.record;

                // setUserData?.(user);
                registerUserCache(
                    user,
                    rememberMe,
                    res.token,
                    setUserData,
                    setAuthed,
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
