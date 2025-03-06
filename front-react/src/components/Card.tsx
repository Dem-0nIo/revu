/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/card.css';
import Icon from '../components/icon/Icon';

export const Card = ({
	imagen,
	titulo,
	descripcion,
	precio,
	handleAgregar,
	handleQuitar,
	handleAumentar,
	handleDisminuir,
}: {
	imagen: string;
	titulo: string;
	descripcion: string;
	precio: string;
	handleAgregar: () => void;
	handleQuitar: () => void;
	handleAumentar: () => void;
	handleDisminuir: () => void;
}) => {
	const [added, setAdded] = useState(false);

	const clickAgregar = () => {
		handleAgregar();
		setAdded(true);
	};
	const clickQuitar = () => {
		handleQuitar();
		setAdded(false);
	};

	return (
		<div className='tarjeta'>
			{/* <img src={`http://127.0.0.1:8081${imagen}`} alt={titulo} className='tarjeta-imagen' /> */}
			<div className='tarjeta-contenido'>
				<h3 className='tarjeta-titulo'>{titulo}</h3>
				<p className='tarjeta-descripcion'>{descripcion}</p>
				<p className='tarjeta-precio'>@{precio}</p>
				<Link to={`https://www.instagram.com/${precio}`} target="_blank" rel="noopener noreferrer">
					<Icon
						icon='Insta'
						color='primary' // null || 'primary' || 'secondary' || 'success' || 'info' || 'warning' || 'danger' || 'light' || 'dark'
						size='4x' // null || 'sm' || 'md' || 'lg' || '2x' || '3x' || '4x' || '5x' || '6x' || '7x' || '8x' || '9x' || '10x'
						forceFamily='material' // null || 'custom' || 'material'
						/>
				</Link>

				{added ? (
					<button type='button' className='boton-quitar' onClick={clickQuitar}>
						Quitar
					</button>
				) : (
					<button type='button' className='boton-agregar' onClick={clickAgregar}>
						Agregar
					</button>
				)}
			</div>
		</div>
	);
};

export default Card;
