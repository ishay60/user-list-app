import { useState, useEffect } from "react";
import { getItem } from "../utils";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

const User = () => {
  const [user, setUser] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await getItem(USERS_URL, id);
      setUser(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <h3>{user.username}'s Details</h3>
      <strong>Name:</strong> {user.name} <br />
      <strong>Email:</strong> {user.email} <br />
      <strong>City:</strong> {user.address?.city} <br />
      {/* Ex8_2 */}
    </>
  );
};

export default User;
