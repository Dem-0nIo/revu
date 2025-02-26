/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable import/no-useless-path-segments */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable no-template-curly-in-string */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from 'react';
import '../../styles/card.css';
import '../../styles/button.css';

export const Card = ({
	data,
	handleAgregar,
	handleQuitar,
}: {
	data: any;
	handleAgregar: () => void;
	handleQuitar: () => void;
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
		<div className='bo'>
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
	);
};

export default Card;
