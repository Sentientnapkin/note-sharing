import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getDownloadURL, ref} from "firebase/storage";
import {storage} from "../firebase/firebaseSetup";
import Button from "@mui/material/Button";
import BackButton from "../components/BackButton";

export default function NotePDFView() {
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
        <BackButton />
        <h1>{noteId}</h1>
      </div>
      <div>
      <iframe src={pdfUrl} title={noteId} width="100%" height="100%"/>
      </div>
    </div>
  );
}