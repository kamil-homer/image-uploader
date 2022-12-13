import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { getDownloadURL } from "firebase/storage";

import FileInput from "../../components/FileInput/FileInput";
import { FileWithPreview } from "../../types/common";
import { nanoid } from "nanoid";
import { getFileExtension } from "../../utils/helpers";
import { logInAnonymously } from "../../firestore/firebaseService";
import styles from "./Home.module.scss";
function Home() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  //   const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [downloadURL, setDownloadURL] = useState("");
  console.log(files);

  useEffect(() => {
    logInUser();
  }, []);

  const logInUser = async () => await logInAnonymously();

  return (
    <Grid container rowSpacing={2} className={styles.imageUploader}>
      <Grid container item xs={12} justifyContent="center" alignItems="center">
        <Typography variant="h2" component="h2">
          Image uploader
        </Typography>
      </Grid>
      <Grid container item xs={12} justifyContent="center" alignItems="center">
        <FileInput
          setDownloadURL={setDownloadURL}
          setIsLoading={setIsLoading}
        />
      </Grid>
      <Grid container item xs={12} justifyContent="center" alignItems="center">
        {files.map((file: FileWithPreview) => (
          <img key={file.name} src={file.preview} alt={file.name} />
        ))}
      </Grid>
      <Grid container item xs={12} justifyContent="center" alignItems="center">
        <Box>Gallery</Box>
      </Grid>
    </Grid>
  );
}

export default Home;
