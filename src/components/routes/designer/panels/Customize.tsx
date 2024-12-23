import {
    SidelPanelContextInterface,
    SidePanelContext,
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
import React, { useContext, useEffect, useState } from "react";
import {
    CanvasElement,
    CanvasElementStyles,
    UserFont,
} from "../elements/CanvasElementsRenderer";

const Customize: React.FC = () => {
    const sidePanelContext = useContext(
        SidePanelContext,
    ) as SidelPanelContextInterface;
    const {
        recentlySelectedActiveElement,
        updateCanvasElement,
        // currentEditableIndexInCanvasElements,
    } = sidePanelContext;

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

    function handleChange(newElement: CanvasElement) {
        setElement(newElement);
    }

    function handleSave() {
        if (element !== null && userStyle !== undefined) {
            setKey(getRandomKey());
            updateCanvasElement(element.id, {
                ...element,
                selectMode: "idle",
                userStyle: userStyle,
            });
        }
    }

    return (
        <div
            key={key}
            className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md w-full h-full overflow-y-scroll"
        >
            <h2 className="text-xl text-center font-semibold mb-4 text-gray-800 dark:text-gray-200">
                Edit Element
            </h2>
            <div className="space-y-4">
                {/* Text */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                        Text
                    </label>
                    <input
                        type="text"
                        className="whitespace-pre-wrap w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-gray-300"
                        defaultValue={recentlySelectedActiveElement?.text ?? ""}
                        onChange={(e) => {
                            if (element !== null) {
                                handleChange({
                                    ...element,
                                    text: e.target.value,
                                });
                            }
                        }}
                    />
                </div>
                {/* Font Styles (Bold, Italic, Underline) */}
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
                            className={`p-2 bg-gray-900 border ${userStyle?.isBold && "border-purple-500"} rounded-md`}
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
                            className={`p-2 bg-gray-900 ${userStyle?.isItalic && "border-purple-500"} border rounded-md`}
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
                            className={`p-2 bg-gray-900 ${userStyle?.isUnderline && "border-purple-500"} border rounded-md`}
                        >
                            <FontAwesomeIcon icon={faUnderline} />
                        </button>
                    </div>
                </div>

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
                            className={`p-2 bg-gray-900 border ${
                                userStyle?.textAlignment === "left" &&
                                "border-purple-500"
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
                            className={`p-2 bg-gray-900 border ${
                                userStyle?.textAlignment === "center" &&
                                "border-purple-500"
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
                            className={`p-2 bg-gray-900 border ${
                                userStyle?.textAlignment === "right" &&
                                "border-purple-500"
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
            </div>

            {/* Save Button */}
            <button
                onClick={handleSave}
                className="mt-4 w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600"
            >
                Save
            </button>
        </div>
    );
};

export default Customize;
