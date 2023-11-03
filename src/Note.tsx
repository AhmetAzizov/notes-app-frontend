import { Card } from 'react-bootstrap';
// @ts-ignore
import styles from "./styles/card.module.css";
import { Note as NoteModel } from './models/note';


interface NoteProps {
    note: NoteModel,
}

const Note = ({ note }: NoteProps) => {
    return (
        <Card className={styles.card}>
            <Card.Body className={styles.cardBody}>
                <Card.Title>{note.title}</Card.Title>
                <Card.Text className={styles.cardText}>
                    {note.text}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                Note Updated At: 2023/11/3 17:49:12
            </Card.Footer>
        </Card >
    );
}

export default Note;