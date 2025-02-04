interface HomeIconProps {
    size?: number;
    color?: string;
    className?: string;
    onClick?: () => void;
}

export default function HomeIcon({
    size = 24,
    color = "currentColor",
    className = "",
    onClick,
}: HomeIconProps) {
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
                className="home-icon text-white"
                aria-hidden="true"
                role="img"
            >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
        </div>
    );
}
