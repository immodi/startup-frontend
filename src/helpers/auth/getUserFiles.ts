import PocketBase from "pocketbase";

const pb = new PocketBase(import.meta.env.VITE_BACKEND_URL);

interface FileRecord {
    collectionId: string; // ID of the collection
    collectionName: string; // Name of the collection
    created: string; // Timestamp of when the record was created
    file: string; // Name of the file (blob)
    id: string; // Unique ID of the record
    owner: string; // ID of the user who owns the file
    updated: string; // Timestamp of when the record was last updated
}

export interface UserFile {
    name: string;
    fileUrl: string;
}

export async function getRecentUserFiles(): Promise<UserFile[]> {
    const files = await pb.collection<FileRecord>("files").getFullList({
        filter: `owner = '${pb.authStore.model?.id}'`,
    });

    return files.map((file) => {
        return {
            name: file.file,
            fileUrl: pb.getFileUrl(file, file.file, {
                download: true, // Optional: Forces the browser to download the file
            }),
        };
    });
}
