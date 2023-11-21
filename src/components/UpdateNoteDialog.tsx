import { Button, Modal, Form } from "react-bootstrap";
import utilsStyle from "../styles/utils.module.css";
import { useForm } from "react-hook-form";
import { NoteInput, createNote } from "../network/notes_api";
import { UpdateNoteData } from "../utils/updateNoteData";

interface updateNoteDialogProps {
    updateNoteState: UpdateNoteData,
    onDismiss: () => void,
    onNoteUpdated: () => void,
}

const UpdateNoteDialog = ({ updateNoteState, onDismiss, onNoteUpdated }: updateNoteDialogProps) => {

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<NoteInput>({
        defaultValues: {
            title: updateNoteState.updateData?.title,
            text: updateNoteState.updateData?.text,
        }
    });

    async function onSubmit(note: NoteInput) {
        try {
            reset(); // resets the fields
            await createNote(note);
            onNoteUpdated();
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (
        <Modal show={updateNoteState.showDialog} onHide={() => {
            onDismiss();
            // reset();
        }}>
            <Modal.Header closeButton>
                <Modal.Title>Update Note</Modal.Title>
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
                            placeholder="Text"
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

export default UpdateNoteDialog;