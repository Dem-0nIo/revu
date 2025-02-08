/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-nested-ternary */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { FC, useState, useEffect } from 'react';
import classNames from 'classnames';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import { getFirstLetter, priceFormat } from '../../../helpers/helpers';
import useDarkMode from '../../../hooks/useDarkMode';
import { demoPagesMenu } from '../../../menu';

interface ITopSalesItemProps {
	numContacto: string;
	personaContacto: string;
	price: string;
	status: string;
}

const TopSalesItem: FC<ITopSalesItemProps> = ({ numContacto, personaContacto, price, status }) => {
	const { darkModeStatus } = useDarkMode();

	return (
		<div className='col-12'>
			<div className='row'>
				<div className='col d-flex align-items-center'>
					<div className='flex-shrink-0'>
						<div className='ratio ratio-1x1 me-3' style={{ width: 48 }}>
							<div
								className={classNames(
									'rounded-2',
									'd-flex align-items-center justify-content-center',
									{
										'bg-l10-dark': !darkModeStatus,
										'bg-l90-dark': darkModeStatus,
									},
								)}>
								<span className='fw-bold'>{getFirstLetter(personaContacto)}</span>
							</div>
						</div>
					</div>
					<div className='flex-grow-1'>
						<div className='fs-6'>{personaContacto}</div>
						<div className='text-muted'>
							<small>{numContacto}</small>
						</div>
					</div>
				</div>
				<div className='col-auto text-end'>
					<div>
						<strong>{priceFormat(Number(price))}</strong>
					</div>
					<div className='text-muted'>
						<small
							style={{
								color:
									status === 'APPROVED'
										? 'green'
										: status === 'PENDING'
											? 'orange'
											: 'red',
							}}>
							{status}
						</small>
					</div>
				</div>
			</div>
		</div>
	);
};

const CommonTopSales = () => {
	const test = async () => {
		// setIsLoading(true);
		const API_URL = process.env.REACT_APP_API_URL;
		const response = await fetch(`${API_URL}/api/cotizaciones/all`);
		const data = await response.json();
		setInfluencer(data);
	};

	useEffect(() => {
		test();
	}, []);

	const [influencer, setInfluencer] = useState<ITopSalesItemProps[]>([]);

	return (
		<Card stretch>
			<CardHeader>
				<CardLabel>
					<CardTitle tag='div' className='h5'>
						Cotizaciones
					</CardTitle>
				</CardLabel>
				<CardActions>
					<Button
						color='info'
						isLink
						icon='Summarize'
						tag='a'
						to={`../${demoPagesMenu.listadoCotizaciones.path}`}>
						Más
					</Button>
				</CardActions>
			</CardHeader>
			<CardBody isScrollable>
				<div className='row g-3'>
					{influencer.map((i) => (
						// eslint-disable-next-line react/jsx-props-no-spreading
						<TopSalesItem key={i.numContacto} {...i} />
					))}
				</div>
			</CardBody>
		</Card>
	);
};

export default CommonTopSales;
