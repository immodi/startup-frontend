export default function computeHTML(
    elementRef: React.RefObject<HTMLDivElement>,
): string {
    if (!elementRef.current) return "";

    const element = elementRef.current;
    const clonedElement = element.cloneNode(true) as HTMLElement;
    clonedElement.style.backgroundColor = "#FFFFFF";

    Array.from(clonedElement.children).forEach((canvasElement) => {
        if (canvasElement.classList.contains("spacer-div")) {
            canvasElement.innerHTML = "<br />";
        }

        if (canvasElement.classList.contains("remove-this-at-export")) {
            canvasElement.remove();
        }

        Array.from(canvasElement.children).forEach((canvasElementChild) => {
            if (
                canvasElementChild.classList.contains("remove-this-at-export")
            ) {
                canvasElementChild.remove();
            }
        });
    });

    const cssStyles = Array.from(document.head.getElementsByTagName("style"))
        .map((style) => style.innerHTML)
        .join("");

    const styleElement = document.createElement("style");
    styleElement.innerHTML = cssStyles;

    clonedElement.appendChild(styleElement);
    return clonedElement.outerHTML;
}
