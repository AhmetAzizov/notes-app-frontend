import { Card } from 'react-bootstrap';
import styles from "./styles/card.module.css";
import { Note as NoteModel } from './models/note';
import formatDate from './utils/formatDate';

interface NoteProps {
    note: NoteModel,
}

const Note = ({ note }: NoteProps) => {

    const timeInfo = (note.updatedAt > note.createdAt) ? `Updated: ${formatDate(note.createdAt)}` : `Created: ${formatDate(note.createdAt)}`

    return (
        <Card className={styles.card}>
            <Card.Body className={styles.cardBody}>
                <Card.Title>{note.title}</Card.Title>
                <Card.Text className={styles.cardText}>
                    {note.text}
                </Card.Text>
            </Card.Body>
            <Card.Footer className='text-muted'>
                {timeInfo}
            </Card.Footer>
        </Card >
    );
}

export default Note;