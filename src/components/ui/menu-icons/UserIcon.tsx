interface UserProfileIconProps {
    size?: number;
    color?: string;
    className?: string;
    onClick?: () => void;
}

export default function UserProfileIcon({
    size = 24,
    color = "currentColor",
    className = "",
    onClick,
}: UserProfileIconProps) {
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
                className="user-profile-icon text-white"
                aria-hidden="true"
                role="img"
            >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
            </svg>
        </div>
    );
}
