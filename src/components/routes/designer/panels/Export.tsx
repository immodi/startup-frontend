import {
    Context,
    ContextInterface,
    DesignerContext,
    DesignerContextInterface,
    SidelPanelContextInterface,
    SidePanelContext,
} from "@/components/util/context";
import {
    createTemplate,
    getAllTemplates,
} from "@/helpers/generator/getTemplates";
import { TemplateData } from "@/interfaces/designer/exportTemplateData";
import { CheckCircle2, Plus } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";

interface CardProps {
    name: string;
    checked: boolean;
    toggleCheckMark: () => void;
}

const Export: React.FC = () => {
    const context = useContext(Context) as ContextInterface;
    const { localState, cacheLocalState } = context;
    const designerContext = useContext(
        DesignerContext,
    ) as DesignerContextInterface;
    const { canvasRef, saveModelName, openSaveModal } = designerContext;
    const sidePanelContext = useContext(
        SidePanelContext,
    ) as SidelPanelContextInterface;
    const {
        triggerIdleToAllCanvasElements,
        getAllIdentifiersCanvasElements,
        canvasElements,
        // changeAllCanvasElements,
    } = sidePanelContext;

    const [exporting, setExporting] = useState(false);

    const [templateData, setTemplateData] = useState<TemplateData>({
        name: "",
        data: getAllIdentifiersCanvasElements(),
        html: "",
        canvasElements: [],
    });

    const [cards, setCards] = useState<Array<CardProps>>([]);
    // Array.from({ length: 3 }).map((_, i) => ({
    //     name: `Test ${i}`,
    //     checked: false,
    //     toggleCheckMark: () => {
    //         updateCardByIndex(i);
    //     },
    // })),

    useEffect(() => {
        const token = context.userData?.token;

        try {
            getAllTemplates(token ?? "").then((templates) => {
                setCards(
                    templates.splice(3).map((template, i) => ({
                        name: template[1],
                        checked:
                            localState.selectedUserTemplate === template[1]
                                ? true
                                : false,
                        toggleCheckMark: () => {
                            updateCardByIndex(i);
                        },
                    })),
                );
            });
        } catch (error) {
            setCards([]);
        }
    }, []);

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
            setTemplateData({
                ...templateData,
                html: html,
                canvasElements: canvasElements,
            });
        }

        setExporting(false);
    }, [exporting]);

    useEffect(() => {
        if (templateData.name !== "" && templateData.html !== "") {
            setTimeout(() => {
                // console.log(templateData);
                createTemplate(templateData);
            }, 10);
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

        if (newCards[index].checked) {
            setSelectedTemplate(newCards[index].name);
        } else {
            setSelectedTemplate("document");
        }

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

        setSelectedTemplate(cardName);
        setCards(newCards);
    }

    function setSelectedTemplate(template: string) {
        // setSelectedTemplate(template);
        cacheLocalState({
            ...localState,
            generator: {
                ...localState.generator,
                selectedTemplate: template,
            },
            selectedUserTemplate: template,
        });
    }

    return (
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md shadow-md w-full h-full overflow-y-auto grid grid-cols-1 gap-4 grid-rows-auto content-baseline">
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
                className={`w-full h-36 my-2 text-gray-700 dark:text-gray-300 bg-gray-300 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 select-none transition-all duration-150 rounded-md flex justify-center items-center text-7xl font-bold cursor-pointer relative`}
            >
                <Plus className="w-12 h-12" />
            </div>
        </div>
    );
};

const Card: React.FC<CardProps> = ({ name, checked, toggleCheckMark }) => {
    return (
        <div
            className={`w-full h-36 my-2 text-gray-700 dark:text-gray-300 bg-gray-300 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-700 select-none transition-all duration-150 rounded-md flex justify-center items-center text-4xl font-bold cursor-pointer relative ${checked && "border-4 shadow-md dark:border-[white] border-gray-900"}`}
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
