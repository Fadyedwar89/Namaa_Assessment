import "./OrderCard.css";

export default function OrderCard({
  order,
  isAdmin,
  onCancel,
  onDetails,
  onChangeStatus,
}) {
  const getBadge = () => {
    switch (order.status) {
      case "Pending":
        return (
          <span className="badge bg-warning text-dark px-3 py-2">
            <i className="fa-solid fa-clock me-2"></i>
            Pending
          </span>
        );

      case "Processing":
        return (
          <span className="badge bg-primary px-3 py-2">
            <i className="fa-solid fa-gears me-2"></i>
            Processing
          </span>
        );

      case "Shipped":
        return (
          <span className="badge rounded-pill bg-success px-4 py-2">
            <i className="fa-solid fa-truck-fast me-2"></i>
            Shipped
          </span>
        );

      case "Cancelled":
        return (
          <span className="badge bg-danger px-3 py-2">
            <i className="fa-solid fa-ban me-2"></i>
            Cancelled
          </span>
        );

      default:
        return <span className="badge bg-secondary px-3 py-2">Unknown</span>;
    }
  };

  return (
    <div className="col-lg-4 col-md-6">
      <div className="order-card">
        <div className="order-top-line"></div>

        <div className="order-header">
          <div>
            <h5 className="order-id">
              <i className="fa-solid fa-cube text-primary me-2"></i>
              Order #{order.id}
            </h5>

            <small className="text-muted">
              {new Date(order.createdAt).toLocaleDateString()}
            </small>
          </div>

          {getBadge()}
        </div>

        <div className="order-body">
          <div className="info-row">
            <i className="fa-solid fa-user"></i>

            <div>
              <span>Customer</span>

              <strong>{order.userName ?? "Unknown"}</strong>
            </div>
          </div>

          <div className="info-row">
            <i className="fa-solid fa-money-bill-wave"></i>

            <div>
              <span>Total Price</span>

              <strong>${order.totalOrder}</strong>
            </div>
          </div>
        </div>

        <div className="order-footer">
          <button
            className="action-btn primary"
            onClick={() => onDetails(order.id)}
          >
            <i className="fa-solid fa-eye me-2"></i>
            Details
          </button>

          {!isAdmin && order.status === "Pending" && (
            <button
              className="action-btn danger"
              onClick={() => onCancel(order.id)}
            >
              <i className="fa-solid fa-ban me-2"></i>
              Cancel
            </button>
          )}

          {isAdmin && (
            <button
              className="action-btn warning"
              onClick={() => onChangeStatus(order.id)}
            >
              <i className="fa-solid fa-pen-to-square me-2"></i>
              Change Status
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
