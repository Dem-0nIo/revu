/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable spaced-comment */
import React, { useState } from 'react';
// import * as Yup from 'yup';
import { useFormik } from 'formik';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardSubTitle,
	CardTitle,
} from '../../../components/bootstrap/Card';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import showNotification from '../../../components/extras/showNotification';
// import Icon from '../../../components/icon/Icon';
import Button from '../../../components/bootstrap/Button';
import UserService from '../../../services/user.service';
// import UserData from '../../_common/user';

/* const SignupSchema = Yup.object({
	firstName: Yup.string().required('Es un campo obligatorio'),
	lastName: Yup.string().required('Es un campo obligatorio'),
	displayName: Yup.string().required('Es un campo obligatorio'),
	phone: Yup.string().required('Es un campo obligatorio'),
	emailAddress: Yup.string()
		.email('Ingresar un correo valido')
		.required('Es un campo obligatorio'),
	addressLine: Yup.string().required('Es un campo obligatorio'),
}); */

const Users = () => {
	// const [isLoading, setIsLoading] = useState<boolean>(false);
	const [, setSuccessful] = useState(false);
	// const [message, setMessage] = useState('error por defecto');

	async function addUser(values: any) {
		try {
			const resp = await UserService.addUser(values);
			if (resp) {
				setSuccessful(true);
				addRolUser({ idUser: resp.data.userId, rol: values.rol });
				showNotification('Ingreso de usuario', 'Ingreso exitoso', 'info');
			}
		} catch (error) {
			setSuccessful(false);
			showNotification('Error', String(error), 'danger');
		}
	}

	async function addRolUser(values: any) {
		try {
			const resp = await UserService.addRolUser(values);
			if (resp) {
				setSuccessful(true);
				showNotification('Ingreso de rol de usuario', 'Ingreso exitoso', 'info');
			}
		} catch (error) {
			setSuccessful(false);
			showNotification('Error', String(error), 'danger');
		}
	}

	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			displayName: '',
			emailAddress: '',
			phone: '',
			newPassword: '',
			rol: '1',
		},
		//validationSchema: SignupSchema,
		onSubmit: () => {
			addUser(formik.values);
		},
	});

	return (
		<PageWrapper title='Usuario Nuevo'>
			<SubHeader>
				<SubHeaderLeft>
					<SubheaderSeparator />
					<span className='text-muted'>{new Date().toLocaleString()}</span>
				</SubHeaderLeft>
				<SubHeaderRight>
					<Button icon='Save' color='info' onClick={formik.handleSubmit} type='submit'>
						Guardar
					</Button>
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row h-100 align-content-start'>
					<div className='col-md-12'>
						<Card>
							<CardHeader>
								<CardLabel icon='Person' iconColor='success'>
									<CardTitle tag='div' className='h5'>
										Información personal
									</CardTitle>
									<CardSubTitle tag='div' className='h6'>
										Datos de usuario
									</CardSubTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='row g-4'>
									<div className='col-md-6'>
										<FormGroup id='firstName' label='Primer Nombre' isFloating>
											<Input
												placeholder='Primer Nombre'
												autoComplete='additional-name'
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.firstName}
												isValid={formik.isValid}
												isTouched={formik.touched.firstName}
												invalidFeedback={formik.errors.firstName}
												validFeedback='Se ve bien!'
											/>
										</FormGroup>
									</div>
									<div className='col-md-6'>
										<FormGroup id='lastName' label='Apellidos' isFloating>
											<Input
												placeholder='Apellidos'
												autoComplete='family-name'
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.lastName}
												isValid={formik.isValid}
												isTouched={formik.touched.lastName}
												invalidFeedback={formik.errors.lastName}
												validFeedback='Se ve bien!'
											/>
										</FormGroup>
									</div>
									<div className='col-12'>
										<FormGroup
											id='displayName'
											label='Nombre de inicio de sesón'
											isFloating>
											<Input
												placeholder='Usuario'
												autoComplete='username'
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.displayName}
												isValid={formik.isValid}
												isTouched={formik.touched.displayName}
												invalidFeedback={formik.errors.displayName}
												validFeedback='Se ve bien!'
											/>
										</FormGroup>
									</div>
								</div>
							</CardBody>
						</Card>
						<Card>
							<CardHeader>
								<CardLabel icon='Rol' iconColor='success'>
									<CardTitle tag='div' className='h5'>
										Rol de usuario
									</CardTitle>
									<CardSubTitle tag='div' className='h6'>
										Seleccione el rol que desea asignar
									</CardSubTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='row g-4'>
									<div className='col-md-6'>
										<FormGroup id='rol' label='Primer Nombre' isFloating>
											<select
												id='rol'
												name='rol'
												value={formik.values.rol}
												onChange={formik.handleChange}
												className='form-select'>
												<option value='3'>Administrador</option>
												<option value='1'>CCT</option>
												<option value='2'>Reclutador</option>
											</select>
										</FormGroup>
									</div>
								</div>
							</CardBody>
						</Card>
						<Card>
							<CardHeader>
								<CardLabel icon='Phonelink' iconColor='danger'>
									<CardTitle tag='div' className='h5'>
										Información de contacto
									</CardTitle>
									<CardSubTitle tag='div' className='h6'>
										Informacion de l contacto
									</CardSubTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='row g-4'>
									<div className='col-md-6'>
										<FormGroup id='emailAddress' label='Email' isFloating>
											<Input
												type='email'
												placeholder='Email'
												autoComplete='email'
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.emailAddress}
												isValid={formik.isValid}
												isTouched={formik.touched.emailAddress}
												invalidFeedback={formik.errors.emailAddress}
												validFeedback='Se ve bien!'
											/>
										</FormGroup>
									</div>
									<div className='col-md-6'>
										<FormGroup id='phone' label='Número Celular' isFloating>
											<Input
												type='tel'
												placeholder='Número Celular'
												autoComplete='tel'
												onChange={formik.handleChange}
												onBlur={formik.handleBlur}
												value={formik.values.phone}
												isValid={formik.isValid}
												isTouched={formik.touched.phone}
												invalidFeedback={formik.errors.phone}
												validFeedback='Se ve bien!'
											/>
										</FormGroup>
									</div>
								</div>
							</CardBody>
						</Card>
						<Card>
							<CardHeader>
								<CardLabel icon='LocalPolice' iconColor='primary'>
									<CardTitle tag='div' className='h5'>
										Contraseña inicio de sesión
									</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<div className='col-12'>
									<FormGroup id='newPassword' label='Contraseña' isFloating>
										<Input
											type='password'
											placeholder='Contraseña'
											autoComplete='new-password'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.newPassword}
											isValid={formik.isValid}
											isTouched={formik.touched.newPassword}
											invalidFeedback={formik.errors.newPassword}
											validFeedback='Se ve bien!'
										/>
									</FormGroup>
								</div>
							</CardBody>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default Users;
