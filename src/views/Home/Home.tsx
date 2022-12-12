import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import FileInput from "../../components/FileInput/FileInput";

function Home() {
  return (
    <Grid container rowSpacing={2}>
      <Grid container item xs={12} justifyContent="center" alignItems="center">
        <Typography variant="h2">Image uploader</Typography>
        <FileInput />
        <Box>File upload</Box>
      </Grid>
      <Grid container item xs={12} justifyContent="center" alignItems="center">
        <Box>Gallery</Box>
      </Grid>
    </Grid>
  );
}

export default Home;
