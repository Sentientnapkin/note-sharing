import styles from "../styles/classNotes.module.css"
import { Button } from "@mui/material"


export default function NoteButton(props: {notes: any, openPDF: () => void, wid: any}) {
  return (
    <Button key={props.notes.name} style={{width: props.wid}} className={styles.noteHolder} onClick={props.openPDF}>
      <iframe src={props.notes.downloadUrl} title={props.notes.name}/>
      <p> {props.notes.name.slice(0, props.wid/14) + (props.notes.name.slice(0, props.wid/14) !== props.notes.name ? "..." : "" )} </p>
      <p> {props.notes.classDate.slice(0, props.wid/14) + (props.notes.classDate.slice(0, props.wid/14) !== props.notes.classDate ? "..." : "" )} </p>
      <p> {props.notes.unit.slice(0, props.wid/14) + (props.notes.unit.slice(0, props.wid/14) !== props.notes.unit ? "..." : "" )} </p>
      <p> {props.notes.uploadedBy.slice(0, props.wid/14) + (props.notes.uploadedBy.slice(0, props.wid/14) !== props.notes.uploadedBy ? "..." : "" )} </p> 
    </Button>
  )
}
