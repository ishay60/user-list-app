import axios from "axios";

const getAll = (url) => axios.get(url);

const getItem = (url, id) => axios.get(`${url}/${id}`);

const updateItem = (url, id, updatedItem) =>
  axios.put(`${url}/${id}`, updatedItem);

const deleteItem = (url, id) => axios.delete(`${url}/${id}`);

const getUserItems = async (url, userId) => {
  const { data } = await getAll(`${url}?userId=${userId}`);
  const titles = data.map((item) => item.title);
  return titles;
};

export { getAll, getItem, updateItem, deleteItem, getUserItems };
