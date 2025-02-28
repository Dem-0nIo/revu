import React from 'react';
import Header, { HeaderLeft, HeaderRight } from '../../../layout/Header/Header';
// import Navigation from '../../../layout/Navigation/Navigation';
// import { pageLayoutTypesPagesMenu } from '../../../menu';
// import useDeviceScreen from '../../../hooks/useDeviceScreen';
// import Popovers from '../../../components/bootstrap/Popovers';
import { NavBar } from '../../../components/NavBar';

const DefaultHeader = () => {
	// const { width } = useDeviceScreen();
	return (
		<Header>
			<HeaderLeft>
				<div className='col' />
			</HeaderLeft>
			<HeaderRight>
				<div className='col'><NavBar/></div>
			</HeaderRight>
		</Header>
	);
};

export default DefaultHeader;
