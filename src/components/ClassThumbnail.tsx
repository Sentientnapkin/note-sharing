import styles from "../styles/home.module.css"


export default function ClassThumbnail(props: {oClick: () => void, jClassName: String, numRows: number}) {
  var div = styles.classDiv;
  if (props.numRows == 4) {
    div = styles.classDiv4;
  }
  return (
    <button className={div} onClick={props.oClick}>
      <img className={styles.classImage} src={require('../images/' + props.jClassName  + '.webp')}></img>
      <h2 className={styles.buttonText}>{props.jClassName}</h2>
    </button>
  );
}