/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/function-component-definition */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
// import { get } from 'http';
// import { color } from 'framer-motion';


export default function AphexChart() {
	// console.log("API_URL:", process.env.REACT_APP_API_URL);
	// console.log("Final URL:", `${process.env.REACT_APP_API_URL}/api/cotizaciones/status/`);
	const getStatus = async (str: string) => {
		const response = await axios.post('http://localhost:8081/api/cotizaciones/status', {
			status: str,
		});

		const data = (await response.data).length;
		if (str === 'pending') {
			setPending(data);
		} else if (str === 'approved') {
			setApproved(data);
		} else {
			setCancels(data);
		}
	};

	useEffect(() => {
		getStatus('pending');
		getStatus('approved');
		getStatus('canceled');
	}, []);

	const [Approved, setApproved] = useState<number>(0);
	const [Pending, setPending] = useState<number>(0);
	const [Cancel, setCancels] = useState<number>(0);

	const data = [
		{
			name: 'Pendientes',
			quantity: Number(Pending),
		},
		{
			name: 'Aprovadas',
			quantity: Number(Approved),
		},
		{
			name: 'Canceladas',
			quantity: Number(Cancel),
		},
	];

	const names: string[] = [];
	const quantities: number[] = [];
	data.forEach(function quantity(n) {
		names.push(n.name);
		quantities.push(n.quantity);
	});

	return React.createElement(Chart, {
		height: 400,
		type: 'pie',
		series: quantities,
		labels: {
			show: true,
			name: {
				show: true,
			},
			value: {
				show: true,
			},
		},
		options: {
			labels: names,
			legend: {
				show: true,
				position: 'bottom',
			},
			colors: ['#2D99FF', '#00AB55', '#ff7700'],
		},
	});
}
