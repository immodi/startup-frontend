import fileDownloader from "@/helpers/fileDownloader";
import { capitalizeFirstChar, getAllTemplates } from "@/helpers/getTemplates";
import { FormEvent, useEffect, useState } from "react";
import { LoadingSpinner } from "../ui/Spinner";
import { PageProps } from "@/interfaces/pageProp";

const Main: React.FC<PageProps> = ({ token, isDarkMode, isMenuOpen }) => {
    const [templates, setTemplates] = useState<Array<string>>([]);
    const [selectedTemplate, setSelectedTemplate] =
        useState<string>("document");
    const [isLoading, setIsLoading] = useState(false);
    const [creativity, setCreativity] = useState(50);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getAllTemplates(token ?? "")
            .then((res) => {
                setTemplates(res);
            })
            .catch((err) => {
                setTemplates(["document", "report", "paragraph"]);
                // console.error(err);
            });
    }, [token]);

    return (
        <div
            className={`
        flex ${isMenuOpen && "translate-x-24"}
        bg-gray-100 dark:bg-gray-800 transition-all duration-300
        flex-grow items-center justify-center p-5 min-h-fit
        `}
        >
            <div
                className={`bg-white dark:bg-gray-800 p-8 flex flex-col justify-center rounded-lg shadow-lg min-h-fit h-full portrait:h-5/6 w-full max-w-full transition-all duration-300 transform border ${isDarkMode ? "border-gray-600" : "border-gray-300"}`}
            >
                <form
                    className="flex flex-col w-full h-full portrait:h-5/6 justify-between min-h-fit"
                    onSubmit={(e) => {
                        e.preventDefault();
                        setIsLoading(true);

                        const topic: string = e.currentTarget.topic.value;

                        fileDownloader(
                            topic,
                            selectedTemplate,
                            new Map([]),
                            token || "",
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
                    <div className="form-group w-full min-h-fit h-2/3 flex flex-col justify-center relative bottom-4 portrait:bottom-8">
                        {/* Topic Input */}
                        <div className="mb-4 item">
                            <input
                                type="text"
                                id="topic"
                                className={`w-full portrait:h-14 p-3 border rounded-md focus:outline-none focus:ring-2 ${isDarkMode ? "border-[#AD49E1] focus:ring-[#AD49E1] dark:bg-gray-700 dark:text-white" : "border-[#4A00E0] focus:ring-[#4A00E0]"}`}
                                placeholder="Enter a topic (e.g., FPS Games)"
                                required
                            />
                        </div>

                        {/* Creativity Slider */}
                        <div className="mb-4 item relative top-2 portrait:top-6">
                            <label
                                htmlFor="creativity"
                                className={`block font-semibold ${isDarkMode ? "text-white" : "text-gray-700"}`}
                            >
                                Creativity Level:{" "}
                                <span id="creativity-value">{creativity}</span>
                            </label>
                            <input
                                type="range"
                                id="creativity"
                                name="creativity"
                                min="0"
                                max="100"
                                defaultValue={creativity.toString()}
                                className={`w-full focus:outline-none ${isDarkMode ? "bg-gray-700 accent-[#AD49E1]" : "bg-gray-200 accent-[#4A00E0]"}`}
                                onChange={(e) => {
                                    setCreativity(
                                        parseInt(e.currentTarget.value),
                                    );
                                }}
                            />
                        </div>
                    </div>

                    <div className="form-group w-full min-h-fit h-fit flex flex-col justify-between relative portrait:top-2">
                        {/* Template Select */}
                        <div
                            className={`mb-4 w-full landscape:max-h-56 portrait:max-h-72 overflow-y-hidden `}
                        >
                            <div className="grid grid-cols-2 gap-6">
                                {templates
                                    .slice(0, 3)
                                    .map((template, index) => (
                                        <div
                                            key={index}
                                            onClick={() =>
                                                setSelectedTemplate(
                                                    template.toLowerCase(),
                                                )
                                            }
                                            className={`cursor-pointer p-4 flex justify-center items-center rounded-lg border-2 text-center transition-colors ${selectedTemplate === template.toLowerCase() ? (isDarkMode ? "border-[#AD49E1] bg-gray-700 text-white" : "border-[#4A00E0] bg-gray-200") : isDarkMode ? "border-gray-600 bg-gray-800 text-white" : "border-gray-300 bg-gray-100"} ${isDarkMode ? "hover:border-[#AD49E1]" : "hover:border-[#4A00E0]"}`}
                                        >
                                            <p className="font-semibold text-sm lg:text-lg md:text-base flex items-center justify-center">
                                                {capitalizeFirstChar(template)}
                                            </p>
                                        </div>
                                    ))}
                                <div
                                    className={`cursor-pointer p-4 rounded-lg border-2 flex items-center justify-center transition-colors border-transparent ${isDarkMode ? "bg-[#7A1CAC] hover:bg-[#AD49E1] border-gray-700 text-white" : "bg-[#4A00E0] hover:bg-[#3a00c0] border-gray-700 text-white"}`}
                                    onClick={() => {
                                        // Handle click for creating a new template
                                        setIsModalOpen(true);
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="white"
                                        className={`w-4 h-4 ${isDarkMode ? "text-[#AD49E1]" : "text-[#4A00E0]"}`}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="3"
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="text-center mt-4 flex justify-center items-center">
                            {!isLoading ? (
                                <button
                                    type="submit"
                                    className={`w-full py-3 rounded-lg font-semibold tracking-wide text-lg transition-colors duration-300 ${isDarkMode ? "bg-[#7A1CAC] hover:bg-[#AD49E1] text-white" : "bg-[#4A00E0] hover:bg-[#3a00c0] text-white"}`}
                                >
                                    Generate PDF File
                                </button>
                            ) : (
                                <LoadingSpinner
                                    isDarkMode={isDarkMode}
                                    className="w-12 h-12"
                                />
                            )}
                        </div>
                    </div>
                </form>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div
                        className={`bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-1/2 max-w-md`}
                    >
                        <h3 className="text-lg font-semibold mb-4 text-center text-gray-700 dark:text-gray-300">
                            Edit Templates
                        </h3>
                        <div className="modal-content">
                            {/* Add your modal content here, such as form fields or template options */}
                            <p className="text-gray-700 dark:text-gray-300">
                                Edit your templates here.
                            </p>
                        </div>
                        <div className="text-center mt-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className={`py-2 px-4 rounded-lg font-semibold transition-colors duration-300 ${isDarkMode ? "bg-[#7A1CAC] hover:bg-[#AD49E1] text-white" : "bg-[#4A00E0] hover:bg-[#3a00c0] text-white"}`}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Main;

// <div className="mb-4">
// <label
//     htmlFor="template"
//     className={`block font-medium mb-1 ${isDarkMode ? "text-white" : "text-[#4A00E0]"}`}
// >
//     Template
// </label>
// <select
//     name="template"
//     id="template"
//     className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 ${isDarkMode ? "border-[#AD49E1] focus:ring-[#AD49E1] dark:bg-gray-700 dark:text-white" : "border-[#4A00E0] focus:ring-[#4A00E0]"}`}
// >
//     {templates.map((template, index) => (
//         <option
//             key={index}
//             value={template.toLowerCase()}
//             className={`${isDarkMode ? "dark:text-white dark:bg-gray-700" : ""}`}
//         >
//             {capitalizeFirstChar(template)}
//         </option>
//     ))}
// </select>
// </div>
