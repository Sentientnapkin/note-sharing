import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import Button from "@mui/material/Button";
import styles from "../styles/subject.module.css"
import {list, ref, listAll} from "firebase/storage";
import {storage} from "../firebase/firebaseSetup";
import BackButton from "../components/BackButton";
export default function SubjectPage() {
  const { subject } = useParams();
  const [classes, setClasses] = React.useState<any[]>([])

  const navigate = useNavigate()

  const imagePath = "./" + subject + ".webp"

  async function getClasses() {
    // get notes from firebase
    const listRef = ref(storage, 'notes/' + subject + "/");

    // Fetch the first page of 100.
    const directories = await listAll(listRef)
      .then((res) => {
        setClasses(res.prefixes);
        return res.prefixes
      })


    // Use the result.
    console.log(directories)
  }

  useEffect(() => {
    getClasses().then(r => console.log(r))
  }, [])

  return (
    <div>
      <BackButton />

      <img className={styles.header} src={imagePath}></img>
      <h1>{subject} Page</h1>
      <div>
        <h2>Classes</h2>
        {classes.map(c => {
          return (
            <div>
              <Button onClick={() => {navigate('/' + subject + '/' + c.name)}}>{c.name}</Button>
            </div>
          )
        })}
      </div>
    </div>
  );
}