import styles from "./FileInputLabel.module.scss";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface FileInputLabelProps {
  isDragActive: boolean;
}
function FileInputLabel({ isDragActive }: FileInputLabelProps) {
  if (isDragActive) {
    return <div className={styles.label}>Drop the file here ...</div>;
  }
  return (
    <div className={styles.label}>
      <CloudUploadIcon fontSize="large" />
      <p>Drag 'n' drop the file here, or click to select file</p>
    </div>
  );
}

export default FileInputLabel;
