import {
    SidelPanelContextInterface,
    SidePanelContext,
} from "@/components/util/context";
import {
    faBold,
    faItalic,
    faUnderline,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect, useRef, useState } from "react";
import { CanvasElement } from "../elements/CanvasElementsRenderer";

const Customize: React.FC = () => {
    const sidePanelContext = useContext(
        SidePanelContext,
    ) as SidelPanelContextInterface;
    const {
        recentlySelectedActiveElement,
        updateCanvasElement,
        // currentEditableIndexInCanvasElements,
    } = sidePanelContext;

    const [element, setElement] = useState(recentlySelectedActiveElement);
    const [key, setKey] = useState(getRandomKey());

    function getRandomKey(): number {
        return Math.floor(Math.random() * Math.pow(9, 99));
    }

    useEffect(() => {
        setKey(getRandomKey());
    }, [recentlySelectedActiveElement, recentlySelectedActiveElement?.text]);

    function handleChange(newElement: CanvasElement) {
        setElement(newElement);
    }

    function handleSave() {
        if (element !== null) {
            setKey(getRandomKey());
            updateCanvasElement(element.id, { ...element, selectMode: "idle" });
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
                        className="w-full px-3 py-2 border rounded-md bg-white dark:bg-gray-700 dark:text-gray-300"
                        defaultValue={recentlySelectedActiveElement?.text ?? ""}
                        onChange={(e) => {
                            handleChange({ ...element!, text: e.target.value });
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
                            // onClick={() =>
                            // handleChange("isBold", !element?.isBold)
                            // }
                            className={`p-2 ${recentlySelectedActiveElement?.userStyle.isBold ? "bg-gray-600" : "bg-gray-900"} border rounded-md`}
                        >
                            <FontAwesomeIcon icon={faBold} />
                        </button>
                        <button
                            // onClick={() =>
                            // handleChange("isItalic", !element.isItalic)
                            // }
                            className={`p-2 ${recentlySelectedActiveElement?.userStyle.isItalic ? "bg-gray-600" : "bg-gray-900"} border rounded-md`}
                        >
                            <FontAwesomeIcon icon={faItalic} />
                        </button>
                        <button
                            // onClick={() =>
                            // handleChange(
                            //     "isUnderline",
                            //     !element.isUnderline,
                            // )
                            // }
                            className={`p-2 ${recentlySelectedActiveElement?.userStyle.isUnderline ? "bg-gray-600" : "bg-gray-900"} border rounded-md`}
                        >
                            <FontAwesomeIcon icon={faUnderline} />
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
                        // onChange={(e) =>
                        // handleChange("textColor", e.target.value)
                        // }
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
                        // onChange={(e) =>
                        //     handleChange("fontFamily", e.target.value)
                        // }
                    >
                        <option value="Arial">Arial</option>
                        <option value="Verdana">Verdana</option>
                        <option value="Georgia">Georgia</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Courier New">Courier New</option>
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
