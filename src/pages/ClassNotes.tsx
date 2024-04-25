import React, {useEffect, useState} from 'react';
import {Dialog, DialogActions, DialogContent, DialogTitle, Fab} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { storage } from '../firebase/firebaseSetup';
import { ref, uploadBytes, list } from "firebase/storage";
import AddIcon from '@mui/icons-material/Add';
import {useNavigate, useParams} from 'react-router-dom';
import Button from "@mui/material/Button";
import BackButton from "../components/BackButton";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import styles from "../styles/classNotes.module.css"

export default function ClassNotes() {
  const {subject, classId} = useParams();
  const [uploadPopupOpen, setUploadPopupOpen] = useState<boolean>(false);
  const [uploadDate, setUploadDate] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null)
  const [notes, setNotes] = useState<any[]>([])

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  function handleOpenPopup() {
    setUploadPopupOpen(true)
  }

  function handleClosePopup() {
    setFile(null)
    setUploadPopupOpen(false)
  }

  const navigate = useNavigate()

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

  function handleNoteInput (event: any) {
    if (!event.target.files[0]) return
    setFile(event.target.files[0])
  }

  function handleUploadNote() {
    if (file == null) return

    const storageRef = ref(storage, 'notes/' + subject + '/' + classId + '/' + file.name);

    const metadata = {
      contentType: 'application/pdf',
      customMetadata: {
        'classDate': uploadDate.toString().slice(0, 16),
      },
    }

    uploadBytes(storageRef, file, metadata).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    }).then(() => {
      handleClosePopup()
    })
  }

  async function handleOpenPDF(note: any) {
    navigate('/' + subject + '/' + classId + '/' + note.name)
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
          <div>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              color={"primary"}
            >
              Upload file
              <VisuallyHiddenInput type="file" onChange={handleNoteInput}/>
            </Button>
            <p>
              {file?.name}
            </p>
          </div>
        </DialogContent>
        <DialogContent>
          <DatePicker value={uploadDate} onChange={setUploadDate} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup}>Cancel</Button>
          <Button onClick={handleUploadNote}>Upload</Button>
        </DialogActions>
      </Dialog>

      <BackButton />
      <img className={styles.headImg} src={require('../images/Class.png')}/>
      <h1>Topic Notes</h1>
      <h2> Subject: {subject} </h2>
      <h2> Class: {classId} </h2>
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