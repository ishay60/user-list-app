import { useState, useEffect } from "react";
import { getAll, updateItem, deleteItem } from "../utils/utils";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import Todos from "./Todos";
import Posts from "./Posts";
import UserForm from "../components/UserForm";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [hasTodos, setHasTodos] = useState(false);
  const [showMoreData, setShowMoreData] = useState({});

  let timeoutId = null;

  const showUserMoreData = (userId) => {
    setShowMoreData({ ...showMoreData, [userId]: true });
    clearTimeout(timeoutId);
  };

  const handleMouseEnter = (userId) => {
    closeOtherUsers(userId);
    setSelectedUser(userId);
  };

  const closeOtherUsers = (userId) => {
    timeoutId = setTimeout(() => {
      setShowMoreData((prev) => {
        console.log({ prev, userId });
        if (prev?.[userId]) {
          return prev;
        }
        setShowMoreData({});
      });
    }, 0);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getAll(USERS_URL);
      console.log(data);
      setUsers(data);
    };
    fetchData();
  }, []);

  const handleSearch = (search) => {
    setSearchTerm(search);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleUpdate = async (userId) => {
    event.preventDefault();
    // Find the user
    const user = users.find((user) => user.id === userId);

    // Update the user
    const updatedUser = { ...user, username: "New Username" };

    // Send a PUT request to the API
    try {
      const response = await updateItem(USERS_URL, userId, updatedUser);

      // Update the state
      if (response.status === 200) {
        setUsers(
          users.map((user) => (user.id === userId ? updatedUser : user))
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (userId) => {
    event.preventDefault();
    // Send a DELETE request to the API
    try {
      const response = await deleteItem(USERS_URL, userId);

      // Update the state
      if (response.status === 200) {
        setUsers(users.filter((user) => user.id !== userId));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <FlexBoxContainer>
        <UsersContainer>
          <SearchBar handleSearch={handleSearch} />
          <ul>
            {filteredUsers.map((user) => {
              return (
                <UserItem
                  bordercolor={hasTodos.valueOf.toString()}
                  key={user.id}
                  onMouseEnter={() => handleMouseEnter(user.id)}
                >
                  <h3>
                    id: {user.id}
                    <br />
                  </h3>

                  <UserForm user={user} showMoreData={showMoreData} />
                  <ButtonsContainer>
                    <MoreDataButtonContainer>
                      <MoreDataButton
                        onMouseEnter={() => showUserMoreData(user.id)}
                      >
                        More Data
                      </MoreDataButton>
                    </MoreDataButtonContainer>
                    <UpdateDeleteContainer>
                      <UpdateButton
                        onClick={(event) => handleUpdate(event, user.id)}
                      >
                        Update
                      </UpdateButton>

                      <DeleteButton
                        onClick={(event) => handleDelete(event, user.id)}
                      >
                        Delete
                      </DeleteButton>
                    </UpdateDeleteContainer>
                  </ButtonsContainer>
                </UserItem>
              );
            })}
          </ul>
        </UsersContainer>
        <PostsAndTodosContainer>
          {selectedUser && (
            <Todos userId={selectedUser} setHasTodos={setHasTodos} />
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
  width: 50%;
  padding: 20px;
  background-color: rgb(236, 228, 228);
`;
const PostsAndTodosContainer = styled.div`
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
  border: 1px solid ${(props) => (props.bordercolor ? "red" : "green")};
  border-radius: 10px;
`;

const Button = styled.button`
  margin-left: 10px;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;
`;

const UpdateButton = styled(Button)`
  background-color: #007bff;
`;

const DeleteButton = styled(Button)`
  background-color: #dc3545;
`;

const UpdateDeleteContainer = styled.div`
  justify-content: flex-end;
  flex-direction: row;
  width: 50%;
  float: right;
`;
const MoreDataButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  float: left;
  align-items: flex-end;
  width"50%;
`;

const MoreDataButton = styled(Button)`
  background-color: #28a745;
`;
const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;
