import { useEffect, useRef, useState } from 'react';
import { deleteNote, fetchNotes } from './network/notes_api';
import { Row, Container, Col, Button } from 'react-bootstrap';
import Note from './components/Note';
import { Note as NoteModel } from './models/note';
import utilsStyle from "./styles/utils.module.css";
import styles from "./styles/app.module.css";
import AddNoteDialog from './components/AddNoteDialog';
import { AiOutlineFileAdd } from "react-icons/ai";
import DeleteNoteDialog from './components/DeleteNoteDialog';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const deleteData = useRef<NoteModel | null>(null);

  useEffect(() => {
    updateNotes();
  }, []);

  async function updateNotes() {
    const fetchedNotes = await fetchNotes();

    fetchedNotes.sort((a, b) => {
      const date1 = new Date(a.updatedAt > a.createdAt ? a.updatedAt : a.createdAt).getTime();
      const date2 = new Date(b.updatedAt > b.createdAt ? b.updatedAt : b.createdAt).getTime();
      return date2 - date1;
    });

    setNotes(fetchedNotes);
  }

  function onNoteSaved() {
    setShowAddNoteDialog(false)
    updateNotes()
  }

  async function noteDelete(id: string) {
    try {
      await deleteNote(id);
      setShowDeleteDialog(false);
      updateNotes();
      console.log("Card with ID of " + id + " deleted succesfully!");
    } catch (error) {
      console.error(error);
      alert(error)
    }
  }

  return (
    <>
      <Button
        className={`${utilsStyle.centerItem} ${styles.addButton} my-4`}
        onClick={() => setShowAddNoteDialog(true)}
      >
        <AiOutlineFileAdd /> Add new note
      </Button>
      <Container className='pb-4'>
        <Row className='g-4' xs={1} sm={2} md={3} xl={4}>
          {
            notes.map((note, index) => (
              <Col key={index}>
                <Note
                  note={note}
                  onDelete={(note) => {
                    deleteData.current = note;
                    setShowDeleteDialog(true);
                  }} />
              </Col>
            ))
          }
        </Row>
      </Container>

      <AddNoteDialog
        showDialog={showAddNoteDialog}
        onDismiss={() => setShowAddNoteDialog(false)}
        onNoteSaved={() => onNoteSaved()}
      />

      {deleteData.current &&
        <DeleteNoteDialog
          showDialog={showDeleteDialog}
          onDismiss={() => {
            setShowDeleteDialog(false)
            deleteData.current = null;
          }}
          deleteNoteData={deleteData.current}
          deleteNote={(id) => noteDelete(id)}
        />
      }
    </>
  );
}

export default App;
