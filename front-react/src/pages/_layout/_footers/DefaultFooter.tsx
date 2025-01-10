import React from 'react';
import Footer from '../../../layout/Footer/Footer';

const DefaultFooter = () => {
	return (
		<Footer>
			<div className='container-fluid'>
				<div className='row'>
					<div className='col'>Revu © todos los derechos reservados</div>
					<div className='col-auto'>Mensaje diario de motivación</div>
				</div>
			</div>
		</Footer>
	);
};

export default DefaultFooter;
