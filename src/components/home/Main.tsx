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
        <div className="flex-grow flex items-center justify-center">
            <div className="bg-white dark:bg-gray-900 p-10 rounded-lg shadow-lg max-w-2xl w-full transition-all duration-300 transform md:scale-110">
                <h2 className="text-3xl font-semibold text-gray-700 dark:text-white mb-6 transition-colors duration-300">
                    Download a Document
                </h2>
                <form
                    action="post"
                    className="flex flex-col"
                    onSubmit={(e) => {
                        e.preventDefault();
                        setIsLoading(true);

                        let topic: string = e.currentTarget.topic.value;
                        let template: string = e.currentTarget.template.value;

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
                    <div className="mb-5">
                        <label
                            htmlFor="topic"
                            className="block text-gray-600 dark:text-gray-300 font-medium mb-2 transition-colors duration-300"
                        >
                            Topic
                        </label>
                        <input
                            type="text"
                            id="topic"
                            className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white transition-colors duration-300"
                            placeholder="Enter a topic (e.g., FPS Games)"
                            required
                        />
                    </div>

                    {/* Template Select */}
                    <div className="mb-5">
                        <label
                            htmlFor="template"
                            className="block text-gray-600 dark:text-gray-300 font-medium mb-2 transition-colors duration-300"
                        >
                            Template
                        </label>
                        <select
                            name="template"
                            id="template"
                            className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white transition-colors duration-300"
                        >
                            {templates.map((template, index) => (
                                <option
                                    key={index}
                                    value={template.toLowerCase()}
                                >
                                    {capitalizeFirstChar(template)}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Submit Button */}
                    <div className="w-full flex justify-center mt-6">
                        {!isLoading ? (
                            <button
                                type="submit"
                                className="bg-purple-600 text-white font-bold py-3 px-6 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-colors duration-300"
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
