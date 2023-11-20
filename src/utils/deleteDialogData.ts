import { Note } from "../models/note";

export default interface deleteDialogData {
    showDialog: boolean,
    deleteData?: Note,
}