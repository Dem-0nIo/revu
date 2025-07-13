import axios from 'axios';
import authHeader from './auth-header';

const API_URL = `${process.env.REACT_APP_URL_API || 'http://127.0.0.1:8081'}/api/cotizaciones/`;

const getAll = () => {
	return axios.get(`${API_URL}all`, { headers: authHeader() });
};

const addCotizacion = (values) => {
	return axios.post(`${API_URL}register`, values, { headers: authHeader() });
};

const deleteCotizacion = (id) => {
	return axios.post(`${API_URL}delete`, { id }, { headers: authHeader() });
};

const updateCotizacion = (values) => {
	return axios.post(`${API_URL}update`, { values }, { headers: authHeader() });
};

const getCotizacionStatus = (values) => {
	return axios.post(`${API_URL}status`, { values }, { headers: authHeader() });
};


const UserService = {
	getAll,
	addCotizacion,
	deleteCotizacion,
	updateCotizacion,
	getCotizacionStatus,
};

export default UserService;
