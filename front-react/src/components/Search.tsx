// Date: 03/08/2021
/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-return-assign */
/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/no-shadow */
import React from 'react'

export const Search= ({
  cities, 
  clasificacion, 
  clasificacionTik,
  filterInfluencer
}: {
    cities: string[], 
    clasificacion: string[],
    clasificacionTik: string[],
    filterInfluencer: any
  }) => {
    const handleClear = () => {
      filterInfluencer('All');
      Array.from(document.querySelectorAll("select")).forEach(
        select => (select.value = "All")
      )
      Array.from(document.querySelectorAll("input")).forEach(
        input => (input.value = "")
      )
    }
  
  return (
    <>
      <div className="row" style={{ padding: '4%' }}>
        <div className="clear">
          <button className="btn btn-primary" onClick={handleClear}>Borrar Filtro</button>
        </div>
      </div>

      <div className="row">
        <div className="firstName">
          Nombre
          <input type="text" className="form-control" onChange={(e) => filterInfluencer(e.target.value)} />
        </div>

        <div className="lastName">
          Apellido
          <input type="text" className="form-control" onChange={(e) => filterInfluencer(e.target.value)} />
        </div>
      </div>

      <div className="row">
        <div className="citys">
          Ciudad
          <select className="form-select" onChange={(e) => filterInfluencer(e.target.value)}>
            {cities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>

        <div className="gender">
          Genero
          <input type="text" className="form-control" onChange={(e) => filterInfluencer(e.target.value)} />
        </div>
      </div>

      <div className="row">
        <div className="displayName">
          NikName
          <input type="text" className="form-control" onChange={(e) => filterInfluencer(e.target.value)} />
        </div>

        <div className="state">
          Estado
          <input type="text" className="form-control" onChange={(e) => filterInfluencer(e.target.value)} />
        </div>
      </div>

      <div className="row">
        <div className="socialInstagram">
          Instagram
          <input type="text" className="form-control" onChange={(e) => filterInfluencer(e.target.value)} />
        </div>

        <div className="clas">
          Clasificación
          <select className="form-select" onChange={(e) => filterInfluencer(e.target.value)}>
            {clasificacion.map(clas => (
              <option key={clas} value={clas}>{clas}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="row">
        <div className="socialTik">
          Tiktok
          <input type="text" className="form-control" onChange={(e) => filterInfluencer(e.target.value)} />
        </div>

        <div className="socialTikCla">
          Clasificación
          <select className="form-select" onChange={(e) => filterInfluencer(e.target.value)}>
            {clasificacionTik.map(clas => (
              <option key={clas} value={clas}>{clas}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="row">
        <div className="costo_1">
          Costo 1
          <input type="text" className="form-control" onChange={(e) => filterInfluencer(e.target.value)} />
        </div>

        <div className="costo_2">
          Costo 2
          <input type="text" className="form-control" onChange={(e) => filterInfluencer(e.target.value)} />
        </div>
      </div>
    </>
			
  )
}

export default Search