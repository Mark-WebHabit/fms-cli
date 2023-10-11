import axios from "../api/axios.js";
import React, { useEffect, useState, useContext } from "react";
import { styled } from "styled-components";
import { FileExplorerContext } from "../context/FileExplorerContext";

function FileComponent({ fileId, parentId }) {
  const [file, setFile] = useState("");
  const { selectedDirectory, click, selectedFile } =
    useContext(FileExplorerContext);

  useEffect(() => {
    if (!fileId) return;

    axios
      .get(`/api/files/${fileId}`)
      .then((response) => setFile(response.data.file))
      .catch((error) => console.log(error));
  }, []);

  return (
    <File
      onClick={() => click(file._id, file.name)}
      $color={fileId === selectedFile}
      $clickable={parentId === selectedDirectory}
    >
      - {file.name || "loading..."}
    </File>
  );
}

export default FileComponent;
const File = styled.span`
  margin: 0.2em 0;
  margin-left: 1.4em;
  font-size: 1rem;
  color: ${(props) => (props.$clickable && props.$color ? "red" : props.color)};
  cursor: pointer;
  pointer-events: ${(props) => (props.$clickable ? "auto" : "none")};
`;
