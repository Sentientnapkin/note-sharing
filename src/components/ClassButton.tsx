import styles from "../styles/classButton.module.css"

export default function ClassButton(props: {clas : string, teacher : string}) {
  return (
    <div className={styles.holder}>
      <img className={styles.thumbnail} src={"./Class.png"}></img>
      <h2>{props.clas}</h2>
      <p>Taught by {props.teacher}</p>
    </div>
  )
}