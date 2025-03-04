import {
    Context,
    ContextInterface,
    DesignerContext,
    DesignerContextInterface,
} from "@/components/util/context";
import computeHTML from "@/helpers/designer/computeHtml";
import {
    createTemplate,
    getAllTemplates,
    getTemplateDataById,
} from "@/helpers/generator/getTemplates";
import { CardProps } from "@/interfaces/designer/cardsProps";
import { TemplateData } from "@/interfaces/designer/exportTemplateData";
import { CheckCircle2, Plus } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import { CanvasElement } from "../elements/CanvasElementsRenderer";

const Export: React.FC = () => {
    const context = useContext(Context) as ContextInterface;
    const { localState, cacheLocalState } = context;
    const designerContext = useContext(
        DesignerContext,
    ) as DesignerContextInterface;
    const {
        canvasRef,
        saveModelName,
        openSaveModal,
        // triggerIdleToAllCanvasElements,
        getAllIdentifiersCanvasElements,
        canvasElements,

        changeAllCanvasElements,
    } = designerContext;

    const [exporting, setExporting] = useState(false);

    const [templateData, setTemplateData] = useState<TemplateData>({
        id: "",
        name: "",
        data: getAllIdentifiersCanvasElements(),
        html: "",
        canvasElements: [],
    });

    const [cards, setCards] = useState<Array<CardProps>>([]);

    useEffect(() => {
        const token = context.userData?.token;

        try {
            getAllTemplates(token ?? "").then((templates) => {
                setCards(
                    templates.splice(3).map((template, i) => ({
                        id: template[0],
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
    }, [canvasElements.length]);

    useEffect(() => {
        if (saveModelName !== "") {
            addCard(templateData.id, saveModelName);
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
                createTemplate(templateData, cards);
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
            getTemplateDataById(newCards[index].id).then((templateData) => {
                const canvasElements: CanvasElement[] =
                    templateData["canvas_elements"];
                changeAllCanvasElements(canvasElements);
            });
            setSelectedTemplate(newCards[index].name);
        } else {
            setSelectedTemplate("document");
        }

        setCards(newCards); // Update the state with the modified array
    }

    function addCard(cardId: string, cardName: string) {
        const newCards = [...cards];
        newCards.forEach((card) => {
            if (card.checked) card.checked = false;
        });
        newCards.push({
            id: cardId,
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
                        id={card.id}
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
                    // triggerIdleToAllCanvasElements();
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

export default Export;
