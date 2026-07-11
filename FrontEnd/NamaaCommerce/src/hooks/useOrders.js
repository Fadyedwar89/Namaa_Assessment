import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import orderService from "../services/orderService";

export default function useOrders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  const [pageIndex, setPageIndex] = useState(1);

  const pageSize = 12;

  const [totalPages, setTotalPages] = useState(1);

  const [status, setStatus] = useState("");

  const [searchId, setSearchId] = useState("");

  const [showStatusModal, setShowStatusModal] = useState(false);

  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const [selectedStatus, setSelectedStatus] = useState("");

  const [savingStatus, setSavingStatus] = useState(false);

  const [showCancelModal, setShowCancelModal] = useState(false);

  const [cancelLoading, setCancelLoading] = useState(false);
const [statistics, setStatistics] = useState(null);
useEffect(() => {
  const loadStatistics = async () => {
    const data = await orderService.getStatistics();
    setStatistics(data);
  };
  loadStatistics();
}, []);
  
  useEffect(() => {
    loadOrders();
  }, [pageIndex, status]);

  const loadOrders = async () => {
    try {
      const result = await orderService.getOrders(pageIndex, pageSize, status);

      setOrders(result.data);

      setTotalPages(Math.ceil(result.totalCount / pageSize));
    } catch (err) {
      console.log(err);
    }
  };
  const searchOrder = async (id) => {
    try {
      const order = await orderService.getOrderById(id);

      setOrders([order]);

      setTotalPages(1);
    } catch {
      setOrders([]);
    }
  };

  const changeStatus = (id) => {
    const order = orders.find((x) => x.id === id);

    setSelectedOrderId(id);

    setSelectedStatus(order.status);

    setShowStatusModal(true);
  };

  const saveStatus = async () => {
    try {
      setSavingStatus(true);

      await orderService.updateStatus(selectedOrderId, selectedStatus);

      await loadOrders();

      setShowStatusModal(false);
    } finally {
      setSavingStatus(false);
    }
  };

  const openCancelModal = (id) => {
    setSelectedOrderId(id);

    setShowCancelModal(true);
  };

  const cancelOrder = async () => {
    try {
      setCancelLoading(true);

      await orderService.cancelOrder(selectedOrderId);

      await loadOrders();

      setShowCancelModal(false);

      setSelectedOrderId(null);
    } catch (err) {
      console.log(err);
    } finally {
      setCancelLoading(false);
    }
  };
  
  const details = (id) => {
    navigate(`/orders/${id}`);
  };
  const closeStatusModal = () => {
    setShowStatusModal(false);
  };
 const logout = () => {
   localStorage.clear();
   navigate("/login");
 };
  const closeCancelModal = () => {
    setShowCancelModal(false);
    setSelectedOrderId(null);
  };
  return {
    orders,

    pageIndex,
    setPageIndex,

    totalPages,

    status,
    setStatus,

    searchId,
    setSearchId,

    loadOrders,
    searchOrder,
    showStatusModal,
    selectedStatus,
    setSelectedStatus,

    savingStatus,
    saveStatus,
    closeStatusModal,

    selectedOrderId,

    showCancelModal,
    cancelLoading,

    openCancelModal,
    closeCancelModal,
    cancelOrder,

    changeStatus,
    logout,
    details,
    statistics,
    setStatistics,
  };
}
