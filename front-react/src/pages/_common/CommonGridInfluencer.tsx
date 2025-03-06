import React, { FC } from 'react';
// import { ApexOptions } from 'apexcharts';
import Card, {
	CardActions,
	CardBody,
	// CardFooter,
	CardHeader,
	CardLabel,
	// CardSubTitle,
	CardTitle,
} from '../../components/bootstrap/Card';
import Button from '../../components/bootstrap/Button';
// import Chart from '../../components/extras/Chart';
import Dropdown, {
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from '../../components/bootstrap/Dropdown';
import Badge from '../../components/bootstrap/Badge';
// import { priceFormat } from '../../helpers/helpers';
// import showNotification from '../../components/extras/showNotification';
// import Icon from '../../components/icon/Icon';
// import { demoPagesMenu } from '../../menu';
import useDarkMode from '../../hooks/useDarkMode';
import User from './user';

const CommonGridInfluencer: FC<User> = ({
	id,
	firstname,
	lastname,
	username,
	email,
	phone,
	password,
	editAction,
	deleteAction,
}) => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const { themeStatus, darkModeStatus } = useDarkMode();

	return (
		<Card>
			<CardHeader>
				<CardLabel>
					<CardTitle tag='div' className='h5'>
						<Badge color='success' isLight className='ms-2'>
							@{username}
						</Badge>
					</CardTitle>
				</CardLabel>

				<CardActions>
					<Dropdown>
						<DropdownToggle hasIcon={false}>
							<Button
								icon='MoreHoriz'
								color={themeStatus}
								shadow='default'
								aria-label='Edit'
							/>
						</DropdownToggle>
						<DropdownMenu isAlignmentEnd>
							<DropdownItem>
								<Button icon='Edit' onClick={() => editAction()}>
									Editar
								</Button>
							</DropdownItem>
							<DropdownItem isDivider />
							<DropdownItem>
								<Button icon='Delete' onClick={() => deleteAction()}>
									Eliminar
								</Button>
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				</CardActions>
			</CardHeader>
			<CardBody>
				<div className='row align-items-center'>
					<div className='col'>Contacto: {phone}</div>
				</div>
				<div className='row align-items-center'>
					<div className='col'>Email: {email}</div>
				</div>
				<div className='row align-items-center'>
					<div className='col'>Nombre: {firstname} </div>
				</div>
				<div className='row align-items-center'>
					<div className='col'>Apellido: {lastname} </div>
				</div>
			</CardBody>
			{/* <CardFooter className='shadow-3d-container'>
				<Button
					color='dark'
					className={`w-100 mb-4 shadow-3d-up-hover shadow-3d-${
						darkModeStatus ? 'light' : 'dark'
					}`}
					size='lg'
					tag='a'
					to=''>
					Más
				</Button>
			</CardFooter> */}
		</Card>
	);
};

export default CommonGridInfluencer;
