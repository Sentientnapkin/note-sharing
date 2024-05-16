import React, {useCallback, useEffect, useState} from 'react';
import {
  Autocomplete, createFilterOptions,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  Select
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { storage } from '../firebase/firebaseSetup';
import {ref, uploadBytes, list, listAll} from "firebase/storage";
import AddIcon from '@mui/icons-material/Add';
import {useNavigate, useParams} from 'react-router-dom';
import Button from "@mui/material/Button";
import BackButton from "../components/BackButton";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import styles from "../styles/classNotes.module.css"
import TextField from "@mui/material/TextField";

const filter = createFilterOptions();

export default function ClassNotes() {
  const {subject, classId} = useParams();

  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true);

  const [units, setUnits] = useState<any[]>([])
  const [notes, setNotes] = useState<any[]>([])

  const [unitValue, setUnitValue] = useState<any | null>("");
  const [openUnitDialog, toggleOpenUnitDialog] = useState(false);

  const [uploadPopupOpen, setUploadPopupOpen] = useState<boolean>(false);
  const [uploadDate, setUploadDate] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null)


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

  function handleUploadNote() {
    if (file == null) return

    const storageRef = ref(storage, 'notes/' + subject + '/' + classId + '/' + unitValue.name + "/" + file.name);

    const metadata = {
      contentType: 'application/pdf',
      customMetadata: {
        'classDate': uploadDate.toString().slice(0, 16),
        'unit': unitValue.name,
      },
    }

    uploadBytes(storageRef, file, metadata).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    }).then(() => {
      handleClosePopup()
    })
  }

  async function handleOpenPDF(fullPath: any, note: any) {
    const unit = note.fullPath.split("/")[3]
    navigate('/' + subject + '/' + classId + '/' + unit + '/' + note.name)
  }

  const getNotes = useCallback(async () => {
    setNotes([])

    const listRef1 = ref(storage, 'notes/' + subject + "/" + classId + "/");

    const directories = await listAll(listRef1)
      .then(async(res) => {
        const allNotes = [];

        setUnits(res.prefixes)

        for (let i = 0; i < res.prefixes.length; i++) {
          const unit = res.prefixes[i]
          const listRef2 = ref(storage, 'notes/' + subject + "/" + classId + "/" + unit.name + "/");

          const firstPage = await list(listRef2, {maxResults: 30});

          allNotes.push(...firstPage.items);
        }

        setNotes(allNotes)
        setIsLoading(false)

        return res.prefixes
      })
  }, [subject, classId])

  useEffect(() => {
    getNotes().then(() => {})
  }, [getNotes])


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
                  title: `Add "${params.inputValue}"`,
                });
              }

              return filtered;
            }}
            id="Unit"
            options={units}
            getOptionLabel={(option) => {
              // for example value selected with enter, right from the input
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
            renderOption={(props, option) => <li {...props}>{option.title}</li>}
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

      <BackButton />
      <img className={styles.headImg} src={require('../images/Class.png')}/>
      <div className={styles.titleHolder}>
        <h1> {classId} </h1>
        <Fab className={styles.plus} aria-label="add" onClick={handleOpenPopup}>
          <AddIcon/>
        </Fab>
      </div>
      <div>
        <h2>Notes</h2>
        {notes.map(note => {
          const f = note.name.substring(0, note.name.length - 4);
          return (
            <div key={note.name}>
              <Button className={styles.line} onClick={() => handleOpenPDF(note.fullPath, note)} key={note.name}>
                <p>{f}</p>
                <p>Uploaded by: Sebastian Vargas</p>
                <p>Unit: Inference</p>
                <p>Date: 01/01/01</p>
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  );
}