import React, { useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios.js";

// utilities
import {
  handleClearStatePromise,
  handleValidPasswordOrUsername,
  handleConfirmPassword,
} from "../utilities/stateFunction";

// components
import Template from "../components/Template";
import FormCOntainer from "../components/FormCOntainer";
import InputComponent from "../components/Input";

function FormSignUp() {
  const [showForm, setShowForm] = useState(true);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    cpassword: "",
    role: "",
  });
  const navigate = useNavigate();

  const handleShowForm = () => {
    setShowForm(!showForm);
  };

  const handleSubmit = async () => {
    const { username, password, cpassword, role } = formData;
    const firstPromise = handleValidPasswordOrUsername(username, 4);
    const secondPromise = handleValidPasswordOrUsername(password, 8);
    const thirdPromise = handleConfirmPassword(password, cpassword);

    try {
      const [result1, result2, result3] = await Promise.all([
        firstPromise,
        secondPromise,
        thirdPromise,
      ]);

      if (formData?.role && role !== "") {
        const response = await axios.post(`/user/register`, {
          username,
          password,
          role,
        });
        console.log(response);
        await handleClearStatePromise(setFormData, formData);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Template action={handleShowForm}>
      {showForm && (
        <FormCOntainer
          formText={"Register"}
          linkText={"have an account"}
          path={"login"}
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
            <InputComponent
              label={"confirm password"}
              type="password"
              setter={setFormData}
              state={formData}
              stateName={"cpassword"}
              value={formData.cpassword}
            />
            <RadioContainer>
              <InputComponent
                flex={true}
                label={"User"}
                type="radio"
                value={"User"}
                state={formData}
                setter={setFormData}
              />
              <InputComponent
                flex={true}
                label={"Admin"}
                type="radio"
                value={"Admin"}
                state={formData}
                setter={setFormData}
              />
            </RadioContainer>
          </InputContainer>
        </FormCOntainer>
      )}
    </Template>
  );
}

export default FormSignUp;

const InputContainer = styled.div`
  padding: 1em;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RadioContainer = styled.div`
  display: flex;
  gap: 1em;
`;
