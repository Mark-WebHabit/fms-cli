import React, { useState } from "react";

import { styled } from "styled-components";
import { FileExplorerContextProvider } from "../context/FileExplorerContext";
// components
import Template from "../components/Template";
import CloseTab from "../components/CloseTab";
import MainHeader from "../components/MainHeader";
import ActionButtons from "../components/ActionButtons";
import Grid from "../components/Grid";

function FileExplorer() {
  const [open, setOpen] = useState(true);
  const toggleFileExplorer = () => {
    setOpen(!open);
  };

  return (
    <FileExplorerContextProvider>
      <Template action={toggleFileExplorer}>
        {open && (
          <>
            <CloseTab
              width={1200}
              closeAction={toggleFileExplorer}
              disable={true}
            />
            <FileExplorerWrapper>
              <MainHeader />
              <ActionButtons />
              <Grid />
            </FileExplorerWrapper>
          </>
        )}
      </Template>
    </FileExplorerContextProvider>
  );
}

export default FileExplorer;

const FileExplorerWrapper = styled.div`
  width: 1200px;
  height: 80vh;
  background-color: white;
  display: flex;
  flex-direction: column;
`;
