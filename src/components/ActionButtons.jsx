import React, { useEffect, useRef, useState, useContext } from "react";
import { styled } from "styled-components";
import axios from "../api/axios.js";
import { FileExplorerContext } from "../context/FileExplorerContext";

import getFileExtension from "../utilities/getFileExtension";
// components
import ActionButtonSubComponents from "./ActionButtonSubComponents";

function ActionButtons() {
  const {
    handleShowAddFolderInput,
    handleDeleteFolder,
    selectedDirectory,
    setRefreshFolders,
    handleDeleteFile,
    createFile,
    downloadFile,
  } = useContext(FileExplorerContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileRef = useRef(null);

  // trigger hidden input
  const handleFileInputClick = () => {
    if (fileRef.current) fileRef.current.click();
  };

  const handleFileOnChange = (event) => {
    const { name, size, type } = event.target.files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContent = event.target.result; // This is the content of the file
      const file = {
        name,
        size,
        type,
        ext: getFileExtension(name),
        content: fileContent, // Store the content in the fileAttr property
      };
      setSelectedFile(file);
    };
    reader.readAsText(event.target.files[0], "UTF-*");
  };

  useEffect(() => {
    if (!selectedFile) {
      return;
    }
    if (selectedFile && !selectedDirectory) {
      alert("No folder selected");
      return;
    }

    axios
      .post("/api/files", {
        folder: selectedDirectory,
        file: selectedFile,
      })
      .then(() => setRefreshFolders(true))
      .catch((err) => console.log(err.response.data.message));
  }, [selectedFile]);

  return (
    <Container>
      <ActionButtonSubComponents
        src={"/add-folder.png"}
        x
        desc={"create Folder"}
        action={handleShowAddFolderInput}
      />
      <ActionButtonSubComponents
        src={"/delete-folder.png"}
        desc={"Delete Folder"}
        action={handleDeleteFolder}
      />
      <ActionButtonSubComponents
        src={"/new-document.png"}
        desc={"Upload File"}
        action={handleFileInputClick}
      />
      <ActionButtonSubComponents
        src={"/remove-file.png"}
        desc={"Delete File"}
        action={handleDeleteFile}
      />
      <ActionButtonSubComponents
        src={"/create.png"}
        desc={"Create File"}
        action={createFile}
      />
      <ActionButtonSubComponents
        src={"/download.png"}
        desc={"Download File"}
        action={downloadFile}
      />
      <HiddenInput type="file" ref={fileRef} onChange={handleFileOnChange} />
    </Container>
  );
}

export default ActionButtons;

const Container = styled.div`
  height: 85px;
  width: 100%;
  background-color: #f1e1e1;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5em;
`;

const HiddenInput = styled.input`
  display: none;
`;
