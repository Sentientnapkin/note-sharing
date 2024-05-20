import React from 'react';
import Button from "@mui/material/Button";
import styles from "../styles/back.module.css"
import {useNavigate} from "react-router-dom";

export default function BackButton(props: {path: string}) {
  const navigate = useNavigate()

  return (
    <div>
      <Button variant={"contained"} className={styles.butt} onClick={() => navigate(props.path)}>◄ Back</Button>
    </div>
  );
}