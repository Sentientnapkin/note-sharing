import React, {useCallback, useEffect, useRef, useState} from 'react';
import BackButton from '../components/BackButton';
import styles from '../styles/profile.module.css';
import Button from '@mui/material/Button'
import {CircularProgress, TextField} from '@mui/material';
import {auth, db, storage} from '../firebase/firebaseSetup';
import {getDownloadURL, getMetadata, list, listAll, ref, StorageReference} from "firebase/storage";
import {collection, doc, getDocs, query} from "firebase/firestore";
import NoteButton from "../components/NoteButton"
import {useNavigate, useParams} from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate()
  const [notes, setNotes] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true);

  async function getMyUploads() {
    setIsLoading(true)

    const allNotes: { name: any; fullPath: any; unit: any; classDate: any; }[] = [];
    const user = auth.currentUser;
    if (user === null) return;
    const uid = user.uid;

    const q = query(collection(db, "users", uid, "uploads"));
    const querySnapshot = await getDocs(q);
    const docs = querySnapshot.docs.map(doc => doc.data());
    docs.forEach((doc) => {
      // get firebase storage url for each note from info from firestore
      allNotes.push({name: doc.note_name, fullPath: doc.fullPath, unit: doc.unit, classDate: doc.classDate})
    })

    const fullNotes = allNotes.map(async (note) => {
      const metadata = await getMetadata(ref(storage, note.fullPath)).then((metadata) => {
        return metadata.customMetadata
      })
      const name = metadata?.note_name;
      const classDate = metadata?.classDate
      const unit = metadata?.unit
      const uploadedBy = metadata?.uploadedBy
      let url = "";
      await getDownloadURL(ref(storage, note.fullPath)).then((downloadUrl) => {
        if (downloadUrl === undefined) return;
        url = downloadUrl;
        console.log(downloadUrl)
      }).catch((error) => {
        console.error(error);
      });
      return {name: name, fileName: note.name, fullPath: note.fullPath, classDate: classDate, unit: unit, uploadedBy: uploadedBy, downloadUrl: url}
    })

    setNotes(await Promise.all(fullNotes))
    setIsLoading(false)
  }

  useEffect(() => {
    getMyUploads().then(() => {})
  }, [])
  async function handleOpenPDF(fullPath: any, noteName: any) {
    console.log(fullPath)
    const unit = fullPath.split("/")[3]
    const subject = fullPath.split("/")[1]
    const classId = fullPath.split("/")[2]
    console.log('/'+ subject + '/'+ classId + '/' + unit + '/' + noteName)
    navigate('/'+ subject + '/'+ classId + '/' + unit + '/' + noteName)
  }
  const screenAR = window.innerWidth/window.innerHeight;
  console.log(screenAR);
  const [noteWidth, setNoteWidth] = useState<any>(window.innerWidth/4);
  if (screenAR <= 0.8 && noteWidth !== window.innerWidth/2) {
    setNoteWidth(window.innerWidth/2);
  }
  else if (screenAR <= 1.1 && screenAR > 0.8 && noteWidth !== window.innerWidth/3) {
    setNoteWidth(window.innerWidth/3);
  }
  window.addEventListener('resize', function (event) {
    const screenAR = window.innerWidth/window.innerHeight;
    if (screenAR <= 0.8 && noteWidth !== window.innerWidth/2) {
      setNoteWidth(window.innerWidth/2);
    }
    else if (screenAR <= 1.1 && screenAR > 0.8 && noteWidth !== window.innerWidth/3) {
      setNoteWidth(window.innerWidth/3);
    }
    else if (screenAR > 1.1 && noteWidth !== window.innerWidth/4){
      setNoteWidth(window.innerWidth/4);
    }
  });
  return (
    <div>
      <BackButton path={"/"}/>
      <h1 className={styles.title}>Account Profile</h1>
      <p className={styles.para}>Username: {auth.currentUser?.displayName}</p>
      <h2>My Uploads</h2>
      {isLoading && <CircularProgress color="inherit" />}
      {notes.map((note) => {
        return (
          <NoteButton wid={noteWidth} notes={note} openPDF={() => handleOpenPDF(note.fullPath, note.fileName)}></NoteButton>
        )
      })}
    </div>
  );
}