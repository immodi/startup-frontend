import React from "react";

interface ArrowProps {
    direction?: "up" | "down";
    className?: string;
    onHover?: () => void;
    onClick?: () => void;
}

const Arrow: React.FC<ArrowProps> = ({
    direction = "down",
    className,
    onHover,
    onClick,
}) => {
    const arrowStyles = {
        base: `w-8/12 h-10 flex items-center justify-center rounded-sm bg-gray-500 bg-opacity-50 transition-all duration-300`,
        hover: `hover:bg-gray-700 hover:bg-opacity-70 hover:scale-110`,
        active: `active:scale-90`,
    };

    const arrowDirection = {
        up: `border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white`,
        down: `border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white`,
    };

    return (
        <div
            className={`${className ?? ""} ${arrowStyles.base} ${arrowStyles.hover} ${arrowStyles.active} static cursor-pointer ${direction === "up" ? "top-0" : "bottom-0"}`}
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
