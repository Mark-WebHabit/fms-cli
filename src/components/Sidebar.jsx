import React, { useRef, useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import { FileExplorerContext } from "../context/FileExplorerContext";

// components
import FilesAndFolders from "./FilesAndFolders";

function Sidebar() {
  const inputRef = useRef(null);
  const [name, setName] = useState("");
  const { showAddFolderInput, handleCreateFolder } =
    useContext(FileExplorerContext);

  useEffect(() => {
    showAddFolderInput && inputRef.current.focus();
  }, [showAddFolderInput]);

  return (
    <Container>
      <CreateFolder method="POST" $show={showAddFolderInput}>
        <Input
          maxLength={20}
          ref={inputRef}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Submit onClick={(e) => handleCreateFolder(e, name, setName)}>+</Submit>
      </CreateFolder>
      <SearchBar placeholder="Search Filess" />
      <FilesAndFolders />
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
  background-color: #d9d9d9;
  display: flex;
  flex-direction: column;
  padding: 1em;
`;

const SearchBar = styled.input`
  padding: 0.5em 1em;
  font-size: 1.2rem;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 0.7em;

  &:focus {
    outline: none;
    border-color: dodgerblue;
  }
`;

const CreateFolder = styled.form`
  margin-bottom: 1em;
  display: ${(props) => (props.$show ? "flex" : "none")};
`;

const Input = styled.input`
  flex: 1;
  padding: 0.3em 0.5em;
  border: 1px solid white;

  &:focus {
    outline: none;
    border-color: dodgerblue;
  }
`;

const Submit = styled.button`
  font-size: 1.3rem;
  font-weight: 600;
  display: flex;
  background-color: dodgerblue;
  border: 1px solid white;
  color: white;
`;
