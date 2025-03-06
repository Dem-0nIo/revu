/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/jsx-no-constructed-context-values */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';
import { ProductosContext } from './ProductosContext';

export const ProductosProvider = ({ children }: { children: React.ReactNode }) => {
	const [productos] = useState([]);

	/* const test = async () => {
		const response = await fetch('http://127.0.0.1:8081/api/influencer/all');
		const data = await response.json();
		/* setProductos(data) 
	}; */

	useEffect(() => {
		/*  test() */
	}, []);

	return <ProductosContext.Provider value={{ productos }}>{children}</ProductosContext.Provider>;
};

export default ProductosProvider;
