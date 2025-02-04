import { useContext, useEffect, useState } from "react";
import { ComponentsProps } from "./profileInterfaces";
import {
    ProfileContext,
    ProfileContextInterface,
} from "@/components/util/context";
import { UserFile } from "@/helpers/auth/getUserFiles";
import { Download } from "lucide-react";

const ProfileComponent: React.FC<ComponentsProps> = ({ user, isDarkMode }) => {
    const profileContext = useContext(
        ProfileContext,
    ) as ProfileContextInterface;
    const [userFiles, setUserFiles] = useState<UserFile[]>([]);

    useEffect(() => {
        if (profileContext.userFiles.length > 0) {
            setUserFiles(
                profileContext.userFiles.length <= 5
                    ? profileContext.userFiles
                    : profileContext.userFiles.slice(
                          profileContext.userFiles.length - 6,
                          profileContext.userFiles.length - 1,
                      ),
            );
        }
    }, [profileContext.userFiles.length]);

    return (
        <div className="flex flex-col flex-grow p-5 overflow-scroll">
            <section className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md mb-5">
                <h2
                    className={`text-2xl font-semibold mb-4 ${isDarkMode ? "text-white" : "text-[#4A00E0]"}`}
                >
                    Welcome, {user.name}
                </h2>
                <div className="flex flex-col space-y-2">
                    <p
                        className={`${isDarkMode ? "text-white" : "text-gray-700"}`}
                    >
                        <span className="font-medium">Email:</span> {user.email}
                    </p>
                    <p
                        className={`${isDarkMode ? "text-white" : "text-gray-700"}`}
                    >
                        <span className="font-medium">Joined on:</span>{" "}
                        {new Date(user.joinDate).toLocaleDateString()}
                    </p>
                </div>
            </section>

            {/* Recent Activity */}
            <section className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md">
                <h2
                    className={`text-2xl font-semibold mb-4 ${isDarkMode ? "text-white" : "text-[#4A00E0]"}`}
                >
                    Recent Activity
                </h2>
                <ul className="space-y-3">
                    {userFiles.map((file, index) => (
                        <li
                            key={index}
                            className={`${isDarkMode ? "text-white" : "text-gray-700"} p-3 border-b dark:border-gray-600`}
                        >
                            <div className="w-full h-full flex justify-between items-center">
                                {file.name.slice(0, 20) + "..."}

                                <a href={file.fileUrl}>
                                    <Download />
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default ProfileComponent;
