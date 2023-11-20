import { Note } from "../models/note";

export interface DeleteDialogData {
    showDialog: boolean,
    deleteData?: Note,
}