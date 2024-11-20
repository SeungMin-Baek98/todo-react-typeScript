import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atom";

import styled from "styled-components";

interface IForm {
  toDo: string;
}

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid ${(props) => props.theme.accentColor};
  border-radius: 5px;
  margin-right: 10px;
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  font-size: 16px;
  transition: all 0.3s ease;
  &::placeholder {
    color: ${(props) => props.theme.textColor};
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 8px ${(props) => props.theme.accentColor};
  }
`;

const Button = styled.button`
  padding: 10px 15px;
  background-color: ${(props) => props.theme.accentColor};
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.accentColor};
  }
`;

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const { register, setValue, handleSubmit } = useForm<IForm>();
  const category = useRecoilValue(categoryState);

  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { id: Date.now(), text: toDo, category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };

  return (
    <Form onSubmit={handleSubmit(handleValid)}>
      <Input
        {...register("toDo", { required: "Please write a To Do" })}
        type="text"
        placeholder="Write a To Do"
      />
      <Button>Add</Button>
    </Form>
  );
}

export default CreateToDo;
