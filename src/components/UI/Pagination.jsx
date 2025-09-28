import "./Pagination.scss";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button onClick={handlePrevious} disabled={currentPage === 1} className="pagination-btn">
        Previous
      </button>

      <span className="pagination-info">
        Page {currentPage} of {totalPages}
      </span>

      <button onClick={handleNext} disabled={currentPage === totalPages} className="pagination-btn">
        Next
      </button>
    </div>
  );
}
