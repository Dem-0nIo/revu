// Influencer.tsx
interface Influencer {
	firstName: string;
	lastName: string;
	idUser: number;
	birthdayDate: string;
	year: string;
	gender: string;
	hair_color_id: number,
    hair_type_id: number,
    skin_color_id: number,
	contact: string,
	passport: string;
	displayName: string;
	emailAddress: string;
	addressLine: string;
	phoneNumber: string;
	emailNotification: string[];
	pushNotification: string[];
	phoneNumberWhp: string;
	socialInstagram: string;
	socialInstagramCla: string;
	socialInstagramSeg: string;
	socialTik: string;
	socialTikCla: string;
	socialTikSeg: string;
	socialNetwork: string[];
	image: null;
	costo_1: '';
	costo_2: '';
	costo_3: '';
	editAction: any;
	deleteAction: any;
}

export default Influencer;
