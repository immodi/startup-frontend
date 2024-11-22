import { HomeContext, HomeContextInterface } from "@/components/util/context";
import React, { useContext } from "react";

const Canvas: React.FC = () => {
    const homeContext = useContext(HomeContext) as HomeContextInterface;
    const { isMenuOpen } = homeContext;

    return (
        <div
            className={`${isMenuOpen && "translate-x-24"} bg-gray-500 h-full w-full transition-all ease-in-out duration-300`}
        ></div>
    );
};

export default Canvas;
