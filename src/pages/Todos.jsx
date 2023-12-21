import styled from "styled-components";

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

const Todos = ({ todos, setTodos, markComplete }) => {
  console.log("todos", todos);

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
