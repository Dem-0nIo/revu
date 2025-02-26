import React, { useState, useEffect, useContext } from 'react';
import Page from '../../../layout/Page/Page';
import SubHeader, {
	SubHeaderLeft,
	SubHeaderRight,
	SubheaderSeparator,
} from '../../../layout/SubHeader/SubHeader';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import TableClientSideBlog from '../../../components/table/Table';
import CarritoContext from '../../../contexts/CarritoContext';
import { InfluencerList } from '../../../components/InfluencerList';
import influService from '../../../services/influ.service';

const DefaultAsidePage = () => {
	const [influencer, setInfluencer] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		getAll();
	}, []);

	async function getAll() {
		influService.getAll().then(
			(respon: { data: any[] }) => {
				setIsLoading(true);
				setInfluencer(respon.data);
				setIsLoading(false);
			},
			(error: any) => {
				setInfluencer([]);
				setIsLoading(false);
			},
		);
	}

	return (
		<PageWrapper title='Influencer'>
			<Page>
				<TableClientSideBlog
					headers={[
						{ column: 'idUser', label: 'ID', tag: 'i' },
						{ column: 'phoneNumber', label: 'Número', tag: 'i' },
						{ column: 'lastName', label: 'Nombre', tag: 'i' },
						{ column: 'displayName', label: 'Contacto', tag: 'i' },
						{ column: 'emailAddress', label: 'Email', tag: 'i' },
						{ column: 'socialInstagram', label: 'Instagram', tag: 'i' },
						{ column: 'socialInstagramCla', label: 'Instagram Cla', tag: 'i' },
						{ column: 'socialTik', label: 'TikTok', tag: 'i' },
						{ column: 'socialTikCla', label: 'TikTok Cla', tag: 'i' },
					]}
					data={influencer}
					isLoading={isLoading}
					loadingTag={<h1>Loading...</h1>}
					add
					flag
				/>
			</Page>
		</PageWrapper>
	);
};

export default DefaultAsidePage;
