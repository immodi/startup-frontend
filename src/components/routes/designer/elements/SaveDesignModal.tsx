import { ArrowRight, X } from "lucide-react";
import { useState } from "react";

export interface SaveDesignModalProps {
    // inputValue: string;
    // setInputValue: React.Dispatch<React.SetStateAction<string>>;
    isOpen: boolean;
    onClose: () => void;
    handleSubmit: (name: string) => void;
    // fn?: () => void;
}

const SaveDesignModal: React.FC<SaveDesignModalProps> = ({
    // inputValue,
    // setInputValue,
    isOpen,
    onClose,
    handleSubmit,
}) => {
    const [text, setText] = useState("");
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-all duration-200">
            <div className="p-6 rounded-lg w-96">
                <div className="flex items-center space-x-2 min-w-fit">
                    <input
                        type="text"
                        className="flex-grow px-4 py-2 bg-gray-300 dark:bg-gray-700 border dark:text-gray-400 text-gray-800 border-gray-600 rounded-md"
                        value={text}
                        onChange={handleInputChange}
                        placeholder="Design Name..."
                    />
                    <button
                        className="transition-all duration-100 w-10 h-10 bg-[#4A00E0] hover:bg-[#3a00c0] dark:bg-[#7A1CAC] dark:hover:bg-[#AD49E1] rounded-full flex items-center justify-center"
                        onClick={() => {
                            handleSubmit(text);
                            setText("");
                            onClose();
                        }}
                    >
                        <ArrowRight className="text-gray-200 dark:text-gray-200" />
                    </button>
                    <button
                        className="transition-all duration-100 w-10 h-10 bg-[#4A00E0] hover:bg-[#3a00c0] dark:bg-[#7A1CAC] dark:hover:bg-[#AD49E1] rounded-full flex items-center justify-center"
                        onClick={() => {
                            setText("");
                            onClose();
                        }}
                    >
                        <X className="text-gray-200 dark:text-gray-200" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export { SaveDesignModal };
