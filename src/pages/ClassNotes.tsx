import React, {useEffect, useState} from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle, Fab} from '@mui/material';
import { storage } from '../firebase/firebaseSetup';
import { ref, uploadBytes, list } from "firebase/storage";
import AddIcon from '@mui/icons-material/Add';
import {useNavigate, useParams} from 'react-router-dom';
import Button from "@mui/material/Button";

export default function ClassNotes() {
  const { subject, classId } = useParams();
  const [uploadPopupOpen, setUploadPopupOpen] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null)
  const [notes, setNotes] = useState<any[]>([])

  function handleOpenPopup() {
    setUploadPopupOpen(true)
  }

  function handleClosePopup() {
    setUploadPopupOpen(false)
  }

  const navigate= useNavigate()

  async function getNotes() {
    // get notes from firebase
    const listRef = ref(storage, 'notes/' + subject + "/" + classId + "/");

    // Fetch the first page of 100.
    const firstPage = await list(listRef, {maxResults: 30});
    setNotes(firstPage.items);

    // Use the result.
    console.log(firstPage.items)
    // processItems(firstPage.items)
    // processPrefixes(firstPage.prefixes)

    // Fetch the second page if there are more elements.
    if (firstPage.nextPageToken) {
      const secondPage = await list(listRef, {
        maxResults: 30,
        pageToken: firstPage.nextPageToken,
      });
      // processItems(secondPage.items)
      // processPrefixes(secondPage.prefixes)
    }
  }

  function handleUploadNote(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return

    const storageRef = ref(storage, 'notes/' + subject + '/' + classId + '/' + event.target.files[0].name);

    const metadata = {
      contentType: 'application/pdf',
      timeCreated: new Date(event.target.files[0].lastModified),
    }

    uploadBytes(storageRef, event.target.files[0], metadata).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    }).then(() => {
      handleClosePopup()
    })
  }

  async function handleOpenPDF(note: any) {
    navigate( '/' + subject + '/' + classId + '/' + note.name)
  }


  useEffect(() => {
    getNotes().then(r => console.log(r))
  }, [])


  return (
    <div>
      {/** Upload PopUp **/}
      <Dialog
        open={uploadPopupOpen}
        onClose={handleClosePopup}
      >
        <DialogTitle>Upload Note</DialogTitle>
        <DialogContent>
          <input type="file" onChange={handleUploadNote} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup}>Cancel</Button>
          <Button onClick={handleClosePopup}>Done</Button>
        </DialogActions>
      </Dialog>

      <h1>Topic Notes</h1>
      <h2> subject: {subject} </h2>
      <h2> class: {classId} </h2>
      <Fab color="primary" aria-label="add" onClick={handleOpenPopup}>
        <AddIcon/>
      </Fab>
      <div>
        <h2>Notes</h2>
        {notes.map(note => {
          return (
            <div key={note.name}>
              <Button onClick={() => handleOpenPDF(note)}>
                {note.name}
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  );
}