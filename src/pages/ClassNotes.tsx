import React, {useCallback, useEffect, useState} from 'react';
import {
  Autocomplete, CircularProgress, createFilterOptions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab, FormControl, InputLabel, MenuItem, Select,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import {ref, uploadBytes, list, listAll, getMetadata, getDownloadURL} from "firebase/storage";
import AddIcon from '@mui/icons-material/Add';
import {useNavigate, useParams} from 'react-router-dom';
import Button from "@mui/material/Button";
import BackButton from "../components/BackButton";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import styles from "../styles/classNotes.module.css"
import TextField from "@mui/material/TextField";
import {auth, db, storage} from "../firebase/firebaseSetup";
import { doc, setDoc } from "firebase/firestore";
import NoteButton from '../components/NoteButton';

const filter = createFilterOptions();

export default function ClassNotes() {
  const {subject, classId} = useParams();

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true);

  const [units, setUnits] = useState<any[]>([])
  const [notes, setNotes] = useState<any[]>([])

  const [unitValue, setUnitValue] = useState<any | null>("");
  const [openUnitDialog, toggleOpenUnitDialog] = useState(false);

  const [name, setName] = useState<string>("")

  const [uploadPopupOpen, setUploadPopupOpen] = useState<boolean>(false);
  const [uploadDate, setUploadDate] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null)

  const [searchText, setSearchText] = useState<string>("")
  const [searchUnit, setSearchUnit] = useState<string>("")


  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  function handleOpenPopup() {
    setUploadPopupOpen(true)
  }

  function handleClosePopup() {
    setFile(null)
    setUploadPopupOpen(false)
  }

  function handleUnitPopup() {
    toggleOpenUnitDialog(true)
    setUnitValue("")
  }

  function handleCloseUnitPopup() {
    toggleOpenUnitDialog(false)
  }

  function handleNoteInput (event: any) {
    if (!event.target.files[0]) return
    setFile(event.target.files[0])
  }

  async function handleUploadNote() {
    if (file == null) return

    const storageRef = ref(storage, 'notes/' + subject + '/' + classId + '/' + unitValue + "/" + file.name);

    const metadata = {
      contentType: 'application/pdf',
      customMetadata: {
        'note_name': name,
        'classDate': uploadDate.toString().slice(0, 16),
        'unit': unitValue,
        'uploadedBy': auth.currentUser?.displayName ?? "Unknown",
      },
    }

    await uploadBytes(storageRef, file, metadata).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    }).then(() => {
      handleClosePopup()
    })

    await setDoc(doc(db, "users", auth.currentUser?.uid as string, "uploads" ,file.name), {
      note_name: name,
      fileName: file.name,
      unit: unitValue,
      classDate: uploadDate.toString().slice(0, 16),
      fullPath: "notes/" + subject + '/' + classId + '/' + unitValue + "/" + file.name,
    });

    await getNotes().then(() => {})
  }

  async function handleOpenPDF(fullPath: any, noteName: any) {
    const unit = fullPath.split("/")[3]
    navigate('/' + subject + '/' + classId + '/' + unit + '/' + noteName)
  }

  const getNotes = useCallback(async () => {
    setNotes([])

    const listRef1 = ref(storage, 'notes/' + subject + "/" + classId + "/");

    const directories = await listAll(listRef1)
      .then(async(res) => {
        const allNotes = [];

        const units = []
        for (let i = 0; i < res.prefixes.length; i++) {
          units.push(res.prefixes[i].name)
        }
        setUnits(units)

        for (let i = 0; i < res.prefixes.length; i++) {
          const unit = res.prefixes[i]
          const listRef2 = ref(storage, 'notes/' + subject + "/" + classId + "/" + unit.name + "/");

          const firstPage = await list(listRef2, {maxResults: 100});

          allNotes.push(...firstPage.items);
        }

        const fullNotes = allNotes.map(async (note) => {
          const metadata = await getMetadata(ref(storage, note.fullPath)).then((metadata) => {
            return metadata.customMetadata
          })
          const name = metadata?.note_name;
          const classDate = metadata?.classDate
          const unit = metadata?.unit
          const uploadedBy = metadata?.uploadedBy
          let url = "";
          await getDownloadURL(ref(storage, note.fullPath)).then((downloadUrl) => {
            if (downloadUrl === undefined) return;
            url = downloadUrl;
            console.log(downloadUrl)
          }).catch((error) => {
            console.error(error);
          });
          return {name: name, fileName: note.name, fullPath: note.fullPath, classDate: classDate, unit: unit, uploadedBy: uploadedBy, downloadUrl: url}
        })

        setNotes(await Promise.all(fullNotes))
        setIsLoading(false)

        return res.prefixes
      })
  }, [subject, classId])

  useEffect(() => {
    getNotes().then(() => {})
  }, [getNotes])

  const screenAR = window.innerWidth/window.innerHeight;
  console.log(screenAR);
  const [noteWidth, setNoteWidth] = useState<any>(window.innerWidth/4);
  if (screenAR <= 0.7 && noteWidth !== window.innerWidth/2) {
    setNoteWidth(window.innerWidth/2);
  }
  else if (screenAR <= 1 && screenAR > 0.7 && noteWidth !== window.innerWidth/3) {
    setNoteWidth(window.innerWidth/3);
  }
  window.addEventListener('resize', function (event) {
    console.log('resized');
    const screenAR = window.innerWidth/window.innerHeight;
    console.log(screenAR);
    if (screenAR <= 0.7 && noteWidth !== window.innerWidth/2) {
      setNoteWidth(window.innerWidth/2);
    }
    else if (screenAR <= 1 && screenAR > 0.7 && noteWidth !== window.innerWidth/3) {
      setNoteWidth(window.innerWidth/3);
    }
    else if (screenAR > 1 && noteWidth !== window.innerWidth/4){
      setNoteWidth(window.innerWidth/4);
    }
  });
  return (
    <div>
      {/** Upload PopUp **/}
      <Dialog
        open={uploadPopupOpen}
        onClose={handleClosePopup}
      >
        <DialogTitle>Upload Note</DialogTitle>
        <DialogContent>
          <div>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              color={"primary"}
            >
              Upload file
              <VisuallyHiddenInput type="file" onChange={handleNoteInput}/>
            </Button>
            <p>
              {file?.name}
            </p>
          </div>
        </DialogContent>
        <DialogContent>
          <TextField
            label={"Name"}
            onChange={(event) => setName(event.target.value)}
            defaultValue={""}
          />
        </DialogContent>
        <DialogContent>
          <Autocomplete
            onChange={(event, newValue) => {
              if (newValue && newValue.inputValue) {
                handleUnitPopup()
                setUnitValue(newValue.inputValue);
                return;
              }
              setUnitValue(newValue);
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);

              if (params.inputValue !== '') {
                filtered.push({
                  inputValue: params.inputValue,
                  name: `Add "${params.inputValue}"`,
                });
              }

              return filtered;
            }}
            id="Unit"
            options={units}
            getOptionLabel={(option) => {
              if (typeof option === 'string') {
                return option;
              }
              if (option.inputValue) {
                return option.inputValue;
              }
              return option.name;
            }}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            renderOption={(props, option) => <li {...props}>{option}</li>}
            sx={{ width: 300 }}
            freeSolo
            renderInput={(params) => <TextField {...params} label="Unit" />}
          />
          <Dialog open={openUnitDialog} onClose={handleCloseUnitPopup}>
            <DialogTitle>Add new Unit</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to add a new unit: {unitValue}?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => {
                handleCloseUnitPopup()
                setUnitValue("")
              }}>Cancel</Button>
              <Button onClick={handleCloseUnitPopup}>Add</Button>
            </DialogActions>
          </Dialog>
        </DialogContent>
        <DialogContent>
          <DatePicker value={uploadDate} onChange={setUploadDate} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup}>Cancel</Button>
          <Button onClick={handleUploadNote}>Upload</Button>
        </DialogActions>
      </Dialog>

      <BackButton path={"/" + subject + "/"}/>
      <img className={styles.headImg} src={require('../images/Class.png')}/>
      <div className={styles.titleHolder}>
        <h1> {classId} </h1>
      </div>
      <Fab className={styles.plus} aria-label="add" onClick={handleOpenPopup}>
          <AddIcon className={styles.icon}/>
      </Fab>
      <TextField
        label={"Search"}
        className={styles.textField}
        onChange={
          (event) => {
            setSearchText(event.target.value)
          }
        }
      />

      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Unit</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={searchUnit}
          onChange={(event) => {
            setSearchUnit(event.target.value)
          }}
          label="Unit"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {units.map((unit) => {
            return (
              <MenuItem value={unit}>{unit}</MenuItem>
            )
          })}
        </Select>
      </FormControl>

      <div>
        <h2>Notes</h2>
        {isLoading && <CircularProgress color="inherit" />}
        {notes.map(note => {
            if (searchText == "" && searchUnit == "") {
              return (
                <NoteButton wid={noteWidth} notes={note} openPDF={() => handleOpenPDF(note.fullPath, note.fileName)}></NoteButton>
              )
            } else if (note.name.toLowerCase().includes(searchText.toLowerCase()) && searchText !== "") {
              return (
                <NoteButton wid={noteWidth} notes={note} openPDF={() => handleOpenPDF(note.fullPath, note.fileName)}></NoteButton>
              )
            } else if (note.unit.toLowerCase().includes(searchUnit.toLowerCase()) && searchUnit !== "") {
              const s = "background-image: url(" + note.downloadUrl + ");";
              return (
                <NoteButton wid={noteWidth} notes={note} openPDF={() => handleOpenPDF(note.fullPath, note.fileName)}></NoteButton>
              )
            } else {
              return null
            }
          })}
      </div>
    </div>
  );
}