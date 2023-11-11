import { useEffect, useState } from 'react';
import { fetchNotes } from './network/notes_api';
import { Row, Container, Col, Button } from 'react-bootstrap';
import Note from './Note';
import { Note as NoteModel } from './models/note';
import utilsStyle from "./styles/utils.module.css";
import AddNoteDialog from './AddNoteDialog';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  useEffect(() => {
    getNotes();
  }, []);


  async function getNotes() {
    const notes = await fetchNotes();
    setNotes(notes);
  }

  return (
    <>
      <Button
        className={`${utilsStyle.centerItem} my-4`}
        onClick={() => setShowAddNoteDialog(true)}
      >
        Add new note
      </Button>
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

      {showAddNoteDialog && <AddNoteDialog
        onDismiss={() => setShowAddNoteDialog(false)}
        onNoteSaved={() => {
          setShowAddNoteDialog(false)
          getNotes()
        }}
      />}
    </>
  );
}

export default App;
