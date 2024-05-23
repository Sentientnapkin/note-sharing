import React, {useCallback, useEffect, useRef, useState} from 'react';
import BackButton from '../components/BackButton';
import styles from '../styles/profile.module.css';
import Button from '@mui/material/Button'
import {CircularProgress, TextField} from '@mui/material';
import {auth, db, storage} from '../firebase/firebaseSetup';
import {getDownloadURL, getMetadata, list, listAll, ref, StorageReference} from "firebase/storage";
import {collection, doc, getDocs, query} from "firebase/firestore";

export default function Profile() {
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

  return (
    <div>
      <BackButton path={"/"}/>
      <h1 className={styles.title}>Account Profile</h1>
      <p className={styles.para}>Username: {auth.currentUser?.displayName}</p>
      <h2>My Uploads</h2>
      {isLoading && <CircularProgress color="inherit" />}
      {notes.map((note) => {
        return (
          <div key={note.name}>
            <p>{note.name}</p>
            <p>{note.classDate}</p>
            <iframe src={note.downloadUrl} title={note.name}/>
            <Button variant={"contained"}>View</Button>
          </div>
        )
      })}
    </div>
  );
}