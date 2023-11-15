import { Button, Modal } from "react-bootstrap";
import { Note as NoteModel } from "../models/note";
import styles from "../styles/deleteDialog.module.css";

interface dialogProps {
    showDialog: boolean,
    onDismiss: () => void,
    deleteNote: NoteModel,
}

const DeleteNoteDialog = ({ showDialog, onDismiss: closeDialog, deleteNote }: dialogProps) => {
    return (
        <>
            <Modal show={showDialog} onHide={closeDialog}>
                <Modal.Header >
                    <Modal.Title>You are about to delete this Note:</Modal.Title>
                </Modal.Header>
                <Modal.Body>{deleteNote.title}</Modal.Body>
                <Modal.Body className={styles.dialogBody}>{deleteNote?.text}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => { }}>
                        Delete
                    </Button>
                    <Button variant="danger" onClick={closeDialog}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteNoteDialog;