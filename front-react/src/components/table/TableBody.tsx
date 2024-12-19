/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable import/no-named-as-default */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-console */
import React, { Fragment, useContext, useState } from 'react';
import { Field, useFormik } from 'formik';
import * as Yup from 'yup';
import CarritoContext from '../../contexts/CarritoContext';
import { Card } from './AddDel';
import Button from '../bootstrap/Button';
import OffCanvas, { OffCanvasBody, OffCanvasHeader, OffCanvasTitle } from '../bootstrap/OffCanvas';
import FormGroup from '../bootstrap/forms/FormGroup';
import Input from '../bootstrap/forms/Input';
import Icon from '../icon/Icon';
import AuthService from '../../services/auth.service';
import InfluService from '../../services/influ.service';
import showNotification from '../extras/showNotification';

export const TableBody = ({
	headers,
	data,
	currentPage,
	itemsPerPage,
	sortColumn,
	sortDirection,
	isLoading,
	add,
}: {
	headers: { column: string }[];
	data: any[];
	currentPage: number;
	itemsPerPage: number;
	sortColumn: string;
	sortDirection: string;
	isLoading: boolean;
	add: boolean;
}) => {
	const { agregarCompra, eliminarCompra } = useContext(CarritoContext);

	const [added, setAdded] = useState(false);

	const [upcomingEventsEditOffcanvas, setUpcomingEventsEditOffcanvas] = useState(false);

	const [dataToEdit, setDataToEdit] = useState<EventData | null>(null);

	async function editInfluencer(values: any) {
		const resp = await InfluService.updateInfluencer(values);
		if (resp.status === 500) {
			showNotification('Error', 'Error actualizando el usuario.', 'danger');
		} else {
			showNotification('Success', 'Usuario actualizado correctamente.', 'success');
			window.location.reload();
		}
	}

	async function handleRemove(id: number) {
		if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
			const resp = await InfluService.deleteInfluencer(id);
			if (resp.status === 500) {
				showNotification('Error', 'Error al eliminar el usuario.', 'danger');
			} else {
				showNotification('Success', 'Usuario eliminado correctamente.', 'success');
				window.location.reload();
			}
		}
	}

	interface EventData {
		firstName: string;
		lastName: string;
		displayName: string;
		emailAddress: string;
		addressLine: string;
		costo_1: string;
		costo_2: string;
		costo_3: string;
		city: string;
		gender: string;
		eps: string;
		passport: string;
		socialInstagram: string;
		socialInstagramCla: string;
		socialInstagramSeg: string;
		socialTik: string;
		socialTikCla: string;
		socialTikSeg: string;
	}

	const handleUpcomingEdit = (item: any) => {
		console.log('Editando el id', item);
		setDataToEdit(item);
		setUpcomingEventsEditOffcanvas(!upcomingEventsEditOffcanvas);
	};

	const handleSave = (eventData: any) => {
		console.log('Saving changes', eventData);
		editInfluencer(eventData);
		setUpcomingEventsEditOffcanvas(false);
	};

	const handleAgregar = (compra: any) => {
		console.log('Agregando compra', compra);
		agregarCompra(compra);
		setAdded(true);
	};
	const handleQuitar = (id: number) => {
		eliminarCompra(id);
		setAdded(false);
	};

	const startIdx = (currentPage - 1) * itemsPerPage;
	const endIdx = startIdx + itemsPerPage;

	// Sort data based on the default sorting column and direction
	const sortedData = [...data].sort((a, b) => {
		const columnA = a[sortColumn];
		const columnB = b[sortColumn];

		if (columnA < columnB) {
			return sortDirection === 'asc' ? -1 : 1;
		}
		if (columnA > columnB) {
			return sortDirection === 'asc' ? 1 : -1;
		}
		return 0;
	});

	// const paginatedData = data.slice(startIdx, endIdx);
	const paginatedData = sortedData.slice(startIdx, endIdx);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setDataToEdit((prev) => (prev ? { ...prev, [name]: value } : null));
	};

	return (
		<>
			<tbody>
				{!isLoading &&
					paginatedData.map((item, ind) => (
						<tr key={ind}>
							{headers.map((header, index) => (
								<Fragment key={`${item.idUser}-${index}`}>
									{header.column === 'socialInstagram' ? (
										<td key={index}>
											{item[header.column] != null ? (
												<a
													href={`https://www.instagram.com/${item[header.column]}`}
													target='_blank'
													rel='noopener noreferrer'>
													<Icon
														icon='Insta'
														color='primary'
														size='2x'
														forceFamily='material'
													/>
												</a>
											) : null}
										</td>
									) : header.column === 'socialTik' ? (
										<td key={index}>
											{item[header.column] != null ? (
												<a
													href={`https://www.tiktok.com/${item[header.column]}`}
													target='_blank'
													rel='noopener noreferrer'>
													<Icon
														icon='TikTok'
														color='primary'
														size='2x'
														forceFamily='material'
													/>
												</a>
											) : null}
										</td>
									) : header.column === 'status' ? (
										<td key={index}>
											{item[header.column] === 'APPROVED' ? (
												<span style={{ color: 'green' }}>
													{item[header.column]}
												</span>
											) : item[header.column] === 'PENDING' ? (
												<span style={{ color: 'orange' }}>
													{item[header.column]}
												</span>
											) : item[header.column] === 'CANCELED' ? (
												<span style={{ color: 'red' }}>
													{item[header.column]}
												</span>
											) : null}
										</td>
									) : (
										<td key={index}>{item[header.column]}</td>
									)}
								</Fragment>
							))}
							{AuthService.isAdmin() && (
								<>
									<td>
										<div className='bo' key={ind}>
											{add ? (
												<Card
													data={item}
													handleAgregar={() => handleAgregar(item)}
													handleQuitar={() => handleQuitar(item.idUser)}
												/>
											) : null}
											<button
												type='button'
												onClick={() => handleUpcomingEdit(item)}
												className='btn-edit'>
												Editar
											</button>
											<button
												type='button'
												onClick={() => handleRemove(item.idUser)}
												className='btn-delete'>
												Eliminar
											</button>
										</div>
									</td>
								</>
							)}
						</tr>
					))}
			</tbody>

			<OffCanvas
				setOpen={setUpcomingEventsEditOffcanvas}
				isOpen={upcomingEventsEditOffcanvas}
				titleId='upcomingEdit'
				isBodyScroll
				placement='end'>
				<OffCanvasHeader setOpen={setUpcomingEventsEditOffcanvas}>
					<OffCanvasTitle id='upcomingEdit'>Editar</OffCanvasTitle>
				</OffCanvasHeader>
				<OffCanvasBody>
					<div className='row g-4'>
						<div className='col-12'>
							<FormGroup id='customerName' label='Nombre'>
								<Input
									id='firstName'
									name='firstName'
									value={dataToEdit?.firstName}
									onChange={handleChange}
								/>
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='lastname' label='Apellidos'>
								<Input
									id='lastName'
									name='lastName'
									value={dataToEdit?.lastName}
									onChange={handleChange}
								/>
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='displayname' label='Display Name'>
								<Input
									id='displayName'
									name='displayName'
									value={dataToEdit?.displayName}
									onChange={handleChange}
								/>
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='email' label='Email'>
								<Input
									id='emailAddress'
									name='emailAddress'
									value={dataToEdit?.emailAddress}
									onChange={handleChange}
								/>
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='addres' label='Dirección'>
								<Input
									id='addressLine'
									name='addressLine'
									value={dataToEdit?.addressLine}
									onChange={handleChange}
								/>
							</FormGroup>
						</div>

						<div className='col-4'>
							<FormGroup id='costo1' label='Costo 1'>
								<Input
									id='costo_1'
									name='costo_1'
									value={dataToEdit?.costo_1}
									onChange={handleChange}
								/>
							</FormGroup>
						</div>
						<div className='col-4'>
							<FormGroup id='costo2' label='Costo 2'>
								<Input
									id='costo_2'
									name='costo_2'
									value={dataToEdit?.costo_2}
									onChange={handleChange}
								/>
							</FormGroup>
						</div>
						<div className='col-4'>
							<FormGroup id='costo3' label='Costo 3'>
								<Input
									id='costo_3'
									name='costo_3'
									value={dataToEdit?.costo_3}
									onChange={handleChange}
								/>
							</FormGroup>
						</div>

						<div className='col-6'>
							<FormGroup id='city' label='Ciudad'>
								<Input
									id='cyti'
									name='city'
									value={dataToEdit?.city}
									onChange={handleChange}
								/>
							</FormGroup>
						</div>
						<div className='col-6'>
							<FormGroup id='gender' label='Genero'>
								<Input
									id='gender'
									name='gender'
									value={dataToEdit?.gender}
									onChange={handleChange}
								/>
							</FormGroup>
						</div>
						<div className='col-6'>
							<FormGroup id='eps' label='Eps'>
								<Input
									id='eps'
									name='eps'
									value={dataToEdit?.eps}
									onChange={handleChange}
								/>
							</FormGroup>
						</div>
						<div className='col-6'>
							<FormGroup id='passport' label='Pasaporte'>
								<Input
									id='passport'
									name='passport'
									value={dataToEdit?.passport}
									onChange={handleChange}
								/>
							</FormGroup>
						</div>

						<div className='col-4'>
							<FormGroup id='inst' label='Instagram'>
								<Input
									id='socialInstagram'
									name='socialInstagram'
									value={dataToEdit?.socialInstagram}
									onChange={handleChange}
								/>
							</FormGroup>
						</div>
						<div className='col-4'>
							<FormGroup id='instclas' label='Clasificación'>
								<Input
									id='socialInstagramCla'
									name='socialInstagramCla'
									value={dataToEdit?.socialInstagramCla}
									onChange={handleChange}
								/>
							</FormGroup>
						</div>
						<div className='col-4'>
							<FormGroup id='instseg' label='#Seguidores'>
								<Input
									id='socialInstagramSeg'
									name='socialInstagramSeg'
									value={dataToEdit?.socialInstagramSeg}
									onChange={handleChange}
								/>
							</FormGroup>
						</div>

						<div className='col-4'>
							<FormGroup id='tik' label='TikTok'>
								<Input
									id='socialTik'
									name='socialTik'
									value={dataToEdit?.socialTik}
									onChange={handleChange}
								/>
							</FormGroup>
						</div>
						<div className='col-4'>
							<FormGroup id='tikclas' label='Clasificación'>
								<Input
									id='socialTikCla'
									name='socialTikCla'
									value={dataToEdit?.socialTikCla}
									onChange={handleChange}
								/>
							</FormGroup>
						</div>
						<div className='col-4'>
							<FormGroup id='tikseg' label='#Seguidores'>
								<Input
									id='socialTikSeg'
									name='socialTikSeg'
									value={dataToEdit?.socialTikSeg}
									onChange={handleChange}
								/>
							</FormGroup>
						</div>
					</div>
				</OffCanvasBody>
				<div className='row m-0'>
					<div className='col-12 p-3'>
						<Button
							color='info'
							className='w-100'
							onClick={() => handleSave(dataToEdit)}>
							Save
						</Button>
					</div>
				</div>
			</OffCanvas>
		</>
	);
};

export default TableBody;
