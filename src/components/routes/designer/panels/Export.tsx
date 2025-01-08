import {
    Context,
    ContextInterface,
    DesignerContext,
    DesignerContextInterface,
    HomeContext,
    HomeContextInterface,
    SidelPanelContextInterface,
    SidePanelContext,
} from "@/components/util/context";
import { CheckCircle2 } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";

interface TemplateData {
    name: string;
    data: Array<string>;
    html: string;
}

interface CardProps {
    name: string;
    checked: boolean;
    toggleCheckMark: () => void;
}

const Export: React.FC = () => {
    const context = useContext(Context) as ContextInterface;
    const homeContext = useContext(HomeContext) as HomeContextInterface;
    const isDarkMode = context.localState.isDarkMode;
    const { navigateTo } = homeContext;
    const designerContext = useContext(
        DesignerContext,
    ) as DesignerContextInterface;
    const { canvasRef, saveModelName, openSaveModal } = designerContext;
    const sidePanelContext = useContext(
        SidePanelContext,
    ) as SidelPanelContextInterface;
    const { triggerIdleToAllCanvasElements, getAllIdentifiersCanvasElements } =
        sidePanelContext;

    const [exporting, setExporting] = useState(false);

    const [templateData, setTemplateData] = useState<TemplateData>({
        name: "",
        data: getAllIdentifiersCanvasElements(),
        html: "",
    });

    const [cards, setCards] = useState<Array<CardProps>>(
        Array.from({ length: 3 }).map((_, i) => ({
            name: `Test ${i}`,
            checked: false,
            toggleCheckMark: () => {
                updateCardByIndex(i);
            },
        })),
    );

    useEffect(() => {
        if (saveModelName !== "") {
            addCard(saveModelName);
            setTemplateData({
                ...templateData,
                name: saveModelName,
                data: getAllIdentifiersCanvasElements(),
            });
        }
    }, [saveModelName]);

    useEffect(() => {
        if (exporting) {
            const html = computeHTML(canvasRef);
            // the export is here for some reason
            setTemplateData({ ...templateData, html: html });
        }

        setExporting(false);
    }, [exporting]);

    useEffect(() => {
        if (templateData.name !== "" && templateData.html !== "") {
            console.log(templateData);
            navigateTo("home");
        }
    }, [templateData.html, templateData.name]);

    function updateCardByIndex(index: number) {
        const newCards = Array.from(cards); // Create a copy of the cards array
        newCards.forEach((card, i) => {
            if (card.checked && i !== index) card.checked = false;
        });
        newCards[index] = {
            ...newCards[index],
            checked: !newCards[index].checked, // Toggle the checked value
        };
        setCards(newCards); // Update the state with the modified array
    }

    function addCard(cardName: string) {
        const newCards = [...cards];
        newCards.forEach((card) => {
            if (card.checked) card.checked = false;
        });
        newCards.push({
            name: cardName,
            checked: true,
            toggleCheckMark: () => {
                updateCardByIndex(newCards.length);
            },
        });

        setCards(newCards);
    }

    return (
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md w-full h-full overflow-y-auto grid grid-cols-1 gap-4 grid-rows-auto">
            {cards.map((card, i) => {
                return (
                    <Card
                        name={card.name}
                        key={i}
                        checked={card.checked}
                        toggleCheckMark={() => updateCardByIndex(i)}
                    />
                );
            })}

            <div
                onClick={() => {
                    setExporting(true);
                    triggerIdleToAllCanvasElements();
                    openSaveModal();
                }}
                className={`w-full h-36 my-2 bg-red-300 hover:bg-red-500 select-none transition-all duration-100 rounded-md flex justify-center items-center text-7xl font-bold cursor-pointer relative`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="white"
                    className={`w-12 h-12 ${isDarkMode ? "text-[#AD49E1]" : "text-[#4A00E0]"}`}
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
    );
};

const Card: React.FC<CardProps> = ({ name, checked, toggleCheckMark }) => {
    return (
        <div
            className={`w-full h-36 my-2 bg-red-300 hover:bg-red-500 select-none transition-all duration-100 rounded-md flex justify-center items-center text-7xl font-bold cursor-pointer relative ${checked && "border-4 shadow-md border-gray-700"}`}
            onClick={toggleCheckMark}
        >
            {name}
            {checked && (
                <span className="check-mark absolute bottom-2 right-2 text-xl">
                    <CheckCircle2 />
                </span>
            )}
        </div>
    );
};

function computeHTML(elementRef: React.RefObject<HTMLDivElement>): string {
    if (!elementRef.current) return "";

    const element = elementRef.current;
    const clonedElement = element.cloneNode(true) as HTMLElement;
    clonedElement.style.backgroundColor = "#FFFFFF";

    Array.from(clonedElement.children).forEach((canvasElement) => {
        if (canvasElement.classList.contains("spacer-div")) {
            canvasElement.innerHTML = "<br />";
        }

        Array.from(canvasElement.children).forEach((canvasElementChild) => {
            if (
                canvasElementChild.classList.contains("remove-this-at-export")
            ) {
                canvasElementChild.remove();
            }
        });
    });

    const cssStyles = Array.from(document.head.getElementsByTagName("style"))
        .map((style) => style.innerHTML)
        .join("");

    const styleElement = document.createElement("style");
    styleElement.innerHTML = cssStyles;

    clonedElement.appendChild(styleElement);
    return clonedElement.outerHTML;
}

export default Export;
