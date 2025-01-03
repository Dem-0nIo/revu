/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { CarritoContext } from '../contexts/CarritoContext';
import Icon from './icon/Icon';

export const NavBar = () => {
	const { listaCompras } = useContext(CarritoContext);
	return (
		<nav className='navbar navbar-expand-lg bg-body-tertiary'>
			<div className='container-fluid'>
				<div className='collapse navbar-collapse' id='navbarSupportedContent'>
					<ul className='navbar-nav me-auto mb-2 mb-lg-0' />
					<NavLink to='revu/reporte'>
						{listaCompras.length}
						<Icon icon='Person' size='md' />
					</NavLink>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
