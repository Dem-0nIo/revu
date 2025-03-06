import React, { lazy } from 'react';
import { dashboardPagesMenu, demoPagesMenu, adminPagesMenu } from '../menu';
import Login from '../pages/presentation/auth/Login';

const LANDING = {
	DASHBOARD: lazy(() => import('../pages/presentation/dashboard/DashboardPage')),
};
const AUTH = {
	PAGE_404: lazy(() => import('../pages/presentation/auth/Page404')),
};
const PAGE_LAYOUTS = {
	NEWINFLUENCER: lazy(() => import('../pages/presentation/page-layouts/NewInfluencer')),
	ASIDE: lazy(() => import('../pages/presentation/page-layouts/ListInfluencers')),
	USER: lazy(() => import('../pages/presentation/page-layouts/Users')),
	LISTUSER: lazy(() => import('../pages/presentation/page-layouts/ListUser')),
	SHOP: lazy(() => import('../pages/presentation/page-layouts/CarritoPage')),
	COTIZACIONES: lazy(() => import('../pages/presentation/page-layouts/ListCotizciones')),
	SEARCH_INFLUENCERS: lazy(() => import('../pages/presentation/page-layouts/SearchInfluencers')), // ✅ ADD THIS LINE

};

const presentation = [
	/**
	 * Landing
	 */
	{
		path: dashboardPagesMenu.dashboard.path,
		element: <LANDING.DASHBOARD />,
	},

	{
		path: demoPagesMenu.page404.path,
		element: <AUTH.PAGE_404 />,
	},
	{
		path: demoPagesMenu.login.path,
		element: <Login />,
	},
	{
		path: demoPagesMenu.signUp.path,
		element: <Login isSignUp />,
	},
	/** ************************************************** */

	/**
	 * Page Layout Types
	 */
	{
		path: dashboardPagesMenu.newInfluencer.path,
		element: <PAGE_LAYOUTS.NEWINFLUENCER />,
	},

	{
		path: dashboardPagesMenu.listadoCotizaciones.path,
		element: <PAGE_LAYOUTS.COTIZACIONES />,
	},
	{
		path: dashboardPagesMenu.searchInfluencer.path,  
		element: <PAGE_LAYOUTS.SEARCH_INFLUENCERS />,  
	},
	{
		path: adminPagesMenu.nuevouser.path,
		element: <PAGE_LAYOUTS.USER />,
	},
	{
		path: adminPagesMenu.listauser.path,
		element: <PAGE_LAYOUTS.LISTUSER />,
	},
	{
		path: dashboardPagesMenu.shop.path,
		element: <PAGE_LAYOUTS.SHOP />,
	},
];
const contents = [...presentation];

export default contents;
