export default function OrdersStatistics({ statistics }) {
  if (!statistics) return null;

  return (
    <div className="row g-4 mb-5">
      <div className="col-lg col-md-6">
        <div className="stat-card total">
          <div className="stat-icon">
            <i className="fa-solid fa-boxes-stacked"></i>
          </div>

          <h2>{statistics.totalOrders}</h2>
          <span>Total Orders</span>
        </div>
      </div>

      <div className="col-lg col-md-6">
        <div className="stat-card pending">
          <div className="stat-icon">
            <i className="fa-solid fa-clock text-warning"></i>
          </div>

          <h2>{statistics.pending}</h2>
          <span>Pending</span>
        </div>
      </div>

      <div className="col-lg col-md-6">
        <div className="stat-card processing">
          <div className="stat-icon">
            <i className="fa-solid fa-spinner text-primary"></i>
          </div>

          <h2>{statistics.processing}</h2>
          <span>Processing</span>
        </div>
      </div>

      <div className="col-lg col-md-6">
        <div className="stat-card shipped">
          <div className="stat-icon">
            <i className="fa-solid fa-truck text-success"></i>
          </div>

          <h2>{statistics.shipped}</h2>
          <span>Shipped</span>
        </div>
      </div>

      <div className="col-lg col-md-6">
        <div className="stat-card cancelled">
          <div className="stat-icon">
            <i className="fa-solid fa-ban text-danger"></i>
          </div>

          <h2>{statistics.cancelled}</h2>
          <span>Cancelled</span>
        </div>
      </div>
    </div>
  );
}
