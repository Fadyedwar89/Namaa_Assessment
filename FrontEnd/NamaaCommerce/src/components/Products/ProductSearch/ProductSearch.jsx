import SortFilter from "../SortFilter/SortFilter";

import "./ProductSearch.css";

export default function ProductSearch({
  search,
  onSearchChange,
  sortOrder,
  onSortChange,
}) {
  return (
    <div className="filter-panel mb-5">
      <div className="row g-4 align-items-center">
        <div className="col-lg-7">
          <div className="search-wrapper">
            <i className="fa-solid fa-magnifying-glass search-icon"></i>

            <input
              className="search-input"
              placeholder="Search products..."
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
            />

            {search && (
              <button
                className="clear-search"
                onClick={() => onSearchChange("")}
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>
        </div>

        <div className="col-lg-5">
          <SortFilter value={sortOrder} onChange={onSortChange} />
        </div>
      </div>
    </div>
  );
}
