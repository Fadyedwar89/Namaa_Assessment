export default function AddProductButton({ onClick }) {
  return (
    <button className="btn btn-success" onClick={onClick}>
      <i className="fa-solid fa-plus me-2"></i>
      Add Product
    </button>
  );
}
