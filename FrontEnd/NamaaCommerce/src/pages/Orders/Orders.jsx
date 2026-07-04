import { useEffect, useState } from "react";
import "./Orders.css";
import orderService from "../../services/orderService";
import OrderCard from "../../components/OrderCard/OrderCard";
import StatusFilter from "../../components/StatusFilter/StatusFilter";
import { useNavigate } from "react-router-dom";
import StatusModal from "../../components/StatusModal/StatusModal";
import CancelOrderModal from "../../components/CancelOrderModal/CancelOrderModal";
import notificationService from "../../services/notificationService";
import notificationApi from "../../services/notificationApi";

export default function Orders() {
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
  const isAdmin = localStorage.getItem("role") === "Admin";
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadOrders();
  }, [pageIndex, status]);
  useEffect(() => {
    const init = async () => {
      const data = await notificationApi.getUnread();

      setNotifications(data);

      await notificationService.start();

      notificationService.connection.off("ReceiveNotification");

      notificationService.connection.on(
        "ReceiveNotification",
        (notification) => {
          setNotifications((prev) => {
            if (prev.some((x) => x.id === notification.id)) return prev;

            return [notification, ...prev];
          });
        },
      );
    };

    init();

    return () => {
      notificationService.connection.off("ReceiveNotification");
    };
  }, []);

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
  const details = (id) => {
    navigate(`/orders/${id}`);
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

  const loadNotifications = async () => {
    try {
      const data = await notificationService.getUnread();

      setNotifications(data);
    } catch (err) {
      console.log(err);
    }
  };
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

  return (
    <div className="container mt-4">
      {/* Dashboard Header */}
      {/* Dashboard Header */}

      <div className="dashboard-header mb-5">
        <div>
          <h2 className="dashboard-title">
            <i className="fa-solid fa-boxes-stacked me-2"></i>
            Orders
          </h2>

          <p className="dashboard-subtitle">
            Welcome back,
            <strong className="ms-2">
              {localStorage.getItem("displayName")}
            </strong>
            <br />
            Manage and monitor all customer orders from one place.
          </p>
        </div>

        <div className="header-actions">
          {/* Notification */}

          <button
            className="header-icon-btn notification-btn"
            onClick={() => setOpen(!open)}
          >
            <i class="fa-regular fa-bell"></i>
            {notifications.length > 0 && (
              <span className="notification-count">{notifications.length}</span>
            )}
          </button>
          {open && (
            <div className="notification-panel">
              <h5>Notifications</h5>

              {notifications.length === 0 ? (
                <p>No Notifications</p>
              ) : (
                <>
                  <div className="notification-list">
                    {notifications.map((n, index) => (
                      <div
                        key={n.id || index}
                        className="notification-item"
                        onClick={() => markAsRead(n.id)}
                      >
                        <p>{n.message}</p>
                        <small>
                          {new Date(n.createdAt).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </small>
                      </div>
                    ))}
                  </div>
                  <button className="mark-all-btn" onClick={markAllAsRead}>
                    Mark all as read
                  </button>
                </>
              )}
            </div>
          )}

          {/* User */}

          <div className="dropdown user-menu">
            <button className="btn dropdown-toggle" data-bs-toggle="dropdown">
              <i className="fa-solid fa-user me-2"></i>

              {localStorage.getItem("displayName")}
            </button>

            <ul className="dropdown-menu dropdown-menu-end">
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => navigate("/products")}
                >
                  <i className="fa-solid fa-box me-2"></i>
                  Products
                </button>
              </li>

              <li>
                <button
                  className="dropdown-item"
                  onClick={() => navigate("/orders")}
                >
                  <i className="fa-solid fa-cart-shopping me-2"></i>
                  Orders
                </button>
              </li>

              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <button
                  className="dropdown-item"
                  onClick={() => navigate("/login")}
                >
                  <i class="fa-solid fa-user-lock"></i>
                  Login
                </button>
              </li>

              <li>
                <button
                  className="dropdown-item"
                  onClick={() => navigate("/register")}
                >
                  <i class="fa-solid fa-person-circle-plus"></i>
                  Register
                </button>
              </li>

              <li>
                <button
                  className="dropdown-item text-danger"
                  onClick={() => {
                    localStorage.clear();
                    navigate("/login");
                  }}
                >
                  <i className="fa-solid fa-right-from-bracket me-2"></i>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Statistics */}

      <div className="row g-4 mb-5">
        <div className="col-lg col-md-6">
          <div className="stat-card total">
            <div className="stat-icon">
              <i className="fa-solid fa-boxes-stacked"></i>
            </div>

            <h2>{orders.length}</h2>

            <span>Total Orders</span>
          </div>
        </div>

        <div className="col-lg col-md-6">
          <div className="stat-card pending">
            <div className="stat-icon stat-icon">
              <i className="fa-solid fa-clock stat-icon text-warning"></i>
            </div>

            <h2>{orders.filter((o) => o.status === "Pending").length}</h2>

            <span>Pending</span>
          </div>
        </div>

        <div className="col-lg col-md-6">
          <div className="stat-card processing">
            <div className="stat-icon">
              <i className="fa-solid fa-spinner stat-icon text-primary"></i>
            </div>

            <h2>{orders.filter((o) => o.status === "Processing").length}</h2>

            <span>Processing</span>
          </div>
        </div>

        <div className="col-lg col-md-6">
          <div className="stat-card shipped ">
            <div className="stat-icon">
              <i className="fa-solid fa-truck stat-icon text-success "></i>
            </div>

            <h2>{orders.filter((o) => o.status === "Shipped").length}</h2>

            <span>Shipped</span>
          </div>
        </div>

        <div className="col-lg col-md-6">
          <div className="stat-card cancelled">
            <div className="stat-icon">
              <i className="fa-solid fa-ban stat-icon text-danger"></i>
            </div>

            <h2>{orders.filter((o) => o.status === "Cancelled").length}</h2>

            <span>Cancelled</span>
          </div>
        </div>
      </div>

      {/* Search & Filter */}

      <div className="filter-panel mb-5">
        <div className="row g-4 align-items-center">
          <div className="col-lg-7">
            <div className="search-wrapper">
              <i className="fa-solid fa-magnifying-glass search-icon"></i>

              <input
                type="text"
                className="search-input"
                placeholder="Search by Order ID..."
                value={searchId}
                onChange={(e) => {
                  const value = e.target.value;

                  setSearchId(value);

                  if (value === "") {
                    loadOrders();

                    return;
                  }

                  if (!isNaN(value)) {
                    searchOrder(value);
                  }
                }}
              />

              {searchId && (
                <button
                  className="clear-search"
                  onClick={() => {
                    setSearchId("");

                    loadOrders();
                  }}
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
            </div>
          </div>

          <div className="col-lg-5">
            <StatusFilter
              value={status}
              onChange={(value) => {
                setStatus(value);

                setPageIndex(1);
              }}
            />
          </div>
        </div>
      </div>

      <div
        className={`row g-4 ${orders.length === 1 ? "justify-content-center" : ""}`}
      >
        {orders.length > 0 ? (
          orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              isAdmin={isAdmin}
              onCancel={openCancelModal}
              onDetails={details}
              onChangeStatus={changeStatus}
            />
          ))
        ) : (
          <div className="col-12">
            <div className="text-center py-5">
              <i
                className="fa-solid fa-box-open text-secondary"
                style={{ fontSize: "80px" }}
              ></i>

              <h3 className="mt-3">No Orders Found</h3>

              <p className="text-muted">Try another search or filter.</p>
            </div>
          </div>
        )}
      </div>
      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-primary  px-4"
          disabled={pageIndex === 1}
          onClick={() => setPageIndex(pageIndex - 1)}
        >
          Previous
        </button>

        <span className="align-self-center">
          Page {pageIndex} of {totalPages}
        </span>

        <button
          className="btn btn-outline-primary ms-2"
          disabled={pageIndex === totalPages}
          onClick={() => setPageIndex(pageIndex + 1)}
        >
          Next
        </button>
      </div>
      <StatusModal
        show={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        onSave={saveStatus}
        saving={savingStatus}
      />

      <CancelOrderModal
        show={showCancelModal}
        orderId={selectedOrderId}
        loading={cancelLoading}
        onClose={() => {
          setShowCancelModal(false);
          setSelectedOrderId(null);
        }}
        onCancel={cancelOrder}
      />
    </div>
  );
}
