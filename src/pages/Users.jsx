import { useState, useEffect } from "react";
import { getAll, updateItem, deleteItem } from "../utils/utils";
import styled from "styled-components";
import SearchBar from "./SearchBar";
import Todos from "./Todos";
import Posts from "./Posts";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

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
  width: 50%;
  padding: 20px;
  background-color: rgb(236, 228, 228);
`;
const MoreData = styled.div`
  display: none;
  position: absolute;
  background-color: rgb(236, 228, 228);
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
`;
const UserItem = styled.li`
  list-style: none;
  border: 1px solid ${(props) => (props.hasTodos ? "red" : "green")};
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;

  &:hover ${MoreData} {
    display: block;
  }
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

const MoreDataButton = styled(Button)`
  background-color: #28a745;
`;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [hasTodos, setHasTodos] = useState(false);

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
  const handleMouseOver = (userId) => {
    console.log(userId);
    setSelectedUser(userId);
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
                  hasTodos={hasTodos}
                  key={user.id}
                  onMouseOver={() => handleMouseOver(user.id)}
                >
                  <h3>
                    id: {user.id}
                    <br />
                  </h3>
                  <br />
                  <form>
                    <h3>Name:</h3>
                    <input
                      type="text"
                      defaultValue={user.name}
                      placeholder="Name"
                    />
                    <h3>Email:</h3>
                    <input
                      type="text"
                      defaultValue={user.email}
                      placeholder="Email"
                    />
                    <br />
                    <br />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <MoreDataButton>More Data</MoreDataButton>
                        <MoreData>
                          <input
                            type="text"
                            defaultValue={user.address.street}
                            placeholder="Street"
                          />
                          <input
                            type="text"
                            defaultValue={user.address.city}
                            placeholder="City"
                          />
                          <input
                            type="text"
                            defaultValue={user.address.zipcode}
                            placeholder="Zip Code"
                          />
                        </MoreData>
                      </div>
                      <div>
                        <UpdateButton
                          onClick={() => handleUpdate(event, user.id)}
                        >
                          Update
                        </UpdateButton>

                        <DeleteButton
                          onClick={() => handleDelete(event, user.id)}
                        >
                          Delete
                        </DeleteButton>
                      </div>
                    </div>
                  </form>
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
