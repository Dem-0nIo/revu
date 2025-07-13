import axios from 'axios';
import authHeader from './auth-header';


const API_URL = `${process.env.REACT_APP_URL_API || 'http://127.0.0.1:8081'}/api/`;
const INFLUENCER_URL = `${process.env.REACT_APP_URL_API || 'http://127.0.0.1:8081'}/api/influencer/`;
const GENDER_API_URL = `${process.env.REACT_APP_URL_API || 'http://127.0.0.1:8081'}/api/genders`; // Add Gender API endpoint
const CITIES_API_URL = `${process.env.REACT_APP_URL_API || 'http://127.0.0.1:8081'}/api/cities`; // Add Cities API endpoint
const COLCITIES_API_URL = `${process.env.REACT_APP_URL_API || 'http://127.0.0.1:8081'}/api/cities/colombia`; // Add Cities API endpoint
const DEPARTMENTS_API_URL = `${process.env.REACT_APP_URL_API || 'http://127.0.0.1:8081'}/api/departments`; // Add States API endpoint
const INFLU_CLASSES_API_URL = `${process.env.REACT_APP_URL_API || 'http://127.0.0.1:8081'}/api/classes`; // Add Categories API endpoint
const EHTNIC_API_URL = `${process.env.REACT_APP_URL_API || 'http://127.0.0.1:8081'}/api/ethnic`; // Add Ethnics API endpoint
const HAIR_TYPE_URL = `${process.env.REACT_APP_URL_API || 'http://127.0.0.1:8081'}/api/hair_type`; // Add hair type API endpoint
const HAIR_COLOR_URL = `${process.env.REACT_APP_URL_API || 'http://127.0.0.1:8081'}/api/hair_color`; // Add hair type API endpoint
const SKIN_COLOR_URL = `${process.env.REACT_APP_URL_API || 'http://127.0.0.1:8081'}/api/skin_color`; // Add hair type API endpoint
const COUNTRY_API_URL = `${process.env.REACT_APP_URL_API || 'http://127.0.0.1:8081'}/api/countries`; // Add country API endpoint

const getAll = () => {
	return axios.get(`${INFLUENCER_URL}all`, { headers: authHeader() });
};

const addInfluencer = (values) => {
	return axios.post(`${INFLUENCER_URL}register`, values, { headers: authHeader() });
};

const deleteInfluencer = (id) => {
	return axios.post(`${INFLUENCER_URL}delete`, { id }, { headers: authHeader() });
};

const updateInfluencer = (values) => {
	return axios.post(`${INFLUENCER_URL}update`, { values }, { headers: authHeader() });
};

const getInfluencerClasses = () => {
	return axios.get(`${INFLU_CLASSES_API_URL}`, { headers: authHeader() });
};

// New method to fetch genders
const getGenders = () => {
	return axios.get(GENDER_API_URL); // No auth headers needed unless required
};

// New method to fetch genders
const getCountries = () => {
	return axios.get(COUNTRY_API_URL); // No auth headers needed unless required
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

const getCategoriesSubcategories = () => {
	return axios.get(`${API_URL}categories-with-subcategories`, { headers: authHeader() });
};

const getCategories = () => {
	return axios.get(`${API_URL}categories`, { headers: authHeader() });
};

const getSubcategories = (id) => {
	return axios.get(`${API_URL}subcategories/${id}`, { id }, { headers: authHeader() });
};

const getSocialClasses = () => {
	return axios.get(`${API_URL}social-classes`, { headers: authHeader() });
};

const searchInfluencers = (values) => {
	// // eslint-disable-next-line to the line before.
	// console.log("URL a ejecutar ", `${INFLUENCER_URL}search`, values);

	return axios.get(`${INFLUENCER_URL}search`, values, { headers: authHeader() });
};

const getAllInfluencersWithCategories = () => {
	return axios.get(`${INFLUENCER_URL}allWithCategories`, { headers: authHeader() });
};

const getCitiesWithDepartmentsForColombia = () => {
	return axios.get(`${COLCITIES_API_URL}`, { headers: authHeader() });
}

const InfluService = {
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
	getCountries,
	getCities,
	getDepartments,
	getCategoriesSubcategories,
	getCategories,
	getSubcategories,
	getSocialClasses,
	searchInfluencers,
	getAllInfluencersWithCategories,
	getCitiesWithDepartmentsForColombia, // Export the new method
};

export default InfluService;
