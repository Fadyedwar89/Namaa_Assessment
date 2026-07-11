import "./Pagination.css";

export default function Pagination({ page, totalPages, onPrevious, onNext }) {
  return (
    <div className="d-flex justify-content-center align-items-center gap-3 mt-4">
      <button
        className="btn btn-primary px-4"
        disabled={page === 1}
        onClick={onPrevious}
      >
        Previous
      </button>

      <span>
        Page {page} of {totalPages}
      </span>

      <button
        className="btn btn-outline-primary"
        disabled={page === totalPages}
        onClick={onNext}
      >
        Next
      </button>
    </div>
  );
}
