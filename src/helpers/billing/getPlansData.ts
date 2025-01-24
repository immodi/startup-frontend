import pb from "@/interfaces/auth/pocketBase";
import { UserModel } from "@/interfaces/auth/userModel";

export interface UserPlan {
    id: string;
    name: string;
    price: number;
    descriptions: Array<string>; //Json
    default_tokens: number;
}

export interface DisplayPlan {
    id: string;
    name: string;
    remaining_tokens: number;
}

export async function getUserPlans(): Promise<UserPlan[]> {
    const plans = await pb.collection<UserPlan>("plans").getFullList();
    return plans;
}

export async function getUserPlansMap(): Promise<Map<string, UserPlan>> {
    const plans = await getUserPlans();
    const plansMap = new Map<string, UserPlan>();

    plans.forEach((plan) => {
        plansMap.set(plan.id, plan);
    });

    return plansMap;
}

export async function getUserPlanDataByUserId(
    userId: string,
): Promise<DisplayPlan | undefined> {
    const user = await pb
        .collection<UserModel | undefined>("users")
        .getOne(userId);

    const plan = await pb
        .collection<UserPlan | undefined>("plans")
        .getOne(user?.current_plan ?? "");

    const displayPlan: DisplayPlan | undefined =
        user !== undefined && plan !== undefined
            ? {
                  id: plan.id,
                  name: plan.name,
                  remaining_tokens: user.tokens,
              }
            : undefined;

    return displayPlan;
}

const userPlans = {
    free: "kemt0gtyrxjahfh",
    monthly: "by4ucek98ed9hf0",
    lifetime: "ansp358mxg56ja9",
};

export async function updateUserPlanDataByUserId(
    userId: string,
    newUserPlan: string,
) {
    const newPlanId = userPlans[newUserPlan as keyof typeof userPlans];
    const plan = await pb
        .collection<UserPlan | undefined>("plans")
        .getOne(newPlanId);

    const newUserData: UserModel = {
        ...(pb.authStore.model as UserModel),
        current_plan: newPlanId,
        tokens: plan?.default_tokens ?? 1e72,
    };

    await pb.collection<UserModel>("users").update(userId, newUserData);
}
