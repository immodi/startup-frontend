export function isFirstTimeUser() {
    const key = "firstTimeUser";
    const isFirstTime = localStorage.getItem(key);

    if (!isFirstTime || isFirstTime === "false") {
        return true; // Indicates it's the first time
    }

    return false; // Indicates the user has been here before
}

export function assignUser() {
    const key = "firstTimeUser";
    localStorage.setItem(key, "true");
}
