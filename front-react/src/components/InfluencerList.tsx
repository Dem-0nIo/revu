import React, { useContext, useEffect, useState } from 'react'
import { Card } from './Card';
// eslint-disable-next-line import/no-named-as-default
import CarritoContext from '../contexts/CarritoContext';

export const InfluencerList = ({influencer}: { influencer: any[] }) => {

    const { agregarCompra, eliminarCompra } = useContext(CarritoContext);

	const handleAgregar = (compra: any) => {
        console.log("Agregando compra", compra);
		agregarCompra(compra);
	};
	const handleQuitar = (id: number) => {
		eliminarCompra(id);
	};

    return (
        <>
            <div className='display-8 fw-bold py-3'>Base de datos Influencers</div>

            <div className='row'>
                {influencer.map((influ: any) => (
                    <Card
                        key={influ.idUser}
                        imagen={influ.img}
                        titulo={influ.firstName}
                        descripcion={influ.lastName}
                        precio={influ.socialInstagram}
                        handleAgregar={() => handleAgregar(influ)}
                        handleQuitar={() => handleQuitar(influ.idUser)}
                        handleAumentar={() => handleAgregar(influ)}
                        handleDisminuir={() => handleQuitar(influ.idUser)}
                    />
                ))}
            </div>
        </>
    )
}

export default InfluencerList
