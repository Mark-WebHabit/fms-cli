import React from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

function CloseTab({ closeAction, width = 400, disable = false }) {
  const navigate = useNavigate();
  const handleClick = () => {
    closeAction();
    if (!disable) {
      navigate("/");
    }
  };
  return (
    <WindowHeader width={width}>
      <CloseImage src="cancel.png" onClick={handleClick} />
    </WindowHeader>
  );
}

export default CloseTab;
const WindowHeader = styled.div`
  width: ${(props) => props.width}px;
  height: 20px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  z-index: 2;
`;

const CloseImage = styled.img`
  width: 15px;
  height: 15px;
  margin-right: 1em;
  margin-top: 1em;
  cursor: pointer;
`;
