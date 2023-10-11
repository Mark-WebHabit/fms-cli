import React, { useContext } from "react";
import { styled } from "styled-components";
import { FileExplorerContext } from "../context/FileExplorerContext";
import { allowedExtensions } from "../allowedExtensions.js";

// components
import Sidebar from "./Sidebar";
import ContentWindow from "./ContentWindow";

export default function Grid() {
  const {
    createFIleMode,
    handleChange,
    metaData,
    handleCancelCreateFIle,
    handleCreateFile,
  } = useContext(FileExplorerContext);

  return (
    <GridContainer>
      {createFIleMode && (
        <CreateFileModal>
          <CreateFileForm>
            <Input
              placeholder={"File name (file ext. excluded)"}
              maxLength={20}
              value={metaData.filename}
              onChange={(e) => handleChange("filename", e.target.value)}
            />
            <Select
              value={metaData.fileext}
              onChange={(e) => handleChange("fileext", e.target.value)}
            >
              {allowedExtensions.map((ext, i) => (
                <Option value={ext} key={i}>
                  {ext}
                </Option>
              ))}
            </Select>
            <ButtonContainer>
              <Button onClick={handleCreateFile}>Done</Button>
              <Button onClick={handleCancelCreateFIle}>Cancel</Button>
            </ButtonContainer>
          </CreateFileForm>
        </CreateFileModal>
      )}
      <Sidebar />
      <ContentWindow />
    </GridContainer>
  );
}
const GridContainer = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 300px 1fr;
`;
const CreateFileModal = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 5;
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 15%;
`;

const CreateFileForm = styled.div`
  width: 300px;
  min-height: 200px;
  background-color: #ffffff;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 85%;
  padding: 0.5em 0.5em;
  font-size: 1.1rem;
  border-radius: 0.4em;
  border: 1px solid black;
  font-weight: 400;
  margin-bottom: 1em;

  &:focus {
    outline: none;
  }
`;

const Select = styled.select`
  width: 90%;
  padding: 0.5em; 1em;
  border: 1px solid black;
  outline: none;
`;

const Option = styled.option`
  font-size: 1rem;
`;

const ButtonContainer = styled.div`
  margin-top: 1em;
  width: 90%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Button = styled.button`
  flex-basis: 40%;
  font-size: 1rem;
  font-weight: 400;
`;
