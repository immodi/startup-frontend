import { capitalizeFirstChar, getAllTemplates } from "@/helpers/getTemplates";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "./ui/spinner";
import fileDownloader from "@/helpers/fileDownloader";

const MainComponent: React.FC = () => {
    const [templates, setTemplates] = useState<Array<string>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState<string>(import.meta.env.VITE_USER_TOKEN);

    useEffect(() => {
        getAllTemplates(token)
            .then((res) => {
                setTemplates(res);
            })
            .catch((err) => {
                setTemplates(["report", "document"]);
                console.error(err);
            });
    }, []);

    return (
        <>
            <div className="w-screen h-screen flex items-center justify-center flex-col ">
                <form
                    action="post"
                    className="max-w-sm flex flex-col mx-auto"
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
                    <div className="mb-5">
                        <label
                            htmlFor="topic"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Topic
                        </label>
                        <input
                            type="text"
                            id="topic"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="FPS Games"
                            required
                        />
                    </div>
                    <div className="mb-5">
                        <label
                            htmlFor="template"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Template
                        </label>
                        <select
                            name="template"
                            id="template"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            {templates.map((template, index) => {
                                return (
                                    <option
                                        key={index}
                                        value={template.toLowerCase()}
                                    >
                                        {capitalizeFirstChar(template)}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <div className="w-auto h-auto mt-3 self-center">
                        {!isLoading ? (
                            <button type="submit">
                                <span className="download-button bg-slate-300 p-2 rounded transition-all">
                                    Download
                                </span>
                            </button>
                        ) : (
                            <LoadingSpinner />
                        )}
                    </div>
                </form>
            </div>
        </>
    );
};

export default MainComponent;
