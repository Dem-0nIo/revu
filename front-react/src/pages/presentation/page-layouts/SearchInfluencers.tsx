import React, { useState, useEffect, useCallback } from 'react';
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
import TableClientSideBlog from '../../../components/table/Table'; 


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
    category_id: "", // Cambio de category a category_id
    state_id: "",    // Agregado state_id
    city_id: "",     // Cambio a city_id
    gender_id: "",   // Cambio a gender_id
    year: "",        // Cambio de age a year
    social_class_id: "", // Cambio a social_class_id
    celebrity: "",
    isUGC: "",       // Cambio de ugc a isUGC
    hair_type_id: "", // Cambio a hair_type_id
    hair_color_id: "", // Cambio a hair_color_id
    skin_color_id: "", // Cambio a skin_color_id
  });

  // Listados obtenidos de API
  const [state, setState] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [genders, setGenders] = useState<Gender[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [, setInfluencerClasses] = useState<InfluencerClass[]>([]);
  const [hairColor, setHairColor] = useState<HairColor[]>([]);
  const [hairType, setHairType] = useState<HairType[]>([]);
  const [skinColor, setSkinColor] = useState<SkinColor[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [socialClasses, setSocialClasses] = useState<SocialClass[]>([]);

  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setSelectedCategoryId(Number(e.target.value));
    };
  
  // Handle filter selection
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, type, value } = e.target;

    let updatedValue: string;

    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      updatedValue = e.target.checked ? "1" : "0"; // ✅ Ensures correct type checking
    } else {
      updatedValue = value;
    }

    setFilters(prevFilters => {
      const updatedFilters = { ...prevFilters, [name]: updatedValue };
      console.log("🎯 Nuevo filtro aplicado:", updatedFilters); // Debug
      return updatedFilters;
    });
  };

  const fetchResults = useCallback(async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();
  
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== "0") {  // ✅ Evitamos agregar valores vacíos o "0"
          params.append(key, String(value));
        }
      });
  
      console.log("📌 Parámetros enviados: ", params.toString());
  
      if ([...params].length === 0) {
        console.warn("⚠️ No hay filtros aplicados, evitando llamada inválida.");
        setIsLoading(false);
        return;
      }
      console.log("🔍 URL Final: ", `?${params.toString()}`);
      const response = await FiltersService.searchInfluencers({ params });
      setResults(response.data);
  
      console.log("✅ Resultados encontrados:", response.data);
    } catch (error) {
      showNotification("Error", "No se pudieron cargar los resultados", "danger");
      console.error("❌ FRONT - Error al obtener influencers:", error);
    } finally {
      setIsLoading(false);
    }
  }, [filters]); // ✅ Ahora `fetchResults` solo cambia si cambian los filtros

  
  // Obtener filtros de API
  useEffect(() => {
    async function fetchFilters() {
      try {
/*         const countriesResponse = await FiltersService.getCountries();
        setCountry(countriesResponse.data);

        const categoriesResponse = await FiltersService.getCategories();
        setCategories(categoriesResponse.data); */
        const [countriesRes, categoriesRes, gendersRes, citiesRes, socialClassesRes, hairColorsRes, hairTypesRes, skinColorsRes] = await Promise.all([
          FiltersService.getCountries(),
          FiltersService.getCategories(),
          FiltersService.getGenders(),
          FiltersService.getCities(),
          FiltersService.getSocialClasses(),
          FiltersService.getHairColor(),
          FiltersService.getHairTypes(),
          FiltersService.getSkinColors()
        ]);

        setState(countriesRes.data);
        setCategories(categoriesRes.data);
        setGenders(gendersRes.data);
        setCities(citiesRes.data);
        setSocialClasses(socialClassesRes.data);
        setHairColor(hairColorsRes.data);
        setHairType(hairTypesRes.data);
        setSkinColor(skinColorsRes.data);
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
				setState(response.data);
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

  return (
    <PageWrapper title="Búsqueda de Influencers">
      <Page>
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
                      { value: 'socialInstagram', text: 'Instagram' },
                      { value: 'socialTikTok', text: 'TikTok' },
                      { value: 'socialFacebook', text: 'Facebook' },
                      { value: 'socialYoutube', text: 'Youtube' },
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
                    name="category_id" 
                    onChange={handleFilterChange} 
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
                    name="state_id" 
                    onChange={handleFilterChange} 
                    list={state.map(stateOp => ({
                      value: stateOp.id, 
                      text: stateOp.name
                    }))} 
                  />
                </FormGroup>
              </div>

              <div className="col-md-2">
                <FormGroup label="Ciudad">
                  <Select 
                    ariaLabel='Ciudad'
                    placeholder='Seleccione...'
                    name="city_id" 
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
                      checked={filters.celebrity === "1"} // ✅ Ensures it reflects the state
                      onChange={handleFilterChange}
                    />
                  </FormGroup>
              
                  <FormGroup>
                    <Checks
                      type='switch' // or 'checkbox', depending on your preference
                      id='isUGC'
                      name='isUGC'
                      label='UGC'
                      checked={filters.isUGC === "1"} // ✅ Ensures it reflects the state
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
          <TableClientSideBlog
            headers={[
              { column: 'displayName', label: 'Nombre Artistico', tag: 'i' },
              { column: 'socialInstagram', label: 'Instagram', tag: 'i' },
              { column: 'socialInstagramCla', label: 'Clase', tag: 'i' },
              { column: 'socialTik', label: 'TikTok', tag: 'i' },
              { column: 'socialTikCla', label: 'Clase', tag: 'i' },
              { column: 'socialFace', label: 'Facebook', tag: 'i' },
              { column: 'socialFaceCla', label: 'Clase', tag: 'i' },
              { column: 'socialUTube', label: 'Youtube', tag: 'i' },
              { column: 'socialUTubeCla', label: 'Clase', tag: 'i' },
              { column: 'category', label: 'Categoría', tag: 'i' },      // ✅ New column
              { column: 'subcategory', label: 'Subcategoría', tag: 'i' } // ✅ New column
            ]}
            data={results.map(influencer => ({
              ...influencer,
              category: influencer.categories
                ? Array.from(new Set(influencer.categories.map((s: any) => s.category)))
                  .join(", ")
                : "N/A",
              subcategory: influencer.categories
                ? influencer.categories.map((s: any) => s.subcategory)
                  .join(", ")
                : "N/A"
            }))}
            isLoading={false}
            loadingTag={<h1>Loading...</h1>}
            add
            flag
          />
        )}
      </Page>
    </PageWrapper>
  );
};

export default SearchPage;