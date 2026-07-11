import "./NotificationBell.css";
import NotificationDropdown from "../NotificationDropdown";

export default function NotificationBell({
  open,
  notifications,
  onToggle,
  onRead,
  onReadAll,
}) {
  return (
    <div className="notification-wrapper">
      <button className="header-icon-btn notification-btn" onClick={onToggle}>
        <i className="fa-regular fa-bell"></i>

        {notifications.length > 0 && (
          <span className="notification-count">{notifications.length}</span>
        )}
      </button>

      {open && (
        <NotificationDropdown
          notifications={notifications}
          onRead={onRead}
          onReadAll={onReadAll}
        />
      )}
    </div>
  );
}
