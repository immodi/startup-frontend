interface BrushIconProps {
    size?: number;
    color?: string;
    className?: string;
    onClick?: () => void;
}

export default function BrushIcon({
    size = 24,
    color = "currentColor",
    className = "",
    onClick,
}: BrushIconProps) {
    return (
        <div
            onClick={onClick}
            className={`flex items-center justify-center w-14 h-14 rounded-full cursor-pointer transition-all duration-300 transform hover:scale-110 shadow-lg ${className}`}
            style={{
                background:
                    color === "currentColor"
                        ? "linear-gradient(135deg, #8E2DE2, #4A00E0)"
                        : "linear-gradient(135deg, #AD49E1, #7A1CAC)",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
            }}
        >
            <svg
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="none"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="brush-icon text-white"
                aria-hidden="true"
                role="img"
            >
                <path d="M9.06 11.9l8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08" />
                <path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02z" />
            </svg>
        </div>
    );
}
