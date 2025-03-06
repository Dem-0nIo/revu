/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-console */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-restricted-globals */

import React, { useState, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import { CarritoContext } from '../../../contexts/CarritoContext';
// import Avatar from '../../../components/Avatar';
import { PdfGenerator } from '../aside-types/PdfGenerator';
import showNotification from '../../../components/extras/showNotification';
// import Search from '../../../components/Search';
import Input from '../../../components/bootstrap/forms/Input';
import SubHeader, {
	SubHeaderLeft,
	SubheaderSeparator,
	SubHeaderRight,
} from '../../../layout/SubHeader/SubHeader';

const CarritoPage = () => {
	const [, setMessage] = useState('');
	// const { listaCompras, aumentarCantidad, disminuirCantidad, eliminarCompra } =
	const { listaCompras, eliminarCompra } =

		useContext(CarritoContext);

	const calcularTotal = () => {
		return listaCompras
			.reduce((total: number, item: any) => total + item.costo_1, 0)
			.toFixed(2);
	};

	const handleImpresion = () => {
		PdfGenerator(listaCompras);
		// print();
	};

	const SignupSchema = Yup.object({
		idCotizacion: Yup.number().required('Es un campo obligatorio'),
		numCotizacion: Yup.string().required('Es un campo obligatorio'),
		numContacto: Yup.string().required('Es un campo obligatorio'),
		personaContacto: Yup.string().required('Es un campo obligatorio'),
		whatsappContacto: Yup.string().required('Es un campo obligatorio'),
		emailContacto: Yup.string()
			.email('Ingresar un correo valido')
			.required('Es un campo obligatorio'),
	});

	const formik = useFormik({
		initialValues: {
			idCotizacion: '',
			numCotizacion: '',
			numContacto: '',
			personaContacto: '',
			emailContacto: '',
			whatsappContacto: '',
			price: calcularTotal(),
			influencerId: listaCompras.map((item: any) => item.idUser),
		},
		onSubmit: (values) => {
			insertCotizaciones(values);
		},
		validationSchema: SignupSchema,
	});

	async function insertCotizaciones(values: any) {
		console.log('values', values);
		console.log(listaCompras.map((item: any) => item.idUser));
		fetch('http://127.0.0.1:8081/api/cotizaciones/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'Application/JSON',
			},
			body: JSON.stringify(values),
		})
			.then(async (res) => {
				console.log('estoy aca');
				const responseText = await res.text();
				setMessage(responseText);
				showNotification('Cotización guardada exitosamente', responseText, 'info');
			})
			.catch((err) => {
				console.log('puro error aca');
				setMessage(err.message);
				showNotification('Existe un error guardando la cotizació', err.message, 'info');
			});
	}

	return (
		<PageWrapper title='Influencer'>
			<SubHeader>
				<SubHeaderLeft>
					<span>Cotización</span>
					<SubheaderSeparator />
					<span className='text-muted'> Encabezado cotización</span>
				</SubHeaderLeft>
				<SubHeaderRight>
					<div className='row' style={{ padding: '4%' }}>
						<div className='idCotizacion'>
							ID Cotización
							<Input
								className='form-control'
								type='text'
								id='idCotizacion'
								placeholder='idCotizacion'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.idCotizacion}
								isValid={formik.isValid}
								isTouched={formik.touched.idCotizacion}
								invalidFeedback={formik.errors.idCotizacion}
								validFeedback='Looks good!'
							/>
						</div>
						<div className='numCotizacion'>
							Numero Cotización
							<Input
								className='form-control'
								type='text'
								id='numCotizacion'
								placeholder='numCotizacion'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.numCotizacion}
								isValid={formik.isValid}
								isTouched={formik.touched.numCotizacion}
								invalidFeedback={formik.errors.numCotizacion}
								validFeedback='Looks good!'
							/>
						</div>
					</div>
					<div className='row' style={{ padding: '4%' }}>
						<div className='numContacto'>
							Número de Contacto
							<Input
								className='form-control'
								type='text'
								id='numContacto'
								placeholder='numContacto'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.numContacto}
								isValid={formik.isValid}
								isTouched={formik.touched.numContacto}
								invalidFeedback={formik.errors.numContacto}
								validFeedback='Looks good!'
							/>
						</div>
						<div className='personaCOntacto'>
							Persona de Contacto
							<Input
								className='form-control'
								type='text'
								id='personaContacto'
								placeholder='personaContacto'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.personaContacto}
								isValid={formik.isValid}
								isTouched={formik.touched.personaContacto}
								invalidFeedback={formik.errors.personaContacto}
								validFeedback='Looks good!'
							/>
						</div>
					</div>
					<div className='row' style={{ padding: '4%' }}>
						<div className='emailContacto'>
							Email de Contacto
							<Input
								className='form-control'
								type='text'
								id='emailContacto'
								placeholder='emailContacto'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.emailContacto}
								isValid={formik.isValid}
								isTouched={formik.touched.emailContacto}
								invalidFeedback={formik.errors.emailContacto}
								validFeedback='Looks good!'
							/>
						</div>
						<div className='whatsappContacto'>
							WhatsApp
							<Input
								className='form-control'
								type='text'
								id='whatsappContacto'
								placeholder='whatsappContacto'
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								value={formik.values.whatsappContacto}
								isValid={formik.isValid}
								isTouched={formik.touched.whatsappContacto}
								invalidFeedback={formik.errors.whatsappContacto}
								validFeedback='Looks good!'
							/>
						</div>
					</div>
					<div className='row' style={{ padding: '4%' }}>
						<div className='boton'>
							Guarda los datos
							<button
								style={{ height: '50px', width: '120px' }}
								className='btn btn-primary'
								disabled={listaCompras < 1}
								type='button'
								onClick={() => formik.handleSubmit()}>
								Guardar
							</button>
						</div>
					</div>
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<table>
					<thead>
						<tr>
							<th scope='col'>#</th>
							<th scope='col'>Nombre</th>
							<th scope='col'>NikName</th>
							<th scope='col'>Instagram</th>
							<th scope='col'>Clasificación</th>
							<th scope='col'>Seguidores</th>
							<th scope='col'>Precio</th>
							<th scope='col'>Eliminar</th>
						</tr>
					</thead>
					<tbody>
						{listaCompras.map(
							(
								item: any, // Explicitly define the type of 'item'
							) => (
								<tr key={item.idUser}>
									<td>{item.firstName}</td>
									<td>{item.displayName}</td>
									<td>{item.socialInstagram}</td>
									<td>{item.socialInstagramCla}</td>
									<td>{item.socialInstagramSeg}</td>
									<td>{item.costo_1}</td>
									<td>
										<button
											type='button'
											className='btn btn-danger'
											onClick={() => eliminarCompra(item.idUser)}>
											Eliminar
										</button>
									</td>
								</tr>
							),
						)}
					</tbody>
				</table>

				<div
					className='row'
					style={{ display: 'flex', justifyContent: 'flex-end', padding: '5%' }}>
					<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
						<p style={{ marginRight: '2' }}>
							<b>TOTAL: &nbsp;</b>
						</p>
						<p>
							{' '}
							&nbsp;<b>${calcularTotal()}</b>
						</p>
					</div>
					<Input
						className='form-control'
						style={{ display: 'none' }}
						type='text'
						id='numContacto'
						placeholder='numContacto'
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={calcularTotal()}
						isValid={formik.isValid}
						isTouched={formik.touched.numContacto}
						invalidFeedback={formik.errors.numContacto}
						validFeedback='Looks good!'
					/>
					<button
						style={{ height: '50px', width: '100px' }}
						className='btn btn-primary'
						onClick={handleImpresion}
						disabled={listaCompras < 1}>
						Exportar
					</button>
					&nbsp;
				</div>
			</Page>
		</PageWrapper>
	);
};

export default CarritoPage;
