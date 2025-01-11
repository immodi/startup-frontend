import axios from "axios";
import PocketBase from "pocketbase";

const pb = new PocketBase(import.meta.env.VITE_BACKEND_URL);

// type Template = {
//     templates: Array<string>;
// };

export async function getAllTemplates(
    token: string,
): Promise<Array<Array<string>>> {
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

    let data: Array<Array<string>>;
    if (response.status < 299 && response.status > 199) {
        data = response.data;

        return data;
    } else {
        // data = [["report"], ["document"], ["paragraph"]];
        throw new Error("Failed to fetch templates");
    }
}

export async function createTemplate(name: string, html: string) {
    const data = {
        name: name,
        html: html,
    };

    pb.collection("templates")
        .create(data)
        .then((res) => {
            getAllTemplates(pb.authStore.token).then((templates) => {
                const userData = {
                    user_templates: [
                        ...templates.map((item) => item[0]),
                        res.id,
                    ],
                };

                pb.collection("users").update(pb.authStore.model?.id, userData);
            });
        });
}

export function capitalizeFirstChar(str: string): string {
    if (!str) return str; // return empty string if str is falsy
    return str.charAt(0).toUpperCase() + str.slice(1);
}
