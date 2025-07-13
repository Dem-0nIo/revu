/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable import/no-named-as-default */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-console */
import React, { Fragment, useContext, useState, useEffect } from 'react';
import CarritoContext from '../../contexts/CarritoContext';
import { Card } from './AddDel';
import Button from '../bootstrap/Button';
import OffCanvas, { OffCanvasBody, OffCanvasHeader, OffCanvasTitle } from '../bootstrap/OffCanvas';
import FormGroup from '../bootstrap/forms/FormGroup';
import Input from '../bootstrap/forms/Input';
import Select from '../bootstrap/forms/Select';
import Checks from '../bootstrap/forms/Checks';
import Icon from '../icon/Icon';
import InfluService from '../../services/influ.service';
import showNotification from '../extras/showNotification';

interface Country {
	id: number;
	name: string;
	name_en: string;
	iso_code: string;
	iso_code_2: string;
	region: string;
}

interface SocialClass {
	id: number;
	class_name: string;
}

interface Category {
    id: number;
    category_name: string;
}

interface SubCategory {
	id: number;
	subcategory_name: string;
}

// Define the Gender type
interface Gender {
	id: number;
	description: string;
}


// Define the City type
interface City {
	id: number;
	city_name: string;
	country_id: number;
}

interface InfluencerClass {
	min_followers: number;
	max_followers: number | null; // null si no hay límite superior
	class_name: string;
  }

interface HairColor {
	id: number;
	hair_color_name: string;
} 

interface HairType {
	id: number;
	hair_type_name: string;
} 

interface SkinColor {
	id: number;
	skin_color_name: string;
} 

export const TableBody = ({
	headers,
	data,
	currentPage,
	itemsPerPage,
	sortColumn,
	sortDirection,
	isLoading,
	add,
}: {
	headers: { column: string }[];
	data: any[];
	currentPage: number;
	itemsPerPage: number;
	sortColumn: string;
	sortDirection: string;
	isLoading: boolean;
	add: boolean;
}) => {
	const { agregarCompra, eliminarCompra } = useContext(CarritoContext);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [added, setAdded] = useState(false);
	const [countries, setCountry] = useState<Country[]>([]);
	const [selectedCountryId, setSelectedCountryId] = useState<number | null>(null);
	const [genders, setGenders] = useState<Gender[]>([]);
	const [cities, setCities] = useState<City[]>([]);
	const [citiesCopy, setCitiesCopy] = useState<City[]>([]);
	const [influencerClasses, setInfluencerClasses] = useState<InfluencerClass[]>([]);
	const [hairColor, setHairColor] = useState<HairColor[]>([]);
	const [hairType, setHairType] = useState<HairType[]>([]);
	const [skinColor, setSkinColor] = useState<SkinColor[]>([]);
	const [categories, setCategories] = useState<Category[]>([]);
	const [subcategories, setSubcategories] = useState<SubCategory[]>([]);
	const [selectedSubcategories, setSelectedSubcategories] = useState<any[]>([]);
	const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
	const [socialClasses, setSocialClasses] = useState<SocialClass[]>([]);

	const [upcomingEventsEditOffcanvas, setUpcomingEventsEditOffcanvas] = useState(false);

	const [dataToEdit, setDataToEdit] = useState<EventData | null>(null);

	const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
			setSelectedCategoryId(Number(e.target.value));
		};

	const handleCountryChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
		const countryId = Number(e.target.value);
		console.log("Nuevo país seleccionado:", countryId);
		setSelectedCountryId(countryId);
		const allCities = citiesCopy;
		const filtered = allCities.filter(city => city.country_id === countryId);
		console.log("Cities to display ",filtered);
		setCities(filtered);

		// Actualizar el estado de edición con el nuevo país y resetear la ciudad
 		setDataToEdit((prev) => ({
			...prev!,
			country_id: countryId,
			city_id: 0, // Resetear la ciudad
		}));

	};

	async function editInfluencer(values: any) {
		
		console.log("Data sent to updateInfluencer:", values); // 🔍 Debug here
		const resp = await InfluService.updateInfluencer(values);
		if (resp.status === 500) {
			showNotification('Error', 'Error actualizando el usuario.', 'danger');
		} else {
			showNotification('Success', 'Usuario actualizado correctamente.', 'success');
			window.location.reload();
		}
	}

	async function handleRemove(id: number) {
		if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
			const resp = await InfluService.deleteInfluencer(id);
			if (resp.status === 500) {
				showNotification('Error', 'Error al eliminar el usuario.', 'danger');
			} else {
				showNotification('Success', 'Usuario eliminado correctamente.', 'success');
				window.location.reload();
			}
		}
	}

	interface EventData {
		firstName: string;
		lastName: string;
		displayName: string;
		country_id: number;
		social_class_id: number;
		emailAddress: string;
		addressLine: string;
		celebrity: number;
		year: number;
		contact: string;
		hair_type_id: number;
		hair_color_id: number;
		skin_color_id: number;
		phoneNumber: string;
		isUGC: number;
		costo_1: string;
		costo_2: string;
		costo_3: string;
		costo_4: string;
		costo_5: string;
		costo_6: string;
		costo_7: string;
		costo_8: string;
		costo_9: string;
		costo_10: string;
		costo_11: string;
		costo_12: string;
		city_id: number;
		gender_id: number;
		socialInstagram: string;
		socialInstagramCla: string;
		socialInstagramSeg: string;
		socialTik: string;
		socialTikCla: string;
		socialTikSeg: string;
		socialFace: string;
		socialFaceCla: string;
		socialFaceSeg: string;
		socialUTube: string;
		socialUTubeCla: string;
		socialUTubeSeg: string;
		categories: any[];
	}

	const handleUpcomingEdit = (item: any) => {
		console.log('Editando el id', item);
		setDataToEdit(item);
		setUpcomingEventsEditOffcanvas(!upcomingEventsEditOffcanvas);
	};

	const handleSave = () => {
		if (!dataToEdit) return;
	
		// Extract only the IDs from selectedSubcategories
		const updatedData = {
			...dataToEdit,
			subcategories: selectedSubcategories.map(subcat => subcat.id), // ✅ Include only the IDs
		};
		console.log("Selected Subcategories IDs: ", selectedSubcategories.map(subcat => subcat.id));
	
		console.log("📝 Saving influencer with data:", updatedData); // Debug log
		editInfluencer(updatedData);
		setUpcomingEventsEditOffcanvas(false);
	};

	const handleAgregar = (compra: any) => {
		console.log('Agregando compra', compra);
		agregarCompra(compra);
		setAdded(true);
	};
	const handleQuitar = (id: number) => {
		eliminarCompra(id);
		setAdded(false);
	};

	const startIdx = (currentPage - 1) * itemsPerPage;
	const endIdx = startIdx + itemsPerPage;

	// Sort data based on the default sorting column and direction
	const sortedData = [...data].sort((a, b) => {
		const columnA = a[sortColumn];
		const columnB = b[sortColumn];

		if (columnA < columnB) {
			return sortDirection === 'asc' ? -1 : 1;
		}
		if (columnA > columnB) {
			return sortDirection === 'asc' ? 1 : -1;
		}
		return 0;
	});

	// const paginatedData = data.slice(startIdx, endIdx);
	const paginatedData = sortedData.slice(startIdx, endIdx);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement > ) => {
		const { name, type, value } = e.target;
	
		setDataToEdit((prev) => {
			if (!prev) return null;
	
			// Si el input es checkbox (switch), guardamos 1 o 0 en lugar de true o false
			const newValue = type === "checkbox" && "checked" in e.target ? (e.target as HTMLInputElement).checked ? 1 : 0 : value;
			console.log(`Updating ${name}:`, newValue); // 🛠 Debug log
	
			return { ...prev, [name]: newValue };
		});
	};

	// Handle classification update
	const handleFollowersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const followers = e.target.value; // Keep as string since EventData expects a string

		setDataToEdit((prev) => {
			if (!prev) return null;
	
			const matchedClass = influencerClasses.find(
				(cls) =>
					Number(followers) >= cls.min_followers &&
					(cls.max_followers === null || Number(followers) <= cls.max_followers)
			);
	
			return {
				...prev,
				socialInstagramSeg: followers, // ✅ Now remains a string
				socialInstagramCla: matchedClass?.class_name || "", // ✅ Remains a string
			};
		});
	};

	const handleTikTokFollowersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const followers = e.target.value; // Keep as string since EventData expects a string

		setDataToEdit((prev) => {
			if (!prev) return null;
	
			const matchedClass = influencerClasses.find(
				(cls) =>
					Number(followers) >= cls.min_followers &&
					(cls.max_followers === null || Number(followers) <= cls.max_followers)
			);
	
			return {
				...prev,
				socialTikSeg: followers, // ✅ Now remains a string
				socialTikCla: matchedClass?.class_name || "", // ✅ Remains a string
			};
		});
	};

	// Handle Facebook classification update
	const handleFaceFollowersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const followers = e.target.value; // Keep as string since EventData expects a string

		setDataToEdit((prev) => {
			if (!prev) return null;
	
			const matchedClass = influencerClasses.find(
				(cls) =>
					Number(followers) >= cls.min_followers &&
					(cls.max_followers === null || Number(followers) <= cls.max_followers)
			);
	
			return {
				...prev,
				socialFaceSeg: followers, // ✅ Now remains a string
				socialFaceCla: matchedClass?.class_name || "", // ✅ Remains a string
			};
		});
	};

	// Handle Youtube classification update
	const handleUTubeFollowersChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const followers = e.target.value; // Keep as string since EventData expects a string

		setDataToEdit((prev) => {
			if (!prev) return null;
	
			const matchedClass = influencerClasses.find(
				(cls) =>
					Number(followers) >= cls.min_followers &&
					(cls.max_followers === null || Number(followers) <= cls.max_followers)
			);
	
			return {
				...prev,
				socialUTubeSeg: followers, // ✅ Now remains a string
				socialUTubeCla: matchedClass?.class_name || "", // ✅ Remains a string
			};
		});
	};

	useEffect(() => {
		console.log("🔄 dataToEdit changed:", dataToEdit);
        if (dataToEdit?.categories) {
            const formattedSubcategories = dataToEdit.categories.map(subcat => ({
                id: subcat.subcategory_id,  // Asegurar que `id` coincida con el key en la lista
                name: subcat.subcategory    // Asegurar que `name` coincida con lo esperado en el render
            }));
            setSelectedSubcategories(formattedSubcategories);
        }
		if (dataToEdit?.country_id) {
            const formattedSubcategories = dataToEdit.categories.map(subcat => ({
                id: subcat.subcategory_id,  // Asegurar que `id` coincida con el key en la lista
                name: subcat.subcategory    // Asegurar que `name` coincida con lo esperado en el render
            }));
            setSelectedSubcategories(formattedSubcategories);
        }
    }, [dataToEdit]);

	useEffect(() => {
		async function fetchCountry() {
			try {
				const response = await InfluService.getCountries(); // Asegúrate de tener este método en tu servicio
				console.log("Paises cargados: ", response.data); // Verifica el contenido
				setCountry(response.data);
			} catch (error) {
				console.error("Failed to fetch countries: ", error);
			}
		}
		fetchCountry();

		async function fetchSocialClasses() {
			try {
				const response = await InfluService.getSocialClasses(); // Make sure to create this service method
				setSocialClasses(response.data);
			} catch (error) {
				console.error("Failed to fetch social classes:", error);
			}
		}
		fetchSocialClasses();

		async function fetchGenders() {
			try {
				const response = await InfluService.getGenders(); // Make sure to create this service method
				setGenders(response.data);
			} catch (error) {
				console.error("Failed to fetch genders:", error);
			}
		}
		fetchGenders();

		async function fetchCities() {
			try {
				const response = await InfluService.getCities(); // Make sure to create this service method
				setCities(response.data);
				setCitiesCopy(response.data);
			} catch (error) {
				console.error("Failed to fetch Cities:", error);
			}
		}
		fetchCities();

		async function fetchInfluencerClasses() {
			try {
				const response = await InfluService.getInfluencerClasses(); 
				console.log("Clases cargadas:", response.data); 
				setInfluencerClasses(response.data);
			} catch (error) {
				console.error("Failed to fetch influencer classes:", error);
			}
		}
		fetchInfluencerClasses();

		async function fetchHairColor() {
			try {
				const response = await InfluService.getHairColor(); // Asegúrate de tener este método en tu servicio
				console.log("Color de cabello:", response.data); // Verifica el contenido
				setHairColor(response.data);
			} catch (error) {
				console.error("Failed to fetch hair color:", error);
			}
		}
		fetchHairColor();

		async function fetchHairType() {
			try {
				const response = await InfluService.getHairTypes(); // Asegúrate de tener este método en tu servicio
				console.log("Tipo de cabello cargado:", response.data); // Verifica el contenido
				setHairType(response.data);
			} catch (error) {
				console.error("Failed to fetch hair type:", error);
			}
		}
		fetchHairType();

		async function fetchSkinColor() {
			try {
				const response = await InfluService.getSkinColors(); 
				console.log("Color de piel cargado: ", response.data); 
				setSkinColor(response.data);
			} catch (error) {
				console.error("Failed to fetch skin color: ", error);
			}
		}
		fetchSkinColor();

		async function fetchCategories() {
			try {
				const response = await InfluService.getCategories(); 
				setCategories(response.data);
			} catch (error) {
				console.error("Failed to fetch categories:", error);
			}
		}
		fetchCategories();
	}, []);

	useEffect(() => {
		if (dataToEdit?.country_id) {
			setSelectedCountryId(dataToEdit.country_id); // Establecemos el país seleccionado
			
			// Filtrar ciudades para el país seleccionado
			const filteredCities = citiesCopy.filter(city => city.country_id === dataToEdit.country_id);
			setCities(filteredCities); // Actualizamos las ciudades disponibles en el select de ciudad
		}
	}, [dataToEdit, citiesCopy]);

	useEffect(() => {
		if (!selectedCategoryId) return;
		console.log("Category selected:", selectedCategoryId);

		async function fetchSubcategories() {
			try {
				const response = await InfluService.getSubcategories(selectedCategoryId); // Create this service
				setSubcategories(response.data as SubCategory[]);
			} catch (error) {
				console.error("Failed to fetch subcategories:", error);
			}
		}
		fetchSubcategories();
	}, [selectedCategoryId]);
	
	return (
		<>
			<tbody>
				{!isLoading &&
					paginatedData.map((item, ind) => (
						<tr key={ind}>
							{headers.map((header, index) => (
								<Fragment key={`${item.idUser}-${index}`}>
									{header.column === 'socialInstagram' ? (
										<td style={{ alignContent: "center", position: "relative", padding: "0 0 0 35px" }} key={index}>
											{item[header.column] != null ? (
												<a
													href={`https://www.instagram.com/${item[header.column]}`}
													target='_blank'
													rel='noopener noreferrer'>
													<Icon
														icon='Insta'
														color='primary'
														size='2x'
														forceFamily='material'
													/>
												</a>
											) : null}
										</td>
									) : header.column === 'socialTik' ? (
										<td style={{ alignContent: "center", position: "relative", padding: "0 0 0 35px" }} key={index}>
											{item[header.column] != null ? (
												<a
													href={`https://www.tiktok.com/${item[header.column]}`}
													target='_blank'
													rel='noopener noreferrer'>
													<Icon
														icon='TikTok'
														color='primary'
														size='2x'
														forceFamily='material'
													/>
												</a>
											) : null}
										</td>
									) : header.column === 'socialFace' ? (
										<td style={{ alignContent: "center", position: "relative", padding: "0 0 0 35px" }} key={index}>
											{item[header.column] != null ? (
												<a
													href={`https://www.facebook.com/${item[header.column]}`}
													target='_blank'
													rel='noopener noreferrer'>
													<Icon
														icon='Facebook'
														color='primary'
														size='2x'
														forceFamily='material'
													/>
												</a>
											) : null}
										</td>
									) : header.column === 'socialUTube' ? (
										(() => {
										// console.log("DEBUG: Entered condition for socialUTube", item[header.column]); // Debug log
										return (
											<td id ="youtube" style={{ alignContent: "center", position: "relative", padding: "0 0 0 35px" }} key={index}>
												{item[header.column] != null ? (
													<a
														href={`https://www.youtube.com/${item[header.column]}`}
														target='_blank'
														rel='noopener noreferrer'>
														<Icon
															icon='Youtube'
															color='primary'
															size='2x'
															forceFamily='material'
														/>
													</a>
												) : // (// console.log("DEBUG: Item for YouTube is NULL", item), null)
													null }
										</td>
										);
									})()
									) : header.column === 'status' ? (
										<td key={index}>
											{item[header.column] === 'APPROVED' ? (
												<span style={{ color: 'green' }}>
													{item[header.column]}
												</span>
											) : item[header.column] === 'PENDING' ? (
												<span style={{ color: 'orange' }}>
													{item[header.column]}
												</span>
											) : item[header.column] === 'CANCELED' ? (
												<span style={{ color: 'red' }}>
													{item[header.column]}
												</span>
											) : null}
										</td>
									) : (
										<td key={index}>{item[header.column]}</td>
									)}
								</Fragment>
							))}
							{/* {AuthService.isAdmin() && ( */}
								<>
									<td>
										<div className='bo' key={ind}>
											{add ? (
												<Card
													data={item}
													handleAgregar={() => handleAgregar(item)}
													handleQuitar={() => handleQuitar(item.idUser)}
												/>
											) : null}
											<button
												type='button'
												onClick={() => handleUpcomingEdit(item)}
												className='btn-edit'>
												Editar
											</button>
											<button
												type='button'
												onClick={() => handleRemove(item.idUser)}
												className='btn-delete'>
												Eliminar
											</button>
										</div>
									</td>
								</>
							{/* )} */}
						</tr>
					))}
			</tbody>

			<OffCanvas
				setOpen={setUpcomingEventsEditOffcanvas}
				isOpen={upcomingEventsEditOffcanvas}
				titleId='upcomingEdit'
				isBodyScroll
				placement='end'>
				<OffCanvasHeader setOpen={setUpcomingEventsEditOffcanvas}>
					<OffCanvasTitle id='upcomingEdit'>Perfil Influenciador</OffCanvasTitle>
				</OffCanvasHeader>
				<OffCanvasBody>
					<div className='row g-4'>
						<div className='col-12'>
							<FormGroup id='displayname' label='Display Name'>
								<Input
									id='displayName'
									name='displayName'
									value={dataToEdit?.displayName}
									onChange={handleChange}
								/>
							</FormGroup>
							
						</div>
						<div className='col-12'>
							<FormGroup id='customerName' label='Nombre'>
								<Input
									id='firstName'
									name='firstName'
									value={dataToEdit?.firstName}
									onChange={handleChange}
								/>
							</FormGroup>	
						</div>
						<div className='col-12'>
							<FormGroup id='lastname' label='Apellidos'>
								<Input
									id='lastName'
									name='lastName'
									value={dataToEdit?.lastName}
									onChange={handleChange}
								/>
							</FormGroup>	
						</div>
						<div className='col-12'>
							<FormGroup id='country_id' label='País de residencia'>
								<Select
									ariaLabel='Country'
									placeholder='Seleccione...'
									name="country_id" 
									list={countries.map((country) => ({
										value: String(country.id),
										text: country.name,
									}))}
									onChange={handleCountryChange}
									value={selectedCountryId ? String(selectedCountryId) : ''}
								/>
							</FormGroup>	
						</div>
						<div className='col-12'>
							<FormGroup id='city_id' label='Ciudad de residencia'>
								<Select
									ariaLabel='Ciudad'
									placeholder='Seleccione...'
									name="city_id"
									list={cities.map((city) => ({
										value: String(city.id), 
										text: city.city_name, 
									}))}
									onChange={handleChange}
									
									value={dataToEdit?.city_id ? String(dataToEdit.city_id) : ''}
								/>
							</FormGroup>	
						</div>
						<div className='col-12'> {/* Clase social */}
							<FormGroup id='social_class_id' label='Clase social'>
								<Select
									ariaLabel='Clase Social'
									placeholder='Seleccione...'
									name="social_class_id"
									list={socialClasses.map((socialClass) => ({
										value: String(socialClass.id), 
										text: socialClass.class_name, 
									}))}
									onChange={handleChange}
									value={dataToEdit?.social_class_id ? String(dataToEdit.social_class_id) : ''}
								/>
							</FormGroup>	
						</div>
						<div className='col-12'> {/* Edad */}
							<FormGroup id='year' label='Edad'>
								<Input
									id='year'
									name='year'
									value={dataToEdit?.year}
									onChange={handleChange}
								/>
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='gender_id' label='Sexo'>
								<Select
									ariaLabel='Sexo'
									placeholder='Seleccione...'
									name="gender_id"
									list={genders.map((gender) => ({
										value: String(gender.id), 
										text: gender.description,
									}))}
									onChange={handleChange}
									value={String(dataToEdit?.gender_id)}
								/>
							</FormGroup>	
						</div>
						<div className='col-12'>
							<FormGroup id='hair_type' label='Tipo de cabello'>
								<Select
									ariaLabel='Tipo de cabello'
									placeholder='Seleccione...'
									name = 'hair_type_id'
									list={hairType.map((hairTypes) => ({
										value: String(hairTypes.id), 
										text: hairTypes.hair_type_name, 
									}))}
									onChange={handleChange}
									value={String(dataToEdit?.hair_type_id)}
								/>
							</FormGroup>	
						</div>
						<div className='col-12'>
							<FormGroup id='hair_color' label='Color de cabello'>
								<Select
									ariaLabel='Color de cabello'
									placeholder='Seleccione...'
									name = 'hair_color_id'
									list={hairColor.map((hairColors) => ({
										value: String(hairColors.id), 
										text: hairColors.hair_color_name, 
									}))}
									onChange={handleChange}
									value={String(dataToEdit?.hair_color_id)}
								/>
							</FormGroup>	
						</div>
						<div className='col-12'> {/* Skin color */} 
							<FormGroup id='skin_color' label='Color de piel'>
								<Select
									ariaLabel='Color de piel'
									placeholder='Seleccione...'
									name = 'skin_color_id'
									list={skinColor.map((skinColors) => ({
										value: String(skinColors.id), 
										text: skinColors.skin_color_name, 
									}))}
									onChange={handleChange}
									value={String(dataToEdit?.skin_color_id)}
								/>
							</FormGroup>	
						</div>
						<div className='col-12'>
							<FormGroup id='contact' label='Persona de contacto'>
								<Input
									id='contact'
									name='contact'
									value={dataToEdit?.contact}
									onChange={handleChange}
								/>
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='addres' label='Celular / Whatsapp'>
								<Input
									id='phoneNumber'
									name='phoneNumber'
									value={dataToEdit?.phoneNumber}
									onChange={handleChange}
								/>
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='email' label='Email'>
								<Input
									id='emailAddress'
									name='emailAddress'
									value={dataToEdit?.emailAddress}
									onChange={handleChange}
								/>
							</FormGroup>
						</div>
						<div className='col-4'>
							<FormGroup id='inst' label='Instagram'>
								<Input
									id='socialInstagram'
									name='socialInstagram'
									value={dataToEdit?.socialInstagram}
									onChange={handleChange}
								/>
							</FormGroup>
						</div>
						<div className='col-4'>
							<FormGroup id='socialInstagramCla' label='Clasificación'>
								<Input
									id='socialInstagramCla'
									name='socialInstagramCla'
									value={dataToEdit?.socialInstagramCla || ""}
									readOnly // Campo deshabilitado
									onChange={handleChange}
								/>
							</FormGroup>
						</div>
						<div className='col-4'>
							<FormGroup id='instseg' label='#Seguidores'>
								<Input
									id='socialInstagramSeg'
									name='socialInstagramSeg'
									value={dataToEdit?.socialInstagramSeg}
									onChange={handleFollowersChange}
								/>
							</FormGroup>
						</div>
						<div className='col-4'>
							<FormGroup id='tik' label='TikTok'>
								<Input
									id='socialTik'
									name='socialTik'
									value={dataToEdit?.socialTik}
									onChange={handleChange}
								/>
							</FormGroup>
						</div>
						<div className='col-4'>
							<FormGroup id='tikclas' label='Clasificación'>
								<Input
									id='socialTikCla'
									name='socialTikCla'
									value={dataToEdit?.socialTikCla}
									readOnly // Campo deshabilitado

								/>
							</FormGroup>
						</div>
						<div className='col-4'>
							<FormGroup id='tikseg' label='#Seguidores'>
								<Input
									id='socialTikSeg'
									name='socialTikSeg'
									value={dataToEdit?.socialTikSeg}
									onChange={handleTikTokFollowersChange}
								/>
							</FormGroup>
						</div>
						<div className='col-4'>
							<FormGroup id='tik' label='Facebook'>
								<Input
									id='socialFace'
									name='socialFace'
									value={dataToEdit?.socialFace}
									onChange={handleChange}
								/>
							</FormGroup>
						</div>
						<div className='col-4'>
							<FormGroup id='faceclas' label='Clasificación'>
								<Input
									id='socialFaceCla'
									name='socialFaceCla'
									value={dataToEdit?.socialFaceCla}
									readOnly // Campo deshabilitado
									
								/>
							</FormGroup>
						</div>
						<div className='col-4'>
							<FormGroup id='faceseg' label='#Seguidores'>
								<Input
									id='socialFaceSeg'
									name='socialFaceSeg'
									value={dataToEdit?.socialFaceSeg}
									onChange={handleFaceFollowersChange}
								/>
							</FormGroup>
						</div>
						<div className='col-4'>
							<FormGroup id='UTube' label='Youtube'>
								<Input
									id='socialUTube'
									name='socialUTube'
									value={dataToEdit?.socialUTube}
									onChange={handleChange}
								/>
							</FormGroup>
						</div>
						<div className='col-4'>
							<FormGroup id='Utubeclas' label='Clasificación'>
								<Input
									id='socialUTubeCla'
									name='socialUTubeCla'
									value={dataToEdit?.socialUTubeCla}
									readOnly // Campo deshabilitado
									
								/>
							</FormGroup>
						</div>
						<div className='col-4'>
							<FormGroup id='UTubeseg' label='#Seguidores'>
								<Input
									id='socialUTubeSeg'
									name='socialUTubeSeg'
									value={dataToEdit?.socialUTubeSeg}
									onChange={handleUTubeFollowersChange}
								/>
							</FormGroup>
						</div>
						<div className='col-4'>
							<FormGroup id='celebrity' label='Celebrity'>
								<Checks
									type='switch' // or 'checkbox', depending on your preference
									id='celebrity'
									name='celebrity'
									label='Celebrity?'
									onChange={handleChange}
        							checked={dataToEdit?.celebrity === 1}		
								/>
							</FormGroup>
						</div>
						<div className='col-12'> {/* Inst category */}
							<FormGroup id='category_id' label='Categoria'>
								<Select
									ariaLabel='Categoria'
									placeholder='Seleccione...'
									name="category_id"
									list={categories.map((cat) => ({
										value: cat.id,
										text: cat.category_name,
									}))}
									onChange={handleCategoryChange}
									value={selectedCategoryId ? String(selectedCategoryId) : ''}
								/>
							</FormGroup>	
						</div>
						<div className='col-12'>
							<FormGroup id='subcategory_id' label='Subcategoria'>
								<Select
									ariaLabel='Subcategoria'
									placeholder='Seleccione...'
									name="subcategory_id"
									list={subcategories.map((subcat) => ({
										value: subcat.id,
										text: subcat.subcategory_name,
									}))}
									onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
										const subcategoryId = parseInt(e.target.value, 10); // Convert value to a number
										const subcategoryName = subcategories.find((subcat) => subcat.id === subcategoryId)?.subcategory_name;
										if (!subcategoryName) return; // Safety check
										setSelectedSubcategories([...selectedSubcategories, { id: subcategoryId, name: subcategoryName }]);
									}}
								/>
							</FormGroup>	
						</div>
						<div className='col-12'>
							<h5>Subcategorías seleccionadas:</h5>
							<ul>
								{selectedSubcategories.map((subcat) => (
									<li key={subcat.id}>
										{subcat.name}{' '}
										<Button
											color='danger'
											size='sm'
											onClick={() =>
												setSelectedSubcategories(
													selectedSubcategories.filter((s) => s.id !== subcat.id)
												)
											}
										>
											Eliminar
										</Button>
									</li>
								))}
							</ul>
						</div>
						<div className='col-4'> {/* costo_1 */}
							<FormGroup id='costo_1' label='IG Historia 15 seg 1'>
								<Input
									id='costo_1'
									name='costo_1'
									value={dataToEdit?.costo_1}
									onChange={handleChange}
								/>
							</FormGroup>
						</div>
						<div className='col-4'>
							<FormGroup id='costo_2' label='IG Rafaga Hist. 45-60 seg'>
								<Input
									id='costo_2'
									name='costo_2'
									value={dataToEdit?.costo_2}
									onChange={handleChange}
								/>
							</FormGroup>
						</div>
						<div className='col-4'>
							<FormGroup id='costo_3' label='IG Reel'>
								<Input
									id='costo_3'
									name='costo_3'
									value={dataToEdit?.costo_3}
									onChange={handleChange}
								/>
							</FormGroup>
						</div>
						<div className='col-4'>
							<FormGroup id='costo_4' label='IG Reel en colaboración'>
								<Input
									id='costo_4'
									name='costo_4'
									value={dataToEdit?.costo_4}
									onChange={handleChange}
								/>
							</FormGroup>
						</div>
						<div className='col-4'>
							<FormGroup id='costo_5' label='IG Foto Post'>
								<Input
									id='costo_5'
									name='costo_5'
									value={dataToEdit?.costo_5}
									onChange={handleChange}
								/>
							</FormGroup>
						</div>
						<div className='col-4'>
							<FormGroup id='costo_6' label='Video en Facebook'>
								<Input
									id='costo_6'
									name='costo_6'
									value={dataToEdit?.costo_6}
									onChange={handleChange}
								/>
							</FormGroup>
						</div>
						<div className='col-4'>
							<FormGroup id='costo_7' label="Reel's en Facebook">
								<Input
									id='costo_7'
									name='costo_7'
									value={dataToEdit?.costo_7}
									onChange={handleChange}
								/>
							</FormGroup>
						</div>
						<div className='col-4'>
							<FormGroup id='costo_8' label='Historia en Facebook'>
								<Input
									id='costo_8'
									name='costo_8'
									value={dataToEdit?.costo_8}
									onChange={handleChange}
								/>
							</FormGroup>
						</div>
						<div className='col-4'>
							<FormGroup id='costo_9' label='TikTok'>
								<Input
									id='costo_9'
									name='costo_9'
									value={dataToEdit?.costo_9}
									onChange={handleChange}
								/>
							</FormGroup>
						</div>
						<div className='col-4'>
							<FormGroup id='costo_10' label='Mención en Video en Youtube'>
								<Input
									id='costo_10'
									name='costo_10'
									value={dataToEdit?.costo_10}
									onChange={handleChange}
								/>
							</FormGroup>
						</div>
						<div className='col-4'>
							<FormGroup id='costo_11' label='Asistencia a eventos'>
								<Input
									id='costo_11'
									name='costo_11'
									value={dataToEdit?.costo_11}
									onChange={handleChange}
								/>
							</FormGroup>
						</div>
						<div className='col-4'> {/* costo_12 */}
							<FormGroup id='costo_12' label='Imagen pauta digital (1 mes)'>
								<Input
									id='costo_12'
									name='costo_12'
									value={dataToEdit?.costo_12}
									onChange={handleChange}
								/>
							</FormGroup>
						</div>
						<div className='col-4'> {/* isUGC */}
							<FormGroup id='isUGC' label='isUGC'>
								<Checks
									type='switch' // or 'checkbox', depending on your preference
									id='isUGC'
									name='isUGC'
									label='isUGC?'
									onChange={handleChange}
									checked={dataToEdit?.isUGC === 1}			
								/>
							</FormGroup>
						</div>
						
					</div>
				</OffCanvasBody>
				<div className='row m-0'>
					<div className='col-12 p-3'>
						<Button
							color='info'
							className='w-100'
							/* onClick={() => handleSave(dataToEdit)}> */
							onClick={() => handleSave()}>
							Save
						</Button>
					</div>
				</div>
			</OffCanvas>
		</>
	);
};

export default TableBody;
