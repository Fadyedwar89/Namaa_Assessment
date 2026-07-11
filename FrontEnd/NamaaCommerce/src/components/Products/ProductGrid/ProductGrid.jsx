import ProductCard from "../ProductCard/ProductCard";
import EmptyState from "../../Common/EmptyState";

export default function ProductGrid({
  products,
  isAdmin,
  onEdit,
  onDelete,
  onAddToCart,
  onIncrease,
  onDecrease,
  getQuantity,
}) {
  if (products.length === 0) {
    return (
      <EmptyState
        icon="fa-solid fa-box-open"
        title="No Products Found"
        description="Try another search."
      />
    );
  }

  return (
    <div className="row g-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isAdmin={isAdmin}
          quantity={getQuantity(product.id)}
          onEdit={onEdit}
          onDelete={onDelete}
          onAddToCart={onAddToCart}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
        />
      ))}
    </div>
  );
}
