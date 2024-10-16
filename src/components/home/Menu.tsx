import { useEffect, useRef } from "react";

interface MenuProps {
    isMenuOpen: boolean;
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface MenuItemProps {
    name: string;
    onClick: () => void;
}

const SideBar: React.FC<MenuProps> = ({ isMenuOpen, setIsMenuOpen }) => {
    const menuRef = useRef<HTMLDivElement | null>(null);

    // Handle click outside the menu to close it
    const handleClickOutside = (event: MouseEvent) => {
        if (
            menuRef.current &&
            isMenuOpen &&
            !menuRef.current.contains(event.target as Node)
        ) {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <div
            ref={menuRef}
            className={`fixed top-0 left-0 h-full w-64 bg-gray-200 dark:bg-gray-900 shadow-lg transform z-10 ${
                isMenuOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out`}
        >
            <div className="p-4 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-700 dark:text-white">
                    Menu
                </h2>
                {/* Close Button */}
                <button
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-700 dark:text-white focus:outline-none"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
            <ul className="space-y-2">
                <MenuItem name="Home" onClick={() => setIsMenuOpen(false)} />
                <MenuItem
                    name="Designer"
                    onClick={() => setIsMenuOpen(false)}
                />
                <MenuItem name="Profile" onClick={() => setIsMenuOpen(false)} />
            </ul>
        </div>
    );
};

const MenuItem: React.FC<MenuItemProps> = ({ name, onClick }) => {
    return (
        <li>
            <button
                onClick={onClick}
                className="block text-gray-700 ml-2 w-2/6 text-start dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 p-2 rounded transition-colors"
            >
                {name}
            </button>
        </li>
    );
};

export default SideBar;
