import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const DropZone = (props) => {
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
    maxFiles: props.max || props.max == 0 ? props.max : 1,
    multiple: props.multiple ? props.multiple : false,
    accept: props.accept ? props.accept : "image/*",
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

  return (
    <div>
      {/* <p>Image choisis : {files}</p> */}
      <div {...getRootProps({className: 'dropzone-bagad'})}>
        <input {...getInputProps()} />
        <div className="upload-gallery flex">
          {acceptedFiles.map((file, index) => {
            if (file.name.match(/(\.jpg|\.jpeg|\.png|\.gif|\.svg)$/i)) return(<img key={index} src={file.preview} alt="image upload" />)
          })}
        </div>
        
        {acceptedFiles && Array.isArray(acceptedFiles) && acceptedFiles.map((file, index) => {
          if (file.name) return(<p key={index}>{file.name}</p>)
        })}
        {acceptedFiles && Array.isArray(acceptedFiles) && acceptedFiles.length == 0 && (
          <p>Faites glisser et déposez votre ficher ici, ou cliquez pour sélectionner un fichier</p>
        )}
      </div>
    </div>
  );
};

export default DropZone;
