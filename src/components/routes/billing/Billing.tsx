import {
    Context,
    ContextInterface,
    HomeContext,
    HomeContextInterface,
} from "@/components/util/context";
import { BillingDataMap } from "@/helpers/billing/billingData";
import React, { useContext, useState } from "react";
import Checkout from "./Checkout";

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
                className={`bg-white dark:bg-gray-800 p-8 flex flex-col justify-center rounded-lg shadow-lg max-w-4xl w-full transition-all duration-300 transform border ${isDarkMode ? "border-gray-600" : "border-gray-200"}`}
            >
                {/* Welcome Section */}
                <h2 className="text-3xl text-[#4A00E0] dark:text-white font-semibold text-center mb-4 flex justify-center items-center">
                    👋 Welcome back,
                    <span className="text-3xl text-gradient bg-clip-text font-extrabold animate-pulse mx-2">
                        testuser
                    </span>
                </h2>
                <h3 className="text-lg text-[#4A00E0] dark:text-white font-medium text-center mb-8 flex justify-center items-center">
                    You have
                    <span className="text-gradient bg-clip-text font-semibold animate-pulse mx-2">
                        100 tokens
                    </span>
                    remaining
                </h3>

                {/* Billing Plans Section */}
                {currentPlan !== "lifetime" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {Array.from(BillingDataMap.entries()).map((plan) => {
                            const [planTitle, planDetails] = plan;
                            const { price, description } = planDetails;
                            const isCurrentPlan = planTitle === currentPlan;

                            return (
                                <div
                                    key={planTitle}
                                    className={`p-8 flex flex-col justify-center items-center bg-white dark:bg-gray-700 rounded-lg shadow-md border ${
                                        isCurrentPlan
                                            ? "dark:border-purple-500 border-[#4A00E0]"
                                            : "border-gray-300 dark:border-gray-600"
                                    } relative hover:scale-105 transition-transform duration-200`}
                                >
                                    {/* Current Plan Badge */}
                                    {isCurrentPlan && (
                                        <span className="absolute top-0 left-0 rounded-tl-sm rounded-br dark:bg-purple-500 bg-[#4A00E0] text-white text-xs font-semibold px-2 py-1">
                                            Selected
                                        </span>
                                    )}

                                    {/* Plan Title */}
                                    <h3 className="text-2xl text-[#4A00E0] dark:text-white font-semibold text-center mb-4">
                                        {price > 0 ? `${price}$ ` : ""}
                                        {planTitle.charAt(0).toUpperCase() +
                                            planTitle.slice(1)}
                                    </h3>

                                    {/* Plan Features */}
                                    <ul className="text-sm text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                                        {description.map((feature, index) => (
                                            <li key={index}>✓ {feature}</li>
                                        ))}
                                    </ul>

                                    {/* Checkout Button */}
                                    {!isCurrentPlan && planTitle !== "free" && (
                                        <Checkout
                                            onSuccess={() =>
                                                setCurrentPlan(planTitle)
                                            }
                                            price={price}
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="p-8 flex justify-center items-center w-full h-full bg-white dark:bg-gray-700 rounded-md">
                        <p className="text-lg text-[#4A00E0] dark:text-white text-center">
                            🎉 You're on the{" "}
                            <span className="font-bold">Lifetime Plan</span>!
                            Enjoy unlimited access to everything. Thank you for
                            your support!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Billing;
