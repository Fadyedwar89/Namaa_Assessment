import "./EmptyState.css";

export default function EmptyState({ icon, title, description }) {
  return (
    <div className="text-center py-5">
      <i className={icon} style={{ fontSize: "80px" }} />

      <h3 className="mt-3">{title}</h3>

      <p className="text-muted">{description}</p>
    </div>
  );
}
