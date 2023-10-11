import React, { useContext } from "react";
import { styled } from "styled-components";

import { FileExplorerContext } from "../context/FileExplorerContext";
import Directories from "./Directories";

function FilesAndFolders() {
  const { folders } = useContext(FileExplorerContext);

  return (
    <Container>
      {folders && folders.length ? (
        folders.map((folder) => (
          <Directories key={folder._id} folder={folder} />
        ))
      ) : (
        <Text>No folders to display...</Text>
      )}
    </Container>
  );
}

export default FilesAndFolders;

const Container = styled.div`
  flex: 1;
  margin-top: 1em;
  display: flex;
  flex-direction: column;
`;

const Text = styled.p`
  text-align: center;
  font-size: 1.3rem;
  font-weight: 600;
`;
