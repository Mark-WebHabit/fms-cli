import React from "react";
import { styled } from "styled-components";

function ActionButtonSubComponents({ src, desc, action = null }) {
  return (
    <ButtonWrapper onClick={action}>
      <Image src={src} />
      <Description>{desc}</Description>
    </ButtonWrapper>
  );
}

export default ActionButtonSubComponents;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 200ms;

  &:hover {
    transform: scale(1.2);
  }
`;

const Image = styled.img`
  height: 40px;
  width: 40px;
`;

const Description = styled.span`
  font-size: 1.2rem;
  color: black;
`;
