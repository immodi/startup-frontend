import axios from "axios";

export default async function fileDownloader(
    topic: string,
    templateString: string,
    data: Map<string, string>,
    token: string,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/generate`,
            {
                topic: topic,
                template: templateString,
                data: Object.fromEntries(data),
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                responseType: "blob",
            },
        );

        if (response.status >= 200 && response.status < 300) {
            // Extract filename from Content-Disposition header
            const contentDisposition =
                response.headers["content-disposition"] ||
                response.headers["Content-Disposition"];

            let filename = "document.pdf"; // Default name

            if (contentDisposition) {
                // Handle different Content-Disposition format possibilities
                const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                const matches = filenameRegex.exec(contentDisposition);
                if (matches != null && matches[1]) {
                    // Remove quotes if present
                    filename = matches[1].replace(/['"]/g, "");
                    // Handle UTF-8 encoding if present
                    if (filename.toLowerCase().startsWith("utf-8''")) {
                        filename = decodeURIComponent(filename.substring(7));
                    }
                }
            }

            // Create blob URL
            const blob = new Blob([response.data], { type: "application/pdf" });
            const fileURL = window.URL.createObjectURL(blob);

            // Create and trigger download
            const fileLink = document.createElement("a");
            fileLink.href = fileURL;
            fileLink.setAttribute("download", filename);

            // Append to body, click, and cleanup
            document.body.appendChild(fileLink);
            fileLink.click();

            // Cleanup
            document.body.removeChild(fileLink);
            window.URL.revokeObjectURL(fileURL); // Free up memory
        }
        setIsLoading(false);
    } catch (error) {
        setIsLoading(false);
        console.error("Error downloading the file:", error);
        throw error; // Re-throw to allow handling by caller
    }
}
