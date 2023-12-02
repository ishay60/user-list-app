import React from "react";
import styled from "styled-components";

const UserForm = ({ user, showMoreData, setShowMoreData }) => {
  let timeoutId;
  console.log(showMoreData?.[user.id], "showMoreData");

  return (
    <form>
      <h3>UserForm</h3>
      <h3>Name:</h3>
      <input type="text" defaultValue={user.name} placeholder="Name" />
      <h3>Email:</h3>
      <input type="text" defaultValue={user.email} placeholder="Email" />
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
        <MoreDataContainer showMoreData={showMoreData?.[user.id]}>
          <h4>Street:</h4>{" "}
          <input
            type="text"
            defaultValue={user.address.street}
            placeholder="Street"
          />
          <h4>City:</h4>{" "}
          <input
            type="text"
            defaultValue={user.address.city}
            placeholder="City"
          />
          <h4>Zipcode:</h4>{" "}
          <input
            type="text"
            defaultValue={user.address.zipcode}
            placeholder="Zip Code"
          />
        </MoreDataContainer>
      </UserActionsContainer>
      <h3>userFormEnd</h3>
    </form>
  );
};

export default UserForm;

const UserActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const MoreDataContainer = styled.div`
  display: ${(props) => (props.showMoreData ? "flex" : "none")};
  flex-direction: column;
  padding: 0;
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
