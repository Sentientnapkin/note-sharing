import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import styles from "../styles/subject.module.css"
import {list, ref, listAll} from "firebase/storage";
import {storage, db} from "../firebase/firebaseSetup";
import BackButton from "../components/BackButton";
import ClassButton from "../components/ClassButton";
import { collection, getDocs } from "firebase/firestore";
export default function SubjectPage() {
  const { subject } = useParams();
  const subjectString = subject as string
  const [classes, setClasses] = React.useState<any[]>([])

  const navigate = useNavigate()

  const imagePath = require('../images/' + subject + '.webp')

  async function getClasses() {
    // get notes from firebase
    const listRef = ref(storage, 'notes/' + subject + "/");

    // Fetch the first page of 100.
    const directories = await listAll(listRef)
      .then(async (res) => {
        return res.prefixes;
  })
    const classesMap = new Map<string, any[]>()
    const querySnapshot = await getDocs(collection(db, "class_info", subjectString, "Classes"));
    querySnapshot.forEach((doc) => {
      classesMap.set(doc.id, [doc.data().names, doc.data().imageUrl])
    });

    const classesArray: React.SetStateAction<any[]> = []
    directories.forEach((dir) => {
      const name = dir.fullPath.split("/").pop()
      const nameString = name as string
      const teacherNames = classesMap.get(nameString)?.[0] ?? "NA"
      const imageUrl = classesMap.get(nameString)?.[1] ?? ""
      classesArray.push({className: name, teacherNames: teacherNames, imageUrl: imageUrl})
    })

    setClasses(classesArray)
  }

  useEffect(() => {
    getClasses().then(r => console.log(r))
  }, [])
  const screenAR = window.innerWidth/window.innerHeight;
  console.log(screenAR);
  const [classWidth, setClassWidth] = useState<any>(window.innerWidth/4);
  if (screenAR <= 0.7 && classWidth !== window.innerWidth/2) {
    setClassWidth(window.innerWidth/2);
  }
  else if (screenAR <= 1 && screenAR > 0.7 && classWidth !== window.innerWidth/3) {
    setClassWidth(window.innerWidth/3);
  }
  window.addEventListener('resize', function (event) {
    console.log('resized');
    const screenAR = window.innerWidth/window.innerHeight;
    console.log(screenAR);
    if (screenAR <= 0.7 && classWidth !== window.innerWidth/2) {
      setClassWidth(window.innerWidth/2);
    }
    else if (screenAR <= 1 && screenAR > 0.7 && classWidth !== window.innerWidth/3) {
      setClassWidth(window.innerWidth/3);
    }
    else if (screenAR > 1 && classWidth !== window.innerWidth/4){
      setClassWidth(window.innerWidth/4);
    }
  });
  return (
    <div>
      <BackButton path={"/"}/>

      <img className={styles.header} src={imagePath}/>

      <div>
        <h1>{subject} Page</h1>

      </div>
      <div>
        {classes.map(c => {
          return (
            <ClassButton onC={() => {navigate('/' + subject + '/' + c.className)}} teacher={c.teacherNames} clas={c.className} key={c.className} imgUrl={c.imageUrl} wid={classWidth}/>
          )
        })}
      </div>
    </div>
  );
}