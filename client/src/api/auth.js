import axios from 'axios';

const API = 'http://127.0.0.1:3001/api';

export const registerRequest = async (user) => {
    const post = await axios.post(`${API}/register`, user)
}