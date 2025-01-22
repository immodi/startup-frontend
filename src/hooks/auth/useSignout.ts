import { UserModel } from "@/interfaces/auth/userModel";
import PocketBase from "pocketbase";

import { useDeleteToken } from "./useToken";
const pb = new PocketBase(import.meta.env.VITE_BACKEND_URL);

function useSignout(
    setAuthed: (isAuthed: boolean) => void,
    // setToken: React.Dispatch<React.SetStateAction<UserAuthCookie | undefined>>,
    setUserData: (userData: UserModel | undefined) => void,
    resetLocalState: () => void,
) {
    useDeleteToken();
    setUserData(undefined);

    pb.authStore.clear();
    resetLocalState();
    setAuthed(false);
}

export default useSignout;
