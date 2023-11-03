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