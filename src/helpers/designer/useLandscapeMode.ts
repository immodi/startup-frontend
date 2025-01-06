import { useEffect, useState } from "react";

const useLandscapeMode = () => {
    const [isPhoneLandscape, setIsPhoneLandscape] = useState(
        window.matchMedia("(max-height: 500px) and (orientation: landscape)")
            .matches,
    );

    useEffect(() => {
        const mediaQuery = window.matchMedia(
            "(max-height: 500px) and (orientation: landscape)",
        );

        const handleOrientationChange = (e: MediaQueryListEvent) => {
            setIsPhoneLandscape(e.matches);
        };

        // Modern browsers
        mediaQuery.addEventListener("change", handleOrientationChange);

        // Cleanup
        return () => {
            mediaQuery.removeEventListener("change", handleOrientationChange);
        };
    }, []);

    return isPhoneLandscape;
};

export default useLandscapeMode;
