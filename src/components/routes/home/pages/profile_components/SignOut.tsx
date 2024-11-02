import { LoadingSpinner } from "@/components/ui/Spinner";

export interface SignOutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSignOut: () => void;
    isDarkMode: boolean;
    isLoading: boolean;
}

export const SignOutModal: React.FC<SignOutModalProps> = ({
    isOpen,
    onClose,
    onSignOut,
    isDarkMode,
    isLoading,
}) => {
    if (!isOpen) return null;

    return (
        <div
            className={`
                flex fixed inset-0 z-50 bg-black bg-opacity-50 items-center justify-center transition-opacity duration-300 
                ${isOpen ? "opacity-100" : "opacity-0"}
            `}
        >
            <div
                className={`bg-white dark:bg-gray-800 p-8 flex flex-col justify-center rounded-lg shadow-lg min-h-fit max-w-md w-full transition-all duration-300 transform border ${isDarkMode ? "border-gray-600" : "border-gray-300"}`}
            >
                <h2
                    className={`text-2xl font-semibold ${isDarkMode ? "text-white" : "text-[#4A00E0]"} mb-4 text-center`}
                >
                    Sign Out
                </h2>
                <p
                    className={`text-center mb-6 ${isDarkMode ? "text-white" : "text-gray-700"}`}
                >
                    Are you sure you want to sign out?
                </p>

                {/* Buttons */}
                <div className="flex justify-between">
                    <button
                        onClick={onClose}
                        className={`font-bold py-2 px-5 rounded-md focus:outline-none focus:ring-2 transition-colors duration-300 ${isDarkMode ? "bg-gray-700 hover:bg-gray-600 text-white focus:ring-gray-500" : "bg-gray-200 hover:bg-gray-300 text-gray-700 focus:ring-gray-400"}`}
                    >
                        Cancel
                    </button>
                    {!isLoading ? (
                        <button
                            onClick={onSignOut}
                            className={`font-bold py-2 px-5 rounded-md focus:outline-none focus:ring-2 transition-colors duration-300 ${isDarkMode ? "bg-[#7A1CAC] hover:bg-[#AD49E1] text-white focus:ring-[#2E073F]" : "bg-[#4A00E0] hover:bg-[#3a00c0] text-white focus:ring-[#4A00E0]"}`}
                        >
                            Sign Out
                        </button>
                    ) : (
                        <LoadingSpinner isDarkMode={isDarkMode} />
                    )}
                </div>
            </div>
        </div>
    );
};
