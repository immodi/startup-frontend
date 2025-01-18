import {
    DesignerContext,
    DesignerContextInterface,
} from "@/components/util/context";
import {
    faAlignCenter,
    faAlignLeft,
    faAlignRight,
    faBold,
    faItalic,
    faUnderline,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Info, Plus, Trash } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import {
    CanvasElement,
    CanvasElementStyles,
    UserFont,
} from "../elements/CanvasElementsRenderer";
import SubCustomize from "./SubElementCustomize";

const Customize: React.FC = () => {
    const designerContext = useContext(
        DesignerContext,
    ) as DesignerContextInterface;
    const { recentlySelectedActiveElement, updateCanvasElement } =
        designerContext;

    const [element, setElement] = useState<CanvasElement | null>(
        recentlySelectedActiveElement,
    );
    const [userStyle, setUserStyle] = useState<CanvasElementStyles | undefined>(
        recentlySelectedActiveElement?.userStyle,
    );
    const [key, setKey] = useState(getRandomKey());

    function getRandomKey(): number {
        return Math.floor(Math.random() * Math.pow(9, 99));
    }

    function refreshElement() {
        setElement(recentlySelectedActiveElement);
        setUserStyle({
            fontFamily: recentlySelectedActiveElement!.userStyle.fontFamily,
            isBold: recentlySelectedActiveElement!.userStyle.isBold,
            isItalic: recentlySelectedActiveElement!.userStyle.isItalic,
            isUnderline: recentlySelectedActiveElement!.userStyle.isUnderline,
            textColor: recentlySelectedActiveElement!.userStyle.textColor,
            textAlignment:
                recentlySelectedActiveElement!.userStyle.textAlignment,
        });
    }

    useEffect(() => {
        setKey(getRandomKey());
        if (recentlySelectedActiveElement !== null) {
            refreshElement();
        }
    }, [
        recentlySelectedActiveElement,
        recentlySelectedActiveElement?.text,
        recentlySelectedActiveElement?.id,
    ]);

    function updateElement(newElement: CanvasElement) {
        setElement(newElement);
    }

    function handleSave() {
        if (element !== null && userStyle !== undefined) {
            setKey(getRandomKey());
            updateCanvasElement(element.id, {
                ...element,
                selectMode: "idle",
                // text: element.text,
                userStyle: userStyle,
            });
        }
    }

    return element?.customClasses?.includes("container-div") ? (
        <SubCustomize element={element} />
    ) : (
        <div
            key={key}
            className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md w-full h-full overflow-y-scroll"
        >
            <h2 className="text-xl text-center font-semibold mb-4 text-gray-800 dark:text-gray-200">
                Edit Element
            </h2>
            <div className="space-y-4">
                {/* Text */}
                {!element?.customClasses?.includes("spacer-div") && (
                    <div>
                        <label className="mb-1 font-medium text-gray-700 dark:text-gray-300 flex justify-start place-content-center">
                            Description{" "}
                            <span className="relative group grid place-items-center ml-1">
                                <button
                                    type="button"
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                                    aria-label="Info"
                                >
                                    <Info width={16} height={16} />
                                </button>
                                {/* Tooltip for hover */}
                                <div className="absolute hidden group-hover:block z-10 w-48 p-2 text-sm text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg">
                                    Describe what you want the AI to talk about
                                    here
                                </div>
                            </span>
                        </label>
                        <input
                            disabled={
                                recentlySelectedActiveElement?.customClasses?.includes(
                                    "spacer-div",
                                ) && true
                            }
                            type="text"
                            className="whitespace-pre-wrap w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-gray-300"
                            defaultValue={
                                recentlySelectedActiveElement?.text ?? ""
                            }
                            onChange={(e) => {
                                if (element !== null) {
                                    updateElement({
                                        ...element,
                                        text: e.target.value,
                                    });
                                }
                            }}
                        />
                    </div>
                )}

                {/* Identifier */}
                {!element?.customClasses?.includes("spacer-div") && (
                    <div>
                        <label className="mb-1 font-medium text-gray-700 dark:text-gray-300 flex justify-start place-content-center">
                            Identifier{" "}
                            <span className="relative group grid place-items-center ml-1">
                                <button
                                    type="button"
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                                    aria-label="Info"
                                >
                                    <Info width={16} height={16} />
                                </button>
                                {/* Tooltip for hover */}
                                <div className="absolute hidden group-hover:block z-10 w-48 p-2 text-sm text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg">
                                    The main identifier for the node, to be able
                                    to replace it if needed
                                </div>
                            </span>
                        </label>
                        <input
                            disabled={
                                recentlySelectedActiveElement?.customClasses?.includes(
                                    "spacer-div",
                                ) && true
                            }
                            type="text"
                            className="whitespace-pre-wrap w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-gray-300"
                            defaultValue={
                                recentlySelectedActiveElement?.identifier ?? ""
                            }
                            onInput={(e) => {
                                e.currentTarget.value =
                                    e.currentTarget.value.replace(/\s/g, ""); // Remove spaces dynamically
                            }}
                            onChange={(e) => {
                                if (element !== null) {
                                    updateElement({
                                        ...element,
                                        identifier: e.target.value,
                                    });
                                }
                            }}
                        />
                    </div>
                )}

                {/* Tab Space */}
                {element?.customClasses?.includes("list") && (
                    <div>
                        <label className="mb-1 font-medium text-gray-700 dark:text-gray-300 flex justify-start place-content-center">
                            Tab Space{" "}
                            <span className="relative group grid place-items-center ml-1">
                                <button
                                    type="button"
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                                    aria-label="Info"
                                >
                                    <Info width={16} height={16} />
                                </button>
                                {/* Tooltip for hover */}
                                <div className="absolute hidden group-hover:block z-10 w-48 p-2 text-sm text-gray-700 bg-white dark:bg-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg">
                                    How much space to the left of the list
                                </div>
                            </span>
                        </label>
                        <input
                            type="number"
                            min="1" // Ensures the number cannot be less than 2
                            className="whitespace-pre-wrap w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-gray-300 nu"
                            defaultValue={element.tabWidth}
                            onChange={(e) => {
                                const value = parseInt(e.target.value, 10);
                                if (element !== null && value >= 1) {
                                    updateElement({
                                        ...element,
                                        tabWidth: value,
                                    });
                                }
                            }}
                        />
                    </div>
                )}

                {/* Font Styles (Bold, Italic, Underline) */}
                {!element?.customClasses?.includes("spacer-div") && (
                    <div className="">
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                            Font Styles
                        </label>
                        <div className="grid grid-cols-3">
                            <button
                                onClick={() => {
                                    if (userStyle !== undefined) {
                                        setUserStyle((prev) => {
                                            return {
                                                ...prev!,
                                                isBold: !userStyle.isBold,
                                            };
                                        });
                                    }
                                }}
                                className={`p-2 bg-white dark:bg-gray-700 border ${userStyle?.isBold && "dark:border-[#AD49E1] border-[#3a00c0]"} rounded-md`}
                            >
                                <FontAwesomeIcon icon={faBold} />
                            </button>
                            <button
                                onClick={() => {
                                    if (userStyle !== undefined) {
                                        setUserStyle((prev) => {
                                            return {
                                                ...prev!,
                                                isItalic: !userStyle.isItalic,
                                            };
                                        });
                                    }
                                }}
                                className={`p-2 bg-white dark:bg-gray-700 ${userStyle?.isItalic && "dark:border-[#AD49E1] border-[#3a00c0]"} border rounded-md`}
                            >
                                <FontAwesomeIcon icon={faItalic} />
                            </button>
                            <button
                                onClick={() => {
                                    if (element !== null) {
                                        if (userStyle !== undefined) {
                                            setUserStyle((prev) => {
                                                return {
                                                    ...prev!,
                                                    isUnderline:
                                                        !userStyle.isUnderline,
                                                };
                                            });
                                        }
                                    }
                                }}
                                className={`p-2 bg-white dark:bg-gray-700 ${userStyle?.isUnderline && "dark:border-[#AD49E1] border-[#3a00c0]"} border rounded-md`}
                            >
                                <FontAwesomeIcon icon={faUnderline} />
                            </button>
                        </div>
                    </div>
                )}

                {/* Text Alignment (Left, Center, Right) */}
                <div className="">
                    <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                        Text Alignment
                    </label>
                    <div className="grid grid-cols-3">
                        <button
                            onClick={() => {
                                if (userStyle !== undefined) {
                                    setUserStyle((prev) => {
                                        return {
                                            ...prev!,
                                            textAlignment: "left",
                                        };
                                    });
                                }
                            }}
                            className={`p-2 bg-white dark:bg-gray-700 border ${
                                userStyle?.textAlignment === "left" &&
                                "dark:border-[#AD49E1] border-[#3a00c0]"
                            } rounded-md`}
                        >
                            <FontAwesomeIcon icon={faAlignLeft} />
                        </button>
                        <button
                            onClick={() => {
                                if (userStyle !== undefined) {
                                    setUserStyle((prev) => {
                                        return {
                                            ...prev!,
                                            textAlignment: "center",
                                        };
                                    });
                                }
                            }}
                            className={`p-2 bg-white dark:bg-gray-700 border ${
                                userStyle?.textAlignment === "center" &&
                                "dark:border-[#AD49E1] border-[#3a00c0]"
                            } rounded-md`}
                        >
                            <FontAwesomeIcon icon={faAlignCenter} />
                        </button>
                        <button
                            onClick={() => {
                                if (userStyle !== undefined) {
                                    setUserStyle((prev) => {
                                        return {
                                            ...prev!,
                                            textAlignment: "right",
                                        };
                                    });
                                }
                            }}
                            className={`p-2 bg-white dark:bg-gray-700 border ${
                                userStyle?.textAlignment === "right" &&
                                "dark:border-[#AD49E1] border-[#3a00c0]"
                            } rounded-md`}
                        >
                            <FontAwesomeIcon icon={faAlignRight} />
                        </button>
                    </div>
                </div>

                {/* Text Color */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                        Text Color
                    </label>
                    <input
                        type="color"
                        defaultValue={
                            recentlySelectedActiveElement?.userStyle
                                .textColor ?? "black"
                        }
                        onChange={(e) => {
                            setUserStyle((prev) => {
                                return { ...prev!, textColor: e.target.value };
                            });
                        }}
                        className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:text-gray-300"
                    />
                </div>

                {/* Font Family Selector */}
                {!element?.customClasses?.includes("spacer-div") && (
                    <div>
                        <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                            Font Family
                        </label>
                        <select
                            className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-gray-300"
                            defaultValue={
                                recentlySelectedActiveElement?.userStyle
                                    .fontFamily ?? "Arial"
                            }
                            onChange={(e) => {
                                setUserStyle((prev) => {
                                    return {
                                        ...prev!,
                                        fontFamily: e.target.value as UserFont,
                                    };
                                });
                            }}
                        >
                            <option value="Sans">Sans</option>
                            <option value="Serif">Serif</option>
                            <option value="Monospace">Monospace</option>
                        </select>
                    </div>
                )}

                {/* Add List Items */}
                {element?.childrenNodeTexts !== undefined && (
                    <div className="relative">
                        <label className="mb-1 font-medium text-gray-700 dark:text-gray-300 flex justify-start place-content-center">
                            List Items{" "}
                        </label>
                        {element.childrenNodeTexts.map((listItem, index) => (
                            <div className="mb-2 grid grid-cols-[85%_15%] grid-rows-1">
                                <input
                                    type="text"
                                    className="h-full whitespace-pre-wrap px-3 gap-1 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-gray-300"
                                    defaultValue={listItem}
                                    onChange={(e) => {
                                        if (element !== null) {
                                            const newListItems = [
                                                ...element.childrenNodeTexts!,
                                            ];
                                            newListItems[index] =
                                                e.currentTarget.value;

                                            updateElement({
                                                ...element,
                                                childrenNodeTexts: newListItems,
                                            });
                                        }
                                    }}
                                />
                                <span
                                    onClick={() => {
                                        if (element !== null) {
                                            const newListItems =
                                                element.childrenNodeTexts?.filter(
                                                    (_, i) => index !== i,
                                                );

                                            updateElement({
                                                ...element,
                                                childrenNodeTexts: newListItems,
                                            });
                                        }
                                    }}
                                    className="h-full flex justify-center items-center cursor-pointer transition-all duration-150 hover:text-gray-600 dark:hover:text-gray-400"
                                >
                                    <Trash />
                                </span>
                            </div>
                        ))}
                        <button
                            onClick={() => {
                                updateElement({
                                    ...element,
                                    childrenNodeTexts: [
                                        ...element.childrenNodeTexts!,
                                        `list item ${element.childrenNodeTexts?.length! + 1}`,
                                    ],
                                });
                            }}
                            className="h-10 mt-4 w-full bg-white dark:bg-gray-700 text-black dark:text-white duration-150 transition-all py-2 px-4 flex items-center justify-center"
                        >
                            <Plus />
                        </button>
                    </div>
                )}
            </div>

            <br />
            {/* Save Button */}
            <button
                onClick={handleSave}
                className="mt-4 w-full bg-[#4A00E0] hover:bg-[#3a00c0] dark:bg-[#7A1CAC] dark:hover:bg-[#AD49E1] text-white py-2 px-4 rounded-md"
            >
                Save
            </button>
        </div>
    );
};

export default Customize;
