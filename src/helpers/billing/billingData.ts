interface PlanData {
    price: number;
    description: string[];
}

const freePlan = [
    "50 free PDF generations",
    "Download up to 3 of your last generated PDFs",
];

const monthlyPlan = [
    "Unlimited PDF generations",
    "Download up to 10 of your last generated PDFs",
];

const lifeTimePlan = [
    "Unlimited PDF generations",
    "Download up to 10 of your last generated PDFs",
    "Lifetime access",
];

export const BillingDataMap = new Map<string, PlanData>([
    ["free", { price: 0, description: freePlan }],
    ["monthly", { price: 2.95, description: monthlyPlan }],
    ["lifetime", { price: 30.95, description: lifeTimePlan }],
]);
