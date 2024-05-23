import { Button } from "@mui/material"
import styles from "../styles/classButton.module.css"
import {getDownloadURL, ref} from "firebase/storage";
import {storage} from "../firebase/firebaseSetup";
import {useEffect, useState} from "react";

export default function ClassButton(props: {clas : string, teacher : string, onC : () => void, imgUrl : string, wid : any}) {
  const [teacherNames, setTeacherNames] = useState("N/A")

  const [imageUrl, setImageUrl] = useState(require("../images/Class.png"))

  async function getImageUrl() {
    if (props.imgUrl !== "") {
      const imgRef = ref(storage, "course_data/" + props.imgUrl)
      setImageUrl(await getDownloadURL(imgRef).then((url) => {
        return url;
      }).catch((error) => {
        console.error(error);
      }))
      if (imageUrl === undefined) return;
    } else return;
  }

  useEffect(() => {
    getImageUrl().then(r => console.log(imageUrl))

    if (props.teacher !== "" && props.teacher !== undefined) {
      setTeacherNames(props.teacher)
    }
  }, [])

  return (
    <Button style={{width: props.wid}} onClick={props.onC} className={styles.holder}>
      <img className={styles.thumbnail} src={imageUrl}></img>
      <h2>{props.clas.slice(0, props.wid/18) + (props.clas.slice(0, props.wid/18) !== props.clas ? "..." : "" )}</h2>
      <p className={styles.para}>By {teacherNames.slice(0, props.wid/14) + (teacherNames.slice(0, props.wid/14) !== teacherNames ? "..." : "" )}</p>
    </Button>
  )
}