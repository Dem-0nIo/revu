import axios from 'axios';

const API_URL = process.env.REACT_APP_URL_API || 'http://127.0.0.1:8081';

console.log("API_URL resolved: " , API_URL);

const register = (username, email, password) => {
	return axios.post(`${API_URL}/api/auth/signup`, {
		username,
		email,
		password,
	});
};

const isAdmin = () => {
	const user = JSON.parse(localStorage.getItem('user'));
	return user && user.roles && user.roles.includes('ROLE_ADMIN');
};

const login = async (username, password) => {
	try {
		const response = await axios.post(`${API_URL}/api/auth/signin`, {
			username,
			password,
		});

		if (response.data.accessToken) {
			localStorage.setItem('user', JSON.stringify(response.data));
			localStorage.setItem('token', JSON.stringify(response.data.accessToken));
		}
		return response.data;
	} catch (error) {
		console.error("Login error:", error.response?.data || error.message);
		throw error;
	}
};

const logout = () => {
	localStorage.removeItem('user');
};

const getCurrentUser = () => {
	return JSON.parse(localStorage.getItem('user'));
};

const AuthService = {
	register,
	login,
	logout,
	getCurrentUser,
	isAdmin,
};

export default AuthService;
