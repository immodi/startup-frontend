export interface Template {
    id: string;
    name: string;
}

export interface DbTemplate {
    canvas_elements: Array<string>; // Replace `any` with a more specific type if you know the structure of `canvas_elements`
    collectionId: string;
    collectionName: string;
    created: string; // ISO date string
    html: string; // HTML string
    id: string;
    identifiers: Array<string>; // Replace `any` with a more specific type if applicable
    name: string;
    updated: string; // ISO date string
}
