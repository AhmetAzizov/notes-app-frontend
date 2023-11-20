import { useEffect, useRef, useState } from 'react';
import { deleteNote, fetchNotes } from './network/notes_api';
import { Row, Container, Col, Button, Spinner, Alert, Modal } from 'react-bootstrap';
import Note from './components/Note';
import { Note as NoteModel } from './models/note';
import utilsStyle from "./styles/utils.module.css";
import styles from "./styles/app.module.css";
import AddNoteDialog from './components/AddNoteDialog';
import { AiOutlineFileAdd } from "react-icons/ai";
import DeleteNoteDialog from './components/DeleteNoteDialog';
import deleteDialogData from './utils/deleteDialogData';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [showDeletedAlert, setShowDeletedAlert] = useState(false);
  const [loadingState, setLoadingState] = useState(true);
  const [deleteNoteState, setDeleteNoteState] = useState<deleteDialogData>({ showDialog: false })

  useEffect(() => {
    // kasdkfsdkfsdfkasdf
    // setTimeout(async () => {
    //   await updateNotes();
    //   console.log("set loading state");
    //   setLoadingState(false);
    // }, 1000);

    (async () => {
      await updateNotes();
      setLoadingState(false);
    })()
  }, []);

  console.log("kaksdfsdf");


  async function updateNotes() {
    const fetchedNotes = await fetchNotes();

    fetchedNotes.sort((a, b) => {
      const date1 = new Date(a.updatedAt > a.createdAt ? a.updatedAt : a.createdAt).getTime();
      const date2 = new Date(b.updatedAt > b.createdAt ? b.updatedAt : b.createdAt).getTime();
      return date2 - date1;
    });

    setNotes(fetchedNotes);
  }

  async function onNoteSaved() {
    await updateNotes()
    setShowAddNoteDialog(false)
  }

  async function noteDelete(id: string) {
    try {
      await deleteNote(id);
      setDeleteNoteState({ showDialog: false });
      updateNotes();
      console.log("Card with ID of " + id + " deleted succesfully!");
    } catch (error) {
      console.error(error);
      alert(error)
    }
  }

  return (
    <>
      <Spinner className={styles.spinner} hidden={!loadingState}></Spinner>
      {!loadingState &&
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
                        setDeleteNoteState({ showDialog: true, deleteData: note });
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

          <DeleteNoteDialog
            deleteNoteState={deleteNoteState}
            onDismiss={() => {
              setDeleteNoteState({ showDialog: false });
            }}
            deleteNote={(id) => noteDelete(id)}
          />

          <Modal show={showDeletedAlert} onHide={() => setShowDeletedAlert(false)}>
            <Alert variant="warning" className='mb-0' dismissible onClose={() => setShowDeletedAlert(false)}>
              The message has been deleted
            </Alert>
          </Modal>
        </>
      }
    </>
  );
}

export default App;
