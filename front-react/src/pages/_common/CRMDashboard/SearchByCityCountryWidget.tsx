// src/components/widgets/SearchByCityCountryWidget.tsx
import React, { useState, useEffect } from 'react';
import FiltersService from '../../../services/influ.service';
import Card, {
  CardActions,
  CardBody,
  CardHeader,
  CardLabel,
  CardTitle,
} from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';

const SearchByCityCountryWidget = () => {
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [citiesCopy, setCitiesCopy] = useState([]);

  useEffect(() => {
    FiltersService.getCountries()
      .then(response => setCountries(response.data))
      .catch(() => setCountries([]));

    FiltersService.getCities()
      .then(response => {
        setCities(response.data);
        setCitiesCopy(response.data);
      })
      .catch(() => {
        setCities([]);
        setCitiesCopy([]);
      });
  }, []);

  const [resultCount, setResultCount] = useState<number | null>(null);

  const handleSearch = async () => {
    try {
      const params = new URLSearchParams();
      if (city) params.append("city_id", city);
      if (country) params.append("country_id", country);

      const response = await FiltersService.searchInfluencers({ params });

      if (Array.isArray(response.data)) {
        setResultCount(response.data.length);
      } else {
        setResultCount(null);
      }
    } catch (error) {
      console.error("Error fetching influencer count:", error);
      setResultCount(null);
    }
  };

  return (
    <Card stretch>
      <CardHeader>
        <CardLabel>
          <CardTitle tag="div" className="h5">
            Buscar por ciudad y país
          </CardTitle>
        </CardLabel>
      </CardHeader>
      <CardBody>
        <div className="mb-3 d-flex gap-3">
        <div className="flex-fill">
          <label htmlFor="countrySelect" className="form-label">País</label>
          <select
            id="countrySelect"
            value={country}
            onChange={(e) => {
              const selectedCountryId = Number(e.target.value);
              setCountry(e.target.value);
              setCity("");

              if (selectedCountryId === 5) {
                FiltersService.getCitiesWithDepartmentsForColombia().then(response => {
                  const formattedCities = response.data.map((cityItem: any) => ({
                    id: cityItem.id,
                    city_name: `${cityItem.name}`,
                    country_id: selectedCountryId,
                  }));
                  setCities(formattedCities);
                  setCitiesCopy(formattedCities);
                }).catch(() => {
                  setCities([]);
                  setCitiesCopy([]);
                });
              } else {
                const filteredCities = citiesCopy.filter((ci: any) => ci.country_id === selectedCountryId);
                setCities(filteredCities);
              }
            }}
            className="form-control"
          >
            <option value="">Seleccione un país</option>
            {countries.map((c: any) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div className="flex-fill">
          <label htmlFor="citySelect" className="form-label">Ciudad</label>
          <select
            id="citySelect"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="form-control"
          >
            <option value="">Seleccione una ciudad</option>
            {cities
              .filter((ci: any) => !country || ci.country_id == Number(country))
              .map((ciItem: any) => (
                <option key={ciItem.id} value={ciItem.id}>{ciItem.city_name}</option>
              ))}
          </select>
        </div>
      </div>
        <Button color="primary" className="w-100" onClick={handleSearch} type="button">
          Buscar
        </Button>
        {resultCount !== null && (
          <div className="mt-3 text-center">
            <div className='display-5 fw-bold text-primary'>{resultCount}</div>
            <div className='text-muted'>Influencers en la base de datos</div>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default SearchByCityCountryWidget;