import {
    Context,
    ContextInterface,
    HomeContext,
    HomeContextInterface,
} from "@/components/util/context";
import { BillingDataMap } from "@/helpers/billing/billingData";
import React, { useContext, useState } from "react";

const Billing: React.FC = () => {
    const [currentPlan, setCurrentPlan] = useState("free");
    const context = useContext(Context) as ContextInterface;
    const homeContext = useContext(HomeContext) as HomeContextInterface;
    const isDarkMode = context.localState.isDarkMode;
    const { isMenuOpen } = homeContext;

    return (
        <div
            className={`
            flex ${isMenuOpen && "translate-x-24"}
            bg-gray-100 dark:bg-gray-800 duration-300
            flex-grow items-center justify-center p-5
            transition-all ease-in-out 
            `}
        >
            <div
                className={`bg-white dark:bg-gray-800 p-8 flex flex-col justify-center rounded-lg shadow-lg max-w-4xl w-full transition-all duration-300 transform border ${isDarkMode ? "border-gray-600" : ""}`}
            >
                <h2 className="text-3xl text-[#4A00E0] text-nowrap dark:text-white font-semibold text-center mb-4 flex justify-center items-center">
                    👋 Hi,
                    <span className="text-3xl text-gradient bg-clip-text font-extrabold animate-pulse mx-2">
                        testuser
                    </span>
                </h2>
                <h3 className="text-lg text-[#4A00E0] text-nowrap dark:text-white font-medium text-center mb-8 flex justify-center items-center">
                    You have
                    <span className="text-gradient bg-clip-text font-semibold animate-pulse mx-2">
                        100
                    </span>
                    document generations left
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {Array.from(BillingDataMap.entries()).map((plan) => {
                        const planPrice = plan[1].price;
                        const planTitle = plan[0];
                        const planDescription = plan[1].description;
                        const isCurrentPlan = planTitle === currentPlan;
                        return (
                            <div
                                className={`p-8 flex justify-around items-center flex-col bg-white dark:bg-gray-700 rounded-lg shadow-md border ${isCurrentPlan ? "dark:border-purple-500 border-[#4A00E0]" : "border-gray-300  dark:border-gray-600"} relative`}
                            >
                                {isCurrentPlan && (
                                    <span className="absolute rounded-tl-sm top-0 left-0 dark:bg-purple-500 bg-[#4A00E0] text-white text-xs font-semibold px-2 py-1 rounded-br">
                                        Selected
                                    </span>
                                )}
                                <div className="w-full h-full">
                                    <h3 className="text-2xl text-[#4A00E0] dark:text-white font-semibold text-center mb-4">
                                        {"".concat(
                                            planPrice > 0
                                                ? `${planPrice}$ `
                                                : "",
                                            planTitle
                                                .charAt(0)
                                                .toUpperCase()
                                                .concat(
                                                    planTitle.slice(
                                                        1,
                                                        planTitle.length,
                                                    ),
                                                ),
                                        )}
                                    </h3>
                                    <ul className="text-sm text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                                        {planDescription.map((description) => (
                                            <li>✓ {description}</li>
                                        ))}
                                    </ul>
                                </div>
                                <button
                                    disabled={isCurrentPlan}
                                    className={`w-full  ${isCurrentPlan ? " bg-gray-400 dark:bg-gray-600 text-white" : "dark:bg-[#7A1CAC] dark:hover:bg-[#AD49E1] dark:text-white bg-[#4A00E0] hover:bg-[#3a00c0] text-white"} py-3 rounded-md ${isCurrentPlan && "cursor-not-allowed"}`}
                                    onClick={() => {
                                        setCurrentPlan(planTitle);
                                    }}
                                >
                                    {isCurrentPlan ? "Selected" : "Select Plan"}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

// <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
// {/* Free Plan Card */}
// <div
//     className={`p-8 bg-white dark:bg-gray-700 rounded-lg shadow-md border ${isDarkMode ? "border-purple-500" : "border-[#4A00E0]"} relative`}
// >
//     <span className="absolute rounded-tl-sm top-0 left-0 dark:bg-purple-500 bg-[#4A00E0] text-white text-xs font-semibold px-2 py-1 rounded-br">
//         Selected
//     </span>
//     <h3 className="text-2xl text-[#4A00E0] dark:text-white font-semibold text-center mb-4">
//         Free
//     </h3>
//     <ul className="text-sm text-gray-600 dark:text-gray-300 mb-6 space-y-2">
//         <li>✓ 50 free PDF generations</li>
//         <li>
//             ✓ Download up to 3 of your last generated PDFs
//         </li>
//     </ul>
//     <button
//         disabled
//         className={`w-full bg-gray-400 dark:bg-gray-600 text-white py-3 rounded-md cursor-not-allowed`}
//     >
//         Selected
//     </button>
// </div>

// {/* Monthly Plan Card */}
// <div
//     className={`p-8 bg-white dark:bg-gray-700 rounded-lg shadow-md border ${isDarkMode ? "border-gray-600" : "border-gray-300"}`}
// >
//     <h3 className="text-2xl text-[#4A00E0] dark:text-white font-semibold text-center mb-4">
//         $2.95/month
//     </h3>
//     <ul className="text-sm text-gray-600 dark:text-gray-300 mb-6 space-y-2">
//         <li>✓ Unlimited PDF generations</li>
//         <li>
//             ✓ Download up to 10 of your last generated PDFs
//         </li>
//     </ul>
//     <button
//         className={`w-full ${isDarkMode ? "bg-[#7A1CAC] hover:bg-[#AD49E1] text-white" : "bg-[#4A00E0] hover:bg-[#3a00c0] text-white"} py-3 rounded-md`}
//     >
//         Select Plan
//     </button>
// </div>

// {/* Lifetime Plan Card */}
// <div
//     className={`p-8 bg-white dark:bg-gray-700 rounded-lg shadow-md border ${isDarkMode ? "border-gray-600" : "border-gray-300"}`}
// >
//     <h3 className="text-2xl text-[#4A00E0] dark:text-white font-semibold text-center mb-4">
//         $30.95 Lifetime
//     </h3>
//     <ul className="text-sm text-gray-600 dark:text-gray-300 mb-6 space-y-2">
//         <li>✓ Unlimited PDF generations</li>
//         <li>
//             ✓ Download up to 10 of your last generated PDFs
//         </li>
//         <li>✓ Lifetime access</li>
//     </ul>
//     <button
//         className={`w-full ${isDarkMode ? "bg-[#7A1CAC] hover:bg-[#AD49E1] text-white" : "bg-[#4A00E0] hover:bg-[#3a00c0] text-white"} py-3 rounded-md`}
//     >
//         Select Plan
//     </button>
// </div>
// </div>
export default Billing;
