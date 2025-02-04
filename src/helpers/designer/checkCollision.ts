function checkCollision(
    draggableElement: HTMLElement,
    canvasRef: React.RefObject<HTMLDivElement>,
): boolean {
    if (!draggableElement || !canvasRef.current) return false;

    const draggableRect = draggableElement.getBoundingClientRect();
    const targetRect = canvasRef.current.getBoundingClientRect();

    // Check for collision
    const collision = !(
        draggableRect.right < targetRect.left ||
        draggableRect.left > targetRect.right ||
        draggableRect.bottom < targetRect.top ||
        draggableRect.top > targetRect.bottom
    );

    // // Check if completely inside
    // const inside =
    //     draggableRect.left >= targetRect.left &&
    //     draggableRect.right <= targetRect.right &&
    //     draggableRect.top >= targetRect.top &&
    //     draggableRect.bottom <= targetRect.bottom;

    return collision;
}

export default checkCollision;
