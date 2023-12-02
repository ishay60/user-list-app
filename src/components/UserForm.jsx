import React from "react";
import styled from "styled-components";

const UserForm = ({ showMoreData, userData, onChangeField }) => {
  const { id, name, email, address } = userData || {};

  const onChange = (event) => {
    const { name, value } = event.target;

    if (name === "street" || name === "city" || name === "zipcode") {
      onChangeField(id, "address", { ...address, [name]: value });
      return;
    }
    onChangeField(id, name, value);
  };

  return (
    <form>
      <h3>UserForm</h3>
      <h3>Name:</h3>
      <input
        type="text"
        name="name"
        onChange={onChange}
        defaultValue={name}
        placeholder="Name"
      />
      <h3>Email:</h3>
      <input
        type="text"
        name="email"
        defaultValue={email}
        onChange={onChange}
        placeholder="Email"
      />
      <br />
      <br />

      <UserActionsContainer>
        <MoreDataContainer showMoreData={showMoreData?.[id]}>
          <h4>Street:</h4>{" "}
          <input
            type="text"
            name="street"
            defaultValue={address?.street}
            onChange={onChange}
            placeholder="Street"
          />
          <h4>City:</h4>{" "}
          <input
            type="text"
            name="city"
            onChange={onChange}
            defaultValue={address?.city}
            placeholder="City"
          />
          <h4>Zipcode:</h4>{" "}
          <input
            type="text"
            name="zipcode"
            defaultValue={address?.zipcode}
            onChange={onChange}
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
