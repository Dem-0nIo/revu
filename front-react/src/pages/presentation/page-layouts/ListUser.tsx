import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';

// import SubHeader, { SubHeaderLeft, SubHeaderRight, SubheaderSeparator } from '../../../layout/SubHeader/SubHeader';
import Button from '../../../components/bootstrap/Button'; /* 
import tableData from '../../../common/data/dummyProductData'; */
import OffCanvas, {
	OffCanvasBody,
	OffCanvasHeader,
	OffCanvasTitle,
} from '../../../components/bootstrap/OffCanvas';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Badge from '../../../components/bootstrap/Badge';
import Input from '../../../components/bootstrap/forms/Input';
// import PlaceholderImage from '../../../components/extras/PlaceholderImage';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import UserService from '../../../services/user.service';
import UserData from '../../_common/user';
import CommonGridInfluencer from '../../_common/CommonGridInfluencer';
import showNotification from '../../../components/extras/showNotification';

const DefaultAsidePage = () => {
	useEffect(() => {
		getUsers();
	}, []);

	const [, setSuccessful] = useState(false);

	const [editPanel, setEditPanel] = useState<boolean>(false);

	const [editItem, setEditItem] = useState<UserData | null>(null);

	const [userData, setUserData] = useState<UserData[]>([]);

	async function getUsers() {
		UserService.getAllUsers().then(
			(respon: { data: UserData[] }) => {
				setUserData(respon.data);
				setSuccessful(true);
			},
			(error: any) => {
				setUserData([]);
				setSuccessful(false);
			},
		);
	}

	async function editUser(values: any) {
		// console.log(values);

		const resp = await UserService.updateUser(values);
		if (resp.status === 500) {
			setSuccessful(false);
			showNotification(
				'Error',
				'El nombre de usuario ya existe en la base de datos.',
				'danger',
			);
		} else {
			setSuccessful(true);
			getUsers();
			showNotification('Success', 'Usuario actualizado correctamente.', 'success');
		}
	}

	async function handleRemove(id: number) {
		if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
			const resp = await UserService.deleteUser(id);
			if (resp.status === 500) {
				setSuccessful(false);
				showNotification('Error', 'Error al eliminar el usuario.', 'danger');
			} else {
				setSuccessful(true);
				getUsers();
				showNotification('Success', 'Usuario eliminado correctamente.', 'success');
				const newData = userData.filter((item) => item.id !== id);
				setUserData(newData);
				setSuccessful(false);
			}
		}
	}

	function handleEdit(id: number) {
		const newData = userData.filter((item) => item.id === id);
		setEditItem(newData[0]);
	}

	const formik = useFormik({
		initialValues: {
			id: 0,
			firstname: '',
			lastname: '',
			username: '',
			email: '',
			phone: '',
			password: '',
		},
		onSubmit: (values) => {
			setEditPanel(false);
		},
	});

	useEffect(() => {
		if (editItem) {
			formik.setValues({
				id: editItem.id,
				firstname: editItem.firstname,
				lastname: editItem.lastname,
				username: editItem.username,
				email: editItem.email,
				phone: editItem.phone,
				password: editItem.password,
			});
		}
		return () => {
			formik.setValues({
				id: 0,
				firstname: '',
				lastname: '',
				username: '',
				email: '',
				phone: '',
				password: '',
			});
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [editItem]);

	return (
		<PageWrapper title='Influencer'>
			<Page>
				<div className='display-6 fw-bold py-5'>Registros guardados en el sistema</div>

				<div className='row'>
					{userData.map((item: UserData) => (
						<div key={item.id} className='col-xxl-3 col-xl-4 col-md-6'>
							<CommonGridInfluencer
								id={item.id}
								firstname={item.firstname}
								lastname={item.lastname}
								username={item.username}
								email={item.email}
								phone={item.phone}
								password={item.password}
								editAction={() => {
									setEditPanel(true);
									handleEdit(item.id);
								}}
								deleteAction={() => handleRemove(item.id)}
							/>
						</div>
					))}
				</div>
			</Page>

			<OffCanvas
				setOpen={setEditPanel}
				isOpen={editPanel}
				isRightPanel
				tag='form'
				noValidate
				onSubmit={formik.handleSubmit}>
				<OffCanvasHeader setOpen={setEditPanel}>
					<OffCanvasTitle id='edit-panel'>
						<Badge color='primary' isLight>
							Editar Usuario
						</Badge>
					</OffCanvasTitle>
				</OffCanvasHeader>
				<OffCanvasBody>
					<Card>
						<CardHeader>
							<CardLabel icon='Description' iconColor='success'>
								<CardTitle>Detalles Usuario</CardTitle>
							</CardLabel>
						</CardHeader>
						<CardBody>
							<div className='row g-4'>
								<div className='col-12'>
									<FormGroup id='firstname' label='Nombre' isFloating>
										<Input
											placeholder='Nombre'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.firstname}
											isValid={formik.isValid}
											isTouched={formik.touched.firstname}
											invalidFeedback={formik.errors.firstname}
											validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>
								<div className='col-12'>
									<FormGroup id='lastname' label='Apellido' isFloating>
										<Input
											placeholder='Apellido'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.lastname}
											isValid={formik.isValid}
											isTouched={formik.touched.lastname}
											invalidFeedback={formik.errors.lastname}
											validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>
								<div className='col-12'>
									<FormGroup id='email' label='Email' isFloating>
										<Input
											placeholder='Email'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.email}
											isValid={formik.isValid}
											isTouched={formik.touched.email}
											invalidFeedback={formik.errors.email}
											validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>
								<div className='col-12'>
									<FormGroup id='phone' label='Telefono' isFloating>
										<Input
											placeholder='Telefono'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.phone}
											isValid={formik.isValid}
											isTouched={formik.touched.phone}
											invalidFeedback={formik.errors.phone}
											validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>
								<div className='col-12'>
									<FormGroup id='username' label='Nombre de Usuario' isFloating>
										<Input
											placeholder='Nombre de Usuario'
											onChange={formik.handleChange}
											onBlur={formik.handleBlur}
											value={formik.values.username}
											isValid={formik.isValid}
											isTouched={formik.touched.username}
											invalidFeedback={formik.errors.username}
											validFeedback='Looks good!'
										/>
									</FormGroup>
								</div>
							</div>
						</CardBody>
					</Card>
				</OffCanvasBody>
				<div className='p-3'>
					<Button
						color='info'
						icon='Save'
						type='submit'
						isDisable={!formik.isValid && !!formik.submitCount}
						onClick={() => {
							formik.handleSubmit();
							editUser(formik.values);
						}}>
						Actualizar
					</Button>
				</div>
			</OffCanvas>
		</PageWrapper>
	);
};

export default DefaultAsidePage;
