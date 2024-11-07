import {
    Context,
    ContextInterface,
    GeneratorContext,
    GeneratorContextInterface,
} from "@/components/util/context";
import getTemplateData from "@/helpers/generator/getTemplatesData";
import { useContext } from "react";

const KeyValuePopUp: React.FC = () => {
    const context = useContext(Context) as ContextInterface;
    const { localState } = context;
    const { selectedTemplate, userTemplateData } = localState.generator;
    const isDarkMode = context.localState.isDarkMode;
    const generatorContext = useContext(
        GeneratorContext,
    ) as GeneratorContextInterface;

    const { setIsKeyValuePopupOpen, setUserTemplateData } = generatorContext;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div
                className={`bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-1/2 portrait:w-full max-w-lg`}
            >
                <h3 className="text-lg font-semibold mb-4 text-center text-gray-700 dark:text-gray-300">
                    Add Data
                </h3>
                <form className="flex flex-col w-full h-full justify-between min-h-fit">
                    <div className="form-group overflow-y-auto max-h-64 w-full min-h-fit flex flex-col space-y-4">
                        {/* Key-Value Input Pairs */}
                        {getTemplateData(selectedTemplate).map(
                            (label, index) => (
                                <div
                                    className="flex justify-between items-center"
                                    key={index}
                                >
                                    {/* Key Input */}
                                    <input
                                        type="text"
                                        disabled={true}
                                        value={label
                                            .charAt(0)
                                            .toUpperCase()
                                            .concat(label.slice(1))}
                                        className={`w-1/4 p-2 border rounded-md focus:outline-none focus:ring-2 ${isDarkMode ? "border-[#AD49E1] focus:ring-[#AD49E1] dark:bg-gray-700 dark:text-white" : "border-[#4A00E0] focus:ring-[#4A00E0]"}`}
                                    />
                                    {/* Value Input */}
                                    <input
                                        type="text"
                                        placeholder={`Value`}
                                        value={
                                            userTemplateData.get(label) || ""
                                        }
                                        onChange={(event) => {
                                            const value = event.target.value;

                                            // Create a new Map instance based on the existing one
                                            const updatedMap = new Map(
                                                userTemplateData,
                                            );

                                            if (value !== "") {
                                                updatedMap.set(label, value);
                                            } else {
                                                updatedMap.delete(label);
                                            }

                                            // Set the new Map as the state
                                            setUserTemplateData(updatedMap);
                                        }}
                                        className={`w-3/4 ml-4 p-2 border rounded-md focus:outline-none focus:ring-2 ${isDarkMode ? "border-[#AD49E1] focus:ring-[#AD49E1] dark:bg-gray-700 dark:text-white" : "border-[#4A00E0] focus:ring-[#4A00E0]"}`}
                                    />
                                </div>
                            ),
                        )}
                    </div>

                    {/* Close Button */}
                    <div className="text-center mt-4 flex justify-center items-center">
                        <button
                            type="button"
                            onClick={() => setIsKeyValuePopupOpen(false)}
                            className={`py-2 px-4 rounded-lg font-semibold transition-colors duration-300 ${isDarkMode ? "bg-[#7A1CAC] hover:bg-[#AD49E1] text-white" : "bg-[#4A00E0] hover:bg-[#3a00c0] text-white"}`}
                        >
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default KeyValuePopUp;
