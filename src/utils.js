import axios from 'axios';

const getAll = (url) => axios.get(url);

const getItem = (url, id) => axios.get(`${url}/${id}`);

/* Ex8_2 */
const getUserItems = async (url, userId) => {
  const { data } = await getAll(`${url}?userId=${userId}`);
  const titles = data.map((item) => item.title);
  return titles;
};

export { getAll, getItem, getUserItems };
