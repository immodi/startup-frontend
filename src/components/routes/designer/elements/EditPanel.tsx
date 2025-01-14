import { Context, ContextInterface } from "@/components/util/context";
import { Check, Save, Trash } from "lucide-react";
import React, { useContext, useState } from "react";

interface EditPanelInterface {
    onDelete: () => void;
    onSave: () => void;
}

const EditPanel: React.FC<EditPanelInterface> = ({ onSave, onDelete }) => {
    const [isSaved, setIsSaved] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleSaveClick = () => {
        setIsSaved(true);
        onSave();

        setTimeout(() => {
            setIsSaved(false);
        }, 2000);
    };

    return (
        <div
            className={`remove-this-at-export flex w-full min-w-fit h-10 justify-center items-center relative ml-auto mr-auto dark:bg-gray-600 bg-gray-300 rounded-md saving-overlay cursor-pointer`}
        >
            <div className="relative w-fit mr-3" onClick={handleSaveClick}>
                <div
                    className={`transition-all duration-300 ${isSaved ? "opacity-0 scale-0" : "opacity-100 scale-100"}`}
                >
                    <Save
                        width={36}
                        height={36}
                        className="transition-all duration-150 hover:dark:text-gray-400 hover:text-gray-700"
                    />
                </div>
                <div
                    className={`absolute top-0 left-0 transition-all duration-300 ${
                        isSaved ? "opacity-100 scale-100" : "opacity-0 scale-0"
                    }`}
                >
                    <Check width={36} height={36} className="text-green-500" />
                </div>
            </div>
            <div className="w-fit ml-3">
                <Trash
                    onClick={() => setIsDeleting(true)}
                    width={36}
                    height={36}
                    className="transition-all duration-150 hover:dark:text-gray-400 hover:text-gray-700"
                />
            </div>

            {isDeleting && (
                <AlertDialog
                    setIsErrorDialogOpen={setIsDeleting}
                    onDelete={onDelete}
                />
            )}
        </div>
    );
};

const AlertDialog: React.FC<{
    setIsErrorDialogOpen: (boolean: boolean) => void;
    onDelete: () => void;
}> = ({ setIsErrorDialogOpen, onDelete }) => {
    const context = useContext(Context) as ContextInterface;
    const { localState } = context;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div
                className={`bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-1/2 max-w-lg`}
            >
                <h3 className="text-lg font-semibold mb-4 text-center text-gray-700 dark:text-gray-300">
                    Are you sure about this?
                </h3>
                <div className="modal-content">
                    {/* Add your modal content here, such as form fields or template options */}
                    <p className="text-gray-700 text-center dark:text-gray-300">
                        You're about to delete the template called '
                        {localState.selectedUserTemplate}'.
                    </p>
                </div>
                <div className="text-center w-full flex flex-col md:flex-row lg:flex-row justify-around mt-6">
                    <button
                        onClick={() => {
                            onDelete();
                            setIsErrorDialogOpen(false);
                        }}
                        className={`py-2 px-4 w-full rounded-lg font-semibold transition-colors duration-100 bg-[#ac1c1c] hover:bg-[#e63c3c] text-white`}
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => setIsErrorDialogOpen(false)}
                        className={`py-2 px-4 w-full my-1 md:mx-1 md:my-0 lg:mx-2 lg:my-0 rounded-lg font-semibold transition-colors duration-100 dark:bg-[#7A1CAC] dark:hover:bg-[#AD49E1] text-white bg-[#4A00E0] hover:bg-[#6634d9] `}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditPanel;
