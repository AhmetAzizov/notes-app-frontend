import { Button, Modal } from "react-bootstrap";
import styles from "../styles/deleteDialog.module.css";
import deleteDialogData from "../utils/deleteDialogData";

interface dialogProps {
    deleteNoteState: deleteDialogData,
    onDismiss: () => void,
    deleteNote: (id: string) => void,
}

const DeleteNoteDialog = ({ deleteNoteState, onDismiss, deleteNote }: dialogProps) => {
    return (
        <>
            <Modal show={deleteNoteState.showDialog} onHide={onDismiss}>
                <Modal.Header >
                    <Modal.Title>You are about to delete this Note:</Modal.Title>
                </Modal.Header>
                <Modal.Body>{deleteNoteState.deleteData?.title}</Modal.Body>
                <Modal.Body className={styles.dialogBody}>{deleteNoteState.deleteData?.text}</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => deleteNote(deleteNoteState.deleteData!._id)}>
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