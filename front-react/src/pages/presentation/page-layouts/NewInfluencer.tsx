/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-console */
import React, { FC, useState, useEffect } from 'react';
import { ErrorMessage, useFormik } from 'formik';
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

const SignupSchema = Yup.object({
	firstName: Yup.string().required('Es un campo obligatorio'),
	lastName: Yup.string().required('Es un campo obligatorio'),
	ethnic_id: Yup.number(), // Not required
	cityNac: Yup.string(),
	idUser: Yup.number()
	.typeError('Debe ser un número')
	.positive('Debe ser un número positivo')
	.integer('Debe ser un número entero')
	.required('Es un campo obligatorio y numérico'),
	year: Yup.number()
    .typeError('Debe ser un número')
    .positive('Debe ser un número positivo')
    .integer('Debe ser un número entero')
    .test(
		'len',
		'Debe tener exactamente 2 dígitos',
		(val) => (val ? val.toString().length === 2 : false) // Retorna `false` si `val` es undefined
	)
    .required('Es un campo obligatorio y numérico'),
	displayName: Yup.string().required('Es un campo obligatorio'),
	// segundo
	phoneNumber: Yup.string()
	.matches(
	  /^(\+)?\d+$/,
	  "El número de teléfono solo puede contener dígitos y un '+' opcional al inicio"
	)
	.test(
		'len',
		'Debe tener no mas de 11 dígitos',
		(val) => (val ? val.toString().length <= 12 : false) // Retorna `false` si `val` es undefined
	)
	.required("Es un campo obligatorio"),
	emailAddress: Yup.string()
		.email('Ingresar un correo valido')
		.required('Es un campo obligatorio'),
	addressLine: Yup.string().required('Es un campo obligatorio'),
	// Tercero
	socialInstagram: Yup.string().required('Es un campo obligatorio'),
	socialInstagramCla: Yup.string().required('Es un campo obligatorio'),
	socialInstagramSeg: Yup.number()
    .typeError("Debe ser un número")
    .positive("Debe ser un número positivo")
    .integer("Debe ser un número entero")
    .required("Es un campo obligatorio"),
	socialTikSeg: Yup.number()
    .typeError("Debe ser un número")
    .positive("Debe ser un número positivo")
    .integer("Debe ser un número entero")
    .required("Es un campo obligatorio"),
	socialTikCla: Yup.string().required("Es un campo obligatorio"),
	costo_1: Yup.string().required('Es un campo obligatorio'),
	// gender
	gender_id: Yup.string().required("Es un campo obligatorio"),
	city_id: Yup.number(),
	state_id: Yup.number(),
	country_id: Yup.number(),
	zip: Yup.number()
    .typeError('Debe ser un número')
    .positive('Debe ser un número positivo')
    .integer('Debe ser un número entero')
    .test(
		'len',
		'Debe tener exactamente 6 dígitos',
		(val) => (val ? val.toString().length === 6 : false) // Retorna `false` si `val` es undefined
	)
});

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

// Define the City type
interface City {
	id: number;
	city_name: string;
}

// Define the Department type
interface Department {
	id: number;
	department_name: string;
}

interface InfluencerClass {
	min_followers: number;
	max_followers: number | null; // null si no hay límite superior
	class_name: string;
  }

interface Ethnic {
	id: number;
	ethnicity_name: string;
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
	const formdata = new FormData();
	const [successful, setSuccessful] = useState(false);
	const [message, setMessage] = useState('error por defecto');
	const [genders, setGenders] = useState<Gender[]>([]);
	const [cities, setCities] = useState<City[]>([]);
	const [departments, setDepartments] = useState<Department[]>([]);
	const [countries, setCountry] = useState<Country[]>([]);
	const [influencerClasses, setInfluencerClasses] = useState<InfluencerClass[]>([]);
	const [ethnicGroup, setEthnicity] = useState<Ethnic[]>([]);
	const [hairColor, setHairColor] = useState<HairColor[]>([]);
	const [hairType, setHairType] = useState<HairType[]>([]);
	const [skinColor, setSkinColor] = useState<SkinColor[]>([]);

	const TABS = {
		ACCOUNT_DETAIL: 'Detalles Influencer',
		TEST: 'Test',
	};
	const [activeTab, setActiveTab] = useState(TABS.ACCOUNT_DETAIL);

	const socialNetwork = [
		{ id: 1, name: 'Instagram' },
		{ id: 2, name: 'TikTok' },
		{ id: 3, name: 'Facebook' },
	];

	// Handle classification update
	const handleFollowersChange = (followers: number) => {
		formik.setFieldValue("socialInstagramSeg", followers); // Actualiza el número de seguidores
		const matchedClass = influencerClasses.find(
			(cls) =>
				followers >= cls.min_followers &&
				(cls.max_followers === null || followers <= cls.max_followers)
		);
		console.log("Clase coincidente:", matchedClass); // Verifica si encuentra una clase
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
		console.log("Clase TikTok coincidente:", matchedClass); // Verifica si encuentra una clase
		formik.setFieldValue("socialTikCla", matchedClass?.class_name || "");
	};

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

	// Fetch cities from the API
	useEffect(() => {
		async function fetchCities() {
			try {
				const response = await InfluService.getCities(); // Make sure to create this service method
				setCities(response.data);
			} catch (error) {
				console.error("Failed to fetch Cities:", error);
			}
		}
		fetchCities();
	}, []);

	// Fetch departments from the API
	useEffect(() => {
		async function fetchDepartments() {
			try {
				const response = await InfluService.getDepartments(); // Make sure to create this service method
				setDepartments(response.data);
			} catch (error) {
				console.error("Failed to fetch Departments Front", error);
			}
		}
		fetchDepartments();
	}, []);

	// Fetch influencer classes
	useEffect(() => {
		async function fetchInfluencerClasses() {
			try {
				const response = await InfluService.getInfluencerClasses(); // Asegúrate de tener este método en tu servicio
				console.log("Clases cargadas:", response.data); // Verifica el contenido
				setInfluencerClasses(response.data);
			} catch (error) {
				console.error("Failed to fetch influencer classes:", error);
			}
		}
		fetchInfluencerClasses();
	}, []);

	// Fetch Ethnic group
	useEffect(() => {
		async function fetchEthnicityGroup() {
			try {
				const response = await InfluService.getEthnicGroups(); // Asegúrate de tener este método en tu servicio
				console.log("Etnias cargadas:", response.data); // Verifica el contenido
				setEthnicity(response.data);
			} catch (error) {
				console.error("Failed to fetch influencer classes:", error);
			}
		}
		fetchEthnicityGroup();
	}, []);

	useEffect(() => {
		async function fetchHairColor() {
			try {
				const response = await InfluService.getHairColor(); // Asegúrate de tener este método en tu servicio
				console.log("Color de cabello:", response.data); // Verifica el contenido
				setHairColor(response.data);
			} catch (error) {
				console.error("Failed to fetch hair color:", error);
			}
		}
		fetchHairColor();
	}, []);

	useEffect(() => {
		async function fetchHairType() {
			try {
				const response = await InfluService.getHairTypes(); // Asegúrate de tener este método en tu servicio
				console.log("Tipo de cabello cargado:", response.data); // Verifica el contenido
				setHairType(response.data);
			} catch (error) {
				console.error("Failed to fetch hair type:", error);
			}
		}
		fetchHairType();
	}, []);

	useEffect(() => {
		async function fetchSkinColor() {
			try {
				const response = await InfluService.getSkinColors(); // Asegúrate de tener este método en tu servicio
				console.log("Color de piel cargado: ", response.data); // Verifica el contenido
				setSkinColor(response.data);
			} catch (error) {
				console.error("Failed to fetch skin color: ", error);
			}
		}
		fetchSkinColor();
	}, []);

	useEffect(() => {
		async function fetchCountry() {
			try {
				const response = await InfluService.getCountries(); // Asegúrate de tener este método en tu servicio
				console.log("Paises cargados: ", response.data); // Verifica el contenido
				setCountry(response.data);
			} catch (error) {
				console.error("Failed to fetch countries: ", error);
			}
		}
		fetchCountry();
	}, []);

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
		initialValues: {
			firstName: 'John',
			lastName: 'Doe',
			idUser: '90998909',
			cityNac: '1',
			birthdayDate: '10/10/2024',
			year: '45',
			gender_id: '1',
			ethnic_id: '1',
			hair_color_id: '1',
			hair_type_id: '1',
			skin_color_id: '1',
			eps: 'SURA',
			passport: 'NO',
			displayName: 'johndoe',
			emailAddress: 'johndoe@site.com',
			phoneNumber: '12345566',
			addressLine: 'calle 1',
			addressLine2: 'calle 2',
			city_id: '1',
			state_id: '1',
			country_id: '1',
			zip: '660004',
			emailNotification: [''],
			pushNotification: [''],
			phoneNumberWhp: '1234566',
			socialInstagram: '@instagrampedro',
			socialInstagramCla: 'Nano',
			socialInstagramSeg: '1234',
			socialTik: '@instagrampedro',
			socialTikCla: 'Micro',
			socialTikSeg: '1234567',
			socialNetwork: [''],
			image: 'null',
			costo_1: '1234567',
			costo_2: '7654321',
			costo_3: '2589631',
		},

		onSubmit: (values) => {
			addInflu(values);
		},
		validationSchema: SignupSchema,
	});

	return (
		<PageWrapper title='Nuevo Ingreso'>
			<Page>
				<div className='row h-100 pb-3'>
					<div className='col-lg-4 col-md-6'>
						<Card stretch>
							<CardHeader>
								<CardLabel icon='AccountCircle'>
									<CardTitle tag='div' className='h5'>
										Información
									</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody isScrollable>
								<div className='row g-3'>
									<div className='col-12'>
										<Button
											icon='Contacts'
											color='info'
											className='w-100 p-3'
											isLight={TABS.ACCOUNT_DETAIL !== activeTab}
											onClick={() => setActiveTab(TABS.ACCOUNT_DETAIL)}>
											{TABS.ACCOUNT_DETAIL}
										</Button>
									</div>
								</div>
							</CardBody>
						</Card>
					</div>
					<div className='col-lg-8 col-md-6'>
						{TABS.ACCOUNT_DETAIL === activeTab && (
							<Wizard
								isHeader
								stretch
								color='info'
								noValidate
								onSubmit={formik.handleSubmit}
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
												<div className='col-md-4'>
													<FormGroup
														id='firstName'
														label='Primer Nombre'
														isFloating>
														<Input
															placeholder='Primer nombre'
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
												<div className='col-md-4'>
													<FormGroup
														id='lastName'
														label='Segundo Nombre'
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
												<div className='col-md-4'>
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
												<div className='col-md-4'>
													<FormGroup
														id='cityNac'
														label='Ciudad de nacimiento'
														isFloating>
														<Select
															name="cityNac"
															ariaLabel='Ciudad de nacimiento'
															placeholder='Seleccione...'
															list={cities.map((city) => ({
																value: city.id, 
																text: city.city_name,  
															}))}
															onChange={formik.handleChange}
															onBlur={formik.handleBlur}
															value={formik.values.cityNac}
															isValid={formik.isValid}
															isTouched={formik.touched.cityNac}
															invalidFeedback={formik.errors.cityNac}
														/>
													</FormGroup>
												</div>
												<div className='col-md-4'>
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
												<div className='col-md-4'>
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
												<div className='col-6'>
													<FormGroup
														id='displayName'
														label='NickName'
														isFloating
														formText='Así será como se mostrará tu nombre en la sección de cuenta y en reseñas'>
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
												<div className='col-6'>
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
												<div className='col-md-3'>
													<FormGroup
														id='addressLine2'
														label='Adicional'
														isFloating>
														<Input
															onChange={formik.handleChange}
															onBlur={formik.handleBlur}
															value={formik.values.addressLine2}
															isValid={formik.isValid}
															isTouched={formik.touched.addressLine2}
															invalidFeedback={formik.errors.addressLine2}
															validFeedback='Looks good!'
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
											id='state_id'
											label='Departamento'
											isFloating>
											<Select
												ariaLabel='State'
												placeholder='Seleccione...'
												list={departments.map((state) => ({
													value: state.id,
													text: state.department_name,
												}))}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.state_id}
												isValid={formik.isValid}
												isTouched={formik.touched.state_id}
												invalidFeedback={formik.errors.state_id}
											/>
										</FormGroup>
									</div>
									<div className='col-md-3'>
										<FormGroup
											id='city_id'
											label='Ciudad'
											isFloating
											formText='Seleccionar la ciudad donde radica.'>
											<Select
												ariaLabel='Ciudad'
												placeholder='Seleccione...'
												list={cities.map((city) => ({
													value: city.id, 
													text: city.city_name, 
												}))}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.city_id}
												isValid={formik.isValid}
												isTouched={formik.touched.city_id}
												invalidFeedback={formik.errors.city_id}
											/>
										</FormGroup>
									</div>
									
									<div className='col-md-3'>
										<FormGroup id='zip' label='Codigo postal' isFloating>
											<Input
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.zip}
												isValid={formik.isValid}
												isTouched={formik.touched.zip}
												invalidFeedback={formik.errors.zip}
											/>
										</FormGroup>
									</div>
									<div className='col-md-3'>
										<FormGroup
											id='ethnic'
											label='Etnia'
											isFloating
											formText='Seleccionar la etnia si pertenece a alguna.'>
											<Select
												name='ethnic_id'
												ariaLabel='Etnia'
												placeholder='Seleccione...'
												list={ethnicGroup.map((ethnic) => ({
													value: ethnic.id, 
													text: ethnic.ethnicity_name, 
												}))}
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.ethnic_id}
												isValid={formik.isValid}
												isTouched={formik.touched.ethnic_id}
												invalidFeedback={formik.errors.ethnic_id}
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
												onChange={formik.handleChange}
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
												onChange={formik.handleChange}
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
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.skin_color_id}
												isValid={formik.isValid}
												isTouched={formik.touched.skin_color_id}
												invalidFeedback={formik.errors.skin_color_id}
											/>
										</FormGroup>
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
											<FormGroup id='costo_1' label='Precio Historia' isFloating>
												<Input
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.costo_1}
													isValid={formik.isValid}
													isTouched={formik.touched.costo_1}
													invalidFeedback={formik.errors.costo_1}
												/>
											</FormGroup>
										</div>
										<div className='col-4'>
											<FormGroup id='costo_2' label='Precio Reel' isFloating>
												<Input
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.costo_2}
													isValid={formik.isValid}
													isTouched={formik.touched.costo_2}
													invalidFeedback={formik.errors.costo_2}
												/>
											</FormGroup>
										</div>

										<div className='col-4'>
											<FormGroup id='costo_3' label='Precio Youtube' isFloating>
												<Input
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.costo_3}
													isValid={formik.isValid}
													isTouched={formik.touched.costo_3}
													invalidFeedback={formik.errors.costo_3}
												/>
											</FormGroup>
										</div>

										<div className='col-12'>
											<FormGroup>
												<Label htmlFor='emailNotification'>
													Redes Sociales
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
											title='Primer Nombre'
											value={formik.values.firstName}
										/>
										<PreviewItem
											title='Apellidos'
											value={formik.values.lastName}
										/>
										<PreviewItem title='Ciudad' value={formik.values.cityNac} />
										<PreviewItem
											title='Fecha Nacimiento'
											value={formik.values.birthdayDate}
										/>
										<PreviewItem title='Edad' value={formik.values.year} />
										<PreviewItem title='Genero' value={formik.values.gender_id} />
										<PreviewItem title='Cedula' value={formik.values.idUser} />
										<PreviewItem
											title='Display Name'
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
										<PreviewItem
											title='Dirección Adicional'
											value={formik.values.addressLine2}
										/>
										<PreviewItem title='Ciudad' value={formik.values.city_id} />
										<PreviewItem
											title='Departamento'
											value={formik.values.state_id}
										/>
										<PreviewItem
											title='Codigo Postal'
											value={formik.values.zip}
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
											title='Genero'
											value={formik.values.gender_id}
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
