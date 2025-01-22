export interface UserModel {
    avatar: string;
    collectionId: string;
    collectionName: string;
    created: string;
    email: string;
    emailVisibility: boolean;
    id: string;
    name: string;
    updated: string;
    user_files: string[]; // Array of strings
    user_templates: string[]; // Array of strings
    username: string;
    verified: boolean;
    token: string;
}
