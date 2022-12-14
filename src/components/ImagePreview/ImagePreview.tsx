import { Button, Grid, IconButton } from "@mui/material";
import { useState } from "react";
import { FileWithPreview } from "../../types/common";
import { formatPixels } from "../../utils/helpers";
import styles from "./ImagePreview.module.scss";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

interface ImagePreviewProps {
  file: FileWithPreview | null;
  downloadLink: string;
}

interface ImageSize {
  height: number;
  width: number;
}

function ImagePreview({ file, downloadLink }: ImagePreviewProps) {
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
          <p>name</p>
          <p>{file.name}</p>
        </Grid>
        <Grid item xs={6} md={2} textAlign="center">
          <p>type</p>
          {file.type}
        </Grid>
        <Grid item xs={6} md={2} textAlign="center">
          <p>size</p>
          {file.size}
        </Grid>
        <Grid item xs={6} md={2} textAlign="center">
          <p>dimension (px)</p>
          {`${imageSize.height} x ${imageSize.width}`}
        </Grid>
        <Grid item xs={6} md={2} textAlign="center">
          <p>megapixles</p>

          {`${formatPixels(imageSize.height * imageSize.width)}`}
        </Grid>
        <Grid item xs={6} md={2} textAlign="center">
          <a
            href={downloadLink}
            download={file.name}
            target="_blank"
            rel="noreferrer"
            className={styles.downloadLink}
          >
            <Button variant="contained" startIcon={<CloudDownloadIcon />}>
              Download
            </Button>
          </a>
        </Grid>
      </Grid>
      <Grid item container>
        <img
          key={file.name}
          src={file.preview}
          alt={file.name}
          className={styles.image}
          onLoad={handleImgSize}
        />
      </Grid>
    </Grid>
  );
}

export default ImagePreview;
