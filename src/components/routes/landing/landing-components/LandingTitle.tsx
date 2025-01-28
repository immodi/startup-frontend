import { assignUser } from "@/helpers/auth/isFirstTimeUser";
import React from "react";
import { Link } from "react-router-dom";

const LandingTitle: React.FC = () => {
    return (
        <section className="text-center mb-16 min-h-fit">
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Create Professional PDFs in Seconds
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 dark:text-gray-300">
                Transform Your Ideas into Polished PDFs - Fast, Easy, and
                Professional!
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
