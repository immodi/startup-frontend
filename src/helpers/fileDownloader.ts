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

        if (response.status > 199 && response.status < 300) {
            // Creating a URL for the file
            const fileURL = window.URL.createObjectURL(
                new Blob([response.data]),
            );
            const fileLink = document.createElement("a");

            // Set the file name and trigger the download
            fileLink.href = fileURL;
            fileLink.setAttribute("download", "data.pdf"); // Replace with the actual file name
            document.body.appendChild(fileLink);

            // Programmatically click the link to trigger the download
            fileLink.click();
            fileLink.remove();
        }

        setIsLoading(false);
    } catch (error) {
        setIsLoading(false);
        console.error("Error downloading the file:", error);
    }
}
