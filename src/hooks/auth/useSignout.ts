import { UserModel } from "@/interfaces/userModel";
import { useDeleteToken, UserAuthCookie } from "./useToken";

function useSignout(
    setAuthed: React.Dispatch<React.SetStateAction<boolean>>,
    setToken: React.Dispatch<React.SetStateAction<UserAuthCookie | undefined>>,
    setUserData: React.Dispatch<React.SetStateAction<UserModel | undefined>>,
) {
    setAuthed(false);
    useDeleteToken();
    setToken(undefined);
    setUserData(undefined);
}

export default useSignout;
