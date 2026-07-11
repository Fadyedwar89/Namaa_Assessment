import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import orderService from "../../services/orderService";
import OrderTimeline from "../../components/Orders/OrderTimeline/OrderTimeline";
import StatusModal from "../../components/Orders/StatusModal/StatusModal";
import CancelOrderModal from "../../components/Orders/CancelOrderModal/CancelOrderModal";
import "./OrderDetails.css";

export default function OrderDetails() {
  const { id } = useParams();

  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  const isAdmin = localStorage.getItem("role") === "Admin";

  useEffect(() => {
    loadOrder();
  }, []);

  const loadOrder = async () => {
    try {
      const result = await orderService.getOrderById(id);

      setOrder(result);
    } catch (err) {
      console.log(err);
    }
  };
  const [showCancelModal, setShowCancelModal] = useState(false);

  const [cancelLoading, setCancelLoading] = useState(false);

  const cancelOrder = async () => {
    try {
      setCancelLoading(true);

      await orderService.cancelOrder(id);

      navigate("/orders");
    } finally {
      setCancelLoading(false);
    }
  };
  const updateStatus = async () => {
    try {
      setLoadingStatus(true);

      await orderService.updateStatus(id, selectedStatus);

      await loadOrder();

      setShowStatusModal(false);
    } finally {
      setLoadingStatus(false);
    }
  };
  if (!order) {
    return (
      <div className="loading-page">
        <div className="spinner-border text-primary"></div>
      </div>
    );
  }

  return (
    <div className="order-details-page">
      {/* Header */}

      <div className="details-header">
        <div>
          <h1>
            <i className="fa-solid fa-box-open me-2"></i>
            Order #{order.id}
          </h1>

          <p>Created on {new Date(order.createdAt).toLocaleDateString()}</p>
        </div>

        <div className={`status-chip ${order.status.toLowerCase()}`}>
          <div className="status-dot"></div>

          <div>
            <small>LIVE STATUS</small>

            <h4>{order.status}</h4>

            <span>Updated just now</span>
          </div>
        </div>
      </div>

      {/* Info Cards */}

      <div className="info-grid">
        <div className="info-card">
          <i className="fa-solid fa-user"></i>

          <span>Customer</span>

          <h3>{order.userName}</h3>
        </div>

        <div className="info-card">
          <i className="fa-solid fa-calendar-days"></i>

          <span>Date</span>

          <h3>{new Date(order.createdAt).toLocaleDateString()}</h3>
        </div>

        <div className="info-card">
          <i className="fa-solid fa-dollar-sign"></i>

          <span>Total</span>

          <h3>${order.totalOrder}</h3>
        </div>
      </div>

      {/* Products */}

      <div className="section">
        <h2>
          <i className="fa-solid fa-cart-shopping me-2"></i>
          Order Items
        </h2>

        <div className="products-grid">
          {order.orderItems.map((item) => (
            <div className="product-item-card" key={item.productId}>
              <div className="product-icon">
                <i className="fa-solid fa-box"></i>
              </div>

              <div className="product-info">
                <h4>{item.productName}</h4>

                <p>Product #{item.productId}</p>
              </div>

              <div className="product-meta">
                <span className="qty-badge">x{item.quantity}</span>

                <span className="price-badge">${item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary */}

      <div className="summary-grid">
        <div className="summary-box">
          <i className="fa-solid fa-box-open"></i>

          <span>Total Products</span>

          <h3>{order.orderItems.length}</h3>
        </div>

        <div className="summary-box">
          <i className="fa-solid fa-truck-fast"></i>

          <span>Shipping</span>

          <h3>Free</h3>
        </div>

        <div className="summary-box total-card">
          <i className="fa-solid fa-money-bill-wave"></i>

          <span>Grand Total</span>

          <h2>${order.totalOrder}</h2>
        </div>
      </div>

      <OrderTimeline status={order.status} />
      {/* Buttons */}

      <div className="details-actions">
        <button
          className="action-btn secondary"
          onClick={() => navigate("/orders")}
        >
          <i className="fa-solid fa-arrow-left me-2"></i>
          Back
        </button>

        {isAdmin && (
          <button
            className="action-btn warning"
            onClick={() => {
              setSelectedStatus(order.status);
              setShowStatusModal(true);
            }}
          >
            <i className="fa-solid fa-pen-to-square me-2"></i>
            Change Status
          </button>
        )}

        {!isAdmin && order.status === "Pending" && (
          <button
            className="action-btn danger"
            onClick={() => setShowCancelModal(true)}
          >
            <i className="fa-solid fa-ban me-2"></i>
            Cancel Order
          </button>
        )}
      </div>
      <StatusModal
        show={showStatusModal}
        onClose={() => setShowStatusModal(false)}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        onSave={updateStatus}
        saving={loadingStatus}
      />
      <CancelOrderModal
        show={showCancelModal}
        orderId={id}
        loading={cancelLoading}
        onClose={() => setShowCancelModal(false)}
        onCancel={cancelOrder}
      />
    </div>
  );
}
