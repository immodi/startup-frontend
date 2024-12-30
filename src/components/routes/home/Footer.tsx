import { HomeContext, HomeContextInterface } from "@/components/util/context";
import { useContext } from "react";

const Footer: React.FC = () => {
    const homeContext = useContext(HomeContext) as HomeContextInterface;

    const { isMenuOpen } = homeContext;

    return (
        <footer
            className={`w-full bg-white dark:bg-gray-900 shadow p-4 text-center text-gray-700 dark:text-gray-300  ${isMenuOpen && "translate-x-24"}  transition duration-300`}
        >
            <p>© {new Date().getFullYear()} GenPDF. All Rights Reserved.</p>
        </footer>
    );
};

export default Footer;
