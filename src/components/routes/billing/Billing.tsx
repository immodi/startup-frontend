import {
    Context,
    ContextInterface,
    HomeContext,
    HomeContextInterface,
} from "@/components/util/context";
import {
    DisplayPlan,
    getUserPlanDataByUserId,
    getUserPlansMap,
    updateUserPlanDataByUserId,
    UserPlan,
} from "@/helpers/billing/getPlansData";
import { Infinity } from "lucide-react";
import React, { useContext, useEffect, useState } from "react";
import Checkout from "./Checkout";
import pb from "@/interfaces/auth/pocketBase";
import { LoadingSpinner } from "@/components/ui/Spinner";

const Billing: React.FC = () => {
    const [plansMapbillingDataMap, setBillingDataMap] = useState<
        Map<string, UserPlan>
    >(new Map());
    const [currentPlan, setCurrentPlan] = useState<DisplayPlan | undefined>(
        undefined,
    );
    const context = useContext(Context) as ContextInterface;
    const currentUserId = pb.authStore.model?.id;

    const currentUser = context.userData?.username;

    const homeContext = useContext(HomeContext) as HomeContextInterface;
    const isDarkMode = context.localState.isDarkMode;
    const { isMenuOpen } = homeContext;

    useEffect(() => {
        getUserPlansMap().then((plansMap) => {
            setBillingDataMap(plansMap);
        });
    }, []);

    useEffect(() => {
        getUserPlanDataByUserId(currentUserId!).then((userPlan) => {
            setCurrentPlan(userPlan);
            if (userPlan?.name === "monthly") {
                const key = plansMapbillingDataMap.keys().next()
                    .value as string;
                plansMapbillingDataMap.delete(key);
            }
        });
    }, [plansMapbillingDataMap]);

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
                <h2 className="text-3xl text-[#4A00E0] text-nowrap dark:text-white font-semibold text-center mb-4 flex justify-center items-center">
                    👋 Hi,
                    <span className="text-3xl text-gradient bg-clip-text font-extrabold animate-pulse mx-2">
                        {currentUser}
                    </span>
                </h2>
                <h3 className="text-lg text-[#4A00E0] text-nowrap dark:text-white font-medium text-center mb-8 flex justify-center items-center">
                    You have
                    <span className="text-gradient bg-clip-text font-semibold animate-pulse mx-2">
                        {currentPlan?.remaining_tokens! > 50 ? (
                            <Infinity />
                        ) : (
                            currentPlan?.remaining_tokens
                        )}
                    </span>
                    tokens remaining
                </h3>

                {currentPlan === undefined ? (
                    <LoadingSpinner className="w-full h-16" />
                ) : currentPlan?.name !== "lifetime" &&
                  plansMapbillingDataMap.size > 0 ? (
                    <div className="grid grid-cols-auto sm:grid-cols-auto gap-6">
                        {Array.from(plansMapbillingDataMap.entries()).map(
                            (plan) => {
                                const [planId, planDetails] = plan;
                                const planTitle = planDetails.name;
                                const { price, descriptions } = planDetails;
                                const isCurrentPlan =
                                    planTitle === currentPlan?.name;

                                return (
                                    <div
                                        key={planId}
                                        className={`p-8 flex flex-col justify-center items-center bg-white dark:bg-gray-700 rounded-lg shadow-md border ${
                                            isCurrentPlan
                                                ? "dark:border-purple-500 border-[#4A00E0]"
                                                : "border-gray-300 dark:border-gray-600"
                                        } relative cursor-default transition-transform duration-200`}
                                    >
                                        {/* Current Plan Badge */}
                                        {isCurrentPlan && (
                                            <span className="absolute top-0 left-0 rounded-tl-sm rounded-br dark:bg-purple-500 bg-[#4A00E0] text-white text-xs font-semibold px-2 py-1">
                                                Selected
                                            </span>
                                        )}

                                        {/* Plan Title */}
                                        <h3 className="text-2xl text-[#4A00E0] dark:text-white flex flex-col font-semibold text-center mb-4">
                                            {price > 0 ? `${price}$ ` : ""}
                                            {planTitle !== "monthly"
                                                ? planTitle
                                                      .charAt(0)
                                                      .toUpperCase() +
                                                  planTitle.slice(1)
                                                : "/Month"}
                                            {planTitle === "monthly" && (
                                                <span className="text-xs text-[#4A00E0] dark:text-white">
                                                    {" "}
                                                    (one time payment per month)
                                                </span>
                                            )}
                                        </h3>

                                        {/* Plan Features */}
                                        <ul className="text-sm w-full text-center text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                                            {descriptions.map(
                                                (feature, index) => (
                                                    <li key={index}>
                                                        ✓ {feature}
                                                    </li>
                                                ),
                                            )}
                                        </ul>

                                        {/* Checkout Button */}
                                        {!isCurrentPlan &&
                                            planTitle !== "free" && (
                                                <Checkout
                                                    onSuccess={() => {
                                                        updateUserPlanDataByUserId(
                                                            currentUserId,
                                                            planTitle,
                                                        ).then(() => {
                                                            setCurrentPlan({
                                                                id: planDetails.id,
                                                                name: planTitle,
                                                                remaining_tokens:
                                                                    planDetails.default_tokens,
                                                            });
                                                        });
                                                    }}
                                                    price={price}
                                                />
                                            )}
                                    </div>
                                );
                            },
                        )}
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
