import { useState, useEffect } from "react";
import { getAll } from "../utils/utils";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import Todos from "./Todos";
import Posts from "./Posts";
import SingleUser from "./SingleUser";
import { getUserItems } from "../utils/utils";

export const USERS_URL = "https://jsonplaceholder.typicode.com/users";
export const TODOS_URL = "https://jsonplaceholder.typicode.com/todos";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [hasTodos, setHasTodos] = useState(false);
  const [showMoreData, setShowMoreData] = useState({});
  const [todos, setTodos] = useState([]);
  const [currentUsersData, setCurrentUsersData] = useState({});
  const [selectedUserTodos, setSelectedUserTodos] = useState([]);

  const onChangeField = (userId, field, value) => {
    setCurrentUsersData((prev) => ({
      ...prev,
      [userId]: { ...prev?.[userId], [field]: value },
    }));
  };

  let timeoutId = null;

  const closeOtherUsers = (userId) => {
    timeoutId = setTimeout(() => {
      setShowMoreData((prev) => {
        if (prev?.[userId]) {
          return prev;
        }
        setShowMoreData({});
      });
    }, 0);
  };
  const fetchUserTodos = async (userId) => {
    const { data: userTodos } = await getUserItems(TODOS_URL, userId);
    setTodos((prevTodos) => ({
      ...prevTodos,
      [userId]: userTodos,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getAll(USERS_URL);
      setUsers(data);
      setCurrentUsersData(
        data.reduce((acc, user) => {
          acc[user.id] = user;
          return acc;
        }, {})
      );
      if (selectedUser) {
        fetchUserTodos(selectedUser);
      }
    };
    fetchData();
  }, [selectedUser]);

  const filteredUsers = users.filter((user) =>
    user?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const markComplete = (id, selectedUserTodos, setSelectedUserTodos) => {
    console.log("selectedUserTodos", selectedUserTodos);
    setSelectedUserTodos(
      selectedUserTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed,
          };
        }
        return todo;
      })
    );
  };
  return (
    <>
      <FlexBoxContainer>
        <UsersContainer>
          <SearchBar handleSearch={setSearchTerm} />

          {filteredUsers.map((user) => (
            <UserItem key={user.id}>
              <>
                <SingleUser
                  user={user}
                  setUsers={setUsers}
                  key={user.id}
                  currentUsersData={currentUsersData[user.id]}
                  onChangeField={onChangeField}
                  showMoreData={showMoreData}
                  setShowMoreData={setShowMoreData}
                  closeOtherUsers={closeOtherUsers}
                  setSelectedUser={setSelectedUser}
                  hasTodos={hasTodos}
                  timeoutId={timeoutId}
                />
              </>
            </UserItem>
          ))}
        </UsersContainer>
        <PostsAndTodosContainer>
          {selectedUser && (
            <Todos
              userId={selectedUser}
              setHasTodos={setHasTodos}
              todos={todos[selectedUser] || []}
              markComplete={markComplete}
              selectedUserTodos={selectedUserTodos}
              setSelectedUserTodos={setSelectedUserTodos}
            />
          )}
          {selectedUser && <Posts userId={selectedUser} />}
        </PostsAndTodosContainer>
      </FlexBoxContainer>
    </>
  );
};

export default Users;

const FlexBoxContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const UsersContainer = styled.div`
  font-family: "Roboto", sans-serif;
  width: 50%;
  padding: 20px;
  background-color: rgb(236, 228, 228);
`;
const PostsAndTodosContainer = styled.div`
  font-family: "Roboto", sans-serif;
  position: sticky;
  top: 0;
  height: 100vh; // This will make the container as tall as the viewport
  overflow-y: auto; // This will add a scrollbar to the container if the content is taller than the container
  width: 50%;
  padding: 20px;
  background-color: rgb(236, 228, 228);
`;

const UserItem = styled.li`
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 10px 0;
  padding: 10px;
  border-radius: 10px;
`;
