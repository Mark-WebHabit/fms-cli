import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios.js";
import FileDownload from "js-file-download";
// import { uuid } from "uuidv4";

const FileExplorerContext = createContext(null);

function FileExplorerContextProvider({ children }) {
  const [showAddFolderInput, setShowAddFOdlerInput] = useState(false);
  const [folders, setFodlers] = useState(null);
  const [refreshFolders, setRefreshFolders] = useState(false);
  const [selectedDirectory, setSelectedDirectory] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState(null);
  const [createFIleMode, setCreateFIleMode] = useState(false);
  const [metaData, setMetdaData] = useState({
    filename: "",
    fileext: "txt",
  });
  const [userFetched, setUserFecthed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/user")
      .then((response) =>
        localStorage.setItem("user", JSON.stringify(response.data))
      )
      .then(() => setUserFecthed(true))
      .catch((err) => {
        console.log(err);
        navigate("/login");
      });
  }, []);

  const handleChange = (name, val) => {
    setMetdaData({ ...metaData, [name]: val });
  };

  const click = (id, name) => {
    setSelectedFileName(name);
    setSelectedFile(id);
  };

  // select directory from sidebar
  const handleSelectedDirectory = (id) => {
    setSelectedFile(null);
    setSelectedDirectory(id);
  };

  // show the hidden input
  const handleShowAddFolderInput = () => {
    setShowAddFOdlerInput(!showAddFolderInput);
  };

  // fetch folders
  useEffect(() => {
    const getFolders = () => {
      axios
        .get("/api/folder")
        .then((response) => {
          setFodlers(response.data.folders || null);
          setRefreshFolders(false);
        })
        .catch((error) => console.log(error));
    };
    getFolders();
  }, [refreshFolders]);

  // create folder
  const handleCreateFolder = async (e, val, setVal) => {
    e.preventDefault();

    await axios
      .post("/api/folder", { name: val })
      .then(() => {
        setVal("");
        setRefreshFolders(true);
      })
      .catch((error) => console.log(error.message));

    setShowAddFOdlerInput(false);
  };

  // deleet folder
  const handleDeleteFolder = async () => {
    if (!selectedDirectory) {
      return alert("Select a folder first");
    }
    await axios
      .delete(`/api/folder/${selectedDirectory}`)
      .then((response) => console.log(response.data))
      .then(() => setRefreshFolders(true))
      .catch((error) => console.log(error));
    setSelectedDirectory("");
  };

  // delete file
  const handleDeleteFile = async () => {
    if (!selectedDirectory) {
      alert("Select a folder to delete");
      return;
    }
    if (!selectedFile) {
      alert("Select a file to delete");
      return;
    }

    await axios
      .post(`/api/files/${selectedFile}`, {
        folder: selectedDirectory,
      })
      .then((response) => console.log(response))
      .then(() => setRefreshFolders(true))
      .catch((error) => console.log(error));

    setSelectedFile(null);
  };

  const createFile = () => {
    if (!selectedDirectory) {
      alert("Select a folder first");
      return;
    }

    setCreateFIleMode(true);
  };

  const handleCancelCreateFIle = () => {
    setMetdaData({ filename: "", fileext: "txt" });
    setCreateFIleMode(false);
  };

  const handleCreateFile = async () => {
    if (!selectedDirectory) {
      alert("Select a folder first");
      return;
    }
    if (metaData.filename == "" || metaData.ext == "") {
      alert("Fields cannot be blank");
      return;
    }

    try {
      const response = await axios.post("/api/files/create", {
        filename: metaData.filename,
        fileext: metaData.fileext,
        folderId: selectedDirectory,
      });
      handleCancelCreateFIle();
      setRefreshFolders(true);
    } catch (error) {
      console.error("Error:", error); // Log the error for debugging
    }
  };

  const downloadFile = async () => {
    try {
      if (!selectedDirectory) alert("Select a folder first");
      if (!selectedFile || !selectedFileName) alert("Select a file first");

      const response = await axios.get(`/api/files/download/${selectedFile}`, {
        method: "GET",
        responseType: "arraybuffer",
      });

      if (response?.data) {
        FileDownload(response.data, selectedFileName);
      }
      setSelectedFile(null);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FileExplorerContext.Provider
      value={{
        showAddFolderInput,
        folders,
        selectedDirectory,
        selectedFile,
        metaData,
        createFIleMode,
        userFetched,
        setUserFecthed,
        handleShowAddFolderInput,
        handleSelectedDirectory,
        handleCreateFolder,
        handleDeleteFolder,
        setRefreshFolders,
        click,
        handleDeleteFile,
        createFile,
        downloadFile,
        handleCancelCreateFIle,
        handleCreateFile,
        handleChange,
      }}
    >
      {children}
    </FileExplorerContext.Provider>
  );
}

export { FileExplorerContextProvider, FileExplorerContext };
