import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://127.0.0.1:8081/api/influencer/';
const GENDER_API_URL = 'http://127.0.0.1:8081/api/genders'; // Add Gender API endpoint
const CITIES_API_URL = 'http://127.0.0.1:8081/api/cities'; // Add Cities API endpoint
const DEPARTMENTS_API_URL = 'http://127.0.0.1:8081/api/departments'; // Add States API endpoint
const INFLU_CLASSES_API_URL = 'http://127.0.0.1:8081/api/classes'; // Add Categories API endpoint
const EHTNIC_API_URL = 'http://127.0.0.1:8081/api/ethnic'; // Add Ethnics API endpoint
const HAIR_TYPE_URL = 'http://127.0.0.1:8081/api/hair_type'; // Add hair type API endpoint
const HAIR_COLOR_URL = 'http://127.0.0.1:8081/api/hair_color'; // Add hair type API endpoint
const SKIN_COLOR_URL = 'http://127.0.0.1:8081/api/skin_color'; // Add hair type API endpoint

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

const getInfluencerClasses = () => {
	return axios.get(`${INFLU_CLASSES_API_URL}`, { headers: authHeader() });
};

// New method to fetch genders
const getGenders = () => {
	return axios.get(GENDER_API_URL); // No auth headers needed unless required
};

// New method to fetch genders
const getCities = () => {
	return axios.get(CITIES_API_URL); // No auth headers needed unless required
};

const getDepartments = () => {
	return axios.get(DEPARTMENTS_API_URL); // No
};

const getEthnicGroups = () => {
	return axios.get(`${EHTNIC_API_URL}`, { headers: authHeader() });
};

const getHairColor = () => {
	return axios.get(`${HAIR_COLOR_URL}`, { headers: authHeader() });
};

const getHairTypes = () => {
	return axios.get(`${HAIR_TYPE_URL}`, { headers: authHeader() });
};

const getSkinColors = () => {
	return axios.get(`${SKIN_COLOR_URL}`, { headers: authHeader() });
};

const UserService = {
	getAll,
	addInfluencer,
	deleteInfluencer,
	updateInfluencer,
	getInfluencerClasses,
	getEthnicGroups,
	getGenders,
	getHairColor,
	getHairTypes,
	getSkinColors,
	getCities,
	getDepartments, // Export the new method
};

export default UserService;
