import axiosInstance from "../api/axios";

const getOrders = async (pageIndex = 1, pageSize = 10, status = "") => {
  let url = `Order?PageIndex=${pageIndex}&PageSize=${pageSize}`;

  if (status) url += `&OrderStatus=${status}`;

  const { data } = await axiosInstance.get(url);

  return data;
};

const getOrderById = async (id) => {
  const { data } = await axiosInstance.get(`Order/${id}`);

  return data;
};

const updateStatus = async (id, status) => {
  await axiosInstance.patch(`Order/${id}/status?status=${status}`);
};

const cancelOrder = async (id) => {
  await axiosInstance.patch(`Order/${id}/cancel`);
};

const createOrder = async (items) => {
  const body = {
    items,
  };

  const { data } = await axiosInstance.post("Order/CreateOrder", body);

  return data;
};
export default {
  getOrders,
  getOrderById,
  updateStatus,
  cancelOrder,
  createOrder,
};