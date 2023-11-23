import { useEffect, useState } from 'react';
import { deleteNote, fetchNotes } from './network/notes_api';
import { Row, Container, Col, Button, Spinner, Alert, Modal, Navbar, Nav } from 'react-bootstrap';
import Note from './components/Note';
import { Note as NoteModel } from './models/note';
import utilsStyle from "./styles/utils.module.css";
import styles from "./styles/app.module.css";
import AddNoteDialog from './components/AddNoteDialog';
import { AiOutlineFileAdd } from "react-icons/ai";
import DeleteNoteDialog from './components/DeleteNoteDialog';
import { DeleteDialogData } from './utils/deleteDialogData';
import { AlertData, AlertType } from './utils/alertData';
import UpdateNoteDialog from './components/UpdateNoteDialog';
import { UpdateNoteData } from './utils/updateNoteData';

function App() {
  const [notes, setNotes] = useState<NoteModel[]>([]);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [updateNoteState, setUpdateNoteState] = useState<UpdateNoteData>({ showDialog: false });
  const [alertData, setAlertData] = useState<AlertData>({ showDialog: false });
  const [deleteNoteState, setDeleteNoteState] = useState<DeleteDialogData>({ showDialog: false })
  const [loadingState, setLoadingState] = useState(true);

  useEffect(() => {
    (async () => {
      await getNotes();
      setLoadingState(false);
    })()
  }, []);

  async function getNotes() {
    const fetchedNotes = await fetchNotes();

    fetchedNotes.sort((a, b) => {
      const date1 = new Date(a.updatedAt > a.createdAt ? a.updatedAt : a.createdAt).getTime();
      const date2 = new Date(b.updatedAt > b.createdAt ? b.updatedAt : b.createdAt).getTime();
      return date2 - date1;
    });

    setNotes(fetchedNotes);
  }

  function showAlert(data: string, alertType: AlertType) {
    setAlertData({ showDialog: true, content: data, dialogAlertType: alertType });

    setTimeout(() => {
      setAlertData({ showDialog: false });
    }, 1000);
  }

  async function noteSaved() {
    try {
      setShowAddNoteDialog(false)
      await getNotes();
      showAlert("Note saved!", "success");
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  async function noteUpdated() {
    try {
      setUpdateNoteState({ showDialog: false });
      await getNotes();
      showAlert("Note Updated!", "info");
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  async function noteDeleted(id: string) {
    try {
      await deleteNote(id);
      await getNotes();
      setDeleteNoteState({ showDialog: false });
      showAlert("Note deleted!", "danger");
      console.log("Card with ID of " + id + " deleted succesfully!");
    } catch (error) {
      console.error(error);
      alert(error)
    }
  }

  const navigation = (
    <Navbar expand="md" className={styles.navBar}>
      <Container>
        <Navbar.Brand href="#home" className={styles.navBrand}>Azizov's Note Application</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav style={{ marginLeft: "auto" }}>
            <Nav.Link href="#home">Notes</Nav.Link>
            <Nav.Link href="#link">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )

  const notesGrid = (
    <Container className='pb-4'>

      <Button
        className={`${utilsStyle.centerItem} ${styles.addButton} my-4`}
        onClick={() => setShowAddNoteDialog(true)}
      >
        <AiOutlineFileAdd />
        Add new note
      </Button>

      <Row className='g-4' xs={1} sm={2} md={3} xl={4}>
        {
          notes.map((note, index) => (
            <Col key={index}>
              <Note
                note={note}
                onDelete={(note) => {
                  setDeleteNoteState({ showDialog: true, deleteData: note });
                }}
                onClick={(updateNote) => {
                  setUpdateNoteState({ showDialog: true, updateData: updateNote })
                }}
              />
            </Col>
          ))
        }
      </Row>
    </Container>
  );

  return (
    <>
      {navigation}

      <Spinner className={styles.loadingSpinner} hidden={!loadingState}></Spinner>

      {!loadingState && notesGrid}

      <Modal show={alertData.showDialog} onHide={() => setAlertData({ showDialog: false })}>
        <Alert variant={alertData.dialogAlertType} className='mb-0' dismissible onClose={() => setAlertData({ showDialog: false })}>
          {alertData.content}
        </Alert>
      </Modal>

      <AddNoteDialog
        showDialog={showAddNoteDialog}
        onDismiss={() => setShowAddNoteDialog(false)}
        onNoteSaved={() => noteSaved()}
      />

      {updateNoteState.updateData &&
        <UpdateNoteDialog
          updateNoteState={updateNoteState}
          onDismiss={() => setUpdateNoteState({ showDialog: false })}
          onNoteUpdated={() => noteUpdated()}
        />}

      <DeleteNoteDialog
        deleteNoteState={deleteNoteState}
        onDismiss={() => {
          setDeleteNoteState({ showDialog: false });
        }}
        deleteNote={(id) => noteDeleted(id)}
      />
    </>
  );
}

export default App;
