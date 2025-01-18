export default function removeByIndex<T>(array: T[], index: number): T[] {
    if (index < 0 || index >= array.length) {
        return [...array];
    }

    return [...array.slice(0, index), ...array.slice(index + 1)];
}
