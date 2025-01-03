import axios from 'axios';

// const API_URL = 'http://127.0.0.1:8081/api/auth/' 3.22.183.55;

const register = (username, email, password) => {
	return axios.post('http://127.0.0.1:8081/api/auth/signup', {
		username,
		email,
		password,
	});
};

const isAdmin = () => {
	const user = JSON.parse(localStorage.getItem('user'));
	return user && user.roles && user.roles.includes('ROLE_ADMIN');
};

const login = (username, password) => {
	return axios
		.post('http://127.0.0.1:8081/api/auth/signin', {
			username,
			password,
		})
		.then((response) => {
			if (response.data.accessToken) {
				localStorage.setItem('user', JSON.stringify(response.data));
				localStorage.setItem('token', JSON.stringify(response.data.accessToken));
			}

			return response.data;
		});
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
