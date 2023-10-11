import React, { useState, useContext, useEffect } from "react";
import { styled } from "styled-components";
import { FileExplorerContext } from "../context/FileExplorerContext";
import axios from "../api/axios";

function ContentWindow() {
  const { selectedFile, setRefreshFolders, selectedDirectory } =
    useContext(FileExplorerContext);
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [disable, setDisable] = useState(true);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };
  useEffect(() => {
    setDisable(true);
    if (!selectedFile) return;
    axios
      .get(`http://localhost:5000/api/files/${selectedFile}`)
      .then((response) => setFile(response.data.file))
      .catch((err) => console.log(err));
  }, [selectedFile]);

  useEffect(() => {
    file && setText(file.content);
  }, [file]);

  const handleEdit = () => {
    if (selectedFile && selectedDirectory) {
      file && setDisable(false);
    }
  };

  const handleCancel = () => {
    selectedDirectory && file && setText(file.content);
    setDisable(true);
  };

  const updateButton = async () => {
    if (!selectedFile) {
      alert("no file selelected");
      return;
    }
    await axios
      .put(`/api/files/${selectedFile}`, {
        content: text,
      })
      .then(() => setRefreshFolders(true))
      .catch((err) => console.log(err));
    setDisable(true);
  };

  return (
    <Container>
      <Wrapper>
        <Text>{file ? file.name : "No file selected"}</Text>
        <Buttons>
          {disable ? (
            <Button onClick={handleEdit}>Edit</Button>
          ) : (
            <>
              <Button onClick={updateButton}>Save</Button>
              <Button onClick={handleCancel} $color={true}>
                Cancel
              </Button>
            </>
          )}
        </Buttons>
      </Wrapper>
      <Textarea value={text} onChange={handleTextChange} readOnly={disable} />
    </Container>
  );
}

export default ContentWindow;

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Wrapper = styled.div`
  height: 50px;
  border-bottom: 1px solid black;
  padding: 0.5em 1em;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Text = styled.span`
  font-weight: 600;
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;

const Button = styled.button`
  padding: 0.5em 1em;
  background-color: ${(props) => (props.$color ? "red" : "dodgerblue")};
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  border: none;
  border-radius: 0.3em;
  cursor: pointer;
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 100%;
  border: none;
  resize: none;
  padding: 8px;
  box-sizing: border-box;
  border: none;
  font-weight: 400;

  &:focus {
    outline: none;
  }
`;
