import React from "react";

interface ArrowProps {
    direction?: "left" | "right" | "up" | "down";
    onHover?: () => void;
    onClick?: () => void;
}

const Arrow: React.FC<ArrowProps> = ({
    direction = "down",
    onHover,
    onClick,
}) => {
    const arrowStyles = {
        base: `w-12 h-12 flex items-center justify-center rounded-full bg-gray-500 bg-opacity-50 transition-all duration-300`,
        hover: `hover:bg-gray-700 hover:bg-opacity-70 hover:scale-110`,
        active: `active:scale-90`,
    };

    const arrowDirection = {
        left: `border-r-4 border-transparent border-l-8 border-gray-800`,
        right: `border-l-4 border-transparent border-r-8 border-gray-800`,
        up: `border-b-4 border-transparent border-t-8 border-gray-800`,
        down: `border-t-4 border-transparent border-b-8 border-gray-800`,
    };

    return (
        <div
            className={`${arrowStyles.base} ${arrowStyles.hover} ${arrowStyles.active}`}
            onMouseEnter={() => {
                onHover?.();
            }}
            onClick={() => {
                onClick?.();
            }}
        >
            <div
                className={`w-0 h-0 ${
                    arrowDirection[direction]
                } transform rotate-0 translate-y-0`}
            ></div>
        </div>
    );
};

export default Arrow;
