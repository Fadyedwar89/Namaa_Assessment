import { useEffect, useState } from "react";
import notificationService from "../../services/notificationService";
import "./NotificationBell.css";

export default function NotificationBell() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const data = await notificationService.getUnread();

      setNotifications(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="notification-wrapper">
      <button className="notification-btn" onClick={() => setOpen(!open)}>
        <i className="fa-solid fa-bell"></i>

        {notifications.length > 0 && (
          <span className="notification-count">{notifications.length}</span>
        )}
      </button>

      {open && (
        <div className="notification-panel">
          <h5>Notifications</h5>

          {notifications.length === 0 ? (
            <p className="empty">No Notifications</p>
          ) : (
            notifications.map((n) => (
              <div key={n.id} className="notification-item">
                <p>{n.message}</p>

                <small>{new Date(n.createdAt).toLocaleString()}</small>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
