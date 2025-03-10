export default function computeHTML(
    elementRef: React.RefObject<HTMLDivElement>,
): string {
    if (!elementRef.current) return "";

    const canvas = elementRef.current;
    const clonedCanvas = canvas.cloneNode(true) as HTMLElement;
    clonedCanvas.style.backgroundColor = "#FFFFFF";
    const borderClasses = [
        "border-2",
        "shadow-lg",
        "border-[#4A00E0]",
        "dark:border-[#7A1CAC]",
        "idle",
        "selected",
    ];
    borderClasses.forEach((borderClass) => {
        if (clonedCanvas.classList.contains(borderClass)) {
            clonedCanvas.classList.remove(borderClass);
        }
    });

    Array.from(clonedCanvas.children).forEach((canvasElement) => {
        if (canvasElement.classList.contains("spacer-div")) {
            canvasElement.innerHTML = "<br />";
        }

        if (canvasElement.classList.contains("remove-this-at-export")) {
            canvasElement.remove();
        }

        if (canvasElement.classList.contains("whitespace-pre-wrap")) {
            canvasElement.classList.remove("whitespace-pre-wrap");
        }

        Array.from(canvasElement.children).forEach((canvasElementChild) => {
            if (
                canvasElementChild.classList.contains("remove-this-at-export")
            ) {
                canvasElementChild.remove();
            }

            if (canvasElementChild.classList.contains("whitespace-pre-wrap")) {
                canvasElementChild.classList.remove("whitespace-pre-wrap");
            }
        });
    });

    // const cssStyles = Array.from(document.head.getElementsByTagName("style"))
    //     .map((style) => style.innerHTML)
    //     .join("");

    // const styleElement = document.createElement("style");
    // styleElement.innerHTML = cssStyles;

    // clonedCanvas.appendChild(styleElement);

    return clonedCanvas.outerHTML;
}
