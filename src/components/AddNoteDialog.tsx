import { Button, Modal, Form } from "react-bootstrap";
import utilsStyle from "../styles/utils.module.css";
import { useForm } from "react-hook-form";
import { NoteInput, createNote } from "../network/notes_api";

interface addNoteDialogProps {
    showDialog: boolean,
    onDismiss: () => void,
    onNoteSaved: () => void,
}

const AddNoteDialog = ({ showDialog, onDismiss, onNoteSaved }: addNoteDialogProps) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<NoteInput>();

    async function onSubmit(note: NoteInput) {
        try {
            await createNote(note);
            onNoteSaved();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (
        <Modal show={showDialog} onHide={onDismiss}>
            <Modal.Header closeButton>
                <Modal.Title>Save Note</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form id="addNoteForm" onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-2">
                        <Form.Label>Note Title:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Title"
                            isInvalid={!!errors.title}
                            {...register("title", { required: "Required" })}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.title?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-2">
                        <Form.Label>Note Text</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            isInvalid={!!errors.text}
                            {...register("text")}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.text?.message}
                        </Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    className={utilsStyle.centerItem}
                    type="submit"
                    form="addNoteForm"
                    disabled={isSubmitting}
                >
                    Save Note
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddNoteDialog;