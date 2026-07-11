import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useProducts from "../../hooks/useProducts";
import ProductModal from "../../components/Products/ProductModal/ProductModal";
import CartDrawer from "../../components/CartDrawer/CartDrawer";
import DashboardHeader from "../../components/Layout/DashboardHeader/DashboardHeader";
import useNotifications from "../../hooks/useNotifications";
import ProductSearch from "../../components/Products/ProductSearch";
import NotificationBell from "../../components/Notifications/NotificationBell";
import UserMenu from "../../components/Layout/UserMenu";
import Pagination from "../../components/Common/Pagination";
import useCart from "../../hooks/useCart";
import DeleteProductModal from "../../components/Products/DeleteProductModal/DeleteProductModal";
import ProductGrid from "../../components/Products/ProductGrid";
import CartButton from "../../components/Products/Button/CartButton/CartButton";
import AddProductButton from "../../components/Products/Button/AddProductButton/AddProductButton";
import "./Products.css";

export default function Products() {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("role") === "Admin";
  const displayName = localStorage.getItem("displayName");



  const {
    notifications,
    open,
    toggleNotifications,
    markAsRead,
    markAllAsRead,
  } = useNotifications();
  const {
    products,

    pageIndex,
    setPageIndex,

    totalPages,

    search,
    setSearch,

    sortOrder,
    setSortOrder,

    showModal,
    setShowModal,

    selectedProduct,
    setSelectedProduct,

    saving,

    showDeleteModal,
    setShowDeleteModal,

    productToDelete,
    setProductToDelete,

    deleting,

    editProduct,
    openDeleteModal,
    deleteProduct,
    saveProduct,

    loadProducts,
    closeModal,
    closeDeleteModal,
    logout,
  } = useProducts();
  const {
    cart,
    showCart,
    setShowCart,

    total,
    cartCount,

    creatingOrder,

    addToCart,
    increaseQuantity,
    decreaseQuantity,
    getQuantity,

    createOrder,
  } = useCart(products);

  return (
    <div className="container mt-4">
      <DashboardHeader
        title="Products"
        icon={<i className="fa-solid fa-box"></i>}
        subtitle={
          <>
            Welcome back,<strong className="ms-2">{displayName}</strong>
            <br />
            Manage and organize all store products.
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

            {!isAdmin && (
              <CartButton
                cartCount={cartCount}
                onClick={() => setShowCart(true)}
              />
            )}

            {isAdmin && (
              <AddProductButton
                onClick={() => {
                  setSelectedProduct(null);
                  setShowModal(true);
                }}
              />
            )}

            <UserMenu
              displayName={displayName}
              isLoggedIn={!!token}
              onLogout={logout}
            />
          </div>
        }
      />

      <ProductSearch
        search={search}
        onSearchChange={setSearch}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />

      <ProductGrid
        products={products}
        isAdmin={isAdmin}
        onEdit={editProduct}
        onDelete={openDeleteModal}
        onAddToCart={addToCart}
        onIncrease={increaseQuantity}
        onDecrease={decreaseQuantity}
        getQuantity={getQuantity}
      />

      <Pagination
        page={pageIndex}
        totalPages={totalPages}
        onPrevious={() => setPageIndex((prev) => prev - 1)}
        onNext={() => setPageIndex((prev) => prev + 1)}
      />

      <ProductModal
        show={showModal}
        onClose={closeModal}
        product={selectedProduct}
        saving={saving}
        onSave={saveProduct}
      />

      <DeleteProductModal
        show={showDeleteModal}
        product={productToDelete}
        deleting={deleting}
        onClose={closeDeleteModal}
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
