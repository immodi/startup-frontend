import { UserModel } from "@/interfaces/auth/userModel";
import { useDeleteToken } from "./useToken";
import PocketBase from "pocketbase";
import { deleteLocalUser } from "@/helpers/auth/clearLocalUser";
const pb = new PocketBase(import.meta.env.VITE_BACKEND_URL);

function useSignout(
    setAuthed: (isAuthed: boolean) => void,
    // setToken: React.Dispatch<React.SetStateAction<UserAuthCookie | undefined>>,
    setUserData: (userData: UserModel | undefined) => void,
) {
    setAuthed(false);
    useDeleteToken();
    // setToken(undefined);
    setUserData(undefined);

    deleteLocalUser();
    pb.authStore.clear();
}

export default useSignout;
