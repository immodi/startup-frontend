import { HomeContext, HomeContextInterface } from "@/components/util/context";
import { useContext } from "react";

const Footer: React.FC = () => {
    const homeContext = useContext(HomeContext) as HomeContextInterface;

    const { isMenuOpen } = homeContext;

    return (
        <footer
            className={`w-full bg-white dark:bg-gray-900 shadow p-4 text-center text-gray-700 dark:text-gray-300 ${isMenuOpen && "translate-x-24"} transition duration-300`}
        >
            <p>© {new Date().getFullYear()} GenPDF. All Rights Reserved.</p>
            <div className="mt-2">
                <a
                    href="/privacy-policy"
                    className="text-blue-500 dark:text-blue-400 hover:underline mx-2"
                >
                    Privacy Policy
                </a>
                <a
                    href="/terms-of-service"
                    className="text-blue-500 dark:text-blue-400 hover:underline mx-2"
                >
                    Terms of Service
                </a>
            </div>
        </footer>
    );
};

export default Footer;
