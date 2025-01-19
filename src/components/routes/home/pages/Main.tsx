import { getAllTemplates } from "@/helpers/generator/getTemplates";
import React, { useContext, useEffect, useState } from "react";
import {
    Context,
    ContextInterface,
    GeneratorContext,
    GeneratorContextInterface,
    HomeContext,
    HomeContextInterface,
} from "@/components/util/context";
import ErrorDialog from "./main_components/ErrorDialog";
import KeyValuePopUp from "./main_components/KeyValuePopUp";
import Modal from "./main_components/Modal";
import MainContent from "./main_components/MainContent";
// import NotLoggedInErrorDialog from "./main_components/NotLoggedInErrorDialog";
import { Template } from "@/interfaces/generator/template";

const Main: React.FC = () => {
    const context = useContext(Context) as ContextInterface;
    const authed = context.localState.authed;
    const { localState, cacheLocalState } = context;
    const homeContext = useContext(HomeContext) as HomeContextInterface;
    const { isMenuOpen } = homeContext;

    const token = context.userData?.token;
    const [templates, setTemplates] = useState<Array<Template>>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isKeyValuePopupOpen, setIsKeyValuePopupOpen] = useState(false);
    const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (authed) {
            getAllTemplates(token ?? "")
                .then((res) => {
                    // setTemplates([
                    //     res.map((item) => item[1])[0],
                    //     res.map((item) => item[1])[1],
                    //     res.map((item) => item[1])[3],
                    // ]);
                    setTemplates(
                        res.map((item) => {
                            return {
                                id: item[0],
                                name: item[1],
                            };
                        }),
                    );
                })
                .catch(() => {
                    setTemplates([
                        {
                            id: "",
                            name: "document",
                        },
                        {
                            id: "",
                            name: "paragraph",
                        },
                        {
                            id: "",
                            name: "report",
                        },
                    ]);
                });
        }
    }, [authed]);

    function setCurrentSelectedTemplate(template: string) {
        // setSelectedTemplate(template);
        cacheLocalState({
            ...localState,
            generator: {
                ...localState.generator,
                selectedTemplate: template,
            },
            selectedUserTemplate: undefined,
        });
    }

    function setCurrentVocabulary(vocabulary: number) {
        cacheLocalState({
            ...localState,
            generator: {
                ...localState.generator,
                vocabulary: vocabulary,
            },
        });
    }

    function setCurrentErrorMessage(errorMessage: string) {
        setErrorMessage(errorMessage);
    }

    function setIsCurrentModalOpen(isModalOpen: boolean) {
        setIsModalOpen(isModalOpen);
    }

    function setIsCurrentKeyValuePopupOpen(isKeyValuePopupOpen: boolean) {
        setIsKeyValuePopupOpen(isKeyValuePopupOpen);
    }

    function setIsCurrentErrorDialogOpen(isErrorDialogOpen: boolean) {
        setIsErrorDialogOpen(isErrorDialogOpen);
    }

    function setIsCurrentLoading(isLoading: boolean) {
        setIsLoading(isLoading);
    }

    function setCurrentUserTemplateData(userTemplateData: Map<string, string>) {
        cacheLocalState({
            ...localState,
            generator: {
                ...localState.generator,
                userTemplateData: userTemplateData,
            },
        });
    }

    function setCurrentTopic(topic: string) {
        cacheLocalState({
            ...localState,
            generator: {
                ...localState.generator,
                topic: topic,
            },
        });
    }

    const generatorContext: GeneratorContextInterface = {
        templates: templates,
        isLoading: isLoading,
        token: token ?? "",
        errorMessage: errorMessage,

        setIsLoading: setIsCurrentLoading,
        setSelectedTemplate: setCurrentSelectedTemplate,
        setVocabulary: setCurrentVocabulary,
        setErrorMessage: setCurrentErrorMessage,
        setIsModalOpen: setIsCurrentModalOpen,
        setIsKeyValuePopupOpen: setIsCurrentKeyValuePopupOpen,
        setIsErrorDialogOpen: setIsCurrentErrorDialogOpen,
        setUserTemplateData: setCurrentUserTemplateData,
        setTopic: setCurrentTopic,
    };

    return (
        <GeneratorContext.Provider value={generatorContext}>
            <div
                className={`flex ${isMenuOpen && "translate-x-24"} bg-gray-100 dark:bg-gray-800 transition-all duration-300 flex-grow items-center justify-center p-5 min-h-fit`}
            >
                <MainContent />

                {isKeyValuePopupOpen && <KeyValuePopUp />}

                {isModalOpen && <Modal />}

                {isErrorDialogOpen && <ErrorDialog />}

                {/* {!authed && <NotLoggedInErrorDialog />} */}
            </div>
        </GeneratorContext.Provider>
    );
};

export default Main;
