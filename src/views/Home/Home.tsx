import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import FileInput from "../../components/FileInput/FileInput";
import { FileWithPreview } from "../../types/common";
import { logInAnonymously } from "../../firestore/firebaseService";
import styles from "./Home.module.scss";
import ImagePreview from "../../components/ImagePreview/ImagePreview";
function Home() {
  const [file, setFile] = useState<FileWithPreview | null>(null);

  useEffect(() => {
    logUserIntoFirebase();
  }, []);

  const logUserIntoFirebase = async () => await logInAnonymously();

  return (
    <Grid container rowGap={2} className={styles.imageUploader}>
      <Grid
        container
        item
        xs={12}
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        <Typography variant="h2" component="h2">
          Image uploader
        </Typography>
      </Grid>
      <Grid container item xs={12} justifyContent="center" alignItems="center">
        <FileInput setFiles={setFile} />
      </Grid>
      <Grid container item xs={12} justifyContent="center" alignItems="center">
        <ImagePreview file={file} />
      </Grid>
    </Grid>
  );
}

export default Home;
