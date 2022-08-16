import axios from 'axios';

export default axios.create({
    baseURL: 'https://localhost:7045'
});

let userStorage = localStorage.getItem("user_id");

if (userStorage) {
  userStorage = JSON.parse(userStorage);
}
