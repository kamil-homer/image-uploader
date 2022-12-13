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
