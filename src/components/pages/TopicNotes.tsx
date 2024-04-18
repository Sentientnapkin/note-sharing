import React, {useEffect, useState} from 'react';
import { Input } from '@mui/material';
import { storage } from '../../firebase/firebaseSetup';
import { ref, uploadBytes, list, getDownloadURL } from "firebase/storage";
import { useParams } from 'react-router-dom';
import Button from "@mui/material/Button";

export default function TopicNotes() {
  const { topicId } = useParams();
  const [file, setFile] = useState<File | null>(null)
  const [notes, setNotes] = useState<any[]>([])

  function handleUploadNote(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return

    setFile(event.target.files[0])
    const storageRef = ref(storage, 'notes/' + topicId + '/' + event.target.files[0].name);

    const metadata = {
      contentType: 'application/pdf',
      timeCreated: new Date(event.target.files[0].lastModified),
    }

    uploadBytes(storageRef, event.target.files[0], metadata).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
  }

  async function getNotes() {
    // get notes from firebase
    const listRef = ref(storage, 'notes/' + topicId + '/');

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

  function handleOpenPDF(fullPath: string) {
    getDownloadURL(ref(storage, fullPath)).then((url) => {

    }).catch((error) => {
      // Handle any errors
    });


  }

  useEffect(() => {
    getNotes().then(r => console.log(r))
  }, [])

  return (
    <div>
      <h1>Topic Notes</h1>
      <h2> topicId: {topicId} </h2>
      <Input type="file" onChange={handleUploadNote} disableUnderline={true} inputProps={{accept:"application/pdf"}}/>
      <div>
        <h2>Notes</h2>
        {notes.map(note => {
          return (
            <div key={note.name}>
              <Button onClick={() => handleOpenPDF(note.fullPath)}>
                {note.name}
              </Button>
            </div>
          )})}
      </div>
    </div>
  );
}