import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const DropZone = (props) => {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
    maxFiles: 1,
    multiple: false,
    accept: "image/*",
    onDrop: acceptedFiles => {
      const files = acceptedFiles.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      );
      if (props.onChange) {
        props.onChange(files);
      }
    }
  });
  
  const files = acceptedFiles.map(file => (
    file.path + (acceptedFiles.length > 1 ? ',': '')
  ));

  return (
    <div>
      <p>Image choisis : {files}</p>
      <div {...getRootProps({className: 'dropzone-bagad'})}>
        <input {...getInputProps()} />
        <p>Faites glisser et déposez votre image ici, ou cliquez pour sélectionner une image</p>
      </div>
    </div>
  );
};

export default DropZone;
