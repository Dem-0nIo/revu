/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/function-component-definition */
import React, { useState, useEffect } from 'react';
import TableClientSideBlog from '../../../components/table/Table';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import cotiService from '../../../services/coti.service';

function ReactJsClientSideTable() {
	const [dataMyTable, setdataMyTable] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		getAll();
	}, []);

	async function getAll() {
		cotiService.getAll().then(
			(respon: { data: any[] }) => {
				setIsLoading(true);
				setdataMyTable(respon.data);
				setIsLoading(false);
			},
			(error: any) => {
				setdataMyTable([]);
				setIsLoading(false);
			},
		);
	}

	return (
		<PageWrapper title='Cotizaciones'>
			<Page container='fluid'>
				<TableClientSideBlog
					headers={[
						{ column: 'numCotizacion', label: 'Número Cotización', tag: 'c' },
						{ column: 'personaContacto', label: 'Nombre', tag: 'c' },
						{ column: 'numContacto', label: 'Contacto', tag: 'c' },
						{ column: 'emailContacto', label: 'E-mail', tag: 'c' },
						{
							column: 'status',
							label: 'Estado',
							tag: 'c',
							render: (value: string) => {
								let color = '';
								switch (value) {
									case 'APPROVED':
										color = 'green';
										break;
									case 'PENDING':
										color = 'yellow';
										break;
									case 'CANCELED':
										color = 'red';
										break;
									default:
										color = '';
										break;
								}
								return <span style={{ color }}>{value}</span>;
							},
						},
					]}
					data={dataMyTable}
					isLoading={isLoading}
					loadingTag={<h1>Loading...</h1>}
					add={false}
					flag={false}
				/>
			</Page>
		</PageWrapper>
	);
}

export default ReactJsClientSideTable;
