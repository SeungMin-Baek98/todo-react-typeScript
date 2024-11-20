import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atom";

import styled from "styled-components";

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  margin: 10px 0;
  border-radius: 5px;
  background-color: ${(props) => props.theme.cardBgColor};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Text = styled.span`
  flex: 1;
  font-size: 16px;
  color: ${(props) => props.theme.textColor};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.theme.accentColor};
  color: white;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.accentColor};
  }

  &[name="delete"] {
    background-color: red;
    &:hover {
      background-color: darkred;
    }
  }
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;

    setToDos((oldToDos) => {
      if (name === "delete") {
        return oldToDos.filter((toDo) => toDo.id !== id);
      }

      const targetIDX = oldToDos.findIndex((toDo) => toDo.id === id);
      const oldToDo = oldToDos[targetIDX];
      const newToDo = { ...oldToDo, category: name as Categories };

      return [
        ...oldToDos.slice(0, targetIDX),
        newToDo,
        ...oldToDos.slice(targetIDX + 1),
      ];
    });
  };

  return (
    <ListItem>
      <Text>{text}</Text>

      <ButtonGroup>
        {category !== Categories.DOING && (
          <Button name={Categories.DOING} onClick={onClick}>
            Doing
          </Button>
        )}

        {category !== Categories.TO_DO && (
          <Button name={Categories.TO_DO} onClick={onClick}>
            To Do
          </Button>
        )}

        {category !== Categories.DONE && (
          <Button name={Categories.DONE} onClick={onClick}>
            Done
          </Button>
        )}

        <Button name="delete" onClick={onClick}>
          Delete
        </Button>
      </ButtonGroup>
    </ListItem>
  );
}

export default ToDo;
