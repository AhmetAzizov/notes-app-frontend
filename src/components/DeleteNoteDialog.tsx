import { Button, Modal } from "react-bootstrap";

interface dialogProps {
    showDialog: boolean,
    closeDialog: () => void,
}

const DeleteNoteDialog = ({ showDialog, closeDialog }: dialogProps) => {
    return (
        <>
            <Modal show={showDialog} onHide={closeDialog}>
                <Modal.Header >
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Some Note Title...</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => { }}>
                        Delete
                    </Button>
                    <Button variant="danger" onClick={() => { }}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteNoteDialog;