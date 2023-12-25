import { useEffect } from "react";
import styled from "styled-components";
import UserForm from "../components/UserForm";
import { updateUser, deleteItem } from "../services/api";

import USERS_URL from "./Users";

const SingleUser = ({
  user,
  users,
  setUsers,
  currentUsersData,
  onChangeField,
  showMoreData,
  setShowMoreData,
  closeOtherUsers,
  setSelectedUser,
  hasTodos,
  timeoutId,
}) => {
  useEffect(() => {
    console.log("show more data changed", showMoreData);
  }, [showMoreData]);
  const handleUpdate = async (event, userId) => {
    event.preventDefault();

    const updatedUser = currentUsersData?.[userId];
    console.log("UPDATED USER", updatedUser);
    if (!updatedUser) {
      return;
    }
    // Send a PUT request to the API
    const response = await updateUser(USERS_URL, userId, updatedUser);
    // Update the state
    if (response) {
      setUsers(users.map((user) => (user.id === userId ? updatedUser : user)));
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
  const showUserMoreData = (userId) => {
    console.log("showUserMoreData called with userId:", userId); // Add this line to check if the function is being called correctly
    setShowMoreData({ ...showMoreData, [userId]: true });
    console.log("showMoreData after update:", showMoreData);
    clearTimeout(timeoutId);
  };

  const handleEnterUserForm = (userId) => {
    closeOtherUsers(userId);
    setSelectedUser(userId);
  };
  const { id: userId } = user || {};

  return (
    <UserItem
      bordercolor={hasTodos.valueOf.toString()}
      key={userId}
      onMouseEnter={() => handleEnterUserForm(userId)}
    >
      <h3>
        id: {userId}
        <br />
      </h3>

      <UserForm
        showMoreData={showMoreData}
        userData={currentUsersData}
        onChangeField={onChangeField}
        setShowMoreData={setShowMoreData}
      />
      <ButtonsContainer>
        <MoreDataButtonContainer>
          <MoreDataButton
            onMouseEnter={() => {
              console.log("Mouse entered More data Button");
              showUserMoreData(userId);
            }}
          >
            More Data
          </MoreDataButton>
        </MoreDataButtonContainer>
        <UpdateDeleteContainer>
          <UpdateButton onClick={(event) => handleUpdate(event, userId)}>
            Update
          </UpdateButton>

          <DeleteButton onClick={(event) => handleDelete(event, userId)}>
            Delete
          </DeleteButton>
        </UpdateDeleteContainer>
      </ButtonsContainer>
    </UserItem>
  );
};

export default SingleUser;

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
const UserItem = styled.li`
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid ${(props) => (props.bordercolor ? "red" : "green")};
  border-radius: 10px;
`;
