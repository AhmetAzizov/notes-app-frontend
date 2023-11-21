import { Card } from 'react-bootstrap';
import styles from "../styles/card.module.css";
import { Note as NoteModel } from '../models/note';
import formatDate from '../utils/formatDate';
import { MdDelete } from "react-icons/md";

interface NoteProps {
    note: NoteModel,
    onDelete: (note: NoteModel) => void,
    onClick: (note: NoteModel) => void,
}

const Note = ({ note, onDelete, onClick }: NoteProps) => {

    const timeInfo = (note.updatedAt > note.createdAt) ? `Updated: ${formatDate(note.updatedAt)}` : `Created: ${formatDate(note.createdAt)}`;

    return (
        <>
            <Card className={styles.card} onClick={() => onClick(note)}>
                <Card.Body className={styles.cardBody}>
                    <Card.Title className={styles.cardTitle}>
                        {note.title}
                        <MdDelete
                            className={`text-muted ${styles.noteDelete}`}
                            // onClick={() => noteDelete(note._id)}
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(note)
                            }}
                        >
                        </MdDelete>
                    </Card.Title>
                    <Card.Text className={styles.cardText}>
                        {note.text}
                    </Card.Text>
                </Card.Body>
                <Card.Footer className='text-muted'>
                    {timeInfo}
                </Card.Footer>
            </Card >
        </>
    );
}

export default Note;