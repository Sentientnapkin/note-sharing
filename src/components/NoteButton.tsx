import styles from "../styles/classNotes.module.css"
import { Button } from "@mui/material"


export default function NoteButton(props: {notes: any, openPDF: () => void, wid: any}) {
  return (
    <Button style={{width: props.wid}}className={styles.noteHolder} onClick={props.openPDF}>
      <iframe src={props.notes.downloadUrl} title={props.notes.name}/>
      <p> {props.notes.name} </p>
      <p> {props.notes.classDate} </p>
      <p> {props.notes.unit} </p>
      <p> {props.notes.uploadedBy} </p> 
    </Button>
  )
}
