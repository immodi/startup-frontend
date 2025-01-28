import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Context,
    ContextInterface,
    GeneratorContext,
    GeneratorContextInterface,
} from "@/components/util/context";
import getTemplateKeyValuePairs from "@/helpers/generator/getTemplatesData";
import { Label } from "@radix-ui/react-label";
import { X } from "lucide-react";
import { useContext, useEffect, useState } from "react";

const KeyValuePopUp: React.FC = () => {
    const context = useContext(Context) as ContextInterface;
    const { localState } = context;
    const { userTemplateData, selectedTemplate } = localState.generator;
    const isDarkMode = context.localState.isDarkMode;
    const generatorContext = useContext(
        GeneratorContext,
    ) as GeneratorContextInterface;

    const { setIsKeyValuePopupOpen, setUserTemplateData, templates } =
        generatorContext;

    const [userIdentifiers, setUserIdentifiers] = useState<Array<string>>([]);

    useEffect(() => {
        const templateId = templates.find(
            (template) => template.name === selectedTemplate,
        )!!.id;

        getTemplateKeyValuePairs(templateId).then((res) => {
            setUserIdentifiers(res);
        });
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-scroll">
            <div
                className={`bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-1/2 portrait:w-full max-w-lg relative`}
            >
                <h3 className="text-lg font-semibold mb-4 text-center text-gray-700 dark:text-gray-300">
                    Add Data
                </h3>

                <button
                    type="button"
                    onClick={() => setIsKeyValuePopupOpen(false)}
                    className={`absolute right-4 top-4 text-gray-600 duration-150 dark:text-gray-300`}
                >
                    <X />
                </button>

                <form className="flex flex-col w-full h-full justify-between min-h-fit">
                    <div className="form-group overflow-y-auto max-h-64 w-full min-h-fit flex flex-col space-y-4">
                        {/* Key-Value Input Pairs */}
                        {userIdentifiers !== undefined &&
                            userIdentifiers.map((label, index) => (
                                <CardContent className="space-y-0 p-0">
                                    <div key={index} className="">
                                        <Label
                                            htmlFor={index.toString()}
                                            className="text-sm font-medium"
                                        >
                                            {label.charAt(0).toUpperCase() +
                                                label.slice(1)}
                                        </Label>
                                        <Input
                                            name={index.toString()}
                                            type="text"
                                            value={
                                                userTemplateData.get(label) ||
                                                ""
                                            }
                                            placeholder="Value"
                                            onChange={(event) => {
                                                const value =
                                                    event.target.value;

                                                // Create a new Map instance based on the existing one
                                                const updatedMap = new Map(
                                                    userTemplateData,
                                                );

                                                if (value !== "") {
                                                    updatedMap.set(
                                                        label,
                                                        value,
                                                    );
                                                } else {
                                                    updatedMap.delete(label);
                                                }

                                                // Set the new Map as the state
                                                setUserTemplateData(updatedMap);
                                            }}
                                            className={`w-full border ${
                                                isDarkMode
                                                    ? "bg-gray-800 border-gray-700 focus:border-[#4A00E0]"
                                                    : "bg-white border-gray-200 focus:border-[#7A1CAC]"
                                            }`}
                                        />
                                    </div>
                                </CardContent>
                            ))}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default KeyValuePopUp;
