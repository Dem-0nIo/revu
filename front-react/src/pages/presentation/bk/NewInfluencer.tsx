/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-console */
import React, { FC, useState, ChangeEvent } from 'react';
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
import Avatar from '../../../components/Avatar';
import User1Img from '../../../assets/img/wanna/wanna2.png';
import showNotification from '../../../components/extras/showNotification';

const SignupSchema = Yup.object().shape({
	image: Yup.mixed().required('File is required'),
	firstName: Yup.string().required('Es un campo obligatorio'),
	lastName: Yup.string().required('Es un campo obligatorio'),
	idUser: Yup.string().required('Es un campo obligatorio'),
	year: Yup.string().required('Es un campo obligatorio'),
	displayName: Yup.string().required('Es un campo obligatorio'),
	// segundo
	phoneNumber: Yup.string().required('Es un campo obligatorio'),
	emailAddress: Yup.string()
		.email('Ingresar un correo valido')
		.required('Es un campo obligatorio'),
	addressLine: Yup.string().required('Es un campo obligatorio'),
	// Tercero
	socialInstagram: Yup.string().required('Es un campo obligatorio'),
	socialInstagramCla: Yup.string().required('Es un campo obligatorio'),
	socialInstagramSeg: Yup.string().required('Es un campo obligatorio'),
	costo_1: Yup.string().required('Es un campo obligatorio'),

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

const NewInfluencer = () => {
	const [previewImage, setPreviewImage] = useState<string | null>(User1Img);
	const [selectedFile, setSelectedFile] = useState<File | null>(User1Img);
	const formdata = new FormData();
	const [submitting, setSubmitting] = useState(false);

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files && event.target.files[0];

		if (file) {
			setSelectedFile(file);
			formik.setFieldValue('image', file);
			// console.log(formik.values);
			const reader = new FileReader();

			reader.onloadend = () => {
				setPreviewImage(reader.result as string);
			};

			formdata.append('image', file);

			fetch('http://127.0.0.1:8081/images/post', { method: 'POST', body: formdata })
				.then((res) => res.text())
				.then((res) => console.log(res))
				.catch((err) => {
					console.error(err);
				});

			reader.readAsDataURL(file);
		}
	};

	const [successful, setSuccessful] = useState(false);
	const [message, setMessage] = useState('');

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

	async function insertInflu(values: FormData) {
		fetch('http://127.0.0.1:8081/images/post', { method: 'POST', body: values })
			.then(async (res) => {
				setSuccessful(true);
				setMessage(await res.text());
			})
			.catch((err) => {
				setSuccessful(false);
				setMessage(err.message);
			});
		showNotification('Ingreso de Influencer', message, 'info');
	}

	const handleSubmit = async (values: FormData) => {
		try {
			setSubmitting(true);
			// Perform form submission logic here
			console.log(values);
			// Set submitting to false after successful submission
			setSubmitting(false);
		} catch (error) {
			// Handle form submission error
			console.error(error);
			setSubmitting(false);
		}
	};

	const formik = useFormik({
		initialValues: {
			firstName: 'John',
			lastName: 'Doe',
			idUser: '90998909',
			cityNac: 'Colombia',
			birthdayDate: '10/10/2024',
			year: '45',
			gender: 'M',
			eps: 'SURA',
			passport: 'NO',
			displayName: 'johndoe',
			emailAddress: 'johndoe@site.com',
			phoneNumber: '12345566',
			addressLine: 'calle 1',
			addressLine2: 'calle 2',
			city: 'Pereira',
			state: 'Valle',
			zip: '660004',
			emailNotification: [''],
			pushNotification: [''],
			phoneNumberWhp: '1234566',
			socialInstagram: '@instagrampedro',
			socialInstagramCla: 'nano',
			socialInstagramSeg: '1234567',
			socialTik: '@instagrampedro',
			socialTikCla: 'micro',
			socialTikSeg: '1234567',
			socialNetwork: [''],
			image: null,
			costo_1: '1234567',
			costo_2: '1234567',
			costo_3: '1234567',
		},
		onSubmit: () => {
			formdata.append('image', selectedFile!);
			formdata.append('name', formik.values.firstName);
			formdata.append('lastName', formik.values.lastName);
			formdata.append('idUser', formik.values.idUser);
			formdata.append('cityNac', formik.values.cityNac);
			formdata.append('birthdayDate', formik.values.birthdayDate);
			formdata.append('year', formik.values.year);
			formdata.append('gender', formik.values.gender);
			formdata.append('eps', formik.values.eps);
			formdata.append('passport', formik.values.passport);
			formdata.append('displayName', formik.values.displayName);
			formdata.append('emailAddress', formik.values.emailAddress);
			formdata.append('phoneNumber', formik.values.phoneNumber);
			formdata.append('addressLine', formik.values.addressLine);
			formdata.append('addressLine2', formik.values.addressLine2);
			formdata.append('city', formik.values.city);
			formdata.append('state', formik.values.state);
			formdata.append('zip', formik.values.zip);
			formdata.append('phoneNumberWhp', formik.values.phoneNumberWhp);
			formdata.append('socialInstagram', formik.values.socialInstagram);
			formdata.append('socialInstagramCla', formik.values.socialInstagramCla);
			formdata.append('socialInstagramSeg', formik.values.socialInstagramSeg);
			formdata.append('socialTik', formik.values.socialTik);
			formdata.append('socialTikCla', formik.values.socialTikCla);
			formdata.append('socialTikSeg', formik.values.socialTikSeg);
			formdata.append('costo_1', formik.values.costo_1);
			formdata.append('costo_2', formik.values.costo_2);
			formdata.append('costo_3', formik.values.costo_3);

			formik.values.socialNetwork.forEach((value: string) =>
				formdata.append('socialNetwork', value),
			);
			formik.values.pushNotification.forEach((value: string) =>
				formdata.append('pushNotification', value),
			);
			formik.values.emailNotification.forEach((value: string) =>
				formdata.append('emailNotification', value),
			);
			formik.values.pushNotification.forEach((value: string) =>
				formdata.append('pushNotification', value),
			);

			insertInflu(formdata);
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
										<CardBody>
											<div className='row g-4 align-items-center'>
												<div className='col-xl-auto'>
													{previewImage && (
														<Avatar
															srcSet={previewImage}
															src={previewImage}
														/>
													)}
												</div>
												<div className='col-xl'>
													<div className='row g-4'>
														<div className='col-auto'>
															<FormGroup
																id='image'
																label='Primer Nombre'
																isFloating>
																<Input
																	type='file'
																	accept='image/*'
																	onChange={handleFileChange}
																	placeholder='Seleccion imagen'
																	onBlur={formik.handleBlur}
																	isValid={formik.isValid}
																/>
															</FormGroup>
														</div>
														<div className='col-12'>
															<p className='lead text-muted'>
																Imagen principal para la cuenta!!!
															</p>
														</div>
													</div>
												</div>
											</div>
										</CardBody>
									</Card>
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
														label='Ciudad'
														isFloating>
														<Select
															ariaLabel='Ciudad'
															placeholder='Choose...'
															list={[
																{ value: 'col', text: 'COLOMBIA' },
																{ value: 'usa', text: 'USA' },
															]}
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
															placeholder='Edad'
															autoComplete='family-name'
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
													<FormGroup
														id='gender'
														label='gender'
														isFloating>
														<Input
															placeholder='Genero'
															autoComplete='gender'
															onChange={formik.handleChange}
															onBlur={formik.handleBlur}
															value={formik.values.gender}
															isValid={formik.isValid}
															isTouched={formik.touched.gender}
															invalidFeedback={formik.errors.gender}
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
										<div className='col-12'>
											<FormGroup
												id='phoneNumber'
												label='Número celular'
												isFloating>
												<Input
													placeholder='Número celular'
													type='tel'
													autoComplete='tel'
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.phoneNumber}
													isValid={formik.isValid}
													isTouched={formik.touched.phoneNumber}
													invalidFeedback={formik.errors.phoneNumber}
													validFeedback='Looks good!'
												/>
											</FormGroup>
										</div>
										<div className='col-12'>
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
										<div className='col-lg-12'>
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
										<div className='col-lg-12'>
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

										<div className='col-lg-6'>
											<FormGroup
												id='city'
												label='Ciudad'
												isFloating
												formText='Seleccionar la ciudad donde radica.'>
												<Input
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.city}
													isValid={formik.isValid}
													isTouched={formik.touched.city}
													invalidFeedback={formik.errors.city}
													validFeedback='Looks good!'
												/>
											</FormGroup>
										</div>
										<div className='col-md-3'>
											<FormGroup id='state' label='Departamento' isFloating>
												<Select
													ariaLabel='State'
													placeholder='Choose...'
													list={[
														{ value: 'usa', text: 'Risaralda' },
														{ value: 'ca', text: 'Valle' },
													]}
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.state}
													isValid={formik.isValid}
													isTouched={formik.touched.state}
													invalidFeedback={formik.errors.state}
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
										<div className='col-4'>
											<FormGroup
												id='socialInstagramCla'
												label='Calsificación'
												isFloating>
												<Input
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.socialInstagramCla}
													isValid={formik.isValid}
													isTouched={formik.touched.socialInstagramCla}
													invalidFeedback={
														formik.errors.socialInstagramCla
													}
												/>
											</FormGroup>
										</div>
										<div className='col-4'>
											<FormGroup
												id='socialInstagramSeg'
												label='Número seguidores'
												isFloating>
												<Input
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.socialInstagramSeg}
													isValid={formik.isValid}
													isTouched={formik.touched.socialInstagramSeg}
													invalidFeedback={
														formik.errors.socialInstagramSeg
													}
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
										<div className='col-4'>
											<FormGroup
												id='socialTikCla'
												label='Calsificación'
												isFloating>
												<Input
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.socialTikCla}
													isValid={formik.isValid}
													isTouched={formik.touched.socialTikCla}
													invalidFeedback={formik.errors.socialTikCla}
												/>
											</FormGroup>
										</div>
										<div className='col-4'>
											<FormGroup
												id='socialTikSeg'
												label='Número seguidores'
												isFloating>
												<Input
													onChange={formik.handleChange}
													onBlur={formik.handleBlur}
													value={formik.values.socialTikSeg}
													isValid={formik.isValid}
													isTouched={formik.touched.socialTikSeg}
													invalidFeedback={formik.errors.socialTikSeg}
												/>
											</FormGroup>
										</div>

										<div className='col-4'>
											<FormGroup id='costo_1' label='Precio 1' isFloating>
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
											<FormGroup id='costo_2' label='Precio 2' isFloating>
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
											<FormGroup id='costo_3' label='Precio 3' isFloating>
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
										<PreviewItem title='Ciudad' value={formik.values.city} />
										<PreviewItem
											title='Fecha Nacimiento'
											value={formik.values.birthdayDate}
										/>
										<PreviewItem title='Edad' value={formik.values.year} />
										<PreviewItem title='Genero' value={formik.values.gender} />
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
										<PreviewItem title='Ciudad' value={formik.values.city} />
										<PreviewItem
											title='Departamento'
											value={formik.values.state}
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
