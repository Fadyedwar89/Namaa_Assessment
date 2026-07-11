import "./NotificationItem.css";

export default function NotificationItem({ notification, onRead }) {
  return (
    <div className="notification-item" onClick={() => onRead(notification.id)}>
      <p>{notification.message}</p>

      <small>
        {new Date(notification.createdAt).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </small>
    </div>
  );
}
