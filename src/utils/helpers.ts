export const getFileUrl = (file: any) =>
  Object.assign(file, { preview: URL.createObjectURL(file) });
