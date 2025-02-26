import React, { useState, useEffect } from 'react';
import Card, { CardBody, CardHeader, CardLabel, CardTitle } from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Select from '../../../components/bootstrap/forms/Select';
import Checks from '../../../components/bootstrap/forms/Checks';
// import Label from '../../../components/bootstrap/forms/Label';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import showNotification from '../../../components/extras/showNotification';
import FiltersService from '../../../services/influ.service'; // Crear este servicio para obtener filtros de API


// Define the City type
interface Country {
	id: number;
	name: string;
	name_en: string;
	iso_code: string;
	iso_code_2: string;
	region: string;
}

// Define the City type
interface City {
	id: number;
	city_name: string;
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

// Define the Gender type
interface Gender {
	id: number;
	description: string;
}

interface SocialClass {
	id: number;
	class_name: string;
}

interface Category {
    id: number;
    category_name: string;
}


const SearchPage = () => {

  // State to store filter values
  const [filters, setFilters] = useState({
    socialNetwork: "",
    influencerSize: "",
    category: "",
    country: "",
    city: "",
    gender: "",
    age: "",
    socialClass: "",
    celebrity: "",
    ugc: "",
    hairType: "",
    hairColor: "",
    skinColor: "",
  });

  // Listados obtenidos de API
  const [countries, setCountry] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [genders, setGenders] = useState<Gender[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [, setInfluencerClasses] = useState<InfluencerClass[]>([]);
  const [hairColor, setHairColor] = useState<HairColor[]>([]);
  const [hairType, setHairType] = useState<HairType[]>([]);
  const [skinColor, setSkinColor] = useState<SkinColor[]>([]);
  const [, setSelectedCategoryId] = useState<number | null>(null);
  const [socialClasses, setSocialClasses] = useState<SocialClass[]>([]);

  const [results, setResults] = useState<any[]>([]);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedCategoryId(Number(e.target.value));
    };

  const fetchResults = async () => {
    try {
      const params = new URLSearchParams();

      // Agregar solo los filtros que tienen valor
      if (filters.socialNetwork) params.append("socialNetwork", filters.socialNetwork);
      if (filters.influencerSize) params.append("influencerSize", filters.influencerSize);
      if (filters.category) params.append("category_id", filters.category); // Cambio de `category` a `category_id`
      if (filters.country) params.append("country_id", filters.country); // Cambio a `country_id`
      if (filters.city) params.append("city_id", filters.city); // Cambio a `city_id`
      if (filters.gender) params.append("gender_id", filters.gender); // Cambio a `gender_id`
      if (filters.age) params.append("year", filters.age); // Cambio a `year`
      if (filters.socialClass) params.append("social_class_id", filters.socialClass); // Cambio a `social_class_id`
      if (filters.hairType) params.append("hair_type_id", filters.hairType); // Cambio a `hair_type_id`
      if (filters.hairColor) params.append("hair_color_id", filters.hairColor); // Cambio a `hair_color_id`
      if (filters.skinColor) params.append("skin_color_id", filters.skinColor); // Cambio a `skin_color_id`
      if (filters.celebrity) params.append("celebrity", filters.celebrity);
      if (filters.ugc) params.append("ugc", filters.ugc);

      const response = await FiltersService.searchInfluencers(`?${params.toString()}`);
      setResults(response.data);

      if (process.env.NODE_ENV === "development") {
        console.log("Resultados encontrados:", response.data);
      }
    } catch (error) {
      showNotification("Error", "No se pudieron cargar los resultados", "danger");
    }
  };
  
  // Obtener filtros de API
  useEffect(() => {
    async function fetchFilters() {
      try {
        const countriesResponse = await FiltersService.getCountries();
        setCountry(countriesResponse.data);

        const categoriesResponse = await FiltersService.getCategories();
        setCategories(categoriesResponse.data);
      } catch (error) {
        showNotification('Error', 'No se pudieron cargar los filtros', 'danger');
      }
    }
    fetchFilters();
  }, []);

  // Fetch genders from the API
	useEffect(() => {
		async function fetchGenders() {
			try {
				const response = await FiltersService.getGenders(); // Make sure to create this service method
				setGenders(response.data);
			} catch (error) {
				// console.error("Failed to fetch genders:", error);
			}
		}
		fetchGenders();
	}, []);

  	// Fetch cities from the API
	useEffect(() => {
		async function fetchCities() {
			try {
				const response = await FiltersService.getCities(); // Make sure to create this service method
				setCities(response.data);
			} catch (error) {
				// console.error("Failed to fetch Cities:", error);
			}
		}
		fetchCities();
	}, []);

  // Fetch social classes from the API
	useEffect(() => {
		async function fetchSocialClasses() {
			try {
				const response = await FiltersService.getSocialClasses(); // Make sure to create this service method
				setSocialClasses(response.data);
			} catch (error) {
				// console.error("Failed to fetch social classes:", error);
			}
		}
		fetchSocialClasses();
	}, []);

  	// Fetch Hair Color group
	useEffect(() => {
		async function fetchHairColor() {
			try {
				const response = await FiltersService.getHairColor(); // Asegúrate de tener este método en tu servicio
				// console.log("Color de cabello:", response.data); // Verifica el contenido
				setHairColor(response.data);
			} catch (error) {
				// console.error("Failed to fetch hair color:", error);
			}
		}
		fetchHairColor();
	}, []);

	// Fetch Hair type group
	useEffect(() => {
		async function fetchHairType() {
			try {
				const response = await FiltersService.getHairTypes(); // Asegúrate de tener este método en tu servicio
				// console.log("Tipo de cabello cargado:", response.data); // Verifica el contenido
				setHairType(response.data);
			} catch (error) {
				// console.error("Failed to fetch hair type:", error);
			}
		}
		fetchHairType();
	}, []);

	// Fetch Skin Color group
	useEffect(() => {
		async function fetchSkinColor() {
			try {
				const response = await FiltersService.getSkinColors(); // Asegúrate de tener este método en tu servicio
				// console.log("Color de piel cargado: ", response.data); // Verifica el contenido
				setSkinColor(response.data);
			} catch (error) {
				// console.error("Failed to fetch skin color: ", error);
			}
		}
		fetchSkinColor();
	}, []);

	// Fetch Country group
	useEffect(() => {
		async function fetchCountry() {
			try {
				const response = await FiltersService.getCountries(); // Asegúrate de tener este método en tu servicio
				// console.log("Paises cargados: ", response.data); // Verifica el contenido
				setCountry(response.data);
			} catch (error) {
				// console.error("Failed to fetch countries: ", error);
			}
		}
		fetchCountry();
	}, []);

	// Fetch categories
	useEffect(() => {
		async function fetchCategories() {
			try {
				const response = await FiltersService.getCategories(); // Create this service
				setCategories(response.data);
			} catch (error) {
				// console.error("Failed to fetch categories:", error);
			}
		}
		fetchCategories();
	}, []);

  // Fetch influencer classes
	useEffect(() => {
		async function fetchInfluencerClasses() {
			try {
				const response = await FiltersService.getInfluencerClasses(); // Asegúrate de tener este método en tu servicio
				// console.log("Clases cargadas:", response.data); // Verifica el contenido
				setInfluencerClasses(response.data);
			} catch (error) {
				// console.error("Failed to fetch influencer classes:", error);
			}
		}
		fetchInfluencerClasses();
	}, []);
  
  // Handle filter selection
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [e.target.name]: e.target.value || "", // Evita valores `undefined`
    }));
  };

  return (
    <PageWrapper title="Búsqueda de Influencers">
      <Page>
        <div className="row h-100 pb-3">
          <div className="col-lg-12 col-md-8">
            <Card>
              <CardHeader>
                <CardLabel icon="Search" iconColor="info">
                  <CardTitle>Filtros de Influencers</CardTitle>
                </CardLabel>
              </CardHeader>
              <CardBody>
                <div className="row g-4">
                  <div className="col-md-2">
                    <FormGroup label="Red Social">
                      <Select
                        ariaLabel='Social Network'
												placeholder='Seleccione...'
                        name="socialNetwork" 
                        onChange={handleFilterChange} list={[
                          { value: 'Instagram', text: 'Instagram' },
                          { value: 'TikTok', text: 'TikTok' },
                          { value: 'Facebook', text: 'Facebook' },
                          { value: 'Youtube', text: 'Youtube' },
                        ]} 
                      />
                    </FormGroup>
                  </div>

                  <div className="col-md-2">
                    <FormGroup label="Tamaño de Influencer">
                      <Select
                        ariaLabel='Tamaño de influencer'
												placeholder='Seleccione...'
                        name="influencerSize" 
                        onChange={handleFilterChange} list={[
                          { value: 'Nano', text: 'Nano (1k-10k)' },
                          { value: 'Micro', text: 'Micro (10k-100k)' },
                          { value: 'Macro', text: 'Macro (100k-1M)' },
                          { value: 'Mega', text: 'Mega (1M+)' },
                        ]} 
                      />
                    </FormGroup>
                  </div>

                  <div className="col-md-2">
                    <FormGroup label="Categoría">
                      <Select
                        ariaLabel='Categoría'
												placeholder='Seleccione...'
                        name="category" 
                        onChange={handleCategoryChange} 
                        list={categories.map(cat => ({
                          value: cat.id, 
                          text: cat.category_name
                        }))} 
                        />
                    </FormGroup>
                  </div>

                  <div className="col-md-2">
                    <FormGroup label="País">
                      <Select
                        ariaLabel='Country'
                        placeholder='Seleccione...'
                        name="country" 
                        onChange={handleFilterChange} 
                        list={countries.map(country => ({
                          value: country.id, 
                          text: country.name
                        }))} 
                      />
                    </FormGroup>
                  </div>

                  <div className="col-md-2">
                    <FormGroup label="Ciudad">
                      <Select 
                        ariaLabel='Ciudad'
                        placeholder='Seleccione...'
                        name="city" 
                        onChange={handleFilterChange} 
                        list={cities.map(city => ({
                          value: city.id, 
                          text: city.city_name
                        }))} 
                      />
                    </FormGroup>
                  </div>

                  <div className="col-md-2">
                    <FormGroup id='gender_id' label='Sexo' >
                      <Select
                        name="gender_id"
                        ariaLabel='Sexo'
                        placeholder='Seleccione...'
                        list={genders.map((gender) => ({
                          value: String(gender.id), // Use the gender ID as the value
                          text: gender.description, // Use the gender description as the text
                        }))}
                        onChange={handleFilterChange}
                      />
                    </FormGroup>
                  </div>

                  <div className='col-md-2'>
                    <FormGroup id='year' label='Edad' >
                      <Input
                        type='number'
                        placeholder='Edad'
                        autoComplete='off'
                        onChange={handleFilterChange}
                        /* onBlur={formik.handleBlur}
                        value={formik.values.year}
                        isValid={formik.isValid}
                        isTouched={formik.touched.year}
                        invalidFeedback={formik.errors.year}
                        validFeedback='Looks good!' */
                      />
                    </FormGroup>
                  </div>

                  <div className='col-2'>
                    <FormGroup id='social_class_id' label='Clase social'>
                      <Select
                        name="social_class_id"
                        ariaLabel='Clase Social'
                        placeholder='Seleccione...'
                        list={socialClasses.map((socialClass) => ({
                          value: String(socialClass.id), // Use the gender ID as the value
                          text: socialClass.class_name, // Use the gender description as the text
                        }))}
                        onChange={handleFilterChange}
                      />
                    </FormGroup>
                  </div>

                  <div className='col-md-2'>
                    <FormGroup
                      id='hair_type'
                      label='Tipo de cabello'>
                      <Select
                        name = 'hair_type_id'
                        ariaLabel='Tipo de cabello'
                        placeholder='Seleccione...'
                        list={hairType.map((hairTypes) => ({
                          value: String(hairTypes.id), 
                          text: hairTypes.hair_type_name, 
                        }))}
                        onChange={handleFilterChange}
                      />
                    </FormGroup>
                  </div>

                  <div className='col-md-2'>
                    <FormGroup
                      id='hair_color'
                      label='Color de cabello'>
                      <Select
                        name = 'hair_color_id'
                        ariaLabel='Color de cabello'
                        placeholder='Seleccione...'
                        list={hairColor.map((hairColors) => ({
                          value: String(hairColors.id), 
                          text: hairColors.hair_color_name, 
                        }))}
                        onChange={handleFilterChange}
                      />
                    </FormGroup>
                  </div>

                  <div className='col-md-2'>
                    <FormGroup
                      id='skin_color'
                      label='Color de piel'>
                      <Select
                        name = 'skin_color_id'
                        ariaLabel='color de piel'
                        placeholder='Seleccione...'
                        list={skinColor.map((skinColors) => ({
                          value: String(skinColors.id), 
                          text: skinColors.skin_color_name, 
                        }))}
                        onChange={handleFilterChange}
                      />
                    </FormGroup>
                  </div>
                  
                  <div className="row">
                    <div className="col-4 mt-4 d-flex align-items-center gap-5">
                      <FormGroup>
                        <Checks
                          type='switch' // or 'checkbox', depending on your preference
                          id='celebrity'
                          name='celebrity'
                          label='Celebrity?'
                          value='1' // Example value, you can modify it as needed
                          onChange={handleFilterChange}
                        />
                      </FormGroup>
                  
                      <FormGroup>
                        <Checks
                          type='switch' // or 'checkbox', depending on your preference
                          id='UGC'
                          name='UGC'
                          label='UGC'
                          value='1' // Example value, you can modify it as needed
                          onChange={handleFilterChange}
                        />
                      </FormGroup>
                    </div>
                  </div>
                </div>
                <Button color="info" className="mt-3" onClick={fetchResults}>
                  Buscar
                </Button>
              </CardBody>
            </Card>
            {results.length > 0 && (
              <Card className="mt-4">
                <CardHeader>
                  <CardLabel icon="List" iconColor="info">
                    <CardTitle>Resultados</CardTitle>
                  </CardLabel>
                </CardHeader>
                <CardBody>
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead className="table-light">
                        <tr>
                          <th>Nombre Artístico</th>
                          <th>Red Social</th>
                          <th>Clasificación</th>
                          <th>Categoría</th>
                          <th>Subcategoría</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.map((influencer) => {
                          // Obtener la primera red social disponible
                          const firstSocialMedia = 
                            influencer.socialInstagram || 
                            influencer.socialTik || 
                            influencer.socialFace || 
                            influencer.socialUTube || "N/A";

                          // Obtener la primera clasificación de red social disponible
                          const firstSocialClass = 
                            influencer.socialInstagramCla || 
                            influencer.socialTikCla || 
                            influencer.socialFaceCla || 
                            influencer.socialUTubeCla || "N/A";

                          // Obtener la primera subcategoría disponible (asegurando que tenga categoría)
                          const firstSubcategory = influencer.influencerSubcategories?.[0]?.subcategory || null;
                          
                          // Obtener la categoría asociada a la subcategoría
                          const categoryName = firstSubcategory?.category?.category_name || "N/A";
                          const subcategoryName = firstSubcategory?.subcategory_name || "N/A";

                          return (
                            <tr key={influencer.idUser}>
                              <td>{influencer.displayName || `${influencer.firstName} ${influencer.lastName}`}</td>
                              <td>{firstSocialMedia}</td>
                              <td>{firstSocialClass}</td>
                              <td>{categoryName}</td>
                              <td>{subcategoryName}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            )}
          </div>
        </div>
      </Page>
    </PageWrapper>
  );
};

export default SearchPage;