import "./OrderTimeline.css";

const steps = [
  {
    title: "Pending",
    icon: "fa-clock",
    color: "#ffc107",
  },
  {
    title: "Processing",
    icon: "fa-gears",
    color: "#0d6efd",
  },
  {
    title: "Shipped",
    icon: "fa-truck-fast",
    color: "#198754",
  },
  {
    title: "Cancelled",
    icon: "fa-ban",
    color: "#dc3545",
  },
];

export default function OrderTimeline({ status }) {
  const current = steps.findIndex((x) => x.title === status);

  return (
    <div className="timeline-card">
      <h2>
        <i className="fa-solid fa-route me-2"></i>
        Order Progress
      </h2>

      <div className="timeline">
        {steps.map((step, index) => {
          const active = status === step.title;

          const completed = status !== "Cancelled" && index < current;

          return (
            <div
              key={step.title}
              className={`timeline-item ${active ? "active" : ""}`}
            >
              <div
                className={`timeline-icon ${completed ? "completed" : ""}`}
                style={{
                  background: active || completed ? step.color : "#e5e7eb",
                }}
              >
                <i
                  className={`fa-solid ${completed ? "fa-check" : step.icon}`}
                ></i>
              </div>

              <div className="timeline-content">
                <h5>{step.title}</h5>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
