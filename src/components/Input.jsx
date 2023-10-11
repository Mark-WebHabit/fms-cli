import React from "react";
import { styled } from "styled-components";
import { handleStateChange } from "../utilities/stateFunction";

function InputComponent({
  label,
  type = "text",
  flex = false,
  name = "radio",
  state,
  setter,
  stateName,
  value,
}) {
  return (
    <InputSeperator $flex={flex}>
      <Label>{label}</Label>
      {type === "text" || type === "password" ? (
        <Input
          type={type}
          value={value}
          onChange={(e) =>
            handleStateChange(setter, state, stateName, e.target.value)
          }
        />
      ) : (
        <Input
          type={type}
          name={name}
          value={value}
          onChange={(e) => setter({ ...state, ["role"]: e.target.value })}
          checked={state.role === value}
        />
      )}
    </InputSeperator>
  );
}

export default InputComponent;
const InputSeperator = styled.div`
  width: 90%;
  display: flex;
  flex-direction: ${(props) => (props.$flex ? "row" : "column")};
  justify-content: center;
  align-items: ${(props) => (props.$flex ? "center" : null)};
`;

const Label = styled.span`
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: capitalize;
  margin-top: 1em;
`;

const Input = styled.input`
  width: 100%;
  border-radius: 0.2em;
  outline: none;
  border: 1px solid black;
  font-size: 0.8rem;
  &:focus {
    border-color: dodgerblue;
  }
`;
