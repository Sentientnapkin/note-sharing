import { Button } from "@mui/material";
import styles from "../styles/home.module.css"


export default function JoClassButton(props: {oClick: () => void, jClassName: String, desc: String}) {
  return (
    <Button className={styles.classDiv} onClick={props.oClick}>
      <img className={styles.classImage} src={'./' + props.jClassName  + '.webp'}></img>
      <h2>{props.jClassName}</h2>
      <p>{props.desc}</p>
    </Button>
  );
}