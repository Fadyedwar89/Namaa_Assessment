import "./CancelOrderModal.css";

export default function CancelOrderModal({
  show,
  onClose,
  onCancel,
  loading,
  orderId,
}) {
  if (!show) return null;

  return (
    <div className="cancel-overlay">
      <div className="cancel-modal">
        <div className="cancel-icon">
          <i className="fa-solid fa-ban"></i>
        </div>

        <h3>Cancel Order</h3>

        <p>
          Are you sure you want to cancel
          <strong> Order #{orderId}</strong>?
        </p>

        <small>This action cannot be undone.</small>

        <div className="cancel-actions">
          <button className="btn btn-outline-secondary" onClick={onClose}>
            Keep Order
          </button>

          <button
            className="btn btn-danger"
            disabled={loading}
            onClick={onCancel}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Cancelling...
              </>
            ) : (
              <>
                <i className="fa-solid fa-ban me-2"></i>
                Cancel Order
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
