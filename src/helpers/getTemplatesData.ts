const defaultTemplates: Map<string, Array<string>> = new Map([
    ["document", ["title"]],
    ["report", ["title", "name", "affiliation"]],
]);

function getTemplateData(templateName: string): string[] {
    return (
        defaultTemplates.get(templateName) || defaultTemplates.get("document")!
    );
}

export default getTemplateData;
