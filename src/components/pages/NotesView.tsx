import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getDownloadURL, ref} from "firebase/storage";
import {storage} from "../../firebase/firebaseSetup";
import Button from "@mui/material/Button";

export default function NotesView() {
  const { subject, classId, noteId} = useParams();
  const [pdfUrl, setPdfUrl] = useState<string | undefined>(undefined)

  useEffect (() => {
    getDownloadURL(ref(storage, "notes/" + subject + "/" +  classId + "/" + noteId)).then((url) => {
      setPdfUrl(url)
    }).catch((error) => {
      console.error(error);
    });
  })

  return (
    <div>
      <div>
        <Button onClick={() => window.history.back()}>Back</Button>
        <h1>{noteId}</h1>
      </div>
      <div>
      <iframe src={pdfUrl} title={noteId} width="100%" height="100%"/>
      </div>
    </div>
  );
}