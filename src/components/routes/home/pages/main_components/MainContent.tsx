import { LoadingSpinner } from "@/components/ui/Spinner";
import {
    Context,
    ContextInterface,
    GeneratorContext,
    GeneratorContextInterface,
} from "@/components/util/context";
import fileDownloader from "@/helpers/fileDownloader";
import { capitalizeFirstChar } from "@/helpers/getTemplates";
import { INITAL_LOCAL_STATE } from "@/hooks/local-data/useLocalData";
import { GenerateErrorResponse } from "@/interfaces/genrateResponses";
import { useContext, useEffect } from "react";

const MainContent: React.FC = () => {
    const context = useContext(Context) as ContextInterface;
    const { localState, cacheLocalState } = context;
    const { selectedTemplate, topic, userTemplateData, vocabulary } =
        localState.generator;
    const isDarkMode = context.localState.isDarkMode;
    const generatorContext = useContext(
        GeneratorContext,
    ) as GeneratorContextInterface;

    const {
        isLoading,
        templates,
        token,

        setTopic,
        setErrorMessage,
        setIsLoading,
        setSelectedTemplate,
        setVocabulary,
        setIsErrorDialogOpen,
        setIsKeyValuePopupOpen,
        setIsModalOpen,
    } = generatorContext;

    return (
        <div
            className={`bg-white dark:bg-gray-800 p-8 flex flex-col justify-center rounded-lg shadow-lg min-h-fit w-full max-w-full transition-all duration-300 transform border ${isDarkMode ? "border-gray-600" : "border-gray-300"}`}
        >
            <form
                className="flex flex-col w-full justify-between min-h-fit mt-4 mb-4"
                onChange={(e) => {
                    const topic: string = e.currentTarget.topic.value ?? "";
                    setTopic(topic);
                }}
                onSubmit={(e) => {
                    e.preventDefault();
                    setIsLoading(true);

                    const topic: string = e.currentTarget.topic.value;
                    fileDownloader(
                        topic,
                        selectedTemplate,
                        vocabulary,
                        userTemplateData,
                        token!,
                        setIsLoading,
                    )
                        .then((res) => {
                            console.log(res);
                        })
                        .catch((err: GenerateErrorResponse) => {
                            console.log(err.details);
                            setIsErrorDialogOpen(true);
                            setErrorMessage(err.details);
                        })
                        .finally(() => {
                            setIsLoading(false);
                        });
                }}
            >
                <div className="form-group w-full min-h-fit h-2/3 flex flex-col justify-center relative portrait:bottom-8">
                    {/* Topic Input */}
                    <div className="mb-4 item">
                        <input
                            type="text"
                            value={topic}
                            id="topic"
                            className={`w-full portrait:top-4 relative portrait:h-14 p-3 border rounded-md focus:outline-none focus:ring-2 ${isDarkMode ? "border-[#AD49E1] focus:ring-[#AD49E1] dark:bg-gray-700 dark:text-white" : "border-[#4A00E0] focus:ring-[#4A00E0]"}`}
                            placeholder="Enter a topic (e.g., FPS Games)"
                            required
                        />
                    </div>

                    {/* Creativity Slider */}
                    <div className="mb-4 item relative portrait:top-6">
                        <label
                            htmlFor="creativity"
                            className={`block font-semibold ${isDarkMode ? "text-white" : "text-gray-700"}`}
                        >
                            Vocabulary Level:{" "}
                            <span id="creativity-value">{vocabulary}</span>
                        </label>
                        <input
                            type="range"
                            id="vocabulary"
                            name="vocabulary"
                            min="0"
                            max="10"
                            defaultValue={vocabulary.toString()}
                            className={`w-full focus:outline-none ${isDarkMode ? "bg-gray-700 accent-[#AD49E1]" : "bg-gray-200 accent-[#4A00E0]"}`}
                            onChange={(e) => {
                                const vocabulary: number = parseInt(
                                    e.currentTarget.value,
                                );
                                setVocabulary(vocabulary);
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
                            {templates.slice(0, 3).map((template, index) => (
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

                    <hr className="border-gray-800 dark:border-gray-600 mt-4" />

                    <div className="grid grid-cols-2 gap-4 mt-4">
                        {/* Button to open the Key-Value Pair Popup */}
                        <div className="text-center mt-4 flex justify-center items-center">
                            <button
                                type="button"
                                onClick={() => setIsKeyValuePopupOpen(true)}
                                className={`w-full py-3 rounded-lg font-semibold tracking-wide text-base transition-colors duration-300 ${isDarkMode ? "bg-[#7A1CAC] hover:bg-[#AD49E1] text-white" : "bg-[#4A00E0] hover:bg-[#3a00c0] text-white"}`}
                            >
                                Add Data To Template
                            </button>
                        </div>

                        {/* Button to reset to defaults */}
                        <div className="text-center mt-4 flex justify-center items-center">
                            <button
                                type="button"
                                onClick={() => {
                                    cacheLocalState({
                                        ...localState,
                                        generator: {
                                            ...INITAL_LOCAL_STATE.generator,
                                        },
                                    });
                                }}
                                className={`w-full py-3 rounded-lg font-semibold tracking-wide text-base transition-colors duration-300 ${isDarkMode ? "bg-[#7A1CAC] hover:bg-[#AD49E1] text-white" : "bg-[#4A00E0] hover:bg-[#3a00c0] text-white"}`}
                            >
                                Reset To Defaults
                            </button>
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
    );
};

export default MainContent;
