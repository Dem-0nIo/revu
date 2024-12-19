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

const login = async (username, password) => {
	try {
		const response = await axios.post(
			'http://127.0.0.1:8081/api/auth/signin', 
	  		{username,password},
			{ withCredentials: true}
		);
  
		// Verifica si el token está presente en la respuesta
		if (response.data.accessToken) {
			localStorage.setItem('user', JSON.stringify(response.data));
			localStorage.setItem('token', response.data.accessToken); // Evita guardar el token como JSON
		}
  
	  	return response.data;
	} catch (error) {
		console.error("Error al iniciar sesión:", error.response?.data || error.message);
		throw new Error(error.response?.data?.message || "Error de autenticación");
	  // Manejo de errores en la solicitud
	  if (error.response) {
		// Errores que vienen del backend (403, 401, etc.)
		console.error('Error en el servidor:', error.response.data.message);
		throw new Error(error.response.data.message || 'Error en el servidor');
	  } else if (error.request) {
		// No se recibió respuesta del servidor
		console.error('No se recibió respuesta del servidor:', error.request);
		throw new Error('No se recibió respuesta del servidor');
	  } else {
		// Otro tipo de error
		console.error('Error:', error.message);
		throw new Error('Algo salió mal, por favor intenta nuevamente.');
	  }
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
