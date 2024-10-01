import axios from "axios";
import getAllTemplates from "./getTemplates";

export default async function fileDownloader(
    topic: string,
    templateString: string,
    data: Map<string, string>,
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) {
    try {
        // Making a POST request
        const templatesObject = getAllTemplates();
        const token: string = import.meta.env.VITE_USER_TOKEN;

        const response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/generate`,
            {
                topic: topic,
                template: templatesObject.get(templateString),
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

        // Creating a URL for the file
        const fileURL = window.URL.createObjectURL(new Blob([response.data]));
        const fileLink = document.createElement("a");

        // Set the file name and trigger the download
        fileLink.href = fileURL;
        fileLink.setAttribute("download", "data.pdf"); // Replace with the actual file name
        document.body.appendChild(fileLink);

        // Programmatically click the link to trigger the download
        fileLink.click();
        fileLink.remove();
        setIsLoading(false);
    } catch (error) {
        setIsLoading(false);
        console.error("Error downloading the file:", error);
    }
}
