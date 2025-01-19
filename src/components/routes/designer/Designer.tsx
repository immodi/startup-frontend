import {
    Context,
    ContextInterface,
    DesignerContext,
    DesignerContextInterface,
} from "@/components/util/context";
import SwipeDetector from "@/helpers/designer/swipeDetector";
import {
    getAllTemplates,
    getTemplateDataById,
} from "@/helpers/generator/getTemplates";
import { ArrowBigLeft, ArrowBigUp } from "lucide-react";
import React, { useContext, useEffect, useRef, useState } from "react";
import Canvas from "./Canvas";
import {
    CanvasElement,
    SelectionNodeModes,
} from "./elements/CanvasElementsRenderer";
import { SaveDesignModal } from "./elements/SaveDesignModal";
import SidePanel from "./SidePanel";

const Designer: React.FC = () => {
    const [isSidePanelOpen, setIsSidePanelOpen] = useState<boolean>(false);
    const [panelDisplay, setPanelDisplay] = useState<"grid" | "hidden">(
        "hidden",
    );
    const context = useContext(Context) as ContextInterface;
    const { localState, userData } = context;
    // const authed = context.localState.authed;

    const canvasRef = useRef<HTMLDivElement>(null);
    const designerRef = useRef<HTMLDivElement>(null);
    const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
    const [saveModelName, setSaveModalName] = useState("");

    const [canvasElements, setCanvasElements] = useState<CanvasElement[]>([]);
    const [
        currentEditableIndexInCanvasElements,
        setCurrentEditableIndexInCanvasElements,
    ] = useState<number | undefined>();

    function getCanvasElementByIndex(index: number): CanvasElement | null {
        if (index > canvasElements.length - 1 || canvasElements.length === 0) {
            return null;
        }

        return canvasElements[index];
    }

    useEffect(() => {
        if (
            localState.selectedUserTemplate !== undefined &&
            !["document", "paragraph", "report"].includes(
                localState.selectedUserTemplate,
            )
        ) {
            getAllTemplates(userData?.token!).then((templates) => {
                const template = templates.find(
                    (template) =>
                        template[1] === localState.selectedUserTemplate,
                );
                if (template !== undefined) {
                    const templateId = template[0];
                    getTemplateDataById(templateId).then((templateData) => {
                        const canvasElements: CanvasElement[] =
                            templateData["canvas_elements"];
                        changeAllCanvasElements(canvasElements);
                    });
                }
            });
        }
    }, []);

    function addCanvasElement(element: CanvasElement) {
        const elements = structuredClone(canvasElements);
        elements.push(element);

        setCanvasElements(elements);
    }

    function removeCanvasElement(elementIndex: number) {
        const newElements = canvasElements.filter((_, index) => {
            return index !== elementIndex;
        });

        setCanvasElements(newElements);
    }

    function updateCanvasElementByItsId(
        elementId: number,
        newElement: {
            text?: string;
            customClasses?: string;
            selectMode?: SelectionNodeModes;
        },
    ) {
        setCanvasElements((prevElements) =>
            prevElements.map((element) =>
                element.id === elementId
                    ? {
                          ...element,
                          ...newElement,
                      }
                    : element,
            ),
        );
    }

    function changeAllCanvasElements(newCanvasElements: CanvasElement[]) {
        setCanvasElements([...newCanvasElements]);
    }

    function triggerIdleToAllCanvasElements() {
        // toggleSidePanel(false);
        // toggleSidePanelState(false);

        canvasElements.forEach((element) => {
            if (element.selectMode !== "idle") {
                updateCanvasElementByItsId(element.id, {
                    ...element,
                    selectMode: "idle",
                });
            }
        });
    }

    function getAllIdentifiersCanvasElements(): Array<string> {
        const templateData = new Array<string>();
        canvasElements.forEach((element) => {
            if (element.identifier !== null)
                templateData.push(element.identifier);
        });

        return templateData;
    }

    function updateSubCanvasElement(
        subElementId: number,
        newSubElement: CanvasElement,
    ) {
        let found = false;
        const newCanvasElements = canvasElements.map((element) => {
            if (found || !element.childrenNodes) {
                return element;
            }

            const updatedChildrenNodes = element.childrenNodes.map(
                (node, _) => {
                    if (!found && node.id === subElementId) {
                        found = true;
                        return newSubElement;
                    }
                    return node;
                },
            );

            if (found) {
                return {
                    ...element,
                    childrenNodes: updatedChildrenNodes,
                };
            }
            return element;
        });

        setCanvasElements(newCanvasElements);
    }

    function updateCurrentEditableIndex(index: number) {
        if (index > canvasElements.length - 1 || canvasElements.length === 0) {
            return;
        }

        setCurrentEditableIndexInCanvasElements(index);
    }

    function toggleSidePanel(state: boolean) {
        setIsSidePanelOpen(state);
    }

    function changePanelDisplay(state: "grid" | "hidden") {
        setPanelDisplay(state);
    }

    function toggleSidePanelState(state: boolean) {
        if (state) {
            changePanelDisplay("grid");
        } else {
            changePanelDisplay("hidden");
        }

        setTimeout(() => {
            toggleSidePanel(state);
        }, 10);
    }

    function openSaveModal() {
        setIsSaveModalOpen(true);
    }

    const designerContext: DesignerContextInterface = {
        canvasRef: canvasRef,
        designerRef: designerRef,
        isSidePanelOpen: isSidePanelOpen,
        panelDisplay: panelDisplay,
        saveModelName: saveModelName,
        toggleSidePanel: toggleSidePanel,
        changePanelDisplay: changePanelDisplay,
        toggleSidePanelState: toggleSidePanelState,
        openSaveModal: openSaveModal,

        addCanvasElement: addCanvasElement,
        removeCanvasElement: removeCanvasElement,
        updateCanvasElement: updateCanvasElementByItsId,
        triggerIdleToAllCanvasElements: triggerIdleToAllCanvasElements,
        canvasElements: canvasElements,
        currentEditableIndexInCanvasElements:
            currentEditableIndexInCanvasElements,
        recentlySelectedActiveElement: getCanvasElementByIndex(
            currentEditableIndexInCanvasElements ?? 0,
        ),
        getAllIdentifiersCanvasElements: getAllIdentifiersCanvasElements,
        changeAllCanvasElements: changeAllCanvasElements,
        updateCanvasElementByItsId: updateCanvasElementByItsId,
        updateCurrentEditableIndex: updateCurrentEditableIndex,
        updateSubCanvasElement: updateSubCanvasElement,
        // changeSaveDesignModal: changeSaveDesignModal,
    };

    return (
        <DesignerContext.Provider value={designerContext}>
            <div className="w-full h-full bg-gray-100 dark:bg-gray-700 relative flex items-center justify-center overflow-hidden">
                {/* {!authed ? (
                    <NotLoggedInErrorDialog />
                ) : (
                    
                )} */}
                <>
                    <div
                        id="elementHiddenOverlay"
                        ref={designerRef}
                        className="absolute w-screen h-screen"
                    ></div>
                    <SwipeDetector
                        onSwipeUp={() => {
                            toggleSidePanelState(true);
                        }}
                    />
                    <ArrowBigUp
                        onClick={() => {
                            toggleSidePanelState(true);
                        }}
                        className={`${isSidePanelOpen ? "hidden" : "absolute"} w-10 h-10 right-[45%] bottom-0 z-10 transition-all ease-in-out duration-300 cursor-pointer bg-[#4A00E0] hover:bg-[#3a00c0] dark:bg-[#7A1CAC] dark:hover:bg-[#AD49E1] text-white rounded-full md:hidden lg:hidden`}
                    />

                    <ArrowBigLeft
                        onClick={() => {
                            toggleSidePanelState(true);
                        }}
                        className={`w-10 h-10 right-0 z-10 transition-all ease-in-out duration-300 cursor-pointer bg-[#4A00E0] hover:bg-[#3a00c0] dark:bg-[#7A1CAC] dark:hover:bg-[#AD49E1] text-white rounded-full hidden ${isSidePanelOpen ? "" : "absolute md:block lg:block"}`}
                    />

                    <Canvas />
                    <SidePanel />

                    <SaveDesignModal
                        isOpen={isSaveModalOpen}
                        onClose={() => {
                            setIsSaveModalOpen(false);
                        }}
                        handleSubmit={setSaveModalName}
                    />
                </>
            </div>
        </DesignerContext.Provider>
    );
};

export default Designer;
