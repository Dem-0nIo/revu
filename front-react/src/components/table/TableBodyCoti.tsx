/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable import/no-named-as-default */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-console */
import React, { Fragment, useContext, useState } from 'react';
import CarritoContext from '../../contexts/CarritoContext';
import { Card } from './AddDel';
import Button from '../bootstrap/Button';
import OffCanvas, { OffCanvasBody, OffCanvasHeader, OffCanvasTitle } from '../bootstrap/OffCanvas';
import FormGroup from '../bootstrap/forms/FormGroup';
import Input from '../bootstrap/forms/Input';
import Icon from '../icon/Icon';
import AuthService from '../../services/auth.service';
import CotiService from '../../services/coti.service';
import showNotification from '../extras/showNotification';

export const TableBodyCoti = ({
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
	
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [added, setAdded] = useState(false);

	const [upcomingEventsEditOffcanvas, setUpcomingEventsEditOffcanvas] = useState(false);

	const [dataToEdit, setDataToEdit] = useState<EventData | null>(null);

	async function editCotizacion(values: any) {
		const resp = await CotiService.updateCotizacion(values);
		if (resp.status === 500) {
			showNotification('Error', 'Error actualizando la cotización.', 'danger');
		} else {
			showNotification('Success', 'Usuario actualizado correctamente.', 'success');
			window.location.reload();
		}
	}

	async function handleRemove(id: number) {
		if (window.confirm('¿Estás seguro de que deseas eliminar este registro?')) {
			const resp = await CotiService.deleteCotizacion(id);
			if (resp.status === 500) {
				showNotification('Error', 'Error al eliminar el registro.', 'danger');
			} else {
				showNotification('Success', 'registro eliminado correctamente.', 'success');
				window.location.reload();
			}
		}
	}

	interface EventData {
		numContacto: string;
		personaContacto: string;
		emailContacto: string;
		whatsappContacto: string;
		status: string;
	}

	const handleUpcomingEdit = (item: any) => {
		console.log('Editando el id', item);
		setDataToEdit(item);
		setUpcomingEventsEditOffcanvas(!upcomingEventsEditOffcanvas);
	};

	const handleSave = (eventData: any) => {
		console.log('Saving changes', eventData);
		editCotizacion(eventData);
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

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
										<td>
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
										<td>
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
										<td>
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
										<td>{item[header.column]}</td>
									)}
								</Fragment>
							))}

							{AuthService.isAdmin() && (
								<>
									<td>
										<div className='bo'>
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
												onClick={() => handleRemove(item.idCotizacion)}
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
							<FormGroup id='personaContacto' label='Contacto Persona'>
								<Input
									id='personaContacto'
									name='personaContacto'
									value={dataToEdit?.personaContacto}
									onChange={(e) =>
										handleChange(e as React.ChangeEvent<HTMLSelectElement>)
									}
								/>
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='numContacto' label='Número Contacto'>
								<Input
									id='numContacto'
									name='numContacto'
									value={dataToEdit?.numContacto}
									onChange={handleChange}
								/>
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='emailContacto' label='Email'>
								<Input
									id='emailContacto'
									name='emailContacto'
									value={dataToEdit?.emailContacto}
									onChange={handleChange}
								/>
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='whatsappContacto' label='WhatsApp'>
								<Input
									id='whatsappContacto'
									name='whatsappContacto'
									value={dataToEdit?.whatsappContacto}
									onChange={handleChange}
								/>
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='status' label='Status'>
								<select
									id='status'
									name='status'
									value={dataToEdit?.status}
									onChange={handleChange}
									className='form-select'>
									<option value='APPROVED' style={{ color: 'green' }}>
										APPROVED
									</option>
									<option value='PENDING' style={{ color: 'orange' }}>
										PENDING
									</option>
									<option value='CANCELED' style={{ color: 'red' }}>
										CANCELED
									</option>
								</select>
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

export default TableBodyCoti;
