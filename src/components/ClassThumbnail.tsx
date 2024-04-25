import styles from "../styles/home.module.css"


export default function ClassThumbnail(props: {oClick: () => void, jClassName: String}) {
  return (
    <button className={styles.classDiv} onClick={props.oClick}>
      <img className={styles.classImage} src={require('../images/' + props.jClassName  + '.webp')}></img>
      <h2 className={styles.buttonText}>{props.jClassName}</h2>
    </button>
  );
}