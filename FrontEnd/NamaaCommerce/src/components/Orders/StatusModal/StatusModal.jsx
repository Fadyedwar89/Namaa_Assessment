import "./StatusModal.css";

const statuses = [
  {
    value: "Pending",
    title: "Pending",
    description: "Waiting for processing",
    color: "warning",
    icon: "fa-clock",
  },
  {
    value: "Processing",
    title: "Processing",
    description: "Order is being prepared",
    color: "primary",
    icon: "fa-gears",
  },
  {
    value: "Shipped",
    title: "Shipped",
    description: "Order is on the way",
    color: "success",
    icon: "fa-truck-fast",
  },
];

export default function StatusModal({
  show,
  onClose,
  selectedStatus,
  setSelectedStatus,
  onSave,
  saving,
}) {
  if (!show) return null;

  return (
    <div className="status-modal-overlay">
      <div className="status-modal">
        <div className="status-modal-header">
          <h3>
            <i className="fa-solid fa-pen-to-square me-2"></i>
            Change Status
          </h3>
        </div>

        <div className="status-list">
          {statuses.map((item) => (
            <div
              key={item.value}
              className={`status-card ${
                selectedStatus === item.value ? "active" : ""
              }`}
              onClick={() => setSelectedStatus(item.value)}
            >
              <div className={`status-icon bg-${item.color}`}>
                <i className={`fa-solid ${item.icon}`}></i>
              </div>

              <div>
                <h5>{item.title}</h5>

                <small>{item.description}</small>
              </div>
            </div>
          ))}
        </div>

        <div className="status-modal-footer">
          <button className="btn btn-outline-secondary" onClick={onClose}>
            Cancel
          </button>

          <button
            className="btn btn-primary"
            disabled={!selectedStatus || saving}
            onClick={onSave}
          >
            {saving ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Saving...
              </>
            ) : (
              <>
                <i className="fa-solid fa-check me-2"></i>
                Save Changes
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
