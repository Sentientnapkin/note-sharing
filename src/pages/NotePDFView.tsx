import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getDownloadURL, ref} from "firebase/storage";
import {storage} from "../firebase/firebaseSetup";
import styles from "../styles/notePDFView.module.css"
import Button from "@mui/material/Button";

export default function NotePDFView() {
  const { subject, classId, noteId, unit} = useParams();
  const [pdfUrl, setPdfUrl] = useState<string | undefined>(undefined)

  const handleBackButtonClick = () => {
    window.history.back()
  }

  useEffect (() => {
    getDownloadURL(ref(storage, "notes/" + subject + "/" +  classId + "/" + unit +"/" + noteId)).then((url) => {
      setPdfUrl(url)
    }).catch((error) => {
      console.error(error);
    });
  })

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.backandtitle}>
          <Button className={styles.back} onClick={handleBackButtonClick}>
            ◄ Back
          </Button>
          <h1 className={styles.title}>{noteId}</h1>
        </div>
        <img src={require("../images/logo.png")} className={styles.logo}/>
      </div>
      <div>
      <iframe src={pdfUrl} title={noteId} width="100%" height="100%" className={styles.pdfView}/>
      </div>
    </div>
  );
}