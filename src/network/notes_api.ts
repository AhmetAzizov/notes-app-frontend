import { Note as NoteModel } from "../models/note";

async function fetchData(input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if (response.ok) {
        return response;
    } else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        throw Error(errorMessage);
    }
};

export async function fetchNotes(): Promise<NoteModel[]> {
    const response = await fetchData("/notes", { method: "GET" });
    return response.json();
}

export interface NoteInput {
    title: string,
    text?: string,
}

export async function createNote(note: NoteInput): Promise<NoteModel> {
    const response = await fetchData("/notes",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(note),
        });

    return response.json();
}

export async function updateNote(id: string, note: NoteInput): Promise<NoteModel> {
    const response = await fetchData("/notes/" + id,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(note),
        })

    return response.json();
}

export async function deleteNote(id: string) {
    await fetchData("/notes/" + id, { method: "DELETE" });
}