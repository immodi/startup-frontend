import {
    DesignerContext,
    DesignerContextInterface,
} from "@/components/util/context";
import removeByIndex from "@/helpers/designer/removeFromArrayByIndex";
import {
    CANVAS_ELEMENT_TYPES,
    changeCanvasElementType,
    defaultTextCanvasElement,
} from "@/hooks/designer/canvasElementTypeSwaper";
import {
    faAlignCenter,
    faAlignLeft,
    faAlignRight,
    faBold,
    faItalic,
    faUnderline,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ArrowDownWideNarrow, Edit, Info, Plus, Trash } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { CanvasElement, UserFont } from "../elements/CanvasElementsRenderer";

interface Element {
    element: CanvasElement;
}

const SubCustomize: React.FC<Element> = ({ element }) => {
    const designerContext = useContext(
        DesignerContext,
    ) as DesignerContextInterface;
    const { updateSubCanvasElement, updateCanvasElement } = designerContext;
    const [subElement, setSubElement] = useState<CanvasElement | undefined>(
        undefined,
    );
    const [subElementsTypeWindow, setSubElementsTypeWindow] = useState<
        Array<boolean>
    >([]);

    useEffect(() => {
        if (element.childrenNodes !== undefined) {
            setSubElementsTypeWindow(
                Array.from(
                    { length: element.childrenNodes.length },
                    () => false,
                ),
            );
        }
    }, [JSON.stringify(element.childrenNodes)]);

    function mainElementsPanel() {
        return (
            <>
                {element?.childrenNodes !== undefined && (
                    <div className="relative">
                        {element.childrenNodes.map((node, index) => (
                            <div className="mb-2 grid grid-cols-[55%_15%_15%_15%] grid-rows-1">
                                <div className="h-full whitespace-pre-wrap px-3 gap-1 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-gray-300 text-wrap">
                                    {node.text.length <= 15
                                        ? node.text
                                        : node.text.slice(0, 16) + "..."}
                                </div>
                                <span
                                    onClick={() => {
                                        if (node !== null) {
                                            setSubElementsTypeWindow(
                                                subElementsTypeWindow.map(
                                                    (_, i) =>
                                                        index === i
                                                            ? true
                                                            : false,
                                                ),
                                            );
                                        }
                                    }}
                                    className="h-full flex justify-center items-center cursor-pointer transition-all duration-150 hover:text-gray-600 dark:hover:text-gray-400"
                                >
                                    <ArrowDownWideNarrow />
                                </span>
                                <span
                                    onClick={() => {
                                        if (node !== null) {
                                            setSubElement(node);
                                        }
                                    }}
                                    className="h-full flex justify-center items-center cursor-pointer transition-all duration-150 hover:text-gray-600 dark:hover:text-gray-400"
                                >
                                    <Edit />
                                </span>
                                <span
                                    onClick={() => {
                                        if (node !== null) {
                                            updateCanvasElement(element.id, {
                                                ...element,
                                                childrenNodes: removeByIndex(
                                                    element.childrenNodes!,
                                                    index,
                                                ),
                                            });
                                        }
                                    }}
                                    className="h-full flex justify-center items-center cursor-pointer transition-all duration-150 hover:text-gray-600 dark:hover:text-gray-400"
                                >
                                    <Trash />
                                </span>

                                {subElementsTypeWindow[index] && (
                                    <span className="absolute w-full bg-gray-800 text-lg text-gray-300 overflow-scroll flex flex-col justify-center items-center dark:text-gray-900 dark:bg-gray-600 h-fit rounded-md">
                                        {CANVAS_ELEMENT_TYPES.map((type) => {
                                            return (
                                                <div
                                                    onClick={() => {
                                                        setSubElementsTypeWindow(
                                                            subElementsTypeWindow.map(
                                                                () => false,
                                                            ),
                                                        );

                                                        const newSubElement =
                                                            changeCanvasElementType(
                                                                node,
                                                                type,
                                                            );

                                                        updateSubCanvasElement(
                                                            newSubElement!.id,
                                                            {
                                                                ...newSubElement!,
                                                                childrenNodes:
                                                                    element.childrenNodes?.map(
                                                                        (
                                                                            node,
                                                                        ) =>
                                                                            node.id ===
                                                                            newSubElement?.id
                                                                                ? newSubElement
                                                                                : element,
                                                                    ),
                                                            },
                                                        );
                                                    }}
                                                    className="cursor-pointer w-full flex justify-around items-center bg-gray-800 hover:bg-gray-600 text-gray-300 hover:text-gray-200 dark:text-gray-900 hover:dark:text-gray-800 dark:bg-gray-600 hover:dark:bg-gray-500 transition-all"
                                                >
                                                    {type}
                                                </div>
                                            );
                                        })}
                                    </span>
                                )}
                            </div>
                        ))}
                        <button
                            onClick={() => {
                                if (element.childrenNodes !== undefined) {
                                    const newSubElements = [
                                        ...element.childrenNodes,
                                        defaultTextCanvasElement(),
                                    ];

                                    updateCanvasElement(element.id, {
                                        ...element,
                                        childrenNodes: newSubElements,
                                    });
                                }
                            }}
                            className="h-10 mt-4 w-full bg-white dark:bg-gray-700 text-black dark:text-white duration-150 transition-all py-2 px-4 flex items-center justify-center"
                        >
                            <Plus />
                        </button>
                    </div>
                )}
            </>
        );
    }

    function subElementsPanel() {
        if (subElement !== undefined) {
            return (
                <>
                    <h2 className="text-xl text-center font-semibold mb-4 text-gray-800 dark:text-gray-200">
                        Edit Element
                    </h2>
                    <div className="space-y-4">
                        {/* Text */}
                        {!subElement?.customClasses?.includes("spacer-div") && (
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
                                            Describe what you want the AI to
                                            talk about here
                                        </div>
                                    </span>
                                </label>
                                <input
                                    disabled={
                                        subElement?.customClasses?.includes(
                                            "spacer-div",
                                        ) && true
                                    }
                                    type="text"
                                    className="whitespace-pre-wrap w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-gray-300"
                                    defaultValue={subElement?.text ?? ""}
                                    onChange={(e) => {
                                        if (subElement !== null) {
                                            setSubElement({
                                                ...subElement,
                                                childrenNodes: undefined,
                                                childrenNodeTexts: undefined,
                                                tabWidth: undefined,
                                                text: e.target.value,
                                            });
                                        }
                                    }}
                                />
                            </div>
                        )}

                        {/* Identifier */}
                        {!subElement?.customClasses?.includes("spacer-div") && (
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
                                            The main identifier for the node, to
                                            be able to replace it if needed
                                        </div>
                                    </span>
                                </label>
                                <input
                                    disabled={
                                        subElement?.customClasses?.includes(
                                            "spacer-div",
                                        ) && true
                                    }
                                    type="text"
                                    className="whitespace-pre-wrap w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-gray-300"
                                    defaultValue={subElement?.identifier ?? ""}
                                    onInput={(e) => {
                                        e.currentTarget.value =
                                            e.currentTarget.value.replace(
                                                /\s/g,
                                                "",
                                            ); // Remove spaces dynamically
                                    }}
                                    onChange={(e) => {
                                        if (subElement !== null) {
                                            setSubElement({
                                                ...subElement,
                                                childrenNodes: undefined,
                                                childrenNodeTexts: undefined,
                                                tabWidth: undefined,
                                                identifier: e.target.value,
                                            });
                                        }
                                    }}
                                />
                            </div>
                        )}

                        {/* Tab Space */}
                        {subElement?.customClasses?.includes("list") && (
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
                                            How much space to the left of the
                                            list
                                        </div>
                                    </span>
                                </label>
                                <input
                                    type="number"
                                    min="1" // Ensures the number cannot be less than 2
                                    className="whitespace-pre-wrap w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-gray-300 nu"
                                    defaultValue={subElement.tabWidth}
                                    onChange={(e) => {
                                        const value = parseInt(
                                            e.target.value,
                                            10,
                                        );
                                        if (subElement !== null && value >= 1) {
                                            setSubElement({
                                                ...subElement,
                                                childrenNodes: undefined,
                                                childrenNodeTexts: undefined,
                                                tabWidth: value,
                                            });
                                        }
                                    }}
                                />
                            </div>
                        )}

                        {/* Width */}
                        {subElement?.userStyle.width !== undefined && (
                            <div>
                                <label className="mb-1 font-medium text-gray-700 dark:text-gray-300 flex justify-start place-content-center">
                                    Width (%){" "}
                                </label>
                                <input
                                    type="number"
                                    min="1" // Ensures the number cannot be less than 2
                                    className="whitespace-pre-wrap w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-gray-300 nu"
                                    defaultValue={subElement.userStyle.width}
                                    onChange={(e) => {
                                        const value = parseInt(
                                            e.target.value,
                                            10,
                                        );
                                        if (subElement !== null && value >= 1) {
                                            setSubElement({
                                                ...subElement,
                                                childrenNodes: undefined,
                                                childrenNodeTexts: undefined,
                                                tabWidth: undefined,
                                                userStyle: {
                                                    ...subElement.userStyle,
                                                    width: value,
                                                },
                                            });
                                        }
                                    }}
                                />
                            </div>
                        )}

                        {/* Font Styles (Bold, Italic, Underline) */}
                        {!subElement?.customClasses?.includes("spacer-div") && (
                            <div className="">
                                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                                    Font Styles
                                </label>
                                <div className="grid grid-cols-3">
                                    <button
                                        onClick={() => {
                                            if (subElement !== undefined) {
                                                setSubElement({
                                                    ...subElement,
                                                    childrenNodes: undefined,
                                                    childrenNodeTexts:
                                                        undefined,
                                                    tabWidth: undefined,
                                                    userStyle: {
                                                        ...subElement.userStyle,
                                                        isBold: !subElement
                                                            .userStyle.isBold,
                                                    },
                                                });
                                            }
                                        }}
                                        className={`p-2 bg-white dark:bg-gray-700 border 
                                            ${
                                                subElement.userStyle.isBold &&
                                                "dark:border-[#AD49E1] border-[#3a00c0]"
                                            } rounded-md`}
                                    >
                                        <FontAwesomeIcon icon={faBold} />
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (subElement !== undefined) {
                                                setSubElement({
                                                    ...subElement,
                                                    childrenNodes: undefined,
                                                    childrenNodeTexts:
                                                        undefined,
                                                    tabWidth: undefined,
                                                    userStyle: {
                                                        ...subElement.userStyle,
                                                        isItalic:
                                                            !subElement
                                                                .userStyle
                                                                .isItalic,
                                                    },
                                                });
                                            }
                                        }}
                                        className={`p-2 bg-white dark:bg-gray-700 
                                            ${
                                                subElement.userStyle.isItalic &&
                                                "dark:border-[#AD49E1] border-[#3a00c0]"
                                            } border rounded-md`}
                                    >
                                        <FontAwesomeIcon icon={faItalic} />
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (subElement !== undefined) {
                                                setSubElement({
                                                    ...subElement,
                                                    childrenNodes: undefined,
                                                    childrenNodeTexts:
                                                        undefined,
                                                    tabWidth: undefined,
                                                    userStyle: {
                                                        ...subElement.userStyle,
                                                        isUnderline:
                                                            !subElement
                                                                .userStyle
                                                                .isUnderline,
                                                    },
                                                });
                                            }
                                        }}
                                        className={`p-2 bg-white dark:bg-gray-700 
                                            ${
                                                subElement.userStyle
                                                    .isUnderline &&
                                                "dark:border-[#AD49E1] border-[#3a00c0]"
                                            }
                                             border rounded-md`}
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
                                        if (subElement !== undefined) {
                                            setSubElement({
                                                ...subElement,
                                                childrenNodes: undefined,
                                                childrenNodeTexts: undefined,
                                                tabWidth: undefined,
                                                userStyle: {
                                                    ...subElement.userStyle,
                                                    textAlignment: "left",
                                                },
                                            });
                                        }
                                    }}
                                    className={`p-2 bg-white dark:bg-gray-700 border ${
                                        subElement.userStyle.textAlignment ===
                                            "left" &&
                                        "dark:border-[#AD49E1] border-[#3a00c0]"
                                    } rounded-md`}
                                >
                                    <FontAwesomeIcon icon={faAlignLeft} />
                                </button>
                                <button
                                    onClick={() => {
                                        if (subElement !== undefined) {
                                            setSubElement({
                                                ...subElement,
                                                childrenNodes: undefined,
                                                childrenNodeTexts: undefined,
                                                tabWidth: undefined,
                                                userStyle: {
                                                    ...subElement.userStyle,
                                                    textAlignment: "center",
                                                },
                                            });
                                        }
                                    }}
                                    className={`p-2 bg-white dark:bg-gray-700 border ${
                                        subElement.userStyle.textAlignment ===
                                            "center" &&
                                        "dark:border-[#AD49E1] border-[#3a00c0]"
                                    } rounded-md`}
                                >
                                    <FontAwesomeIcon icon={faAlignCenter} />
                                </button>
                                <button
                                    onClick={() => {
                                        if (subElement !== undefined) {
                                            setSubElement({
                                                ...subElement,
                                                childrenNodeTexts: undefined,
                                                tabWidth: undefined,
                                                childrenNodes: undefined,
                                                userStyle: {
                                                    ...subElement.userStyle,
                                                    textAlignment: "right",
                                                },
                                            });
                                        }
                                    }}
                                    className={`p-2 bg-white dark:bg-gray-700 border ${
                                        subElement.userStyle.textAlignment ===
                                            "right" &&
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
                                    subElement?.userStyle.textColor ?? "black"
                                }
                                onChange={(e) => {
                                    if (subElement !== undefined) {
                                        setSubElement({
                                            ...subElement,
                                            childrenNodes: undefined,
                                            childrenNodeTexts: undefined,
                                            tabWidth: undefined,
                                            userStyle: {
                                                ...subElement.userStyle,
                                                textColor: e.target.value,
                                            },
                                        });
                                    }
                                }}
                                className="w-full p-2 border rounded-md bg-white dark:bg-gray-700 dark:text-gray-300"
                            />
                        </div>

                        {/* Font Family Selector */}
                        {!subElement?.customClasses?.includes("spacer-div") && (
                            <div>
                                <label className="block mb-1 font-medium text-gray-700 dark:text-gray-300">
                                    Font Family
                                </label>
                                <select
                                    className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-gray-300"
                                    defaultValue={
                                        subElement?.userStyle.fontFamily ??
                                        "Arial"
                                    }
                                    onChange={(e) => {
                                        if (subElement !== undefined) {
                                            setSubElement({
                                                ...subElement,
                                                childrenNodes: undefined,
                                                childrenNodeTexts: undefined,
                                                tabWidth: undefined,
                                                userStyle: {
                                                    ...subElement.userStyle,
                                                    fontFamily: e.target
                                                        .value as UserFont,
                                                },
                                            });
                                        }
                                    }}
                                >
                                    <option value="Sans">Sans</option>
                                    <option value="Serif">Serif</option>
                                    <option value="Monospace">Monospace</option>
                                </select>
                            </div>
                        )}

                        {/* Add List Items */}
                        {subElement?.childrenNodeTexts !== undefined && (
                            <div className="relative">
                                <label className="mb-1 font-medium text-gray-700 dark:text-gray-300 flex justify-start place-content-center">
                                    List Items{" "}
                                </label>
                                {subElement.childrenNodeTexts.map(
                                    (listItem, index) => (
                                        <div className="mb-2 grid grid-cols-[85%_15%] grid-rows-1">
                                            <input
                                                type="text"
                                                className="h-full whitespace-pre-wrap px-3 gap-1 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-gray-300"
                                                defaultValue={listItem}
                                                onChange={(e) => {
                                                    if (subElement !== null) {
                                                        const newListItems = [
                                                            ...subElement.childrenNodeTexts!,
                                                        ];
                                                        newListItems[index] =
                                                            e.currentTarget.value;

                                                        setSubElement({
                                                            ...subElement,
                                                            childrenNodes:
                                                                undefined,
                                                            tabWidth: undefined,
                                                            childrenNodeTexts:
                                                                newListItems,
                                                        });
                                                    }
                                                }}
                                            />
                                            <span
                                                onClick={() => {
                                                    if (subElement !== null) {
                                                        const newListItems =
                                                            subElement.childrenNodeTexts?.filter(
                                                                (_, i) =>
                                                                    index !== i,
                                                            );

                                                        setSubElement({
                                                            ...subElement,
                                                            childrenNodes:
                                                                undefined,
                                                            tabWidth: undefined,
                                                            childrenNodeTexts:
                                                                newListItems,
                                                        });
                                                    }
                                                }}
                                                className="h-full flex justify-center items-center cursor-pointer transition-all duration-150 hover:text-gray-600 dark:hover:text-gray-400"
                                            >
                                                <Trash />
                                            </span>
                                        </div>
                                    ),
                                )}
                                <button
                                    onClick={() => {
                                        setSubElement({
                                            ...subElement,
                                            childrenNodes: undefined,
                                            tabWidth: undefined,
                                            childrenNodeTexts: [
                                                ...subElement.childrenNodeTexts!,
                                                `list item ${subElement.childrenNodeTexts?.length! + 1}`,
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
                </>
            );
        }
    }

    function handleSave() {
        updateSubCanvasElement(subElement!.id, subElement!);

        setSubElement(undefined);
    }

    return (
        <div
            key={subElement?.id ?? element.id}
            className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md w-full h-full overflow-y-scroll"
        >
            {subElement !== undefined
                ? subElementsPanel()
                : mainElementsPanel()}
        </div>
    );
};

export default SubCustomize;
