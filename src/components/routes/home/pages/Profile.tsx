import React, { useEffect, useState } from "react";
import { PageProps } from "@/interfaces/pageProp";
import { File, LogOut, LucideProps, Settings, User } from "lucide-react";
import {
    ComponentsProps,
    UserProp,
} from "./profile_components/profileInterfaces";
import ProfileComponent from "./profile_components/MainProfile";
import FilesComponent from "./profile_components/Files";
import SettingsComponent from "./profile_components/Settings";
import { SignOutModal, SignOutModalProps } from "./profile_components/SignOut";
import { useGetToken, UserAuthCookie } from "@/hooks/auth/useToken";
import useSignout from "@/hooks/auth/useSignout";
import { UserModel } from "@/interfaces/userModel";

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
    const [isSigningOut, setIsSigningOut] = useState(false);
    const [isLoading, _] = useState(false);
    const [currentComponent, setCurrentComponent] = useState(0);
    const [selectedIcon, setSelectedIcon] = useState(0);
    const iconsMap: IconType = new Map([
        [0, [User, () => console.log("User")]],
        [1, [File, () => console.log("File")]],
        [2, [Settings, () => console.log("Settings")]],
    ]);

    const components: Array<React.FC<ComponentsProps>> = [
        ProfileComponent,
        FilesComponent,
        SettingsComponent,
    ];

    const userLocal = userData || (useGetToken() as UserAuthCookie);
    const user: UserProp = {
        name: userLocal.username,
        email: userLocal.email,
        joinDate: getCreationDate(userLocal),
        recentActivities: ["Testing", "Testing2", "Testing3"],
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
            useSignout(setAuthed, setUserData);
        },
    };

    const Component = components[currentComponent];

    return (
        <div
            className={`flex ${isMenuOpen && "translate-x-24"} flex-col bg-gray-100 dark:bg-gray-800 transition-all duration-300 flex-grow min-h-screen`}
        >
            {/* Top Navigation Menu */}
            <header className={`bg-white dark:bg-gray-900 p-5 shadow-md`}>
                <ul className="flex justify-around items-center space-x-8">
                    {[...iconsMap].map(([key, [Icon, action]]) => {
                        return (
                            <li
                                key={key}
                                onClick={() => {
                                    setSelectedIcon(key);
                                    setCurrentComponent(key);
                                    action();
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
