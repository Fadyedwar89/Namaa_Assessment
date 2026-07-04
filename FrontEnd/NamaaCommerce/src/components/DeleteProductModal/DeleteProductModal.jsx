import "./DeleteProductModal.css";

export default function DeleteProductModal({
  show,
  onClose,
  onDelete,
  product,
  deleting,
}) {
  if (!show || !product) return null;

  return (
    <div className="delete-overlay">
      <div className="delete-modal">
        <div className="delete-icon">
          <i className="fa-solid fa-triangle-exclamation"></i>
        </div>

        <h3>Delete Product</h3>

        <p>
          Are you sure you want to delete
          <strong> {product.name}</strong> ?
        </p>

        <small>This action cannot be undone.</small>

        <div className="delete-actions">
          <button className="btn btn-outline-secondary" onClick={onClose}>
            Cancel
          </button>

          <button
            className="btn btn-danger"
            disabled={deleting}
            onClick={onDelete}
          >
            {deleting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Deleting...
              </>
            ) : (
              <>
                <i className="fa-solid fa-trash me-2"></i>
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
