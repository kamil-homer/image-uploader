import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styles from "./FileInput.module.scss";
import classNames from "classnames";
import { getFileUrl } from "../../utils/helpers";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".png"],
    },
    maxFiles: 1,
  });

  const fileInputClassName = classNames(styles.fileInput, {
    [styles.fileInput_active]: isDragActive,
  });

  const inputLabel = isDragActive ? (
    <div className={styles.inputLabel}>Drop the files here ...</div>
  ) : (
    <div className={styles.inputLabel}>
      <CloudUploadIcon fontSize="large" />
      <p>Drag 'n' drop some files here, or click to select files</p>
    </div>
  );

  return (
    <div {...getRootProps()} className={fileInputClassName}>
      <input {...getInputProps()} />
      {inputLabel}
    </div>
  );
}

export default FileInput;
