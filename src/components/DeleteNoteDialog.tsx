import { Button, Modal } from "react-bootstrap";
import styles from "../styles/deleteDialog.module.css";
import { DeleteDialogData } from "../utils/deleteDialogData";
import { useState } from "react";

interface dialogProps {
    deleteNoteState: DeleteDialogData,
    onDismiss: () => void,
    deleteNote: (id: string) => Promise<void>,
}

const DeleteNoteDialog = ({ deleteNoteState, onDismiss, deleteNote }: dialogProps) => {
    const [buttonDisabled, setButtonDisabled] = useState(false);

    return (
        <>
            <Modal show={deleteNoteState.showDialog} onHide={onDismiss}>
                <Modal.Header >
                    <Modal.Title>You are about to delete this Note:</Modal.Title>
                </Modal.Header>
                <Modal.Body>{deleteNoteState.deleteData?.title}</Modal.Body>
                <Modal.Body className={styles.dialogBody}>{deleteNoteState.deleteData?.text}</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" disabled={buttonDisabled} onClick={() => {
                        (async () => {
                            setButtonDisabled(true);
                            await deleteNote(deleteNoteState.deleteData!._id)
                            setButtonDisabled(false);
                        })()
                    }
                    }>
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