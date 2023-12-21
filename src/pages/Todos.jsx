import styled from "styled-components";
import { useState, useEffect } from "react";
import { getUserItems } from "../utils/utils";

const TodoItem = styled.li`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 5px 0;
  padding: 5px 10px;
  border-radius: 4px;
  background-color: #f2f2f2;
  list-style-type: none;
`;

const TodoText = styled.span`
  flex: 3;
  allign-self: center;
  text-align: left;
`;

const TodoStatus = styled.span`
  flex: 1;
  allign-self: center;
  text-align: right;

  color: ${(props) => (props.completed ? "green" : "red")};
`;

const CompleteButton = styled.button`
  margin-left: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  color: black;
  cursor: pointer;
  background-color: #4caf50;
`;

const TODOS_URL = "https://jsonplaceholder.typicode.com/todos";

const Todos = ({ userId, setHasTodos }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: todosTemp } = await getUserItems(TODOS_URL, userId);
      setTodos(todosTemp);
      const allTodosCompleted = todosTemp.every((todo) => todo.completed);
      setHasTodos(!allTodosCompleted);
    };
    fetchData();
  }, [userId, setHasTodos]);

  const markComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: true };
        }
        return todo;
      })
    );
  };

  return (
    <ul>
      {todos.map((todo) => {
        const { id, title, completed } = todo || {};
        return (
          <TodoItem key={id}>
            <TodoText>
              {title}
              <br />
            </TodoText>
            <TodoStatus completed={completed}>
              {completed ? "Completed" : "Not completed"}
            </TodoStatus>
            {!completed && (
              <CompleteButton onClick={() => markComplete(id)}>
                Mark Complete
              </CompleteButton>
            )}
          </TodoItem>
        );
      })}
    </ul>
  );
};

export default Todos;
