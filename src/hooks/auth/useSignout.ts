import { UserModel } from "@/interfaces/auth/userModel";

import pb from "@/interfaces/auth/pocketBase";
import { useDeleteToken } from "./useToken";

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
