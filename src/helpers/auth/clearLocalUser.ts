export function deleteLocalUser(): void {
    if (localStorage.getItem("localState")) {
        localStorage.removeItem("localState");
    }
}
