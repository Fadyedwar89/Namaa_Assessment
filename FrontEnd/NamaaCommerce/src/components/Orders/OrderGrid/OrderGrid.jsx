import OrderCard from "../OrderCard/OrderCard";
import EmptyState from "../../Common/EmptyState";

export default function OrderGrid({
  orders,
  isAdmin,
  onCancel,
  onDetails,
  onChangeStatus,
}) {
  if (orders.length === 0) {
    return (
      <div className="col-12">
        <EmptyState
          icon="fa-solid fa-box-open text-secondary"
          title="No Orders Found"
          description="Try another search or filter."
        />
      </div>
    );
  }

  return (
    <>
      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          isAdmin={isAdmin}
          onCancel={onCancel}
          onDetails={onDetails}
          onChangeStatus={onChangeStatus}
        />
      ))}
    </>
  );
}
