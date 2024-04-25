import { Button } from "@mui/material";
import styles from "../styles/home.module.css"


export default function ClassThumbnail(props: {oClick: () => void, jClassName: String, desc: String}) {
  return (
    <Button className={styles.classDiv} onClick={props.oClick}>
      <img className={styles.classImage} src={require('../images/' + props.jClassName  + '.webp')}></img>
      <h2>{props.jClassName}</h2>
      <p>{props.desc}</p>
    </Button>
  );
}