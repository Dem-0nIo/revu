/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/react-in-jsx-scope */
import { useReducer } from 'react';
import { CarritoContext } from './CarritoContext';

const initialState = [];

// eslint-disable-next-line react/prop-types
export const CarritoProvider = ({ children }) => {
	const comprasReducer = (state = initialState, action = {}) => {
		switch (action.type) {
			case '[CARRITO] Agregar Compra':
				return [...state, action.payload];
			case '[CARRITO] Aumentar Cantidad Compra':
				return state.map((item) => {
					const cant = item.id + 1;
					if (item.id === action.payload) return { ...item, cantidad: cant };
					return item;
				});
			case '[CARRITO] Disminuir Cantidad Compra':
				return state.map((item) => {
					const cant = item.id - 1;
					if (item.id === action.payload && item.id > 1)
						return { ...item, cantidad: cant };
					return item;
				});
				
			case '[CARRITO] Eliminar Compra':
				return state.filter((compra) => compra.idUser !== action.payload);
			default:
				return state;
		}
	};

	const [listaCompras, dispatch] = useReducer(comprasReducer, initialState);

	const agregarCompra = (compra) => {
		compra.id = 1;
		const action = {
			type: '[CARRITO] Agregar Compra',
			payload: compra,
		};
		dispatch(action);
	};
	const aumentarCantidad = (id) => {
		const action = {
			type: '[CARRITO] Aumentar Cantidad Compra',
			payload: id,
		};
		dispatch(action);
	};
	const disminuirCantidad = (id) => {
		const action = {
			type: '[CARRITO] Disminuir Cantidad Compra',
			payload: id,
		};
		dispatch(action);
	};
	const eliminarCompra = (id) => {
		const action = {
			type: '[CARRITO] Eliminar Compra',
			payload: id,
		};
		dispatch(action);
	};

	return (
		<CarritoContext.Provider
			value={{
				listaCompras,
				agregarCompra,
				aumentarCantidad,
				disminuirCantidad,
				eliminarCompra,
			}}>
			{children}
		</CarritoContext.Provider>
	);
};

export default CarritoProvider;
