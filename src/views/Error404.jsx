import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

function Error404() {
  return (
    <Main>
      <Text>404 Not Found...</Text>
      <Link to={"/"}>
        <p>Go back to home....</p>
      </Link>
    </Main>
  );
}

export default Error404;

const Main = styled.div`
  width: 100%;
  height: 100vh;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Text = styled.p`
  color: white;
  font-size: 5rem;
`;
