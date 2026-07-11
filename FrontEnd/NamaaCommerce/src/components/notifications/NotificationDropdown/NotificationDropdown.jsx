import "./NotificationDropdown.css";
import NotificationItem from "../NotificationItem";

export default function NotificationDropdown({
  notifications,
  onRead,
  onReadAll,
}) {
  return (
    <div className="notification-panel">
      <h5>Notifications</h5>

      {notifications.length === 0 ? (
        <p>No Notifications</p>
      ) : (
        <>
          <div className="notification-list">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onRead={onRead}
              />
            ))}
          </div>

          <button className="mark-all-btn" onClick={onReadAll}>
            Mark all as read
          </button>
        </>
      )}
    </div>
  );
}
