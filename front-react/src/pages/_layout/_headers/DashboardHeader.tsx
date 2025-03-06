import React, { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header, { HeaderLeft, HeaderRight } from '../../../layout/Header/Header';
import Popovers from '../../../components/bootstrap/Popovers';
import Button, { IButtonProps } from '../../../components/bootstrap/Button';
import useDarkMode from '../../../hooks/useDarkMode';
// import LANG, { getLangWithKey, ILang } from '../../../lang';
/* import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../../components/bootstrap/Dropdown'; */
// import showNotification from '../../../components/extras/showNotification';
import Icon from '../../../components/icon/Icon';
// import Spinner from '../../../components/bootstrap/Spinner';
import { NavBar } from '../../../components/NavBar';

const DashboardHeader = () => {
	const { darkModeStatus, setDarkModeStatus } = useDarkMode();
	const styledBtn: IButtonProps = {
		color: darkModeStatus ? 'dark' : 'light',
		hoverShadow: 'default',
		isLight: !darkModeStatus,
		size: 'lg',
	};

	const { i18n } = useTranslation();

	/**
	 * Language attribute
	 */
	useLayoutEffect(() => {
		document.documentElement.setAttribute('lang', i18n.language);
	});

	return (
		<Header>
			<HeaderLeft>
				<div className='col'>
					<NavBar />
				</div>
			</HeaderLeft>

			<HeaderRight>
				<div className='row g-3 align-items-center'>
					<div className='col-auto'>
						<div className='col'>{new Date().toLocaleDateString()}</div>
					</div>
					{/* Dark Mode */}
					<div className='col-auto'>
						<Popovers trigger='hover' desc='Oscuro / Luz'>
							<Button
								// eslint-disable-next-line react/jsx-props-no-spreading
								{...styledBtn}
								onClick={() => setDarkModeStatus(!darkModeStatus)}
								className='btn-only-icon'
								data-tour='dark-mode'
								aria-label='Toggle dark mode'>
								<Icon
									icon={darkModeStatus ? 'DarkMode' : 'LightMode'}
									color={darkModeStatus ? 'info' : 'warning'}
									className='btn-icon'
								/>
							</Button>
						</Popovers>
					</div>
				</div>
			</HeaderRight>
		</Header>
	);
};

export default DashboardHeader;
