import axios from 'axios';
import authHeader from './auth-header';

const API_URL = `${process.env.REACT_APP_URL_API || 'http://127.0.0.1:8081'}/api/user/`;

const getAllUsers = () => {
	return axios.get(`${API_URL}all`, { headers: authHeader() });
};

const addUser = (values) => {
	return axios.post(`${API_URL}register`, values, { headers: authHeader() });
};

const addRolUser = (values) => {
	return axios.post(`${API_URL}roluser`, values, { headers: authHeader() });
};

const deleteUser = (id) => {
	return axios.post(`${API_URL}delete`, { id }, { headers: authHeader() });
};

const updateUser = (values) => {
	return axios.post(`${API_URL}edituser`, { values }, { headers: authHeader() });
};

const UserService = {
	getAllUsers,
	addUser,
	addRolUser,
	updateUser,
	deleteUser,
};

export default UserService;
