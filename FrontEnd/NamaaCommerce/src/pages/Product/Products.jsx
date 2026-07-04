import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import productService from "../../services/productService";
import ProductCard from "../../components/ProductCard/ProductCard";
import SortFilter from "../../components/SortFilter/SortFilter";
import ProductModal from "../../components/ProductModal/ProductModal";
import DeleteProductModal from "../../components/DeleteProductModal/DeleteProductModal";
import CartDrawer from "../../components/CartDrawer/CartDrawer";
import orderService from "../../services/orderService";
import notificationService from "../../services/notificationService";
import notificationApi from "../../services/notificationApi";

import "./Products.css";

export default function Products() {
  const navigate = useNavigate();

  const isAdmin = localStorage.getItem("role") === "Admin";
  const [creatingOrder, setCreatingOrder] = useState(false);
  const [products, setProducts] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [open, setOpen] = useState(false);
  const pageSize = 9;
  const [showCart, setShowCart] = useState(false);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");

  const [sortOrder, setSortOrder] = useState(1);

  const [showModal, setShowModal] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [saving, setSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [productToDelete, setProductToDelete] = useState(null);

  const [deleting, setDeleting] = useState(false);
  const [cart, setCart] = useState([]);
  const createOrder = async () => {
    if (cart.length === 0) return;

    try {
      setCreatingOrder(true);

      await orderService.createOrder(cart);

      setCart([]);

      localStorage.removeItem("cart");

      setShowCart(false);

      navigate("/orders");
    } catch (err) {
      console.log(err);

      alert("Failed to create order.");
    } finally {
      setCreatingOrder(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadProducts();
    }, 400);

    return () => clearTimeout(timer);
  }, [pageIndex, sortOrder, search]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);
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

  useEffect(() => {
    localStorage.setItem(
      "cart",

      JSON.stringify(cart),
    );
  }, [cart]);

  const loadNotifications = async () => {
    try {
      const data = await notificationService.getUnread();

      setNotifications(data);
    } catch (err) {
      console.log(err);
    }
  };

  const editProduct = (product) => {
    setSelectedProduct(product);

    setShowModal(true);
  };

  const openDeleteModal = (product) => {
    setProductToDelete(product);

    setShowDeleteModal(true);
  };

  const deleteProduct = async () => {
    try {
      setDeleting(true);

      await productService.deleteProduct(productToDelete.id);

      setShowDeleteModal(false);

      setProductToDelete(null);

      await loadProducts();
    } catch (err) {
      console.log(err);
    } finally {
      setDeleting(false);
    }
  };

  const addToCart = (product) => {
    const exists = cart.find((x) => x.productId === product.id);

    if (exists) {
      setCart(
        cart.map((item) =>
          item.productId === product.id
            ? {
                ...item,

                quantity: item.quantity + 1,
              }
            : item,
        ),
      );
    } else {
      setCart([
        ...cart,

        {
          productId: product.id,

          productName: product.name,

          price: product.price,

          quantity: 1,
        },
      ]);
    }
  };

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,

    0,
  );

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,

    0,
  );

  const loadProducts = async () => {
    try {
      const result = await productService.getProducts(
        pageIndex,

        pageSize,

        search,

        sortOrder,
      );

      setProducts(result.data);

      setTotalPages(Math.ceil(result.totalCount / pageSize));
    } catch (err) {
      console.log(err);
    }
  };
  const saveProduct = async (form) => {
    try {
      setSaving(true);

      if (selectedProduct) {
        await productService.updateProduct(selectedProduct.id, form);
      } else {
        await productService.createProduct(form);
      }

      setShowModal(false);

      setSelectedProduct(null);

      await loadProducts();
    } catch (err) {
      console.log(err);
    } finally {
      setSaving(false);
    }
  };
  const increaseQuantity = (productId) => {
    const item = cart.find((x) => x.productId === productId);

    if (!item) {
      const product = products.find((p) => p.id === productId);

      if (!product) return;

      addToCart(product);
      return;
    }

    setCart(
      cart.map((item) =>
        item.productId === productId
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  };
  const decreaseQuantity = (productId) => {
    setCart(
      cart.flatMap((item) => {
        if (item.productId !== productId) return item;

        if (item.quantity === 1) return [];

        return {
          ...item,

          quantity: item.quantity - 1,
        };
      }),
    );
  };
  const getQuantity = (productId) => {
    const item = cart.find((x) => x.productId === productId);

    return item ? item.quantity : 1;
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
      <div className="dashboard-header mb-4">
        <div>
          <h2 className="fw-bold">
            <i className="fa-solid fa-box me-2"></i>
            Products
          </h2>

          <p className="text-muted">Browse and manage products</p>
        </div>
        <div className="header-actions">
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

          {!isAdmin && (
            <button
              className="header-icon-btn cart-btn"
              onClick={() => setShowCart(true)}
            >
              <i className="fa-solid fa-cart-shopping"></i>

              {cartCount > 0 && (
                <span className="notification-count">{cartCount}</span>
              )}
            </button>
          )}

          {isAdmin && (
            <button
              className="btn btn-success"
              onClick={() => {
                setSelectedProduct(null);
                setShowModal(true);
              }}
            >
              <i className="fa-solid fa-plus me-2"></i>
              Add Product
            </button>
          )}

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

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-6">
              <input
                className="form-control"
                placeholder="Search products..."
                value={search}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearch(value);
                }}
              />
            </div>

            <div className="col-md-6">
              <SortFilter value={sortOrder} onChange={setSortOrder} />
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              quantity={getQuantity(product.id)}
              isAdmin={isAdmin}
              onEdit={editProduct}
              onDelete={() => openDeleteModal(product)}
              onAddToCart={addToCart}
              onIncrease={increaseQuantity}
              onDecrease={decreaseQuantity}
            />
          ))
        ) : (
          <div className="col-12">
            <div className="empty-products">
              <div className="empty-icon">
                <i className="fa-solid fa-box-open"></i>
              </div>

              <h3>{search ? "No products found" : "No products available"}</h3>

              <p>
                {search
                  ? `We couldn't find any product matching "${search}".`
                  : "There are currently no products in the store."}
              </p>

              {search && (
                <button
                  className="btn btn-primary mt-3"
                  onClick={() => setSearch("")}
                >
                  <i className="fa-solid fa-arrow-rotate-left me-2"></i>
                  Clear Search
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="d-flex justify-content-center mt-5">
        <button
          className="btn btn-outline-primary me-2"
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
      <ProductModal
        show={showModal}
        onClose={() => {
          setShowModal(false);

          setSelectedProduct(null);
        }}
        product={selectedProduct}
        saving={saving}
        onSave={saveProduct}
      />
      <DeleteProductModal
        show={showDeleteModal}
        product={productToDelete}
        deleting={deleting}
        onClose={() => {
          setShowDeleteModal(false);

          setProductToDelete(null);
        }}
        onDelete={deleteProduct}
      />
      <CartDrawer
        show={showCart}
        onClose={() => setShowCart(false)}
        cart={cart}
        total={total}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
        onCreateOrder={createOrder}
        creatingOrder={creatingOrder}
      />
    </div>
  );
}
