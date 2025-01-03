interface IValues {
	firstName: string;
	lastName: string;
	birthdayDate: string;
	year: string;
	gender: string;
	eps: string;
	emailAddress: string;
	phoneNumber: string;
	addressLine: string;
	addressLine2: string;
	phoneNumberWhp: string;
	socialInstagram: string;
	socialInstagramCla: string;
	socialInstagramSeg: string;
	socialTik: string;
	socialTikCla: string;
	socialTikSeg: string;
	image?: string | null;
	costo_1: string;
	costo_2: string;
	costo_3: string;
}

const validate = (values: IValues) => {
	const errors: IValues = {
		firstName: '',
		lastName: '',
		birthdayDate: '',
		year: '',
		gender: '',
		eps: '',
		emailAddress: '',
		phoneNumber: '',
		addressLine: '',
		addressLine2: '',
		phoneNumberWhp: '',
		socialInstagram: '',
		socialInstagramCla: '',
		socialInstagramSeg: '',
		socialTik: '',
		socialTikCla: '',
		socialTikSeg: '',
		costo_1: '',
		costo_2: '',
		costo_3: '',
	};
	if (!values.firstName) {
		errors.firstName = 'Required';
	} else if (values.firstName.length < 3) {
		errors.firstName = 'Must be 3 characters or more';
	} else if (values.firstName.length > 20) {
		errors.firstName = 'Must be 20 characters or less';
	}

	if (!values.lastName) {
		errors.lastName = 'Required';
	} else if (values.lastName.length < 3) {
		errors.lastName = 'Must be 3 characters or more';
	} else if (values.lastName.length > 20) {
		errors.lastName = 'Must be 20 characters or less';
	}

	return errors;
};

export default validate;
