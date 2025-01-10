import { LoadingSpinner } from "@/components/ui/Spinner";
import {
    Context,
    ContextInterface,
    GeneratorContext,
    GeneratorContextInterface,
    HomeContext,
    HomeContextInterface,
} from "@/components/util/context";
import fileDownloader from "@/helpers/generator/fileDownloader";
import { INITAL_LOCAL_STATE } from "@/hooks/local-data/useLocalData";
import { GenerateErrorResponse } from "@/interfaces/generator/generateResponses";
import { Check, FileDown, FilePlus, Plus, RotateCcw } from "lucide-react";
import React, { useContext } from "react";

const MainContent: React.FC = () => {
    const context = useContext(Context) as ContextInterface;
    const { localState, cacheLocalState } = context;

    const homeContext = useContext(HomeContext) as HomeContextInterface;
    const { navigateTo } = homeContext;
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
    } = generatorContext;

    const buttonClass = `relative select-none h-full min-h-fit w-full rounded-lg border-2 transition-all duration-200 ${
        isDarkMode
            ? "bg-[#7A1CAC] hover:bg-[#AD49E1] text-white border-[#AD49E1]"
            : "bg-[#4A00E0] hover:bg-[#3a00c0] text-white border-[#3a00c0]"
    }`;

    const renderOptions = (templates: string[]) => {
        return (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-2">
                {templates.slice(0, 3).map((template, index) => (
                    <button
                        className={`${buttonClass} ${
                            localState.generator.selectedTemplate ===
                            template.toLowerCase()
                                ? "ring-2 ring-offset-2 ring-offset-background"
                                : ""
                        }`}
                        key={index}
                        onClick={(e) => {
                            e.preventDefault();
                            setSelectedTemplate(template.toLowerCase());
                        }}
                    >
                        {localState.generator.selectedTemplate ===
                            template.toLowerCase() && (
                            <Check className="absolute top-2 right-2 h-6 w-6" />
                        )}
                        <div className="flex flex-col items-center justify-center space-y-2">
                            <span className="text-3xl font-bold">
                                {template.charAt(0).toUpperCase()}
                            </span>
                            <span className="text-sm font-medium">
                                {template}
                            </span>
                        </div>
                    </button>
                ))}

                <button
                    className={`${buttonClass}`}
                    onClick={() => navigateTo("designer")}
                >
                    <div className="flex flex-col items-center justify-center space-y-2">
                        <Plus className="h-8 w-8" />
                    </div>
                </button>
            </div>
        );
    };

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
                            value={vocabulary.toString()}
                            className={`w-full focus:outline-none ${isDarkMode ? "bg-gray-700 accent-[#AD49E1]" : "bg-gray-200 accent-[#4A00E0]"}`}
                            onChange={(e) => {
                                const vocabulary: number = parseInt(
                                    e.currentTarget.value,
                                );
                                setTimeout(() => {
                                    setVocabulary(vocabulary);
                                }, 10);
                            }}
                        />
                    </div>
                </div>

                <div className="form-group w-full min-h-fit h-fit flex flex-col justify-between relative portrait:top-2">
                    {/* Template Select */}
                    {renderOptions(templates)}

                    <hr className="border-gray-800 dark:border-gray-600 mt-4" />

                    <div className="w-full h-fit flex">
                        <div className="text-center mt-4 flex justify-center items-center w-[60%]">
                            {!isLoading ? (
                                <button
                                    type="submit"
                                    className={`w-full flex py-2 justify-center items-center rounded-lg font-semibold tracking-wide text-lg transition-colors duration-300 ${isDarkMode ? "bg-[#7A1CAC] hover:bg-[#AD49E1] text-white" : "bg-[#4A00E0] hover:bg-[#3a00c0] text-white"}`}
                                >
                                    <FileDown className="mr-2 h-5 w-5" />
                                    Generate
                                </button>
                            ) : (
                                <LoadingSpinner
                                    isDarkMode={isDarkMode}
                                    className="w-12 h-12"
                                />
                            )}
                        </div>

                        <div className="w-[10%] md:w-[25%] lg:w-[30%]"></div>

                        <div className="/* w-[30%] md:w-[15%] lg:w-[10%] grid grid-rows-1 place-content-end grid-cols-2">
                            {/* Button to open the Key-Value Pair Popup */}
                            <div className="text-center mt-4 flex justify-end items-center">
                                <button
                                    type="button"
                                    onClick={() => setIsKeyValuePopupOpen(true)}
                                    className={`w-fit h-fit  text-gray-600 dark:text-gray-200`}
                                >
                                    <FilePlus className="h-8 w-8" />
                                </button>
                            </div>

                            {/* Button to reset to defaults */}
                            <div className="text-center mt-4 flex justify-end items-center">
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
                                    className={`w-fit h-fit  text-gray-600 dark:text-gray-200`}
                                >
                                    <RotateCcw className="h-8 w-8" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default MainContent;
