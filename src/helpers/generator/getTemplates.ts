import { CardProps } from "@/interfaces/designer/cardsProps";
import { TemplateData } from "@/interfaces/designer/exportTemplateData";
import axios from "axios";
import { RecordModel } from "pocketbase";

import pb from "@/interfaces/auth/pocketBase";

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

    if (response.status < 299 && response.status > 199) {
        const data: Array<Array<string>> = response.data;

        return data;
    } else {
        throw new Error("Failed to fetch templates");
    }
}

export async function createTemplate(
    templateData: TemplateData,
    cards: CardProps[],
) {
    const data = {
        name: templateData.name,
        html: templateData.html,
        canvas_elements: JSON.stringify(templateData.canvasElements, null),
        identifiers: JSON.stringify(templateData.data, null),
        source_template: "dg92oyo86lhufpt",
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

                cards[cards.length - 1].id = res.id;

                pb.collection("users").update(pb.authStore.model?.id, userData);
            });
        });

    return true;
}

export async function updateTemplateById(
    newTemplate: TemplateData,
): Promise<RecordModel> {
    const data = {
        name: newTemplate.name,
        html: newTemplate.html,
        canvas_elements: JSON.stringify(newTemplate.canvasElements, null),
        identifiers: JSON.stringify(newTemplate.data, null),
    };

    const record = await pb
        .collection("templates")
        .update(newTemplate.id, data);

    return record;
}

export async function getTemplateDataById(templateId: string) {
    const record = await pb.collection("templates").getOne(templateId);

    return record;
}

export async function deleteTemplate(templateId: string) {
    await pb.collection("templates").delete(templateId);
}

export function capitalizeFirstChar(str: string): string {
    if (!str) return str; // return empty string if str is falsy
    return str.charAt(0).toUpperCase() + str.slice(1);
}
