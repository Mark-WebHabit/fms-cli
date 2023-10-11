import React, { useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

import Template from "../components/Template";
import CloseTab from "../components/CloseTab";

function WindowView() {
  const [openApp, setOpenApp] = useState(false);

  const hanldeToggleApp = () => {
    setOpenApp(!openApp);
  };
  return (
    <Template action={hanldeToggleApp}>
      {openApp && (
        <>
          <CloseTab closeAction={hanldeToggleApp} width={400} />
          <Modal>
            <ModalText>File Explorer</ModalText>
            <ButtonContainer>
              <Link to="/login">
                <Button>Login</Button>
              </Link>
              <Link to="/register">
                <Button>Register</Button>
              </Link>
            </ButtonContainer>
          </Modal>
        </>
      )}
    </Template>
  );
}

export default WindowView;

const Modal = styled.div`
  min-width: 400px;
  min-height: 200px;
  align-items: center;
  background-color: white;
  margin: 0;
`;

const ModalText = styled.p`
  font-size: 2rem;
  font-weight: 600;
  color: black;
  font-family: "Roboto Slab", serif;
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
`;

const Button = styled.button`
  width: 100px;
  padding: 0.3em 0.6em;
  border-radius: 0.4em;
  outline: none;
  cursor: pointer;
  border: 1px solid black;
  font-weight: bold;

  &:hover {
    border: none;
    color: white;
    background-color: dodgerblue;
    transform: scale(1.2);
  }
`;
