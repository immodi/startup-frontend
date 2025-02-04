import React from "react";

const LandingSummary: React.FC = () => {
    return (
        <section className="text-center">
            <h2 className="text-3xl font-bold mb-8 text-[#4A00E0] dark:text-[#FFF] mt-10">
                How It Works
            </h2>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-8">
                <div className="flex flex-col items-center text-center md:w-1/3">
                    <span className="w-14 h-14 rounded-full bg-[#4A00E0] dark:bg-gray-900 flex items-center justify-center text-white dark:text-[#FFFFFF] font-bold text-2xl">
                        1
                    </span>
                    <h3 className="text-xl font-semibold mt-4 mb-2 text-[#4A00E0] dark:text-[#FFF]">
                        Choose Your Template
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                        Start by selecting a template that suits your needs, or
                        customize your own.
                    </p>
                </div>
                <div className="hidden md:block h-1 relative top-3 w-12 bg-[#4A00E0] dark:bg-[#FFF]"></div>
                <div className="flex flex-col items-center text-center md:w-1/3">
                    <span className="w-14 h-14 rounded-full bg-[#4A00E0] dark:bg-gray-900 flex items-center justify-center text-white dark:text-[#FFFFFF] font-bold text-2xl">
                        2
                    </span>
                    <h3 className="text-xl font-semibold mt-4 mb-2 text-[#4A00E0] dark:text-[#FFF]">
                        Add Content Easily
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                        Use our intuitive editor to add and format your content
                        with ease.
                    </p>
                </div>
                <div className="hidden md:block h-1 relative top-3 w-12 bg-[#4A00E0] dark:bg-[#FFF]"></div>
                <div className="flex flex-col items-center text-center md:w-1/3">
                    <span className="w-14 h-14 rounded-full bg-[#4A00E0] dark:bg-gray-900 flex items-center justify-center text-white dark:text-[#FFFFFF] font-bold text-2xl">
                        3
                    </span>
                    <h3 className="text-xl font-semibold mt-4 mb-2 text-[#4A00E0] dark:text-[#FFF]">
                        Download Instantly
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                        Export your document as a high-quality PDF ready for
                        sharing or printing.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default LandingSummary;
