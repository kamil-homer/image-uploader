import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./FileInput.module.scss";
import classNames from "classnames";
import {
  getFileExtension,
  getFileUrl,
  prepareErrorList,
} from "../../utils/helpers";
import { Grid } from "@mui/material";
import { uploadToFirebaseStorage } from "../../firestore/firebaseService";
import { nanoid } from "nanoid";
import { getDownloadURL } from "firebase/storage";
import ErrorMessages from "../ErrorMessages/ErrorMessages";
import FileInputLabel from "../FileInputLabel/FileInputLabel";
import { FileWithPreview } from "../../types/common";

interface FileInputProps {
  setDownloadURL: (url: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  setFiles: (file: FileWithPreview) => void;
}

function FileInput({ setDownloadURL, setIsLoading, setFiles }: FileInputProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (!acceptedFiles.length) return null;
    const acceptedFile = getFileUrl(acceptedFiles[0]);
    setFiles(acceptedFile);
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

  const errorsList = prepareErrorList(fileRejections, []);

  const fileInputClassName = classNames(styles.fileInput, {
    [styles.fileInput_active]: isDragActive,
  });

  return (
    <Grid container>
      <Grid container item xs={12} justifyContent="center" alignItems="center">
        <div {...getRootProps()} className={fileInputClassName}>
          <input {...getInputProps()} />
          <FileInputLabel isDragActive={isDragActive} />
        </div>
      </Grid>
      <Grid container item xs={12} justifyContent="center" alignItems="center">
        <ErrorMessages messages={errorsList} />
      </Grid>
    </Grid>
  );
}

export default FileInput;
