import { getAllTemplates } from "@/helpers/getTemplates";
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
import NotLoggedInErrorDialog from "./main_components/NotLoggedInErrorDialog";

const Main: React.FC = () => {
    const context = useContext(Context) as ContextInterface;
    const homeContext = useContext(HomeContext) as HomeContextInterface;

    const { localState, cacheLocalState } = context;
    const authed = context.localState.authed;
    const { isMenuOpen } = homeContext;

    const token = context.userData?.token;
    const [templates, setTemplates] = useState<Array<string>>([]);
    // const [selectedTemplate, setSelectedTemplate] = useState<string>(
    //     localState.generator.selectedTemplate,
    // );
    const [isLoading, setIsLoading] = useState(false);
    // const [topic, setTopic] = useState(localState.generator.topic);
    // const [vocabulary, setVocabulary] = useState(
    //     localState.generator.vocabulary,
    // );
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isKeyValuePopupOpen, setIsKeyValuePopupOpen] = useState(false);
    // const [userTemplateData, setUserTemplateData] = useState<
    //     Map<string, string>
    // >(localState.generator.userTemplateData);
    const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // useEffect(() => console.log(localState), [localState]);

    useEffect(() => {
        if (authed) {
            getAllTemplates(token ?? "")
                .then((res) => {
                    setTemplates(res);
                })
                .catch(() => {
                    setTemplates(["document", "report", "paragraph"]);
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
        // setUserTemplateData(userTemplateData);
        cacheLocalState({
            ...localState,
            generator: {
                ...localState.generator,
                userTemplateData: userTemplateData,
            },
        });
    }

    function setCurrentTopic(topic: string) {
        // setTopic(topic);
        cacheLocalState({
            ...localState,
            generator: {
                ...localState.generator,
                topic: topic,
            },
        });
    }

    const generatorContext: GeneratorContextInterface = {
        // topic: localState.generator.topic,
        templates: templates,
        // selectedTemplate: localState.generator.selectedTemplate,
        isLoading: isLoading,
        // vocabulary: localState.generator.vocabulary,
        // userTemplateData: localState.generator.userTemplateData,
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

                {!authed && <NotLoggedInErrorDialog />}
            </div>
        </GeneratorContext.Provider>
    );
};

export default Main;
