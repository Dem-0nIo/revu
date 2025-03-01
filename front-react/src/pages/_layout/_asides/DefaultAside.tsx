import React, { useContext, useState, useEffect } from 'react';
// import classNames from 'classnames';
// import { useTranslation } from 'react-i18next';
import Brand from '../../../layout/Brand/Brand';
import Navigation, { NavigationLine } from '../../../layout/Navigation/Navigation';
import User from '../../../layout/User/User';
// import {dashboardPagesMenu, demoPagesMenu, pageLayoutTypesPagesMenu,adminPagesMenu} from '../../../menu';
import {dashboardPagesMenu,adminPagesMenu} from '../../../menu';

import ThemeContext from '../../../contexts/themeContext';
// import Icon from '../../../components/icon/Icon';
import Aside, { AsideBody, AsideFoot, AsideHead } from '../../../layout/Aside/Aside';
// import Popovers from '../../../components/bootstrap/Popovers';
import AuthService from '../../../services/auth.service';

const DefaultAside = () => {
	const { asideStatus, setAsideStatus } = useContext(ThemeContext);

	const [, setDoc] = useState(
		localStorage.getItem('facit_asideDocStatus') === 'true' || false,
	);

	// const { t } = useTranslation(['translation', 'menu']);

	useEffect(() => {
		setDoc(true);
	}, []);

	return (
		<Aside>
			<AsideHead>
				<Brand asideStatus={asideStatus} setAsideStatus={setAsideStatus} />
			</AsideHead>
			<AsideBody>
				{AuthService.isAdmin() ? (
					<Navigation menu={adminPagesMenu} id='aside-admin' />
				) : (
					<Navigation menu={dashboardPagesMenu} id='aside-dashboard' />
				)}
				<NavigationLine />
			</AsideBody>
			<AsideFoot>
				<User />
			</AsideFoot>
		</Aside>
	);
};

export default DefaultAside;
