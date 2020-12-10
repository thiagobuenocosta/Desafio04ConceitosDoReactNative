import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.15.48:3333",
  // baseURL: "http://localhost:3333",
});

export const listRepositories = () => {
  return api.get('repositories')
}

export const likeRepositorie = (id) => {
  return api.post(`repositories/${id}/like`)
}

export default api;
