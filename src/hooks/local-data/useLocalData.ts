import { useEffect, useState } from "react";
import { useGetToken } from "../auth/useToken";

export interface LocalState {
    isDarkMode: boolean;
    authed: boolean;
    generator: GeneratorLocalState;
    selectedUserTemplate?: string;
}

export const INITAL_LOCAL_STATE: LocalState = {
    isDarkMode: true,
    authed: false,
    generator: {
        topic: "",
        vocabulary: 5,
        selectedTemplate: "document",
        userTemplateData: new Map<string, string>(),
    },
} as const;

interface GeneratorLocalState {
    topic: string;
    vocabulary: number;
    selectedTemplate: string;
    userTemplateData: Map<string, string>;
}

export function useLocalStorageState() {
    const key = "localState";
    const tokenCookie = useGetToken();

    // const [localState, setLocalState] = useState<LocalState>(() => {
    //     try {
    //         const item = window.localStorage.getItem(key);
    //         return item ? JSON.parse(item) : INITAL_LOCAL_STATE;
    //     } catch (error) {
    //         return INITAL_LOCAL_STATE;
    //     }
    // });

    const [localState, setLocalState] = useState<LocalState>(() => {
        try {
            const item = window.localStorage.getItem(key);
            if (item) {
                const parsed: LocalState = JSON.parse(item);
                // Convert `userTemplateData` back to a Map
                if (parsed.generator?.userTemplateData) {
                    parsed.generator.userTemplateData = new Map(
                        Object.entries(parsed.generator.userTemplateData),
                    );
                }

                //TODO: add a check to see if the token has expired, and make him signout
                if (tokenCookie === undefined) {
                    return { ...parsed, authed: false };
                } else {
                    return parsed;
                }
            } else {
                return INITAL_LOCAL_STATE;
            }
        } catch (error) {
            return INITAL_LOCAL_STATE;
        }
    });

    // Update local storage whenever the stored value changes
    useEffect(() => {
        try {
            const stateToStore = {
                ...localState,
                generator: {
                    ...localState.generator,
                    userTemplateData: Object.fromEntries(
                        localState.generator?.userTemplateData || [],
                    ),
                },
            };
            window.localStorage.setItem(key, JSON.stringify(stateToStore));
        } catch (error) {
            console.error(error);
        }
    }, [key, localState]);

    // Update local storage whenever the stored value changes
    // useEffect(() => {
    //     try {
    //         window.localStorage.setItem(key, JSON.stringify(localState));
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }, [key, localState]);

    // Function to clear the stored value
    // const clearLocalState = () => {
    //     setLocalState(INITAL_LOCAL_STATE);
    //     window.localStorage.removeItem(key);
    // };

    return [localState, setLocalState] as const;
}
