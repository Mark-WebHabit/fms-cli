import React from "react";
import { styled } from "styled-components";
import CloseTab from "./CloseTab";
import { useNavigate } from "react-router-dom";

function FormCOntainer({
  children,
  formText,
  linkText,
  path,
  closeAction,
  submit,
}) {
  const navigate = useNavigate();
  const redirect = () => {
    navigate(`/${path}`);
  };
  return (
    <FormWrapper>
      <CloseTab width={250} closeAction={closeAction} />
      <FormText>{formText}</FormText>
      {children}
      <FormSubmit onClick={submit}>Submit</FormSubmit>
      <FormRedirect onClick={redirect}>{linkText}</FormRedirect>
    </FormWrapper>
  );
}

export default FormCOntainer;

const FormWrapper = styled.div`
  width: 250px;
  height: auto;
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const FormText = styled.p`
  width: 100%;
  text-align: center;
  font-size: 2rem;
  text-transform: uppercase;
  text-align: center;
`;

const FormSubmit = styled.button`
  width: 100px;
  padding: 0.3em 0.6em;
  border-radius: 0.4em;
  outline: none;
  cursor: pointer;
  border: 1px solid black;
  font-weight: bold;
  margin: 1em auto;
  margin-bottom: 0;

  &:hover {
    border: none;
    color: white;
    background-color: dodgerblue;
    transform: scale(1.2);
  }
`;

const FormRedirect = styled.p`
  font-size: 0.8rem;
  color: black;
  font-weight: 600;
  text-align: center;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
