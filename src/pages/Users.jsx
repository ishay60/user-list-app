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
  position: sticky;
  top: 0;
  height: 100vh; // This will make the container as tall as the viewport
  overflow-y: auto; // This will add a scrollbar to the container if the content is taller than the container
  width: 50%;
  padding: 20px;
  background-color: rgb(236, 228, 228);
`;
const MoreData = styled.div`
  display: ${(props) => (props.showMoreData ? "flex" : "none")};
  flex-direction: column;
  width: 100%;
  background-color: rgb(236, 228, 228);
  min-width: 160px;

  padding: 12px 16px;
  z-index: 1;
`;
const UserItem = styled.li`
  display: flex;
  flex-direction: column;
  list-style: none;
  border: 10px solid ${(props) => (props.hasTodos ? "red" : "green")};
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
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

const UserActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: space-between;
  align-items: flex-end;
`;
const MoreDataButton = styled(Button)`
  background-color: #28a745;
`;
const UpdateDeleteContainer = styled.div`
  justify-content: flex-end;
`;

const MoreDataContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
`;

const Users = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [hasTodos, setHasTodos] = useState(false);
  const [showMoreData, setShowMoreData] = useState({});

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

                    <UserActionsContainer
                      onMouseLeave={() => {
                        timeoutId = setTimeout(() => {
                          setShowMoreData({
                            ...showMoreData,
                            [user.id]: false,
                          });
                        }); // delay in milliseconds
                      }}
                    >
                      <MoreDataContainer>
                        <MoreData showMoreData={showMoreData[user.id]}>
                          <h3>Street:</h3>{" "}
                          <input
                            type="text"
                            defaultValue={user.address.street}
                            placeholder="Street"
                          />
                          <h3>City:</h3>{" "}
                          <input
                            type="text"
                            defaultValue={user.address.city}
                            placeholder="City"
                          />
                          <h3>Zipcode:</h3>{" "}
                          <input
                            type="text"
                            defaultValue={user.address.zipcode}
                            placeholder="Zip Code"
                          />
                        </MoreData>
                        <ButtonContainer
                          onMouseEnter={() => {
                            setShowMoreData({
                              ...showMoreData,
                              [user.id]: true,
                            });
                          }}
                        >
                          <MoreDataButton
                            onMouseEnter={() =>
                              setShowMoreData({
                                ...showMoreData,
                                [user.id]: true,
                              })
                            }
                          >
                            More Data
                          </MoreDataButton>
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
                        </ButtonContainer>
                      </MoreDataContainer>
                    </UserActionsContainer>
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
