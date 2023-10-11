import { styled } from "styled-components";

function Template({ children, action }) {
  return (
    <IndexPathContainer>
      <Image src="/fileExplorer.png" onClick={action} />
      {children}
    </IndexPathContainer>
  );
}

export default Template;
const Image = styled.img`
  width: 100px;
  height: 100px;
  position: absolute;
  top: 2em;
  left: 2em;
  cursor: pointer;

  &:hover {
    transform: scale(1.2);
  }
`;

const IndexPathContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;
