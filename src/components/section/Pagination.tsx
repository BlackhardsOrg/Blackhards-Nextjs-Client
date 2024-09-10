import { useRouter } from "next/router";

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const { pathname } = useRouter();
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5; // You can adjust this number to show more or fewer page buttons
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {
      endPage = Math.min(totalPages, maxPagesToShow);
    } else if (currentPage > totalPages - 3) {
      startPage = Math.max(1, totalPages - (maxPagesToShow - 1));
    }

    // Add ellipses before the first page if needed
    if (startPage > 1) {
      pages.push(
        <li key="start-ellipsis" className="page-item disabled">
          <a className="page-link">...</a>
        </li>
      );
    }

    // Render the page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li key={i} className={`page-item ${currentPage === i ? "active" : ""}`}>
          <a
            className="page-link"
            onClick={() => onPageChange(i)}
            style={{ cursor: "pointer" }}
          >
            {i}
          </a>
        </li>
      );
    }

    // Add ellipses after the last page if needed
    if (endPage < totalPages) {
      pages.push(
        <li key="end-ellipsis" className="page-item disabled">
          <a className="page-link">...</a>
        </li>
      );
      pages.push(
        <li key={totalPages} className="page-item">
          <a
            className="page-link"
            onClick={() => onPageChange(totalPages)}
            style={{ cursor: "pointer" }}
          >
            {totalPages}
          </a>
        </li>
      );
    }

    return pages;
  };

  return (
    <div
      className={`mbp_pagination text-center ${pathname.includes("blog")
        ? "mb40-md"
        : ""} ${pathname.includes("shop") ? "mt30" : ""}`}
    >
      <ul className="page_navigation">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <a className="page-link" onClick={handlePreviousPage}>
            <span className="fas fa-angle-left" />
          </a>
        </li>

        {renderPageNumbers()}

        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <a className="page-link" onClick={handleNextPage}>
            <span className="fas fa-angle-right" />
          </a>
        </li>
      </ul>
      <p className="mt10 mb-0 pagination_page_count text-center">
        {itemsPerPage * (currentPage - 1) + 1} –{" "}
        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
        game projects available
      </p>
    </div>
  );
};

export default Pagination;



