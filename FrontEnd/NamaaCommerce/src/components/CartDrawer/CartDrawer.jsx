import "./CartDrawer.css";

export default function CartDrawer({
  show,
  onClose,
  cart,
  total,
  onIncrease,
  onDecrease,
  onCreateOrder,
  creatingOrder,
}) {
  return (
    <>
      <div
        className={`drawer-overlay ${show ? "show" : ""}`}
        onClick={onClose}
      ></div>

      <div className={`cart-drawer ${show ? "open" : ""}`}>
        <div className="drawer-header">
          <h3>
            <i className="fa-solid fa-cart-shopping me-2"></i>
            Your Cart
          </h3>

          <button className="btn-close" onClick={onClose}>
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div className="drawer-body">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <i className="fa-solid fa-cart-shopping"></i>

              <h5>Your cart is empty</h5>
            </div>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.productId}>
                <div>
                  <h6>{item.productName}</h6>

                  <small>${item.price}</small>
                </div>

                <div className="qty-control">
                  <button onClick={() => onDecrease(item.productId)}>-</button>

                  <span>{item.quantity}</span>

                  <button onClick={() => onIncrease(item.productId)}>+</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="drawer-footer">
          <h4>Total : ${total.toFixed(2)}</h4>

          <button
            className="btn btn-success w-100"
            disabled={!cart.length || creatingOrder}
            onClick={onCreateOrder}
          >
            {creatingOrder ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Creating...
              </>
            ) : (
              <>
                <i className="fa-solid fa-check me-2"></i>
                Create Order
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
