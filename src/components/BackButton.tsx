import React from 'react';
import Button from "@mui/material/Button";
import styles from "../styles/back.module.css"

export default function BackButton() {
  return (
    <div>
      <Button variant={"contained"} className={styles.butto} onClick={() => window.history.back()}>◄ Back</Button>
    </div>
  );
}