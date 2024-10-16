import { useEffect, useRef, useState } from "react";
import HomeIcon from "../ui/menu-icons/HomeIcon";
import DesignerIcon from "../ui/menu-icons/DesignerIcon";
import UserProfileIcon from "../ui/menu-icons/UserIcon";
import BillingIcon from "../ui/menu-icons/BillingIcon";

interface MenuProps {
    isDarkMode: boolean;
    isMenuOpen: boolean;
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface MenuItemProps {
    index: number;
    label: string;
    isActive: boolean;
    IconComponent: React.FC<{
        size?: number;
        color?: string;
        onClick?: () => void;
    }>;
}

const menuItems: MenuItemProps[] = [
    {
        index: 0,
        label: "Home",
        isActive: true,
        IconComponent: HomeIcon,
    },
    {
        index: 1,
        label: "Designer",
        isActive: false,
        IconComponent: DesignerIcon,
    },
    {
        index: 2,
        label: "Profile",
        isActive: false,
        IconComponent: UserProfileIcon,
    },
    {
        index: 3,
        label: "Billing",
        isActive: false,
        IconComponent: BillingIcon,
    },
];

const Menu: React.FC<MenuProps> = ({
    isDarkMode,
    isMenuOpen,
    setIsMenuOpen,
}) => {
    const [menuState, setMenuState] = useState<Array<boolean>>([
        true,
        false,
        false,
        false,
    ]);
    const menuRef = useRef<HTMLDivElement | null>(null);
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
            className={`fixed top-0 left-0 h-full w-24 bg-gray-200 dark:bg-gray-900 shadow-lg transform z-10 ${
                isMenuOpen ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-300 ease-in-out`}
        >
            <ul className="h-full space-y-4 pt-4 flex flex-col justify-start items-center">
                {menuItems.map(({ index, label, IconComponent }) => (
                    <MenuItem
                        key={index}
                        isActive={menuState[index]}
                        onClick={() => {
                            handleItemClick(
                                index,
                                menuState,
                                setIsMenuOpen,
                                setMenuState,
                            );

                            switch (index) {
                                case 0:
                                    break;

                                case 1:
                                    break;

                                case 2:
                                    break;

                                case 3:
                                    break;

                                default:
                                    break;
                            }
                        }}
                        element={
                            <IconComponent
                                size={30}
                                color={isDarkMode ? "white" : "currentColor"}
                            />
                        }
                        label={label}
                    />
                ))}
            </ul>
        </div>
    );
};
const MenuItem: React.FC<{
    isActive: boolean;
    element: JSX.Element;
    label: string;
    onClick: () => void;
}> = ({ isActive, element, label, onClick }) => {
    return (
        <li className="relative">
            <button
                onClick={onClick}
                className={`flex flex-col items-center p-2 rounded-md transition-colors duration-200 hover:bg-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4A00E0] ${isActive ? "bg-gray-300 dark:bg-gray-700" : ""}`}
                aria-label={label}
            >
                {element}
                <span className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {label}
                </span>
            </button>
            {isActive && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-1 rounded-full" />
            )}
        </li>
    );
};

function handleItemClick(
    elementIndex: number,
    menuState: Array<boolean>,
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>,
    setMenuState: React.Dispatch<React.SetStateAction<Array<boolean>>>,
) {
    setIsMenuOpen(false);
    setMenuState(
        menuState.map((_, index) => {
            if (index == elementIndex) {
                return true;
            }
            return false;
        }),
    );
}

export default Menu;
