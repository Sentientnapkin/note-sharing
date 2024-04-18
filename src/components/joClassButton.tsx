import { Button } from "@mui/material";
import styles from "../styles/home.module.css"


export default function JoClassButton(props: {oClick: () => void, jClassName: String}) {
  return (
    <Button className={styles.classDiv} onClick={props.oClick}>
      <img className={styles.classImage} src={'./' + props.jClassName  + '.webp'}></img>
      <h2>{props.jClassName}</h2>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eius, quas deserunt. Veritatis, pariatur error quibusdam adipisci nam debitis expedita in ullam dicta sit eligendi consequuntur facere nihil culpa sed aut.</p>
    </Button>
  );
}