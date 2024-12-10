import React, { FC, useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { FormikHelpers, useFormik } from 'formik';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../components/bootstrap/Card';
import Button from '../../components/bootstrap/Button';
import { priceFormat } from '../../helpers/helpers';
import Icon from '../../components/icon/Icon';

const CommonUpcomingEvents = () => {

	const [dataD, setDataD] = useState([]);

	const fetchData = async () => {
		try {
			const response = await fetch('http://127.0.0.1:8081/api/cotizaciones/all');
			const datas = await response.json();
			// Process the data as needed
			setDataD(datas);
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	function handleUpcomingEdit(...args: unknown[]): unknown {
		// Add your implementation here
		console.log('Editing upcoming event...');
		// You can access the event data using args if needed
		console.log('Event data:', dataD);
		// Return any value or perform any action as needed
		return undefined;
	}
	return (
					<table className='table table-modern'>
						<thead>
							<tr>
								<td aria-labelledby='Image' style={{ width: 60 }} />
								<th>
									Fecha Creación{' '}
								</th>
								<th>RQ No</th>
								<th>Contacto</th>
								<th>Persona asignada</th>
								<th>Email</th>
								<th>WhatsApp</th>
								<th>Costo</th>
								<th>Status</th>
								<td aria-labelledby='Actions' />
							</tr>
						</thead>
						<tbody>
							{dataD.map((item: any) => (
								<tr key={item.idCotizacion}>
									<td>
										{item.dateCreated}
									</td>
									<td>
										<div className='d-flex align-items-center'>
											<span className='text-nowrap'>
												{item.numCotizacion}
											</span>
										</div>
									</td>
									<td>
										<div>
											<div>{item.personaContacto}</div>
											<div className='small text-muted'>
												{item.emailContacto}
											</div>
										</div>
									</td>
									<td>
										<div className='d-flex'>
											<div className='flex-grow-1 ms-3 d-flex align-items-center text-nowrap'>
												{item.whatsappContacto}
											</div>
										</div>
									</td>
									<td>{item.emailContacto}</td>
									<td>{item.whatsappContacto}</td>
									<td>{item.status}</td>
									<td>
										{item.status}
									</td>
									<td>
										<Button
											icon='Edit'
											onClick={() => handleUpcomingEdit()}>
											Edit
										</Button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
	);
};

export default CommonUpcomingEvents;
