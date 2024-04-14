import React, {useEffect, useState} from 'react';
import { Input } from '@mui/material';
import { storage, auth } from '../../firebase/firebaseSetup';
import { ref, uploadBytes, list } from "firebase/storage";
import { useParams } from 'react-router-dom';

export default function TopicNotes() {
  const { topicId } = useParams();
  const [file, setFile] = useState<File | null>(null)

  function handleUploadNote(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return
    setFile(event.target.files[0])
    const storageRef = ref(storage, 'notes/' + topicId + '/' + event.target.files[0].name);
    uploadBytes(storageRef, event.target.files[0]).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
  }

  async function getNotes() {
    // get notes from firebase
    const listRef = ref(storage, 'notes/' + topicId + '/');

    // Fetch the first page of 100.
    const firstPage = await list(listRef, {maxResults: 30});

    // Use the result.
    console.log(firstPage.items)
    // processItems(firstPage.items)
    // processPrefixes(firstPage.prefixes)

    // Fetch the second page if there are more elements.
    if (firstPage.nextPageToken) {
      const secondPage = await list(listRef, {
        maxResults: 100,
        pageToken: firstPage.nextPageToken,
      });
      // processItems(secondPage.items)
      // processPrefixes(secondPage.prefixes)
    }
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

      </div>
    </div>
  );
}