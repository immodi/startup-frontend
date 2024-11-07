import { UserModel } from "@/interfaces/auth/userModel";
import { useDeleteToken } from "./useToken";

function useSignout(
    setAuthed: (isAuthed: boolean) => void,
    // setToken: React.Dispatch<React.SetStateAction<UserAuthCookie | undefined>>,
    setUserData: (userData: UserModel | undefined) => void,
) {
    setAuthed(false);
    useDeleteToken();
    // setToken(undefined);
    setUserData(undefined);
}

export default useSignout;
