import {
    Context,
    ContextInterface,
    DesignerContext,
    DesignerContextInterface,
    HomeContext,
    HomeContextInterface,
} from "@/components/util/context";
import computeHTML from "@/helpers/designer/computeHtml";
import {
    deleteTemplate,
    getAllTemplates,
    updateTemplateById,
} from "@/helpers/generator/getTemplates";
import React, { useContext, useEffect, useState } from "react";
import AnimatedSaveControls from "./elements/EditPanel";

const Canvas: React.FC = () => {
    const context = useContext(Context) as ContextInterface;
    const { localState, userData, cacheLocalState } = context;

    const homeContext = useContext(HomeContext) as HomeContextInterface;
    const { isMenuOpen } = homeContext;
    // const [templateData, setTemplateData] = useState<Array<string>>([]);

    const designerContext = useContext(
        DesignerContext,
    ) as DesignerContextInterface;
    const {
        canvasRef,
        isSidePanelOpen,
        getAllIdentifiersCanvasElements,
        changeAllCanvasElements,
        // triggerIdleToAllCanvasElements,
        canvasElements,
    } = designerContext;

    const [isEditPanelVisible, setIsEditPanelVisible] = useState(false);

    // useEffect(() => {
    //     if (templateData.length > 0) {
    //         const html = computeHTML(canvasRef);
    //         const data = {
    //             id: templateData[0],
    //             name: templateData[1],
    //             data: getAllIdentifiersCanvasElements(),
    //             html: html,
    //             canvasElements: canvasElements,
    //         };
    //         cacheLocalState({
    //             ...localState,
    //             selectedUserTemplateCanvasElements: canvasElements,
    //         });

    //         updateTemplateById(data);
    //     }
    // }, [JSON.stringify(templateData)]);

    function saveCurrentTemplate(templateData: string[]) {
        const html = computeHTML(canvasRef);
        const data = {
            id: templateData[0],
            name: templateData[1],
            data: getAllIdentifiersCanvasElements(),
            html: html,
            canvasElements: canvasElements,
        };

        cacheLocalState({
            ...localState,
            selectedUserTemplateCanvasElements: canvasElements,
        });

        console.log("saving...");

        updateTemplateById(data);
    }

    useEffect(() => {
        if (
            localState.selectedUserTemplate !== undefined &&
            !["document", "paragraph", "report"].includes(
                localState.selectedUserTemplate,
            )
        ) {
            setIsEditPanelVisible(true);
        } else {
            setIsEditPanelVisible(false);
        }
    }, [localState.selectedUserTemplate]);

    useEffect(() => {
        if (
            localState.selectedUserTemplate !== undefined &&
            !["document", "paragraph", "report"].includes(
                localState.selectedUserTemplate,
            )
        ) {
            cacheLocalState({
                ...localState,
                selectedUserTemplateCanvasElements: canvasElements,
            });
        }
    }, [JSON.stringify(canvasElements)]);

    // useEffect(() => {
    //     return () => {
    //         // run on unmount
    //         getAllTemplates(userData?.token!).then((templates) => {
    //             const template = templates.find(
    //                 (template) =>
    //                     template[1] === localState.selectedUserTemplate,
    //             );
    //             if (template !== undefined) {
    //                 // triggerIdleToAllCanvasElements();
    //                 const templateId = template[0];
    //                 const templateName = template[1];
    //                 setTemplateData([templateId, templateName]);
    //             }
    //         });

    //     };
    // }, []);

    function setSelectedTemplate(template: string) {
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
        <div
            // key={JSON.stringify(canvasElements)}
            className={`transition-all ease-in-out duration-300 h-full w-full md:w-screen lg:w-screen overflow-y-scroll flex flex-col select-none ${isMenuOpen ? "translate-x-24" : ""}`}
        >
            {isEditPanelVisible && (
                <AnimatedSaveControls
                    onDelete={() => {
                        getAllTemplates(userData?.token!).then((templates) => {
                            const template = templates.find(
                                (template) =>
                                    template[1] ===
                                    localState.selectedUserTemplate,
                            );
                            if (template !== undefined) {
                                const templateId = template[0];
                                changeAllCanvasElements([]);
                                setSelectedTemplate("document");
                                deleteTemplate(templateId);
                            }
                        });
                    }}
                    onSave={() => {
                        getAllTemplates(userData?.token!).then((templates) => {
                            const template = templates.find(
                                (template) =>
                                    template[1] ===
                                    localState.selectedUserTemplate,
                            );
                            if (template !== undefined) {
                                // triggerIdleToAllCanvasElements();
                                const templateId = template[0];
                                const templateName = template[1];
                                // setTemplateData([templateId, templateName]);
                                saveCurrentTemplate([templateId, templateName]);
                            }
                        });
                    }}
                />
            )}
            <div
                id="canvas"
                ref={canvasRef}
                className={`${isSidePanelOpen ? "border-2 shadow-lg border-[#4A00E0] dark:border-[#7A1CAC]" : ""} h-auto w-full flex-grow`}
            ></div>
        </div>
    );
};

export default Canvas;
