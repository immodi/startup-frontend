import { AnimationState } from "@/components/routes/designer/Elements";

export interface ComponentsIndexInterface {
    currentIndex: number;
    subArrayCount: number;
}

export function scrollDown(
    currentComponentsInterface: ComponentsIndexInterface,
    setCurrentComponentsInterface: (ci: ComponentsIndexInterface) => void,
    setScrollingAnimationState: (scrollState: AnimationState) => void,
) {
    const maxIndex = currentComponentsInterface.subArrayCount - 1;
    const newIndex =
        maxIndex >= currentComponentsInterface.currentIndex + 1
            ? currentComponentsInterface.currentIndex + 1
            : maxIndex;

    setCurrentComponentsInterface({
        ...currentComponentsInterface,
        currentIndex: newIndex,
    });

    setScrollingAnimationState("down");
}

export function scrollUp(
    currentComponentsInterface: ComponentsIndexInterface,
    setCurrentComponentsInterface: (ci: ComponentsIndexInterface) => void,
    setScrollingAnimationState: (scrollState: AnimationState) => void,
) {
    const newIndex =
        currentComponentsInterface.currentIndex - 1 < 0
            ? 0
            : currentComponentsInterface.currentIndex - 1;

    setCurrentComponentsInterface({
        ...currentComponentsInterface,
        currentIndex: newIndex,
    });

    setScrollingAnimationState("up");
}
