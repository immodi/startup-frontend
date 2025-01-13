import { DbTemplate } from "@/interfaces/generator/template";
import { getTemplateDataById } from "./getTemplates";

const defaultTemplates: Map<string, Array<string>> = new Map([
    ["document", ["title"]],
    ["paragraph", ["title"]],
    ["report", ["title", "name", "affiliation"]],
]);

async function getTemplateKeyValuePairs(templateId: string): Promise<string[]> {
    const templateData = (await getTemplateDataById(templateId)) as DbTemplate;

    // const identifiers: string[] = JSON.parse(templateData.identifiers);

    return templateData.identifiers ?? defaultTemplates.get("document")!;
}

export default getTemplateKeyValuePairs;
