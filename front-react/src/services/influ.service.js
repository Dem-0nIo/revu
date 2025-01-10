import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://127.0.0.1:8081/api/influencer/';
const GENDER_API_URL = 'http://127.0.0.1:8081/api/genders'; // Add Gender API endpoint

const getAll = () => {
	return axios.get(`${API_URL}all`, { headers: authHeader() });
};

const addInfluencer = (values) => {
	return axios.post(`${API_URL}register`, values, { headers: authHeader() });
};

const deleteInfluencer = (id) => {
	return axios.post(`${API_URL}delete`, { id }, { headers: authHeader() });
};

const updateInfluencer = (values) => {
	return axios.post(`${API_URL}update`, { values }, { headers: authHeader() });
};

// New method to fetch genders
const getGenders = () => {
	return axios.get(GENDER_API_URL); // No auth headers needed unless required
};

const UserService = {
	getAll,
	addInfluencer,
	deleteInfluencer,
	updateInfluencer,
	getGenders, // Export the new method
};

export default UserService;
