export default function CartButton({ cartCount, onClick }) {
  return (
    <button className="header-icon-btn cart-btn" onClick={onClick}>
      <i className="fa-solid fa-cart-shopping"></i>

      {cartCount > 0 && <span className="notification-count">{cartCount}</span>}
    </button>
  );
}
