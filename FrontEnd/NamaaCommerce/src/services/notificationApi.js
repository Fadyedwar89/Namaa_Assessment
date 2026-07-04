import axiosInstance from "../api/axios";

const getUnread = async () => {
  const { data } = await axiosInstance.get("Notifications/unread");
  return data;
};

const markAsRead = async (id) => {
  await axiosInstance.patch(`Notifications/${id}/read`);
};

const markAllAsRead = async () => {
  await axiosInstance.patch("Notifications/read-all");
};

export default {
  getUnread,
  markAsRead,
  markAllAsRead,
};
