import { useEffect, useState } from "react";
import notificationApi from "../services/notificationApi";
import notificationService from "../services/notificationService";

export default function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  const toggleNotifications = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const init = async () => {
      try {
        const data = await notificationApi.getUnread();
        setNotifications(data);

        await notificationService.start();

        notificationService.connection.off("ReceiveNotification");

        notificationService.connection.on(
          "ReceiveNotification",
          (notification) => {
            setNotifications((prev) => {
              if (prev.some((x) => x.id === notification.id)) {
                return prev;
              }

              return [notification, ...prev];
            });
          },
        );
      } catch (err) {
        console.log(err);
      }
    };

    init();

    return () => {
      notificationService.connection.off("ReceiveNotification");
    };
  }, []);

  const markAsRead = async (id) => {
    try {
      await notificationApi.markAsRead(id);

      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await notificationApi.markAllAsRead();

      setNotifications([]);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    notifications,
    open,
    toggleNotifications,
    setOpen,
    markAsRead,
    markAllAsRead,
  };
}
