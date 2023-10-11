import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import axios from "../api/axios.js";
import { FileExplorerContext } from "../context/FileExplorerContext.jsx";

function MainHeader() {
  const [user, setUser] = useState(null);
  const { userFetched } = useContext(FileExplorerContext);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, [userFetched]);

  const handleLogout = async () => {
    await axios
      .post("/user/logout")
      .then(() => {
        localStorage.removeItem("user");
        navigate("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Container>
      <Wrapper color={"#F1E1E1"} onClick={handleLogout}>
        <Image src="/logout.png" />
        <SmallText>Logout</SmallText>
      </Wrapper>
      <UserInfo>
        <Username>{user && `User: ${user.user} -- ${user.role}`}</Username>
      </UserInfo>
    </Container>
  );
}

export default MainHeader;

const Container = styled.div`
  height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  z-index: 3;
`;

const Wrapper = styled.div`
  width: 60px;
  height: 100%;
  background-color: ${(props) => props.color};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  position: relative;
`;
const SmallText = styled.span`
  font-size: 0.6rem;
  font-weight: 600;
`;

const Text = styled.span`
  font-size: 1.5rem;
  color: white;
  font-weight: 600;
`;

const Image = styled.img`
  height: 30px;
  width: 30px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1em;
`;

const Username = styled.p`
  font-size: 1rem;
  color: black;
  font-weight: 600;
`;
