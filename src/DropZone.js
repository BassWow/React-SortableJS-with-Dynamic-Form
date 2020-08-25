import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import styled from "styled-components";

const MyDropZone = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background: #eee;
  color: ${(props) => (props.isDragActive ? "green" : "#333")}};
  border: 2px dashed
    ${(props) => (props.isDragActive ? "green" : "#aaa")};
  font-size: 0.8rem;
`;

export default ({ state, setState }) => {
  const onDropAccepted = useCallback(
    async ([file]) => {
      var reader = new FileReader();
      reader.onload = async (e) => {
        var contents = e.target.result;
        const newOffers = [...state.offers];
        newOffers[
          state.offers.findIndex((it) => it.id === state.selectedid)
        ].fields["src"] = contents;
        setState({
          ...state,
          offers: newOffers
        });
      };
      reader.readAsDataURL(file);
    },
    [state, setState]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDropAccepted
  });

  return (
    <MyDropZone {...getRootProps({ isDragActive })}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </MyDropZone>
  );
};
