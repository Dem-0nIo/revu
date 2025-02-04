/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-console */
import React, { FC, useState, useEffect } from 'react';
import {useFormik } from 'formik';
import * as Yup from 'yup';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import Wizard, { WizardItem } from '../../../components/Wizard';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Select from '../../../components/bootstrap/forms/Select';
import Label from '../../../components/bootstrap/forms/Label';
import Checks, { ChecksGroup } from '../../../components/bootstrap/forms/Checks';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import showNotification from '../../../components/extras/showNotification';
import InfluService from '../../../services/influ.service';

// Extract initialValues
const initialValues = {
    firstName: '',
    lastName: '',
    idUser: '',
    birthdayDate: '',
    year: '',
    gender_id: '',
    hair_color_id: '',
    hair_type_id: '',
    skin_color_id: '',
	contact: '',
    passport: '',
    displayName: '',
    emailAddress: '',
    phoneNumber: '',
    addressLine: '',
	social_class_id: '',
	celebrity: '',
    country_id: '',
    emailNotification: [''],
    pushNotification: [''],
    phoneNumberWhp: '',
    socialInstagram: '',
    socialInstagramCla: '',
    socialInstagramSeg: '',
    socialTik: '',
    socialTikCla: '',
    socialTikSeg: '',
	socialFace: '',
    socialFaceCla: '',
    socialFaceSeg: '',
    socialUTube: '',
    socialUTubeCla: '',
    socialUTubeSeg: '',
    socialNetwork: [''],
    image: '',
    costo_1: '',
    costo_2: '',
    costo_3: '',
	costo_4: '',
    costo_5: '',
    costo_6: '',
	costo_7: '',
    costo_8: '',
    costo_9: '',
	costo_10: '',
    costo_11: '',
    costo_12: '',
	costo_13: '',
};


// Extract validationSchema
const validationSchema = Yup.object({
    firstName: Yup.string(),
    lastName: Yup.string(),
    contact: Yup.string(), // Not required
    idUser: Yup.number()
        .typeError('Debe ser un número')
        .positive('Debe ser un número positivo')
        .integer('Debe ser un número entero'),
    year: Yup.number()
        .typeError('Debe ser un número')
        .positive('Debe ser un número positivo')
        .integer('Debe ser un número entero')
        .test(
            'len',
            'Debe tener exactamente 2 dígitos',
            (val) => (val ? val.toString().length === 2 : false) // Retorna `false` si `val` es undefined
        ),
    displayName: Yup.string() ,
    phoneNumber: Yup.string()
        .matches(
            /^(\+)?\d+$/,
            "El número de teléfono solo puede contener dígitos y un '+' opcional al inicio"
        )
        .test(
            'len',
            'Debe tener no más de 11 dígitos',
            (val) => (val ? val.toString().length <= 12 : false)
        ),
    emailAddress: Yup.string()
        .email('Ingresar un correo valido'),
    addressLine: Yup.string(),
    socialInstagram: Yup.string(),
    socialInstagramCla: Yup.string(),
    socialInstagramSeg: Yup.number()
        .typeError('Debe ser un número')
        .positive('Debe ser un número positivo')
        .integer('Debe ser un número entero'),
	socialTik: Yup.string(),
    socialTikSeg: Yup.number()
        .typeError('Debe ser un número')
        .positive('Debe ser un número positivo')
        .integer('Debe ser un número entero'),
    socialTikCla: Yup.string(),
	socialFace: Yup.string(),
    socialFaceCla: Yup.string(),
    socialFaceSeg: Yup.number()
        .typeError('Debe ser un número')
        .positive('Debe ser un número positivo')
        .integer('Debe ser un número entero'),
	socialUTube: Yup.string(),
    socialUTubeCla: Yup.string(),
    socialUTubeSeg: Yup.number()
        .typeError('Debe ser un número')
        .positive('Debe ser un número positivo')
        .integer('Debe ser un número entero'),
	costo_1: Yup.string()
        .test('is-currency', 'Debe comenzar con $ y contener solo números después', (value) => {
            if (!value) return false;
            return /^\$\d+$/.test(value); // Check if it starts with $ and is followed by digits
        }),
	costo_2: Yup.string()
	.test('is-currency', 'Debe comenzar con $ y contener solo números después', (value) => {
		if (!value) return false;
		return /^\$\d+$/.test(value); // Check if it starts with $ and is followed by digits
	}),
	costo_3: Yup.string()
	.test('is-currency', 'Debe comenzar con $ y contener solo números después', (value) => {
		if (!value) return false;
		return /^\$\d+$/.test(value); // Check if it starts with $ and is followed by digits
	}),
	costo_4: Yup.string()
	.test('is-currency', 'Debe comenzar con $ y contener solo números después', (value) => {
		if (!value) return false;
		return /^\$\d+$/.test(value); // Check if it starts with $ and is followed by digits
	}),
	costo_5: Yup.string()
	.test('is-currency', 'Debe comenzar con $ y contener solo números después', (value) => {
		if (!value) return false;
		return /^\$\d+$/.test(value); // Check if it starts with $ and is followed by digits
	}),
	costo_6: Yup.string()
	.test('is-currency', 'Debe comenzar con $ y contener solo números después', (value) => {
		if (!value) return false;
		return /^\$\d+$/.test(value); // Check if it starts with $ and is followed by digits
	}),
	costo_7: Yup.string()
	.test('is-currency', 'Debe comenzar con $ y contener solo números después', (value) => {
		if (!value) return false;
		return /^\$\d+$/.test(value); // Check if it starts with $ and is followed by digits
	}),
	costo_8: Yup.string()
	.test('is-currency', 'Debe comenzar con $ y contener solo números después', (value) => {
		if (!value) return false;
		return /^\$\d+$/.test(value); // Check if it starts with $ and is followed by digits
	}),
	costo_9: Yup.string()
	.test('is-currency', 'Debe comenzar con $ y contener solo números después', (value) => {
		if (!value) return false;
		return /^\$\d+$/.test(value); // Check if it starts with $ and is followed by digits
	}),
	costo_10: Yup.string()
	.test('is-currency', 'Debe comenzar con $ y contener solo números después', (value) => {
		if (!value) return false;
		return /^\$\d+$/.test(value); // Check if it starts with $ and is followed by digits
	}),
	costo_11: Yup.string()
	.test('is-currency', 'Debe comenzar con $ y contener solo números después', (value) => {
		if (!value) return false;
		return /^\$\d+$/.test(value); // Check if it starts with $ and is followed by digits
	}),
	costo_12: Yup.string()
	.test('is-currency', 'Debe comenzar con $ y contener solo números después', (value) => {
		if (!value) return false;
		return /^\$\d+$/.test(value); // Check if it starts with $ and is followed by digits
	}),
	costo_13: Yup.string()
	.test('is-currency', 'Debe comenzar con $ y contener solo números después', (value) => {
		if (!value) return false;
		return /^\$\d+$/.test(value); // Check if it starts with $ and is followed by digits
	}),
    gender_id: Yup.string(),
	celebrity: Yup.number(),
    country_id: Yup.number(),
});

// Extract onSubmit handler

interface IPreviewItemProps {
	title: string;
	value: any | any[];
}
const PreviewItem: FC<IPreviewItemProps> = ({ title, value }) => {
	return (
		<>
			<div className='col-3 text-end'>{title}</div>
			<div className='col-9 fw-bold'>{value || '-'}</div>
		</>
	);
};

interface SocialClass {
	id: number;
	class_name: string;
}

interface Category {
    id: number;
    category_name: string;
}

interface SubCategory {
	id: number;
	subcategory_name: string;
}

// Define the Gender type
interface Gender {
	id: number;
	description: string;
}

// Define the City type
interface Country {
	id: number;
	name: string;
	name_en: string;
	iso_code: string;
	iso_code_2: string;
	region: string;
}


interface InfluencerClass {
	min_followers: number;
	max_followers: number | null; // null si no hay límite superior
	class_name: string;
  }


interface HairColor {
	id: number;
	hair_color_name: string;
} 

interface HairType {
	id: number;
	hair_type_name: string;
} 

interface SkinColor {
	id: number;
	skin_color_name: string;
} 
  

const NewInfluencer = () => {
	
	const [successful, setSuccessful] = useState(false);
	const [genders, setGenders] = useState<Gender[]>([]);
	const [countries, setCountry] = useState<Country[]>([]);
	const [influencerClasses, setInfluencerClasses] = useState<InfluencerClass[]>([]);
	const [hairColor, setHairColor] = useState<HairColor[]>([]);
	const [hairType, setHairType] = useState<HairType[]>([]);
	const [skinColor, setSkinColor] = useState<SkinColor[]>([]);

	const [categories, setCategories] = useState<Category[]>([]);
	const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
	const [selectedSubcategories, setSelectedSubcategories] = useState<any[]>([]);
	const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
	const [socialClasses, setSocialClasses] = useState<SocialClass[]>([]);

	const TABS = {
		ACCOUNT_DETAIL: 'Detalles Influencer',
		TEST: 'Test',
	};
	const [activeTab, setActiveTab] = useState(TABS.ACCOUNT_DETAIL);

	const socialNetwork = [
		{ id: 1, name: 'Instagram' },
		{ id: 2, name: 'TikTok' },
		{ id: 3, name: 'Facebook' },
		{ id: 4, name: 'YouTube' },
	];

	const handleSubmit = async (values: any) => {
		console.log("Formulario enviado con valores:", values); // Debug log
		try {
			// Prepare the payload for submission, including all form values and subcategories
			const payload = {
				firstName: values.firstName,
				lastName: values.lastName,
				idUser: values.idUser,
				birthdayDate: values.birthdayDate,
				year: values.year,
				gender_id: values.gender_id,
				hair_color_id: values.hair_color_id,
				hair_type_id: values.hair_type_id,
				skin_color_id: values.skin_color_id,
				passport: values.passport,
				displayName: values.displayName,
				emailAddress: values.emailAddress,
				phoneNumber: values.phoneNumber,
				addressLine: values.addressLine,
				social_class_id: values.social_class_id,
				celebrity: values.celebrity,
				country_id: values.country_id,
				zip: values.zip,
				emailNotification: values.emailNotification,
				pushNotification: values.pushNotification,
				phoneNumberWhp: values.phoneNumberWhp,
				socialInstagram: values.socialInstagram,
				socialInstagramCla: values.socialInstagramCla,
				socialInstagramSeg: values.socialInstagramSeg,
				socialTik: values.socialTik,
				socialTikCla: values.socialTikCla,
				socialTikSeg: values.socialTikSeg,
				socialFace: values.socialTik,
				socialFaceCla: values.socialTikCla,
				socialFaceSeg: values.socialTikSeg,
				socialUTube: values.socialTik,
				socialUTubeCla: values.socialTikCla,
				socialUTubeSeg: values.socialTikSeg,
				socialNetwork: values.socialNetwork,
				image: values.image,
				costo_1: values.costo_1.replace('$', ''),
				costo_2: values.costo_2.replace('$', ''),
				costo_3: values.costo_3.replace('$', ''),
				costo_4: values.costo_4.replace('$', ''),
				costo_5: values.costo_5.replace('$', ''),
				costo_6: values.costo_6.replace('$', ''),
				costo_7: values.costo_7.replace('$', ''),
				costo_8: values.costo_8.replace('$', ''),
				costo_9: values.costo_9.replace('$', ''),
				costo_10: values.costo_10.replace('$', ''),
				costo_11: values.costo_11.replace('$', ''),
				costo_12: values.costo_12.replace('$', ''),
				costo_13: values.costo_13.replace('$', ''),
				subcategories: selectedSubcategories.map((subcat) => subcat.id), // Add selected subcategories IDs
			};
	
			// Debugging: Log the payload before sending
			console.log("Payload to be sent:", payload);
	
			// API call to save influencer data
			const resp = await InfluService.addInfluencer(payload);
	
			if (resp) {
				// Display success notification
				showNotification('Ingreso de usuario', 'Ingreso exitos Influencer Service', 'info');
	
				// Optionally reset form and selected subcategories
				formik.resetForm();
				setSelectedSubcategories([]);
			}
		} catch (error) {
			// Log error and show notification
			console.error("Error submitting influencer:", error);
			showNotification('Error', String(error), 'danger');
		}
	};
	async function addInflu(values: any) {
		try {
			const resp = await InfluService.addInfluencer(values);
			if (resp) {
				setSuccessful(true);
				showNotification('Ingreso de usuario', 'Ingreso exitoso', 'info');
			}
		} catch (error) {
			setSuccessful(false);
			showNotification('Error', String(error), 'danger');
		}
	}
	

	const formik = useFormik({
		initialValues,
		onSubmit: (values) => {
			console.log("Formik onSubmit ejecutado");
			// addInflu(values); // <-- Agrega esto para verificar
			handleSubmit(values);

		},
		validationSchema,
		
	});
	console.log("Formik errores:", formik.errors);
	const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setSelectedCategoryId(Number(e.target.value));
	};

	// Handle classification update
	const handleFollowersChange = (followers: number) => {
		formik.setFieldValue("socialInstagramSeg", followers); // Actualiza el número de seguidores
		const matchedClass = influencerClasses.find(
			(cls) =>
				followers >= cls.min_followers &&
				(cls.max_followers === null || followers <= cls.max_followers)
		);
		formik.setFieldValue("socialInstagramCla", matchedClass?.class_name || "");
	};

	// Handle TikTok classification update
	const handleTikTokFollowersChange = (followers: number) => {
		formik.setFieldValue("socialTikSeg", followers); // Actualiza el número de seguidores
		const matchedClass = influencerClasses.find(
			(cls) =>
				followers >= cls.min_followers &&
				(cls.max_followers === null || followers <= cls.max_followers)
		);
		formik.setFieldValue("socialTikCla", matchedClass?.class_name || "");
	};

	// Handle TikTok classification update
	const handleFaceFollowersChange = (followers: number) => {
		formik.setFieldValue("socialFaceSeg", followers); // Actualiza el número de seguidores
		const matchedClass = influencerClasses.find(
			(cls) =>
				followers >= cls.min_followers &&
				(cls.max_followers === null || followers <= cls.max_followers)
		);
		formik.setFieldValue("socialFaceCla", matchedClass?.class_name || "");
	};

	// Handle TikTok classification update
	const handleUTubeFollowersChange = (followers: number) => {
		formik.setFieldValue("socialUTubeSeg", followers); // Actualiza el número de seguidores
		const matchedClass = influencerClasses.find(
			(cls) =>
				followers >= cls.min_followers &&
				(cls.max_followers === null || followers <= cls.max_followers)
		);
		formik.setFieldValue("socialUTubeCla", matchedClass?.class_name || "");
	};

	// Fetch social classes from the API
	useEffect(() => {
		async function fetchSocialClasses() {
			try {
				const response = await InfluService.getSocialClasses(); // Make sure to create this service method
				setSocialClasses(response.data);
			} catch (error) {
				console.error("Failed to fetch social classes:", error);
			}
		}
		fetchSocialClasses();
	}, []);

	// Fetch genders from the API
	useEffect(() => {
		async function fetchGenders() {
			try {
				const response = await InfluService.getGenders(); // Make sure to create this service method
				setGenders(response.data);
			} catch (error) {
				console.error("Failed to fetch genders:", error);
			}
		}
		fetchGenders();
	}, []);

	// Fetch influencer classes
	useEffect(() => {
		async function fetchInfluencerClasses() {
			try {
				const response = await InfluService.getInfluencerClasses(); // Asegúrate de tener este método en tu servicio
				setInfluencerClasses(response.data);
			} catch (error) {
				console.error("Failed to fetch influencer classes:", error);
			}
		}
		fetchInfluencerClasses();
	}, []);

	// Fetch Hair Color group
	useEffect(() => {
		async function fetchHairColor() {
			try {
				const response = await InfluService.getHairColor(); // Asegúrate de tener este método en tu servicio
				setHairColor(response.data);
			} catch (error) {
				console.error("Failed to fetch hair color:", error);
			}
		}
		fetchHairColor();
	}, []);

	// Fetch Hair type group
	useEffect(() => {
		async function fetchHairType() {
			try {
				const response = await InfluService.getHairTypes(); // Asegúrate de tener este método en tu servicio
				setHairType(response.data);
			} catch (error) {
				console.error("Failed to fetch hair type:", error);
			}
		}
		fetchHairType();
	}, []);

	// Fetch Skin Color group
	useEffect(() => {
		async function fetchSkinColor() {
			try {
				const response = await InfluService.getSkinColors(); // Asegúrate de tener este método en tu servicio
				setSkinColor(response.data);
			} catch (error) {
				console.error("Failed to fetch skin color: ", error);
			}
		}
		fetchSkinColor();
	}, []);

	// Fetch Country group
	useEffect(() => {
		async function fetchCountry() {
			try {
				const response = await InfluService.getCountries(); // Asegúrate de tener este método en tu servicio
				setCountry(response.data);
			} catch (error) {
				console.error("Failed to fetch countries: ", error);
			}
		}
		fetchCountry();
	}, []);

	// Fetch categories
	useEffect(() => {
		async function fetchCategories() {
			try {
				const response = await InfluService.getCategories(); // Create this service
				setCategories(response.data);
			} catch (error) {
				console.error("Failed to fetch categories:", error);
			}
		}
		fetchCategories();
	}, []);

	// Fetch subcategories for selected category
	useEffect(() => {
		if (!selectedCategoryId) return;

		async function fetchSubcategories() {
			try {
				const response = await InfluService.getSubcategories(selectedCategoryId); // Create this service
				setSubcategories(response.data as SubCategory[]);
			} catch (error) {
				console.error("Failed to fetch subcategories:", error);
			}
		}
		fetchSubcategories();
	}, [selectedCategoryId]);

	return (
		<PageWrapper title='Nuevo Ingreso'>
			<Page>
				<div className='row h-100 pb-3'>
					<div className='col-lg-10 col-md-8'>
						{TABS.ACCOUNT_DETAIL === activeTab && (
							<Wizard
								isHeader
								stretch
								color='info'
								noValidate
								onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
									event.preventDefault(); // Previene el comportamiento predeterminado del formulario
									console.log("🔥 Se ejecutó onSubmit en Wizard!");
									formik.handleSubmit();
								}}
								className='shadow-3d-info'>
								<WizardItem id='step1' title='Formulario de ingreso'>
									<Card>
										<CardHeader>
											<CardLabel icon='Edit' iconColor='warning'>
												<CardTitle>Información personal</CardTitle>
											</CardLabel>
										</CardHeader>
										<CardBody className='pt-0'>
											<div className='row g-4'>
												<div className='col-3'>
													<FormGroup
														id='firstName'
														label='Nombre'
														isFloating>
														<Input
															placeholder='Nombre'
															autoComplete='additional-name'
															onChange={formik.handleChange}
															onBlur={formik.handleBlur}
															value={formik.values.firstName}
															isValid={formik.isValid}
															isTouched={formik.touched.firstName}
															invalidFeedback={
																formik.errors.firstName
															}
															validFeedback='Looks good!'
														/>
													</FormGroup>
												</div>
												<div className='col-md-3'>
													<FormGroup
														id='lastName'
														label='Apellido'
														isFloating>
														<Input
															placeholder='Last Name'
															autoComplete='family-name'
															onChange={formik.handleChange}
															onBlur={formik.handleBlur}
															value={formik.values.lastName}
															isValid={formik.isValid}
															isTouched={formik.touched.lastName}
															invalidFeedback={formik.errors.lastName}
															validFeedback='Looks good!'
														/>
													</FormGroup>
												</div>
												<div className='col-md-3'>
													<FormGroup
														id='idUser'
														label='Cedula'
														isFloating>
														<Input
															type='number'
															placeholder='Cedula'
															autoComplete='additional-name'
															onChange={formik.handleChange}
															onBlur={formik.handleBlur}
															value={formik.values.idUser}
															isValid={formik.isValid}
															isTouched={formik.touched.idUser}
															invalidFeedback={formik.errors.idUser}
															validFeedback='Looks good!'
														/>
													</FormGroup>
												</div>
												<div className='col-md-3'>
													<FormGroup
														id='birthdayDate'
														label='Fecha de nacimiento'
														isFloating>
														<Input
															type='text'
															autoComplete='cc-exp'
															placeholder='MM/YY'
															mask='99/99'
															onChange={formik.handleChange}
															onBlur={formik.handleBlur}
															value={formik.values.birthdayDate}
															isValid={formik.isValid}
															isTouched={formik.touched.firstName}
															invalidFeedback={
																formik.errors.birthdayDate
															}
															validFeedback='Looks good!'
														/>
													</FormGroup>
												</div>
												<div className='col-md-3'>
													<FormGroup id='year' label='Edad' isFloating>
														<Input
															type='number'
															placeholder='Edad'
															autoComplete='off'
															onChange={formik.handleChange}
															onBlur={formik.handleBlur}
															value={formik.values.year}
															isValid={formik.isValid}
															isTouched={formik.touched.year}
															invalidFeedback={formik.errors.year}
															validFeedback='Looks good!'
														/>
													</FormGroup>
												</div>
												<div className='col-md-3'>
													<FormGroup
														id='displayName'
														label='Nombre Artistico'
														isFloating>
														<Input
															placeholder='Display Name'
															autoComplete='username'
															onChange={formik.handleChange}
															onBlur={formik.handleBlur}
															value={formik.values.displayName}
															isValid={formik.isValid}
															isTouched={formik.touched.displayName}
															invalidFeedback={
																formik.errors.displayName
															}
															validFeedback='Looks good!'
														/>
													</FormGroup>
												</div>
												<div className='col-md-3'>
													<FormGroup id='gender_id' label='Género' isFloating>
														<Select
															name="gender_id"
															ariaLabel='Género'
															placeholder='Seleccione...'
															list={genders.map((gender) => ({
																value: gender.id, // Use the gender ID as the value
																text: gender.description, // Use the gender description as the text
															}))}
															onChange={formik.handleChange}
															onBlur={formik.handleBlur}
															value={formik.values.gender_id}
															isValid={formik.isValid}
															isTouched={formik.touched.gender_id}
															invalidFeedback={formik.errors.gender_id}
														/>
													</FormGroup>
												</div>
												<div className='col-md-3'>
													<FormGroup
														id='phoneNumber'
														label='Número celular'
														isFloating>
														<Input
															type="tel"
															placeholder="Número celular"
															autoComplete="tel"
															onChange={formik.handleChange}
															onBlur={formik.handleBlur}
															value={formik.values.phoneNumber}
															isValid={formik.isValid}
															isTouched={formik.touched.phoneNumber}
															invalidFeedback={formik.errors.phoneNumber}
															validFeedback="Looks good!"
														/>
													</FormGroup>
												</div>
												<div className='col-md-3'>
													<FormGroup id='emailAddress' label='Email' isFloating>
														<Input
															type='email'
															placeholder='Emails'
															autoComplete='email'
															onChange={formik.handleChange}
															onBlur={formik.handleBlur}
															value={formik.values.emailAddress}
															isValid={formik.isValid}
															isTouched={formik.touched.emailAddress}
															invalidFeedback={formik.errors.emailAddress}
															validFeedback='Looks good!'
														/>
													</FormGroup>
												</div>
												<div className='col-md-3'>
													<FormGroup
														id='addressLine'
														label='Dirección'
														isFloating>
														<Input
															onChange={formik.handleChange}
															onBlur={formik.handleBlur}
															value={formik.values.addressLine}
															isValid={formik.isValid}
															isTouched={formik.touched.addressLine}
															invalidFeedback={formik.errors.addressLine}
															validFeedback='Looks good!'
														/>
													</FormGroup>
												</div>
												
												<div className='col-3'>
													<FormGroup id='social_class_id' label='Clase social' isFloating>
														<Select
															name="social_class_id"
															ariaLabel='Clase Social'
															placeholder='Seleccione...'
															list={socialClasses.map((socialClass) => ({
																value: socialClass.id, // Use the gender ID as the value
																text: socialClass.class_name, // Use the gender description as the text
															}))}
															onChange={formik.handleChange}
															onBlur={formik.handleBlur}
															value={formik.values.social_class_id}
															isValid={formik.isValid}
															isTouched={formik.touched.social_class_id}
															invalidFeedback={formik.errors.social_class_id}
														/>
													</FormGroup>
												</div>
											</div>
										</CardBody>
									</Card>
								</WizardItem>
								<WizardItem id='step2' title='Información de contacto'>
								<div className='row g-4'>
									<div className='col-md-3'>
										<FormGroup
											id='country_id'
											label='País'
											isFloating>
											<Select
												ariaLabel='Country'
												placeholder='Seleccione...'
												list={countries.map((country) => ({
													value: country.id,
													text: country.name,
												}))}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.country_id}
												isValid={formik.isValid}
												isTouched={formik.touched.country_id}
												invalidFeedback={formik.errors.country_id}
											/>
										</FormGroup>
									</div>									
									<div className='col-md-3'>
										<FormGroup
											id='hair_color'
											label='Color de cabello'
											isFloating
											formText='Seleccionar el color de cabello.'>
											<Select
												ariaLabel='Color de cabello'
												placeholder='Seleccione...'
												list={hairColor.map((hairColors) => ({
													value: hairColors.id, 
													text: hairColors.hair_color_name, 
												}))}
												onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
													formik.setFieldValue("hair_color_id", e.target.value);
												}}
												onBlur={formik.handleBlur}
												value={formik.values.hair_color_id}
												isValid={formik.isValid}
												isTouched={formik.touched.hair_color_id}
												invalidFeedback={formik.errors.hair_color_id}
											/>
										</FormGroup>
									</div>
									<div className='col-md-3'>
										<FormGroup
											id='hair_type'
											label='Tipo de cabello'
											isFloating
											formText='Seleccionar tipo de cabello.'>
											<Select
												ariaLabel='Tipo de cabello'
												placeholder='Seleccione...'
												list={hairType.map((hairTypes) => ({
													value: hairTypes.id, 
													text: hairTypes.hair_type_name, 
												}))}
												onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
													formik.setFieldValue("hair_type_id", e.target.value);
												}}
												onBlur={formik.handleBlur}
												value={formik.values.hair_type_id}
												isValid={formik.isValid}
												isTouched={formik.touched.hair_type_id}
												invalidFeedback={formik.errors.hair_type_id}
											/>
										</FormGroup>
									</div>
									<div className='col-md-3'>
										<FormGroup
											id='skin_color'
											label='Color de piel'
											isFloating
											formText='Seleccionar color de piel.'>
											<Select
												ariaLabel='color de piel'
												placeholder='Seleccione...'
												list={skinColor.map((skinColors) => ({
													value: skinColors.id, 
													text: skinColors.skin_color_name, 
												}))}
												onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
													formik.setFieldValue("skin_color_id", e.target.value);
												}}
												onBlur={formik.handleBlur}
												value={formik.values.skin_color_id}
												isValid={formik.isValid}
												isTouched={formik.touched.skin_color_id}
												invalidFeedback={formik.errors.skin_color_id}
											/>
										</FormGroup>
									</div>
									<div className='col-3'>
										<FormGroup
											id='contact'
											label='Persona de contacto'
											isFloating>
											<Input
												placeholder='Persona de contacto'
												autoComplete='contact'
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.contact}
												isValid={formik.isValid}
												isTouched={formik.touched.contact}
												invalidFeedback={
													formik.errors.contact
												}
												validFeedback='Looks good!'
											/>
										</FormGroup>
									</div>
									<div className='col-md-4'>
										<FormGroup id='category_id' label='Categoría' isFloating>
											<Select
												name="category_id"
												ariaLabel='Categoría'
												placeholder='Seleccione una categoría...'
												list={categories.map((cat) => ({
													value: cat.id,
													text: cat.category_name,
												}))}
												onChange={handleCategoryChange}
												value={selectedCategoryId ? String(selectedCategoryId) : ''}
											/>
										</FormGroup>
									</div>

									<div className='col-md-4'>
										<FormGroup id='subcategory_id' label='Subcategoría' isFloating>
											<Select
												name="subcategory_id"
												ariaLabel='Subcategoría'
												placeholder='Seleccione una subcategoría...'
												list={subcategories.map((subcat) => ({
													value: subcat.id,
													text: subcat.subcategory_name,
												}))}
												onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
													const subcategoryId = parseInt(e.target.value, 10); // Convert value to a number
													const subcategoryName = subcategories.find((subcat) => subcat.id === subcategoryId)?.subcategory_name;
													setSelectedSubcategories([...selectedSubcategories, { id: subcategoryId, name: subcategoryName }]);
												}}
											/>
										</FormGroup>
									</div>

									<div className='col-md-4'>
										<Button
											color='info'
											onClick={() => console.log('Subcategories Selected:', selectedSubcategories)}
										>
											Agregar Subcategoria
										</Button>
									</div>
									<div className='col-md-12'>
										<h5>Subcategorías seleccionadas:</h5>
										<ul>
											{selectedSubcategories.map((subcat) => (
												<li key={subcat.id}>
													{subcat.name}{' '}
													<Button
														color='danger'
														size='sm'
														onClick={() =>
															setSelectedSubcategories(
																selectedSubcategories.filter((s) => s.id !== subcat.id)
															)
														}
													>
														Eliminar
													</Button>
												</li>
											))}
										</ul>
									</div>
								</div>

								</WizardItem>
								<WizardItem id='step3' title='Información redes'>
									<div className='row g-4'>
										<div className='col-4'>
											<FormGroup
												id='socialInstagram'
												label='Instagram'
												isFloating>
												<Input
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.socialInstagram}
													isValid={formik.isValid}
													isTouched={formik.touched.socialInstagram}
													invalidFeedback={formik.errors.socialInstagram}
												/>
											</FormGroup>
										</div>
										<div className="col-4">
											<FormGroup
												id="socialInstagramCla"
												label="Clasificación"
												isFloating>
												<Input
													type="text"
													placeholder="Clasificación"
													value={formik.values.socialInstagramCla}
													readOnly // Campo deshabilitado
												/>
											</FormGroup>
										</div>
										<div className="col-4">
											<FormGroup
												id="socialInstagramSeg"
												label="Número seguidores"
												isFloating>
												<Input
													type="number"
													placeholder="Número seguidores"
													onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
														handleFollowersChange(Number(e.target.value))
													}													
													onBlur={formik.handleBlur}
													value={formik.values.socialInstagramSeg}
												/>
											</FormGroup>
										</div>

										<div className='col-4'>
											<FormGroup id='socialTik' label='TikTok' isFloating>
												<Input
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.socialTik}
													isValid={formik.isValid}
													isTouched={formik.touched.socialTik}
													invalidFeedback={formik.errors.socialTik}
												/>
											</FormGroup>
										</div>
										<div className="col-4">
											<FormGroup
												id="socialTikCla"
												label="Clasificación TikTok"
												isFloating>
												<Input
													type="text"
													placeholder="Clasificación TikTok"
													value={formik.values.socialTikCla}
													readOnly // Campo deshabilitado
												/>
											</FormGroup>
										</div>
										<div className="col-4">
											<FormGroup
												id="socialTikSeg"
												label="Número de seguidores TikTok"
												isFloating>
												<Input
													type="number"
													placeholder="Número de seguidores TikTok"
													onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
														handleTikTokFollowersChange(Number(e.target.value))
													}
													onBlur={formik.handleBlur}
													value={formik.values.socialTikSeg}
												/>
											</FormGroup>
										</div>

										<div className='col-4'>
											<FormGroup
												id='socialFace'
												label='Facebook'
												isFloating>
												<Input
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.socialFace}
													isValid={formik.isValid}
													isTouched={formik.touched.socialFace}
													invalidFeedback={formik.errors.socialFace}
												/>
											</FormGroup>
										</div>
										<div className="col-4">
											<FormGroup
												id="socialFaceCla"
												label="Clasificación"
												isFloating>
												<Input
													type="text"
													placeholder="Clasificación"
													value={formik.values.socialFaceCla}
													readOnly // Campo deshabilitado
												/>
											</FormGroup>
										</div>
										<div className="col-4">
											<FormGroup
												id="socialFaceSeg"
												label="Número seguidores"
												isFloating>
												<Input
													type="number"
													placeholder="Número seguidores"
													onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
														handleFaceFollowersChange(Number(e.target.value))
													}													
													onBlur={formik.handleBlur}
													value={formik.values.socialFaceSeg}
												/>
											</FormGroup>
										</div>
										<div className='col-4'>
											<FormGroup
												id='socialUTube'
												label='YouTube'
												isFloating>
												<Input
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.socialUTube}
													isValid={formik.isValid}
													isTouched={formik.touched.socialUTube}
													invalidFeedback={formik.errors.socialUTube}
												/>
											</FormGroup>
										</div>
										<div className="col-4">
											<FormGroup
												id="socialUTubeCla"
												label="Clasificación"
												isFloating>
												<Input
													type="text"
													placeholder="Clasificación"
													value={formik.values.socialUTubeCla}
													readOnly // Campo deshabilitado
												/>
											</FormGroup>
										</div>
										<div className="col-4">
											<FormGroup
												id="socialUTubeSeg"
												label="Número seguidores"
												isFloating>
												<Input
													type="number"
													placeholder="Número seguidores"
													onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
														handleUTubeFollowersChange(Number(e.target.value))
													}													
													onBlur={formik.handleBlur}
													value={formik.values.socialUTubeSeg}
												/>
											</FormGroup>
										</div>

										<div className='col-3'>
											<FormGroup id='costo_1' label='IG Historia 15 seg.' isFloating>
												<Input
													onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
														const value = e.target.value.startsWith('$') ? e.target.value : `$${e.target.value}`;
														formik.setFieldValue('costo_1', value);
													}}
													onBlur={formik.handleBlur}
													value={formik.values.costo_1}
													isValid={formik.isValid}
													isTouched={formik.touched.costo_1}
													invalidFeedback={formik.errors.costo_1}
												/>
											</FormGroup>
										</div>
										<div className='col-3'>
											<FormGroup id='costo_2' label='IG Rafaga Hist. 45-60 seg' isFloating>
												<Input
													onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
														const value = e.target.value.startsWith('$') ? e.target.value : `$${e.target.value}`;
														formik.setFieldValue('costo_2', value);
													}}
													onBlur={formik.handleBlur}
													value={formik.values.costo_2}
													isValid={formik.isValid}
													isTouched={formik.touched.costo_2}
													invalidFeedback={formik.errors.costo_2}
												/>
											</FormGroup>
										</div>

										<div className='col-3'>
											<FormGroup id='costo_3' label='IG Reel' isFloating>
												<Input
													onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
														const value = e.target.value.startsWith('$') ? e.target.value : `$${e.target.value}`;
														formik.setFieldValue('costo_3', value);
													}}
													onBlur={formik.handleBlur}
													value={formik.values.costo_3}
													isValid={formik.isValid}
													isTouched={formik.touched.costo_3}
													invalidFeedback={formik.errors.costo_3}
												/>
											</FormGroup>
										</div>
										<div className='col-3'>
											<FormGroup id='costo_4' label='IG Reel en colaboración' isFloating>
												<Input
													onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
														const value = e.target.value.startsWith('$') ? e.target.value : `$${e.target.value}`;
														formik.setFieldValue('costo_4', value);
													}}
													onBlur={formik.handleBlur}
													value={formik.values.costo_4}
													isValid={formik.isValid}
													isTouched={formik.touched.costo_4}
													invalidFeedback={formik.errors.costo_4}
												/>
											</FormGroup>
										</div>

										<div className='col-3'>
											<FormGroup id='costo_5' label='IG Foto Post' isFloating>
												<Input
													onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
														const value = e.target.value.startsWith('$') ? e.target.value : `$${e.target.value}`;
														formik.setFieldValue('costo_5', value);
													}}
													onBlur={formik.handleBlur}
													value={formik.values.costo_5}
													isValid={formik.isValid}
													isTouched={formik.touched.costo_5}
													invalidFeedback={formik.errors.costo_5}
												/>
											</FormGroup>
										</div>

										<div className='col-3'>
											<FormGroup id='costo_6' label='Video en Facebook' isFloating>
												<Input
													onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
														const value = e.target.value.startsWith('$') ? e.target.value : `$${e.target.value}`;
														formik.setFieldValue('costo_6', value);
													}}
													onBlur={formik.handleBlur}
													value={formik.values.costo_6}
													isValid={formik.isValid}
													isTouched={formik.touched.costo_6}
													invalidFeedback={formik.errors.costo_6}
												/>
											</FormGroup>
										</div>

										<div className='col-3'>
											<FormGroup id="costo_7" label="Reel's en Facebook" isFloating>
												<Input
													onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
														const value = e.target.value.startsWith('$') ? e.target.value : `$${e.target.value}`;
														formik.setFieldValue('costo_7', value);
													}}
													onBlur={formik.handleBlur}
													value={formik.values.costo_7}
													isValid={formik.isValid}
													isTouched={formik.touched.costo_7}
													invalidFeedback={formik.errors.costo_7}
												/>
											</FormGroup>
										</div>

										<div className='col-3'>
											<FormGroup id='costo_8' label='Historia en Facebook' isFloating>
												<Input
													onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
														const value = e.target.value.startsWith('$') ? e.target.value : `$${e.target.value}`;
														formik.setFieldValue('costo_8', value);
													}}
													onBlur={formik.handleBlur}
													value={formik.values.costo_8}
													isValid={formik.isValid}
													isTouched={formik.touched.costo_8}
													invalidFeedback={formik.errors.costo_8}
												/>
											</FormGroup>
										</div>

										<div className='col-3'>
											<FormGroup id='costo_9' label='TikTok' isFloating>
												<Input
													onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
														const value = e.target.value.startsWith('$') ? e.target.value : `$${e.target.value}`;
														formik.setFieldValue('costo_9', value);
													}}
													onBlur={formik.handleBlur}
													value={formik.values.costo_9}
													isValid={formik.isValid}
													isTouched={formik.touched.costo_9}
													invalidFeedback={formik.errors.costo_9}
												/>
											</FormGroup>
										</div>

										<div className='col-3'>
											<FormGroup id='costo_10' label='Mención en Video en Youtube' isFloating>
												<Input
													onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
														const value = e.target.value.startsWith('$') ? e.target.value : `$${e.target.value}`;
														formik.setFieldValue('costo_10', value);
													}}
													onBlur={formik.handleBlur}
													value={formik.values.costo_10}
													isValid={formik.isValid}
													isTouched={formik.touched.costo_10}
													invalidFeedback={formik.errors.costo_10}
												/>
											</FormGroup>
										</div>

										<div className='col-3'>
											<FormGroup id='costo_11' label='Asistencia a eventos' isFloating>
												<Input
													onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
														const value = e.target.value.startsWith('$') ? e.target.value : `$${e.target.value}`;
														formik.setFieldValue('costo_11', value);
													}}
													onBlur={formik.handleBlur}
													value={formik.values.costo_11}
													isValid={formik.isValid}
													isTouched={formik.touched.costo_11}
													invalidFeedback={formik.errors.costo_11}
												/>
											</FormGroup>
										</div>

										<div className='col-3'>
											<FormGroup id='costo_12' label='Imagen pauta digital (1 mes)' isFloating>
												<Input
													onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
														const value = e.target.value.startsWith('$') ? e.target.value : `$${e.target.value}`;
														formik.setFieldValue('costo_12', value);
													}}
													onBlur={formik.handleBlur}
													value={formik.values.costo_12}
													isValid={formik.isValid}
													isTouched={formik.touched.costo_12}
													invalidFeedback={formik.errors.costo_12}
												/>
											</FormGroup>
										</div>

										<div className='col-3'>
											<FormGroup id='costo_13' label='UGC' isFloating>
												<Input
													onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
														const value = e.target.value.startsWith('$') ? e.target.value : `$${e.target.value}`;
														formik.setFieldValue('costo_13', value);
													}}
													onBlur={formik.handleBlur}
													value={formik.values.costo_13}
													isValid={formik.isValid}
													isTouched={formik.touched.costo_13}
													invalidFeedback={formik.errors.costo_13}
												/>
											</FormGroup>
										</div>
										<div className='col-3' />
										<div className='col-3' />
										<div className='col-3' />

										<div className='col-6'>
											<FormGroup>
												<Label htmlFor='emailNotification'>
													Redes Sociales Activadas
												</Label>
												<ChecksGroup>
													{socialNetwork.map((cat) => (
														<Checks
															type='switch'
															key={cat.id}
															id={`emailNotification-${cat.id.toString()}`}
															name='socialNetwork'
															label={cat.name}
															value={cat.id}
															onChange={formik.handleChange}
															checked={formik.values.socialNetwork.includes(
																cat.id.toString(),
															)}
														/>
													))}
												</ChecksGroup>
											</FormGroup>
										</div>
										<div className='col-6'>
											<FormGroup>
												<Checks
													type='switch' // or 'checkbox', depending on your preference
													id='celebrity'
													name='celebrity'
													label='Celebrity?'
													value='1' // Example value, you can modify it as needed
													onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
														formik.setFieldValue('celebrity', e.target.checked ? '1' : '0')
													}
													checked={formik.values.celebrity === '1'}
												/>
											</FormGroup>
										</div>
									</div>
								</WizardItem>
								<WizardItem id='step4' title='Resumen'>
									<div className='row g-3'>
										{/* Informacion personal */}
										<div className='col-9 offset-3'>
											<h3 className='mt-4'>Resumen Información</h3>
											<h4 className='mt-4'>Información Personal</h4>
										</div>
										<PreviewItem
											title='Nombre'
											value={formik.values.firstName}
										/>
										<PreviewItem
											title='Apellidos'
											value={formik.values.lastName}
										/>
										<PreviewItem
											title='Fecha Nacimiento'
											value={formik.values.birthdayDate}
										/>
										<PreviewItem title='Edad' value={formik.values.year} />
										<PreviewItem title='Genero'   value={genders.find(gender => gender.id === Number(formik.values.gender_id))?.description || 'No especificado'} />
										<PreviewItem title='Cedula' value={formik.values.idUser} />
										<PreviewItem
											title='Nombre Artistico'
											value={formik.values.displayName}
										/>
										{/* Informacion de contacto */}
										<div className='col-9 offset-3'>
											<h4 className='mt-4'>Información de Contacto</h4>
										</div>
										<PreviewItem
											title='Número celular'
											value={formik.values.phoneNumber}
										/>
										<PreviewItem
											title='Email'
											value={formik.values.emailAddress}
										/>
										<PreviewItem
											title='Dirección'
											value={formik.values.addressLine}
										/>
										
										<div className='col-9 offset-3'>
											<h3 className='mt-4'>Informacion Redes Sociales</h3>
										</div>
										<PreviewItem
											title='Instagram'
											value={formik.values.socialInstagram}
										/>
										<PreviewItem
											title='Clasificación'
											value={formik.values.socialInstagramCla}
										/>
										<PreviewItem
											title='Seguidores'
											value={formik.values.socialInstagramSeg}
										/>
										<PreviewItem
											title='TikTok'
											value={formik.values.socialTik}
										/>
										<PreviewItem
											title='Calsificación'
											value={formik.values.socialTikCla}
										/>
										<PreviewItem
											title='Seguidores'
											value={formik.values.socialTikSeg}
										/>
										<PreviewItem
											title='Facebook'
											value={formik.values.socialFace}
										/>
										<PreviewItem
											title='Calsificación'
											value={formik.values.socialFaceCla}
										/>
										<PreviewItem
											title='Seguidores'
											value={formik.values.socialFaceSeg}
										/>

										<PreviewItem
											title='Redes de contacto'
											value={socialNetwork.map(
												(cat) =>
													formik.values.socialNetwork.includes(
														cat.id.toString(),
													) && `${cat.name}, `,
											)}
										/>
									</div>
									<Button type="submit" color="success">Enviar</Button> 
								</WizardItem>
							</Wizard>
						)}
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default NewInfluencer;
