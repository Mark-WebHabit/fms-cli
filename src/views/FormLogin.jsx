import React, { useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios.js";

// utilities
import { handleClearStatePromise } from "../utilities/stateFunction";

// components
import Template from "../components/Template";
import FormCOntainer from "../components/FormCOntainer";
import InputComponent from "../components/Input";

function FormLogin() {
  const [showForm, setShowForm] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = async () => {
    const { username, password } = formData;
    try {
      if (!username || !password) {
        alert("All fields are required");
        return;
      }
      const response = await axios.post("/user/login", {
        username,
        password,
      });
      await handleClearStatePromise(setFormData, formData);
      navigate("/explorer");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Template action={handleShowForm}>
      {showForm && (
        <FormCOntainer
          formText={"Login"}
          linkText={"create account"}
          path={"register"}
          closeAction={handleShowForm}
          submit={handleSubmit}
        >
          <InputContainer>
            <InputComponent
              label={"username"}
              setter={setFormData}
              state={formData}
              stateName={"username"}
              value={formData.username}
            />
            <InputComponent
              label={"password"}
              type="password"
              setter={setFormData}
              state={formData}
              stateName={"password"}
              value={formData.password}
            />
          </InputContainer>
        </FormCOntainer>
      )}
    </Template>
  );
}

export default FormLogin;

const InputContainer = styled.div`
  padding: 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
