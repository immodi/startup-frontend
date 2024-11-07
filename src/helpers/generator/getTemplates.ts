import axios from "axios";

type Template = {
    templates: Array<string>;
};

export async function getAllTemplates(token: string): Promise<Array<string>> {
    const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/templates`,
        {},
        {
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
        },
    );

    let data: Template;
    if (response.status < 299 && response.status > 199) {
        data = response.data;
    } else {
        data = { templates: ["report", "document"] };
    }

    return data.templates;
}

export function capitalizeFirstChar(str: string): string {
    if (!str) return str; // return empty string if str is falsy
    return str.charAt(0).toUpperCase() + str.slice(1);
}
