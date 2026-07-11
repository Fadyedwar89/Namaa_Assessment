import { Link } from "react-router-dom";

export default function UserMenu({ displayName, isLoggedIn, onLogout }) {
  return (
    <div className="dropdown user-menu">
      <button className="btn dropdown-toggle" data-bs-toggle="dropdown">
        <i className="fa-solid fa-user me-2"></i>
        {displayName}
      </button>

      <ul className="dropdown-menu dropdown-menu-end">
        <li>
          <Link className="dropdown-item" to="/products">
            <i className="fa-solid fa-box me-2"></i>
            Products
          </Link>
        </li>

        <li>
          <Link className="dropdown-item" to="/orders">
            <i className="fa-solid fa-cart-shopping me-2"></i>
            Orders
          </Link>
        </li>

        <li>
          <hr className="dropdown-divider" />
        </li>

        {isLoggedIn ? (
          <li>
            <button className="dropdown-item text-danger" onClick={onLogout}>
              <i className="fa-solid fa-right-from-bracket me-2"></i>
              Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link className="dropdown-item" to="/login">
                Login
              </Link>
            </li>

            <li>
              <Link className="dropdown-item" to="/register">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}
