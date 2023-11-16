import { Button, Modal } from "react-bootstrap";
import { Note as NoteModel } from "../models/note";
import styles from "../styles/deleteDialog.module.css";

interface dialogProps {
    showDialog: boolean,
    onDismiss: () => void,
    deleteNoteData: NoteModel,
    deleteNote: (id: string) => void,
}

const DeleteNoteDialog = ({ showDialog, onDismiss, deleteNoteData, deleteNote }: dialogProps) => {
    return (
        <>
            <Modal show={showDialog} onHide={onDismiss}>
                <Modal.Header >
                    <Modal.Title>You are about to delete this Note:</Modal.Title>
                </Modal.Header>
                <Modal.Body>{deleteNoteData.title}</Modal.Body>
                <Modal.Body className={styles.dialogBody}>{deleteNoteData.text}</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => deleteNote(deleteNoteData._id)}>
                        Delete
                    </Button>
                    <Button variant="primary" onClick={onDismiss}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteNoteDialog;