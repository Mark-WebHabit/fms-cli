import React, { useState, useContext, useEffect } from "react";

import { styled } from "styled-components";
import FileComponent from "./FileComponent";
import { FileExplorerContext } from "../context/FileExplorerContext";

function Directories({ folder }) {
  const [showFiles, setShowFiles] = useState(false);

  const { handleSelectedDirectory, selectedDirectory } =
    useContext(FileExplorerContext);

  return (
    <Directory onDoubleClick={() => handleSelectedDirectory(folder._id)}>
      <FolderDesc
        $red={selectedDirectory === folder._id}
        onClick={() => setShowFiles(!showFiles)}
      >
        <FolderName>-</FolderName>
        <Image src={"/folder-colored.png"} />
        <FolderName>{folder.name}</FolderName>
      </FolderDesc>
      {showFiles &&
        folder.content.map((id) => (
          <FileComponent key={id} fileId={id} parentId={folder._id} />
        ))}
    </Directory>
  );
}

export default Directories;
const Directory = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.4em 0;
  margin-left: 1em;
  cursor: pointer;
`;

const FolderDesc = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  user-select: none;
  border: 1px solid ${(props) => (props.$red ? "red" : "#d9d9d9")};
`;

const FolderName = styled.span`
  font-size: 1.1rem;
`;
const Image = styled.img`
  height: 30px;
  width: 30px;
  margin: 0 0.4em;
`;
