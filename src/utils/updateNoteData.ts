import { Note } from "../models/note";

export interface UpdateNoteData {
    showDialog: boolean,
    updateData?: Note,
}