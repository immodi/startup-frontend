import { ComponentsProps } from "./profileInterfaces";
import { useContext, useEffect, useState } from "react";
import {
    ProfileContext,
    ProfileContextInterface,
} from "@/components/util/context";
import { UserFile } from "@/helpers/auth/getUserFiles";
import { Download } from "lucide-react";

const FilesComponent: React.FC<ComponentsProps> = ({ isDarkMode }) => {
    const profileContext = useContext(
        ProfileContext,
    ) as ProfileContextInterface;
    const [userFiles, setUserFiles] = useState<UserFile[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");

    // Update userFiles when profileContext.userFiles changes
    useEffect(() => {
        if (profileContext.userFiles.length > 0) {
            setUserFiles(profileContext.userFiles);
        }
    }, [profileContext.userFiles]);

    // Filter files based on the search query (partial match)
    const filteredFiles = userFiles.filter((file) =>
        file.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );

    return (
        <div className="flex flex-col flex-grow p-5 overflow-scroll">
            <section
                className={`bg-white dark:bg-gray-700 p-6 rounded-lg shadow-md mb-5`}
            >
                <h2
                    className={`text-2xl font-semibold ${isDarkMode ? "text-white" : "text-[#4A00E0]"}`}
                >
                    Files
                </h2>

                {/* Search Bar */}
                <div className="mt-4">
                    <input
                        type="text"
                        placeholder="Search files by name..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className={`w-full p-2 rounded-md border ${isDarkMode ? "bg-gray-600 border-gray-500 text-white" : "bg-white border-gray-300 text-gray-700"}`}
                    />
                </div>

                {/* File List */}
                <div
                    className={`${isDarkMode ? "text-white" : "text-gray-700"} mt-4`}
                >
                    <ul className="space-y-3">
                        {filteredFiles.map((file, index) => (
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

                    {/* No Results Message */}
                    {filteredFiles.length === 0 && (
                        <p
                            className={`${isDarkMode ? "text-white" : "text-gray-700"}`}
                        >
                            No files found.
                        </p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default FilesComponent;
