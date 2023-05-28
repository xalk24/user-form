import axios from 'axios';

export default {
  async createUser(user) {
    return (await axios.post('/api/users', user)).data;
  },
  async loadUsers(page) {
    return (await axios.get(`/api/users?page=${page}&limit=3`)).data;
  },
  async editUser(id, user) {
    return (await axios.patch(`/api/users/${id}`, user)).data;
  },
  async deleteUser(id) {
    return axios.delete(`api/users/${id}`);
  },
};
