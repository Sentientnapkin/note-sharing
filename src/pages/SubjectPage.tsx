import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Button from "@mui/material/Button";

export default function SubjectPage() {
  const { subject } = useParams();

  const navigate = useNavigate()

  function handleClassClick(classId: string) {
    navigate('/' + subject + '/' + classId)
  }

  return (
    <div>
      <h1>Subject Page</h1>
      <Button onClick={() => handleClassClick("Linear Algebra")}>Linear Algebra</Button>
    </div>
  );
}