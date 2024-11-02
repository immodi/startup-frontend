import { useEffect, useState } from "react";

interface LocalState {
    isDarkMode: boolean;
}

export default function useLocalStorageState() {
    const key = "localState";
    const initialValue: LocalState = {
        isDarkMode: true,
    };

    const [localState, setLocalState] = useState<LocalState>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            return initialValue;
        }
    });

    // Update local storage whenever the stored value changes
    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(localState));
        } catch (error) {
            console.error(error);
        }
    }, [key, localState]);

    // Function to clear the stored value
    const clearLocalState = () => {
        setLocalState(initialValue);
        window.localStorage.removeItem(key);
    };

    return [localState, setLocalState, clearLocalState] as const;
}
