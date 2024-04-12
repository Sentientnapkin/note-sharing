import React, {useState} from 'react';
import { Input } from '@mui/material';

export default function TopicNotes() {
  const [file, setFile] = useState<File | null>(null)

  function handleUploadNote(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) return
    setFile(event.target.files[0])
    console.log(event.target.files[0])
  }

  return (
    <div>
      <h1>Topic Notes</h1>
      <Input type="file" onChange={handleUploadNote} disableUnderline={true}/>
    </div>
  );
}