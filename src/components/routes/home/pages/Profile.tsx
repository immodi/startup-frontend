import {
    Context,
    ContextInterface,
    ProfileContext,
    ProfileContextInterface,
} from "@/components/util/context";
import { getRecentUserFiles, UserFile } from "@/helpers/auth/getUserFiles";
import useSignout from "@/hooks/auth/useSignout";
import { useGetToken, UserAuthCookie } from "@/hooks/auth/useToken";
import { INITAL_LOCAL_STATE } from "@/hooks/local-data/useLocalData";
import { PageProps } from "@/interfaces/auth/pageProp";
import { UserModel } from "@/interfaces/auth/userModel";
import { File, LogOut, LucideProps, User } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import FilesComponent from "./profile_components/Files";
import ProfileComponent from "./profile_components/MainProfile";
import {
    ComponentsProps,
    UserProp,
} from "./profile_components/profileInterfaces";
import { SignOutModal, SignOutModalProps } from "./profile_components/SignOut";

type IconType = Map<
    number,
    [
        React.ForwardRefExoticComponent<
            Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
        >,
        () => void,
    ]
>;

const Profile: React.FC<
    PageProps & {
        setAuthed: (isAuthed: boolean) => void;
        setUserData: (userData: UserModel | undefined) => void;
        userData: UserModel | undefined;
    }
> = ({ isDarkMode, isMenuOpen, setAuthed, setUserData, userData }) => {
    const context = useContext(Context) as ContextInterface;
    const { cacheLocalState } = context;

    const [isSigningOut, setIsSigningOut] = useState(false);

    const [isLoading, _] = useState(false);
    const [currentComponent, setCurrentComponent] = useState(0);
    const [selectedIcon, setSelectedIcon] = useState(0);
    const iconsMap: IconType = new Map([
        [0, [User, () => {}]],
        [1, [File, () => {}]],
        // [2, [Settings, () => {}]],
    ]);
    const [userFiles, setUserFiles] = useState<UserFile[]>([]);

    useEffect(() => {
        getRecentUserFiles().then((templates) => {
            setUserFiles(templates);
        });
    }, []);

    const components: Array<React.FC<ComponentsProps>> = [
        ProfileComponent,
        FilesComponent,
        // SettingsComponent,
    ];

    const userLocal = userData || (useGetToken() as UserAuthCookie);

    const user: UserProp = {
        name: userLocal.username,
        email: userLocal.email,
        joinDate: getCreationDate(userLocal),
    };

    const componentsProps: PageProps & { user: UserProp } = {
        user: user,
        isDarkMode: isDarkMode,
        isMenuOpen: isMenuOpen,
    };

    const signOutModalProps: SignOutModalProps = {
        isDarkMode: isDarkMode,
        isLoading: isLoading,
        isOpen: isSigningOut,
        onClose: () => setIsSigningOut(false),
        onSignOut: () => {
            // useSignout(setAuthed, setToken, setUserData);
            useSignout(setAuthed, setUserData, () => {
                cacheLocalState(INITAL_LOCAL_STATE);
            });
        },
    };

    const Component = components[currentComponent];

    const profileContext: ProfileContextInterface = {
        userFiles: userFiles,
    };

    return (
        <ProfileContext.Provider value={profileContext}>
            <div
                className={`flex ${isMenuOpen && "translate-x-24"} flex-col bg-gray-100 dark:bg-gray-800 transition-all duration-300 flex-grow min-h-screen`}
            >
                {/* Top Navigation Menu */}
                <header className={`bg-white dark:bg-gray-900 p-5 shadow-md`}>
                    <ul className="flex justify-around items-center space-x-8">
                        {[...iconsMap].map(([key, [Icon]]) => {
                            return (
                                <li
                                    key={key}
                                    onClick={() => {
                                        setSelectedIcon(key);
                                        setCurrentComponent(key);
                                        // action();
                                    }}
                                >
                                    <a
                                        href="#"
                                        className={`p-3 rounded-full transition-colors duration-200 ${
                                            isDarkMode
                                                ? "text-white hover:bg-gray-700"
                                                : "text-gray-700 hover:bg-gray-200"
                                        } ${
                                            selectedIcon === key &&
                                            selectedIcon !== 3 &&
                                            "bg-gray-700 text-white hover:bg-gray-700"
                                        } flex items-center justify-center`}
                                    >
                                        <Icon size={28} />
                                    </a>
                                </li>
                            );
                        })}

                        <li
                            onClick={() => {
                                loggingOut(setIsSigningOut);
                            }}
                        >
                            <a
                                href="#"
                                className={`p-3 rounded-full transition-colors duration-200 ${
                                    isDarkMode
                                        ? "text-white hover:bg-gray-700"
                                        : "text-gray-700 hover:bg-gray-200"
                                } flex items-center justify-center`}
                            >
                                <LogOut size={28} />
                            </a>
                        </li>
                    </ul>
                </header>

                <Component {...componentsProps} />

                <SignOutModal {...signOutModalProps} />
            </div>
        </ProfileContext.Provider>
    );
};

function loggingOut(
    setIsSigningOut: React.Dispatch<React.SetStateAction<boolean>>,
) {
    setIsSigningOut(true);
}

const getCreationDate = (user: UserAuthCookie | UserModel): Date => {
    if ((user as UserModel).created !== undefined) {
        return new Date((user as UserModel).created);
    } else if ((user as UserAuthCookie).joinedAt !== undefined) {
        return new Date((user as UserAuthCookie).joinedAt);
    } else {
        return new Date(new Date().toISOString().split("T")[0]);
    }
    3;
};

export default Profile;
