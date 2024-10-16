import fileDownloader from "@/helpers/fileDownloader";
import { capitalizeFirstChar, getAllTemplates } from "@/helpers/getTemplates";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../ui/Spinner";

interface MainProps {
    token: string;
    isDarkMode: boolean;
}

const Main: React.FC<MainProps> = ({ token, isDarkMode }) => {
    const [templates, setTemplates] = useState<Array<string>>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getAllTemplates(token)
            .then((res) => {
                setTemplates(res);
            })
            .catch((err) => {
                setTemplates(["report", "document"]);
                console.error(err);
            });
    }, [token]);

    return (
        <div
            className="
            flex
            bg-gray-100 dark:bg-gray-800 transition-colors duration-300
            flex-grow items-center justify-center p-5
            "
        >
            <div
                className={`bg-white relative bottom-8 dark:bg-gray-800 p-8 flex flex-col justify-center rounded-lg shadow-lg min-h-fit max-w-md w-full transition-all duration-300 transform border ${isDarkMode ? "border-gray-600" : "border-gray-300"}`}
            >
                <h2
                    className={`text-2xl font-semibold ${isDarkMode ? "text-white" : "text-[#4A00E0]"} mb-4 text-center`}
                >
                    Download a Document
                </h2>
                <form
                    className="flex flex-col"
                    onSubmit={(e) => {
                        e.preventDefault();
                        setIsLoading(true);

                        const topic: string = e.currentTarget.topic.value;
                        const template: string = e.currentTarget.template.value;

                        fileDownloader(
                            topic,
                            template,
                            new Map([]),
                            token,
                            setIsLoading,
                        )
                            .then((res) => {
                                console.log(res);
                            })
                            .catch((err) => {
                                console.log(err);
                            })
                            .finally(() => {
                                setIsLoading(false);
                            });
                    }}
                >
                    {/* Topic Input */}
                    <div className="mb-4">
                        <label
                            htmlFor="topic"
                            className={`block font-medium mb-1 ${isDarkMode ? "text-white" : "text-[#4A00E0]"}`}
                        >
                            Topic
                        </label>
                        <input
                            type="text"
                            id="topic"
                            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${isDarkMode ? "border-[#AD49E1] focus:ring-[#AD49E1] dark:bg-gray-700 dark:text-white" : "border-[#4A00E0] focus:ring-[#4A00E0]"}`}
                            placeholder="Enter a topic (e.g., FPS Games)"
                            required
                        />
                    </div>

                    {/* Template Select */}
                    <div className="mb-4">
                        <label
                            htmlFor="template"
                            className={`block font-medium mb-1 ${isDarkMode ? "text-white" : "text-[#4A00E0]"}`}
                        >
                            Template
                        </label>
                        <select
                            name="template"
                            id="template"
                            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${isDarkMode ? "border-[#AD49E1] focus:ring-[#AD49E1] dark:bg-gray-700 dark:text-white" : "border-[#4A00E0] focus:ring-[#4A00E0]"}`}
                        >
                            {templates.map((template, index) => (
                                <option
                                    key={index}
                                    value={template.toLowerCase()}
                                    className={`${isDarkMode ? "dark:text-white dark:bg-gray-700" : ""}`}
                                >
                                    {capitalizeFirstChar(template)}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Submit Button */}
                    <div className="w-full flex justify-center mt-4">
                        {!isLoading ? (
                            <button
                                type="submit"
                                className={`font-bold py-2 px-5 rounded-md focus:outline-none focus:ring-2 transition-colors duration-300 ${isDarkMode ? "bg-[#7A1CAC] hover:bg-[#AD49E1] text-white focus:ring-[#2E073F]" : "bg-[#4A00E0] hover:bg-[#3a00c0] text-white focus:ring-[#4A00E0]"}`}
                            >
                                Download
                            </button>
                        ) : (
                            <LoadingSpinner isDarkMode={isDarkMode} />
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Main;
