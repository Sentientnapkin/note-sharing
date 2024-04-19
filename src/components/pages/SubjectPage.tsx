import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Button from "@mui/material/Button";
import styles from "../../styles/subject.module.css"
export default function SubjectPage() {
  const { subject } = useParams();

  const navigate = useNavigate()
  function handleClassClick(classId: string) {
    navigate('/' + subject + '/' + classId)
  }

  const imagePath = "./" + subject + ".webp"

  return (
    <div>
      <img className={styles.header} src={imagePath}></img>
      <h1>{subject} Page</h1>
      <Button onClick={() => handleClassClick("Linear Algebra")}>Linear Algebra</Button>
    </div>
  );
}