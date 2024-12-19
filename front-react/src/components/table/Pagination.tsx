/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable react/no-array-index-key */
/* eslint-disable prefer-template */
/* eslint-disable react/button-has-type */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable no-else-return */
/* eslint-disable react/require-default-props */
export const Pagination = ({
  currentPage,
  totalNumberOfPages,
  handlePageChange,
  maxPageNumbers = 5, // Set the maximum number of page numbers to display
}: {
  currentPage: number;
  totalNumberOfPages: number;
  handlePageChange: (pageNumber: number) => void;
  maxPageNumbers?: number;
}) => {
  const pageNumbers = Array.from(
    { length: totalNumberOfPages },
    (_, index) => index + 1
  );

  const renderPageNumbers = () => {
    if (totalNumberOfPages <= maxPageNumbers) {
      return pageNumbers;
    }

    const middleIndex = Math.floor(maxPageNumbers / 2);

    if (currentPage <= middleIndex) {
      // Display pages from 1 to maxPageNumbers
      return [
        ...pageNumbers.slice(0, maxPageNumbers - 1),
        "...",
        totalNumberOfPages,
      ];
    } else if (currentPage >= totalNumberOfPages - middleIndex) {
      // Display pages from totalNumberOfPages - maxPageNumbers + 2 to totalNumberOfPages
      return [1, "...", ...pageNumbers.slice(-maxPageNumbers + 1)];
    } else {
      // Display pages around the current page
      const startPage = currentPage - middleIndex + 1;
      const endPage = currentPage + middleIndex - 1;
      return [
        1,
        "...",
        ...pageNumbers.slice(startPage, endPage),
        "...",
        totalNumberOfPages,
      ];
    }
  };

  return (
    <div className="row justify-content-between">
      <div className="col-md-3 col-sm-12 text-start">
        Pagina 1 de {totalNumberOfPages} de {totalNumberOfPages} entradas
      </div>
      <div className="col-md-3 col-sm-12 text-end">
        <div className="pagination">
          <li className="page-item">
            <button
              className={"page-link " + (currentPage === 1 ? "disabled" : "")}
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            >{`<`}</button>
          </li>
          {renderPageNumbers().map((pageNumber, index) => (
            <li key={index} className="page-item">
              <button
                className={`page-link ${
                  currentPage === pageNumber ? "active" : ""
                }`}
                onClick={() => handlePageChange(Number(pageNumber))}
              >
                {pageNumber}
              </button>
            </li>
          ))}
          <li className="page-item">
            <button
              className={
                "page-link " +
                (currentPage === totalNumberOfPages ? "disabled" : "")
              }
              onClick={() => handlePageChange(totalNumberOfPages)}
              disabled={currentPage === totalNumberOfPages}
            >{`>`}</button>
          </li>
        </div>
      </div>
    </div>
  );
};

export default Pagination;