import React, { useEffect, useState } from 'react';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import SubHeader, { SubHeaderLeft, SubHeaderRight } from '../../../layout/SubHeader/SubHeader';
import Icon from '../../../components/icon/Icon';
import CommonSalePerformance from '../../_common/CRMDashboard/CommonSalePerformance';
import CommonTopSales from '../../_common/CRMDashboard/CommonTopSales';

const DashboardPage = () => {
	return (
		<PageWrapper title='Dashboadrd'>
			<SubHeader>
				<SubHeaderLeft>
					<Icon icon='Info' className='me-2' size='2x' />
					<span className='text-muted'>Revisa las ultimas actualizaciones.</span>
				</SubHeaderLeft>
				<SubHeaderRight>
					<span className='text-muted'>{new Date().toLocaleDateString()}</span>
				</SubHeaderRight>
			</SubHeader>
			<Page>
				<div className='row'>
					<div className='col-lg-8'>
						<CommonSalePerformance />
					</div>
					<div className='col-lg-4'>
						<CommonTopSales />
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default DashboardPage;
