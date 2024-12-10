// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable import/order */
import React from 'react';
import Card, {
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import ApexOptions from './pie';

const CommonSalePerformance = () => {
	return (
		<Card stretch>
			<CardHeader>
				<CardLabel>
					<CardTitle tag='div' className='h5'>
						Cotizaciones pendientes vs cotizaciones realizadas
					</CardTitle>
				</CardLabel>
			</CardHeader>
			<CardBody>
				<ApexOptions />
			</CardBody>
		</Card>
	);
};

export default CommonSalePerformance;
