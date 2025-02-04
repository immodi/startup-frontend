import {
    Context,
    ContextInterface,
    GeneratorContext,
    GeneratorContextInterface,
} from "@/components/util/context";
import { useContext } from "react";

const Modal: React.FC = () => {
    const context = useContext(Context) as ContextInterface;
    const isDarkMode = context.localState.isDarkMode;

    const generatorContext = useContext(
        GeneratorContext,
    ) as GeneratorContextInterface;
    const { setIsModalOpen } = generatorContext;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div
                className={`bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-1/2 max-w-md`}
            >
                <h3 className="text-lg font-semibold mb-4 text-center text-gray-700 dark:text-gray-300">
                    Edit Templates
                </h3>
                <div className="modal-content">
                    {/* Add your modal content here, such as form fields or template options */}
                    <p className="text-gray-700 dark:text-gray-300">
                        Edit your templates here.
                    </p>
                </div>
                <div className="text-center mt-4">
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className={`py-2 px-4 rounded-lg font-semibold transition-colors duration-300 ${isDarkMode ? "bg-[#7A1CAC] hover:bg-[#AD49E1] text-white" : "bg-[#4A00E0] hover:bg-[#3a00c0] text-white"}`}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
