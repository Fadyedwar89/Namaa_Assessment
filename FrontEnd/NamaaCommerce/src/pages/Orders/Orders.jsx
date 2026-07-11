import "./Orders.css";
import useOrders from "../../hooks/useOrders";
import { useNavigate } from "react-router-dom";
import OrdersStatistics from "../../components/Orders/OrdersStatistics/OrdersStatistics";
import DashboardHeader from "../../components/Layout/DashboardHeader";
import OrderSearch from "../../components/Orders/OrderSearch";
import OrderGrid from "../../components/Orders/OrderGrid";
import StatusFilter from "../../components/Orders/StatusFilter/StatusFilter";
import useNotifications from "../../hooks/useNotifications";
import NotificationBell from "../../components/Notifications/NotificationBell";
import UserMenu from "../../components/Layout/UserMenu";
import StatusModal from "../../components/Orders/StatusModal/StatusModal";
import Pagination from "../../components/Common/Pagination";
import CancelOrderModal from "../../components/Orders/CancelOrderModal/CancelOrderModal";
export default function Orders() {
  const token = localStorage.getItem("token");

  const displayName = localStorage.getItem("displayName");

  const role = localStorage.getItem("role");

  const isAdmin = role === "Admin";
 
  const {
    notifications,
    open,
    toggleNotifications,
    markAsRead,
    markAllAsRead,
  } = useNotifications();
const {
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

  selectedStatus,
  setSelectedStatus,

  savingStatus,
  saveStatus,

  showStatusModal,
  showCancelModal,
  selectedOrderId,

  closeStatusModal,
  closeCancelModal,

  cancelLoading,

  openCancelModal,
  cancelOrder,

  logout,
  changeStatus,
  details,

  statistics,
  
} = useOrders();
  return (
    <div className="container mt-4">
      <DashboardHeader
        title="Orders"
        icon={<i className="fa-solid fa-boxes-stacked" />}
        subtitle={
          <>
            Welcome back,
            <strong className="ms-2">{displayName}</strong>
            <br/>
            Manage and monitor all customer orders from one place.
          </>
        }
        actions={
          <div className="header-actions">
            <NotificationBell
              open={open}
              notifications={notifications}
              onToggle={toggleNotifications}
              onRead={markAsRead}
              onReadAll={markAllAsRead}
            />

            <UserMenu
              displayName={displayName}
              isLoggedIn={!!localStorage.getItem("token")}
              onLogout={logout}
            />
          </div>
        }
      />

      {isAdmin && <OrdersStatistics statistics={statistics} />}

      <div className="filter-panel mb-5">
        <div className="row g-4 align-items-center">
          <div className="col-lg-7">
            <OrderSearch
              value={searchId}
              onChange={(value) => {
                setSearchId(value);

                if (value === "") {
                  loadOrders();
                  return;
                }

                if (!isNaN(value)) {
                  searchOrder(value);
                }
              }}
              onClear={() => {
                setSearchId("");
                loadOrders();
              }}
            />
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
        <OrderGrid
          orders={orders}
          isAdmin={isAdmin}
          onCancel={openCancelModal}
          onDetails={details}
          onChangeStatus={changeStatus}
        />
      </div>

      {/* paginat */}
      <Pagination
        page={pageIndex}
        totalPages={totalPages}
        onPrevious={() => setPageIndex((prev) => prev - 1)}
        onNext={() => setPageIndex((prev) => prev + 1)}
      />

      <StatusModal
        show={showStatusModal}
        onClose={closeStatusModal}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        onSave={saveStatus}
        saving={savingStatus}
      />

      <CancelOrderModal
        show={showCancelModal}
        orderId={selectedOrderId}
        loading={cancelLoading}
        onClose={closeCancelModal}
        onCancel={cancelOrder}
      />
    </div>
  );
}
