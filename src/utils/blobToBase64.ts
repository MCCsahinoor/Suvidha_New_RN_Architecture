/* eslint-disable prettier/prettier */
export const blobToBase64 = (blob: Blob) => {
  const fileReaderInstance = new FileReader();
  fileReaderInstance.readAsDataURL(blob);
  fileReaderInstance.onload = () => {
    // return fileReaderInstance.result;
  };
  return fileReaderInstance;
};
