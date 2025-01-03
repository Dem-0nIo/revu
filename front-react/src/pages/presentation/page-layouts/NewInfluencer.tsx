/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-console */
import React, { FC, useState } from 'react';
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
	const formdata = new FormData();
	const [successful, setSuccessful] = useState(false);
	const [message, setMessage] = useState('error por defecto');

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
			image: 'null',
			costo_1: '1234567',
			costo_2: '1234567',
			costo_3: '1234567',
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
