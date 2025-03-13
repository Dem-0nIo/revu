/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/no-array-index-key */
/* eslint-disable prefer-template */
/* eslint-disable react/button-has-type */
/* eslint-disable no-else-return */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { useState } from "react";
import '../../styles/button.css'
import { TableHeader } from './TableHeader'
import { TableBody } from './TableBody'
import { TableBodyCoti } from './TableBodyCoti'
import { Pagination } from './Pagination'

const Table = ({ headers, data, isLoading, loadingTag, add, flag }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, ] = useState(""); // Added state for search
  const [itemsPerPage, setItemsPerPage] = useState(100); // Added state for itemsPerPage
  const [sortColumn, setSortColumn] = useState(headers[0].column); // Default sorting column
  const [sortDirection, setSortDirection] = useState("asc"); // Default sorting direction

  // Added filteredData variable to hold filtered data based on search
  const filteredData = data.filter((item) =>
    headers.some((header) =>
      String(item[header.column])
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    )
  );

  const totalNumberOfPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSortColumnChange = (column) => {
    // Toggle sort direction if the same column is clicked again
    if (sortColumn === column) {
      setSortDirection((prevDirection) =>
        prevDirection === "asc" ? "desc" : "asc"
      );
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };


  return (
    <>
      <div className="row justify-content-between">
        <div className="col-md-3 col-sm-12 text-start">
          <div className="input-group">
            <span className="input-group-text" htmlFor="inputGroupSelect01">
              Ver
            </span>
            <div>
              <select
                className="form-control form-select"
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(parseInt(e.target.value, 10));
                  setCurrentPage(1);
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>
            <span className="input-group-text" id="inputGroupSelect02">
              Filas
            </span>
          </div>
        </div>
        {/* <div className="col-md-3 col-sm-12 text-end">
          <div className="input-group">
            <input
              className="form-control"
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
              placeholder="Buscar en todas las columnas"
            />
          </div>
        </div> */}
      </div>
      <br />

      <div className="table-responsive">
        <table className='table table-modern'>
          <TableHeader
            headers={headers}
            onSortColumnChange={handleSortColumnChange}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
          />
          {flag ? (
            <TableBody
              headers={headers}
              data={filteredData}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              isLoading={isLoading}
              loadingTag={loadingTag}
              add={add}
            />
          ) : (
            <TableBodyCoti
              headers={headers}
              data={filteredData}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              sortColumn={sortColumn}
              sortDirection={sortDirection}
              isLoading={isLoading}
              loadingTag={loadingTag}
            />
          )}
        </table>
      </div>
      {isLoading ? (
        <div style={{ textAlign: "center", width: "200px", margin: "0 auto" }}>
          {loadingTag}
        </div>
      ) : (
        ""
      )}

      <Pagination
        currentPage={currentPage}
        totalNumberOfPages={totalNumberOfPages}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default Table;