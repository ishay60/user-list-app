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
  console.log("todos", todos);
  useEffect(() => {
    const fetchData = async () => {
      const todosTemp = await getUserItems(TODOS_URL, userId);
      setTodos(todosTemp);
      const allTodosCompleted = todosTemp.every((todo) => todo.completed);
      setHasTodos(!allTodosCompleted);
    };
    fetchData();
  }, [userId, setHasTodos]);

  const markComplete = (id) => {
    setTodos(
      todos.map((todo) => {
        console.log("todos", todos);
        if (todo.id === id) {
          return { ...todo, completed: true };
        }
        return todo;
      })
    );
  };

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem key={todo.id}>
          <TodoText>
            {todo}
            <br />
          </TodoText>
          <TodoStatus completed={!!todo.completed}>
            {todo.completed ? "Completed" : "Not completed"}
          </TodoStatus>
          {!todo.completed && (
            <CompleteButton onClick={() => markComplete(todo.id)}>
              Mark Complete
            </CompleteButton>
          )}
        </TodoItem>
      ))}
    </ul>
  );
};

export default Todos;
