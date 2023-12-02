import axios from "axios";

export const updateUser = async (url, id, updatedItem) => {
  try {
    const response = await axios.put(`${url}/${id}`, updatedItem);
    console.log("RESPONSE", response);
    return response.status === 200;
  } catch (error) {
    console.log(error);
  }
};
