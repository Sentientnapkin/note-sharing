import React, {useCallback, useEffect, useRef, useState} from 'react';
import BackButton from '../components/BackButton';
import styles from '../styles/profile.module.css';
import Button from '@mui/material/Button'
import { TextField } from '@mui/material';
import {auth, db, storage} from '../firebase/firebaseSetup';
import {getDownloadURL, getMetadata, list, listAll, ref, StorageReference} from "firebase/storage";

export default function Profile() {
  const realPassword = "importThisfromSomeWhere1234"
  const realPhone = "555-555-5555";
  const [textInput, setTextInput] = useState('');

  const [notes, setNotes] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true);

  const handleTextInputChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setTextInput(event.target.value);
  };
  const [password, setPassword] = useState<string>("************");
  const [isPasswordHidden, setIsPasswordHidden] = useState<string>("Reveal");

  function displayPass() {
    console.log(textInput)
    if (password === "************" && textInput === realPhone) {
      setPassword(realPassword);
      setIsPasswordHidden("Hide")
    } else {
      setPassword("************")
      setIsPasswordHidden("Reveal")
    }
  }

  async function getMyUploads() {
    setIsLoading(true)

    const listRef1 = ref(storage, 'notes/');

    const directories = await listAll(listRef1)
      .then(async (res) => {
        let allNotes: StorageReference[] = [];

        for (let i = 0; i < res.prefixes.length; i++) {
          const subject = res.prefixes[i].name
          const listRef2 = ref(storage, 'notes/' + subject + "/");

          const subjectPage = await list(listRef2)
            .then(async(res) => {
              for (let i = 0; i < res.prefixes.length; i++) {
                const classId = res.prefixes[i].name
                const listRef3 = ref(storage, 'notes/' + subject + "/" + classId + "/");

                const classsesPage = await list(listRef3, {maxResults: 100}).then(
                  async (res) => {
                    for (let i = 0; i < res.prefixes.length; i++) {
                      const unit = res.prefixes[i]
                      const listRef4 = ref(storage, 'notes/' + subject + "/" + classId + "/" + unit.name + "/");

                      const unitPage = await list(listRef4, {maxResults: 100}).then(
                        async (res) => {
                          const firstPage = res
                          for (let i = 0; i < firstPage.items.length; i++) {
                            const note = firstPage.items[i]
                            const metadata = await getMetadata(ref(storage, note.fullPath)).then((metadata) => {
                              return metadata.customMetadata
                            })
                            if (metadata?.uploadedBy === auth.currentUser?.displayName) {
                              allNotes.push(note)
                            }
                          }
                        }
                      )
                    }
                  }
                )
              }
          })
          setIsLoading(false)
        }

        const fullNotes = allNotes.map(async (note) => {
          const metadata = await getMetadata(ref(storage, note.fullPath)).then((metadata) => {
            return metadata.customMetadata
          })
          const name = note.name.substring(0, note.name.length - 4);
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
        console.log(fullNotes)

        return res.prefixes
      })
  }

  useEffect(() => {
    getMyUploads().then(() => {})
  }, [])

  return (
    <div>
      <BackButton path={"/"}/>
      <h1 className={styles.title}>Account Profile</h1>
      <p>Username: Sebastian V</p>
      <p className={styles.password}>Password: {password}</p>
      <TextField value= {textInput} onChange= {handleTextInputChange} id="outlined-basic" label="Phone #" variant="outlined" />
      <Button variant={"contained"} className={styles.passButton} onClick={displayPass}>{isPasswordHidden} Password</Button>
      <h2>My Uploads</h2>
      {isLoading && <p>Loading...</p>}
      {notes.map((note) => {
        return (
          <div>
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