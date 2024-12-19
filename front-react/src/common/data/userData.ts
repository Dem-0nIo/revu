export interface IUserProps {
	id: string;
	username: string;
	email?: string;
	accessToken: string;
	roles: string[];
}

const USER: { [key: string]: IUserProps } = JSON.parse(localStorage.getItem('user') || '{}');

export default USER;
