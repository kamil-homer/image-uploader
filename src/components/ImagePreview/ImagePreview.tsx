import { Button, Grid } from "@mui/material";
import { useState } from "react";
import { FileWithPreview } from "../../types/common";
import { formatPixels } from "../../utils/helpers";
import styles from "./ImagePreview.module.scss";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { saveAs } from "file-saver";

interface ImagePreviewProps {
  file: FileWithPreview | null;
}

interface ImageSize {
  height: number;
  width: number;
}

function ImagePreview({ file }: ImagePreviewProps) {
  const [imageSize, setImageSize] = useState<ImageSize>({
    height: 0,
    width: 0,
  });
  if (!file) return null;

  const handleImgSize = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    const image = event.target as HTMLImageElement;
    setImageSize({ height: image.naturalHeight, width: image.naturalWidth });
  };

  return (
    <Grid container item xs={12} className={styles.imagePreview}>
      <Grid
        item
        container
        justifyContent="space-evenly"
        className={styles.details}
      >
        <Grid item xs={6} md={2} textAlign="center">
          <p className={styles.property}>Name</p>
          <p>{file.type}</p>
        </Grid>
        <Grid item xs={6} md={2} textAlign="center">
          <p className={styles.property}>Type</p>
          {file.type}
        </Grid>
        <Grid item xs={6} md={2} textAlign="center">
          <p className={styles.property}>Size (B)</p>
          {file.size}
        </Grid>
        <Grid item xs={6} md={2} textAlign="center">
          <p className={styles.property}>Dimension (px)</p>
          {`${imageSize.height} x ${imageSize.width}`}
        </Grid>
        <Grid item xs={6} md={2} textAlign="center">
          <p className={styles.property}>Megapixles</p>
          {`${formatPixels(imageSize.height * imageSize.width)}`}
        </Grid>
        <Grid
          container
          item
          xs={6}
          md={2}
          justifyContent="center"
          textAlign="center"
          alignItems="center"
          className={styles.downloadButtonWrapper}
        >
          <Button
            variant="contained"
            startIcon={<CloudDownloadIcon />}
            disabled={file === null}
            onClick={() => saveAs(file, file.name)}
            className={styles.downloadButton}
          >
            Download
          </Button>
        </Grid>
      </Grid>
      <Grid item container>
        <img
          key={file.name}
          src={file.preview}
          alt={file.name}
          className={styles.image}
          onLoad={handleImgSize}
          data-testid="imagePreview"
        />
      </Grid>
    </Grid>
  );
}

export default ImagePreview;
