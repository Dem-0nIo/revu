import React, { useState, useEffect} from 'react';
import Page from '../../../layout/Page/Page';
// import SubHeader, { SubHeaderLeft, SubHeaderRight, SubheaderSeparator, } from '../../../layout/SubHeader/SubHeader';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import TableClientSideBlog from '../../../components/table/Table';
// import CarritoContext from '../../../contexts/CarritoContext';
// import { InfluencerList } from '../../../components/InfluencerList';
import influService from '../../../services/influ.service';

const DefaultAsidePage = () => {
	const [influencer, setInfluencer] = useState<any[]>([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		getAll();
	}, []);

	async function getAll() {
		influService.getAllInfluencersWithCategories().then(
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
						{ column: 'displayName', label: 'Nombre Artistico', tag: 'i' },
						{ column: 'socialInstagram', label: 'Instagram', tag: 'i' },
						{ column: 'socialInstagramCla', label: 'Clase', tag: 'i' },
						{ column: 'socialTik', label: 'TikTok', tag: 'i' },
						{ column: 'socialTikCla', label: 'Clase', tag: 'i' },
						{ column: 'socialFace', label: 'Facebook', tag: 'i' },
						{ column: 'socialFaceCla', label: 'Clase', tag: 'i' },
						{ column: 'socialUTube', label: 'Youtube', tag: 'i' },
						{ column: 'socialUTubeCla', label: 'Clase', tag: 'i' },
						{ column: 'category', label: 'Categoría', tag: 'i' },
   						{ column: 'subcategory', label: 'Subcategoría', tag: 'i' },
					]}
					data={influencer.map(inf => ({
						...inf,
						category: inf.categories.map((c: { category: string }) => c.category).join(", "), // Convert array to string
						subcategory: inf.categories.map((c: { subcategory: string }) => c.subcategory).join(", ")
					}))}
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
