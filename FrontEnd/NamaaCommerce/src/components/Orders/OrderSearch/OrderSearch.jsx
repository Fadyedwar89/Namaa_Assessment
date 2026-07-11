import "./OrderSearch.css";

export default function OrderSearch({ value, onChange, onClear }) {
  return (
    <div className="search-wrapper">
      <i className="fa-solid fa-magnifying-glass search-icon"></i>

      <input
        type="text"
        className="search-input"
        placeholder="Search by Order ID..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      {value && (
        <button className="clear-search" onClick={onClear}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      )}
    </div>
  );
}
