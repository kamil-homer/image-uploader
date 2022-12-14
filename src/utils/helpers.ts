import { FileRejection } from "react-dropzone";

export const getFileUrl = (file: File) =>
  Object.assign(file, { preview: URL.createObjectURL(file) });

export const prepareErrorList = (
  fileRejections: FileRejection[],
  initialArray: string[]
) =>
  fileRejections.reduce((errors, fileRejection) => {
    fileRejection.errors.forEach((error) => {
      if (!errors.includes(error.message)) {
        errors = [...errors, error.message];
      }
    });

    return errors;
  }, initialArray);

// unsigned right shift for handling hidden files e.g .gitIgnore
export const getFileExtension = (filename: string) =>
  filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);

export const generateFakeFileWithPreview = ({
  name = "fileWithPreview.txt",
  size = 1024,
  type = "plain/txt",
}) => {
  const blob = new Blob(["a".repeat(size)], { type });
  return getFileUrl(new File([blob], name));
};

export const formatPixels = (size: number) => {
  if (size >= 1000000) {
    return (size / 1000000).toFixed(1).replace(/\.0$/, "") + "MP";
  }
  return size + "P";
};
