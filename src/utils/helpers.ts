import { FileRejection } from "react-dropzone";

export const getFileUrl = (file: any) =>
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

//   unsigned right shift for handling hidden files e.g .gitIgnore
export const getFileExtension = (filename: string) =>
  filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
