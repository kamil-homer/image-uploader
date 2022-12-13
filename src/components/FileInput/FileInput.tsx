import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./FileInput.module.scss";
import classNames from "classnames";
import { getFileUrl } from "../../utils/helpers";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Grid } from "@mui/material";
interface FileInputProps {
  setFiles: (file: any) => void;
}

function FileInput({ setFiles }: FileInputProps) {
  const onDrop = useCallback(
    (acceptedFiles: any) => {
      setFiles(acceptedFiles.map((file: any) => getFileUrl(file)));
    },
    [setFiles]
  );
  const { getRootProps, getInputProps, fileRejections, isDragActive } =
    useDropzone({
      onDrop,
      accept: {
        "image/jpeg": [],
        "image/png": [],
      },
      maxFiles: 1,
    });

  let errorsList: string[] = [];

  errorsList = fileRejections.reduce((errors, fileRejection) => {
    fileRejection.errors.forEach((error) => {
      if (!errors.includes(error.message)) {
        errors = [...errors, error.message];
      }
    });

    return errors;
  }, errorsList);

  const fileInputClassName = classNames(styles.fileInput, {
    [styles.fileInput_active]: isDragActive,
  });

  const renderErrorMessages = errorsList.map((error) => (
    <div key={error}>{error}</div>
  ));

  const inputLabel = isDragActive ? (
    <div className={styles.inputLabel}>Drop the files here ...</div>
  ) : (
    <div className={styles.inputLabel}>
      <CloudUploadIcon fontSize="large" />
      <p>Drag 'n' drop some files here, or click to select files</p>
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
        {renderErrorMessages}
      </Grid>
    </Grid>
  );
}

export default FileInput;
