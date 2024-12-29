import { assignUser } from "@/helpers/auth/isFirstTimeUser";
import React from "react";
import { Link } from "react-router-dom";

const LandingTitle: React.FC = () => {
    return (
        <section className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-[#4A00E0] dark:text-[#FFF]">
                Generate Professional PDFs in Seconds
            </h1>
            <p className="text-xl mb-8 text-gray-700 dark:text-gray-300">
                Transform your ideas into beautifully formatted PDF documents
                with ease.
            </p>
            <Link
                className="text-lg px-8 bg-[#4A00E0] hover:bg-[#3a00c0] dark:bg-[#7A1CAC] dark:hover:bg-[#AD49E1] p-3 rounded-md text-white"
                to={"/home"}
                onClick={assignUser}
            >
                Get Started
            </Link>{" "}
        </section>
    );
};

export default LandingTitle;
