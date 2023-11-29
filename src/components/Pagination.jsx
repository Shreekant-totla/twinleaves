// Pagination.jsx
import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = Array.from(
    { length: totalPages / 40 },
    (_, index) => index + 1
  );

  return (
    <div
      className="flex mt-4 overflow-x-auto mx-auto w-2/5"
      style={{ maxWidth: "100%" }}
    >
      {pageNumbers.map((page) => (
        <button
          key={page}
          className={`px-4 py-2 mr-2 bg-blue-500 text-white rounded ${
            page === currentPage ? "bg-blue-700" : ""
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
