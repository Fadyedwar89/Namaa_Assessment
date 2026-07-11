import "./DashboardHeader.css";

export default function DashboardHeader({ title, icon, subtitle, actions, className="" }) {
  return (
    <header className={`dashboard-header ${className}`}>
      {/* Particles */}
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>

      {/* Second orb */}
      <div className="orb-2"></div>

      {/* Shimmer */}
      <div className="shimmer-overlay"></div>

      <div className="dashboard-header__content">
        <div className="dashboard-header__info">
          <h2 className="dashboard-header__title">
            {icon}
            <>{title}</>
          </h2>

          <div className="dashboard-header__subtitle">{subtitle}</div>
        </div>

        {actions && <div className="dashboard-header__actions">{actions}</div>}
      </div>
    </header>
  );
}
