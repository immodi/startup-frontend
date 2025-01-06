import { useEffect, useState } from "react";

interface SwipeDetectorProps {
    onSwipeUp: () => void; // Function to be executed on swipe up
}

const SwipeDetector: React.FC<SwipeDetectorProps> = ({ onSwipeUp }) => {
    const [bottomThreshold, setBottomThreshold] = useState(
        window.innerHeight * 0.9,
    ); // State for bottom threshold

    useEffect(() => {
        const updateBottomThreshold = () => {
            setBottomThreshold(window.innerHeight * 0.9); // Recalculate bottomThreshold on orientation change
        };

        // Add event listener to update threshold when window is resized (e.g., when orientation changes)
        window.addEventListener("resize", updateBottomThreshold);

        // Clean up event listener
        return () => {
            window.removeEventListener("resize", updateBottomThreshold);
        };
    }, []);

    useEffect(() => {
        let touchStartY = 0;
        let touchEndY = 0;

        const handleTouchStart = (e: TouchEvent) => {
            touchStartY = e.touches[0].clientY; // Get the start position
        };

        const handleTouchMove = (e: TouchEvent) => {
            touchEndY = e.touches[0].clientY;
        };

        const handleTouchEnd = () => {
            if (
                touchStartY - touchEndY > 20 && // Swipe up threshold
                touchStartY > bottomThreshold && // Start position within the bottom 10%
                touchEndY !== 0 && // Ensure there's movement
                window.innerHeight > window.innerWidth // Ensure portrait mode
            ) {
                onSwipeUp(); // Trigger swipe-up action
            }
        };

        // Add event listeners for touch events
        window.addEventListener("touchstart", handleTouchStart);
        window.addEventListener("touchmove", handleTouchMove);
        window.addEventListener("touchend", handleTouchEnd);

        // Clean up event listeners
        return () => {
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
        };
    }, [onSwipeUp, bottomThreshold]); // Re-run effect if bottomThreshold changes

    return null; // This component doesn't render anything visually, just listens for touch events
};

export default SwipeDetector;
