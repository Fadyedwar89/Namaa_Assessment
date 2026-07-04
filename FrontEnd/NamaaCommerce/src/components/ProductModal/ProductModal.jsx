import { useEffect, useState } from "react";
import "./ProductModal.css";

export default function ProductModal({
  show,
  onClose,
  onSave,
  saving,
  product,
}) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    if (product) {
      setForm({
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
      });
    } else {
      setForm({
        name: "",
        description: "",
        price: "",
        stock: "",
      });
    }
  }, [product, show]);

  if (!show) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="modal-overlay">
      <div className="product-modal">
        <div className="modal-header">
          <h3>
            <i className="fa-solid fa-box me-2"></i>

            {product ? "Edit Product" : "Create Product"}
          </h3>
        </div>

        <div className="modal-body">
          <input
            className="form-control mb-3"
            placeholder="Product Name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />

          <textarea
            className="form-control mb-3"
            rows="4"
            placeholder="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
          />

          <input
            className="form-control mb-3"
            type="number"
            placeholder="Price"
            name="price"
            value={form.price}
            onChange={handleChange}
          />

          <input
            className="form-control"
            type="number"
            placeholder="Stock"
            name="stock"
            value={form.stock}
            onChange={handleChange}
          />
        </div>

        <div className="modal-footer">
          <button className="btn btn-outline-secondary" onClick={onClose}>
            Cancel
          </button>

          <button
            className="btn btn-primary"
            disabled={saving}
            onClick={() => onSave(form)}
          >
            {saving ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Saving...
              </>
            ) : (
              <>
                <i className="fa-solid fa-check me-2"></i>
                Save
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
