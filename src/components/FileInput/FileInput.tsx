import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./FileInput.module.scss";
import classNames from "classnames";
import {
  getFileExtension,
  getFileUrl,
  prepareErrorList,
} from "../../utils/helpers";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Grid } from "@mui/material";
import { uploadToFirebaseStorage } from "../../firestore/firebaseService";
import { nanoid } from "nanoid";
import { getDownloadURL } from "firebase/storage";
import ErrorMessage from "../ErrorMessage/ErrorMessages";

interface FileInputProps {
  setDownloadURL: (url: string) => void;
  setIsLoading: (isLoading: boolean) => void;
}

function FileInput({ setDownloadURL, setIsLoading }: FileInputProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const acceptedFile = getFileUrl(acceptedFiles[0]);
    handleUploadImage(acceptedFile);
  }, []);

  const { getRootProps, getInputProps, fileRejections, isDragActive } =
    useDropzone({
      onDrop,
      accept: {
        "image/jpeg": [],
        "image/png": [],
      },
      maxFiles: 1,
    });

  const handleUploadImage = (file: File) => {
    setIsLoading(true);
    if (!file) return;

    const filename = nanoid() + "." + getFileExtension(file.name);
    const uploadTask = uploadToFirebaseStorage(file, filename);
    if (uploadTask) {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          console.error(error);
          setIsLoading(false);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log("File available at", downloadURL);
            setDownloadURL(downloadURL);
            setIsLoading(false);
          });
        }
      );
    }
  };

  const fileInputClassName = classNames(styles.fileInput, {
    [styles.fileInput_active]: isDragActive,
  });

  const errorsList = prepareErrorList(fileRejections, []);

  const inputLabel = isDragActive ? (
    <div className={styles.inputLabel}>Drop the file here ...</div>
  ) : (
    <div className={styles.inputLabel}>
      <CloudUploadIcon fontSize="large" />
      <p>Drag 'n' drop the file here, or click to select file</p>
    </div>
  );
  return (
    <Grid container>
      <Grid container item xs={12} justifyContent="center" alignItems="center">
        <div {...getRootProps()} className={fileInputClassName}>
          <input {...getInputProps()} />
          {inputLabel}
        </div>
      </Grid>
      <Grid container item xs={12} justifyContent="center" alignItems="center">
        <ErrorMessage messages={errorsList} />
      </Grid>
    </Grid>
  );
}

export default FileInput;
