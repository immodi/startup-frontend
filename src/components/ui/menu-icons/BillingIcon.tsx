interface BillingIconProps {
    size?: number;
    color?: string;
    className?: string;
    onClick?: () => void;
}

export default function BillingIcon({
    size = 24,
    color = "currentColor",
    className = "",
    onClick,
}: BillingIconProps) {
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
                className="text-white"
                aria-hidden="true"
                role="img"
                fill-rule="evenodd"
                clip-rule="evenodd"
            >
                <path d="M22 3c.53 0 1.039.211 1.414.586s.586.884.586 1.414v14c0 .53-.211 1.039-.586 1.414s-.884.586-1.414.586h-20c-.53 0-1.039-.211-1.414-.586s-.586-.884-.586-1.414v-14c0-.53.211-1.039.586-1.414s.884-.586 1.414-.586h20zm1 8h-22v8c0 .552.448 1 1 1h20c.552 0 1-.448 1-1v-8zm-15 5v1h-5v-1h5zm13-2v1h-3v-1h3zm-10 0v1h-8v-1h8zm-10-6v2h22v-2h-22zm22-1v-2c0-.552-.448-1-1-1h-20c-.552 0-1 .448-1 1v2h22z" />
            </svg>
        </div>
    );
}
