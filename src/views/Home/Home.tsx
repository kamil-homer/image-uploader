import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import FileInput from "../../components/FileInput/FileInput";

function Home() {
  const [files, setFiles] = useState([]);
  console.log(files);
  return (
    <Grid container rowSpacing={2}>
      <Grid container item xs={12} justifyContent="center" alignItems="center">
        <Typography variant="h2" component="h2">
          Image uploader
        </Typography>
      </Grid>
      <Grid container item xs={12} justifyContent="center" alignItems="center">
        <FileInput setFiles={setFiles} />
      </Grid>
      <Grid container item xs={12} justifyContent="center" alignItems="center">
        <Box>Gallery</Box>
      </Grid>
    </Grid>
  );
}

export default Home;
