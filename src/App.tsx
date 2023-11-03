import { useEffect, useState } from 'react';
import { fetchNotes } from './network/notes_api';
// import Note from "./models/note";
import { Row, Container, Col } from 'react-bootstrap';
import Note from './Note';
import { Note as NoteModel } from './models/note';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);

  useEffect(() => {
    const getNotes = async () => {
      const notes = await fetchNotes();
      setNotes(notes);
    }
    getNotes();
  }, []);


  return (
    <>
      <Container>
        <Row className='g-4' xs={1} sm={2} md={3} xl={4}>
          {
            notes.map((note, index) => (
              <Col key={index} >
                <Note note={note} />
              </Col>
            ))
          }
        </Row>
      </Container>
    </>
  );
}

export default App;
