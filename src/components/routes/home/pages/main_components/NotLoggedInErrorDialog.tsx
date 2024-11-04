import {
    Context,
    ContextInterface,
    HomeContext,
    HomeContextInterface,
} from "@/components/util/context";
import { useContext } from "react";

const NotLoggedInErrorDialog: React.FC = () => {
    const context = useContext(Context) as ContextInterface;
    const isDarkMode = context.localState.isDarkMode;

    const homeContext = useContext(HomeContext) as HomeContextInterface;
    const { navigateTo } = homeContext;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-1/2 max-w-md">
                <h2 className="text-2xl font-semibold mb-4 text-center dark:text-white text-[#4A00E0]">
                    Login Required
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                    You need to be logged in to access this feature. Please log
                    in to continue.
                </p>
                <div className="text-center mt-4 flex justify-center gap-4">
                    <button
                        onClick={() => navigateTo("profile")}
                        className={`py-2 px-4 rounded-lg font-semibold transition-colors duration-300 ${
                            isDarkMode
                                ? "bg-[#7A1CAC] hover:bg-[#AD49E1] text-white"
                                : "bg-[#4A00E0] hover:bg-[#3a00c0] text-white"
                        }`}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotLoggedInErrorDialog;
