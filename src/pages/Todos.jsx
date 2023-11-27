import { useState, useEffect } from "react";
import { getUserItems } from "../utils/utils";

const TODOS_URL = "https://jsonplaceholder.typicode.com/todos";

const Todos = ({ userId, setHasTodos }) => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const todos = await getUserItems(TODOS_URL, userId);
      setTodos(todos);
      const allTodosCompleted = todos.every((todo) => todo.completed);
      setHasTodos(!allTodosCompleted);
    };
    fetchData();
  }, [userId, setHasTodos]);

  return (
    <>
      <h4>Todos:</h4>
      <ul>
        {todos.map((todo, index) => {
          return <li key={index}>{todo}</li>;
        })}
      </ul>
    </>
  );
};

export default Todos;
