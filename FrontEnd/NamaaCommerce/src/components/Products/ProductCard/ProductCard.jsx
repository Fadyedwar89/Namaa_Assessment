import "./ProductCard.css";
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
export default function ProductCard({
  product,
  isAdmin,
  quantity =1,
  onIncrease,
  onDecrease,
  onAddToCart,
  onEdit,
  onDelete,
}) {
  return (
    <div className="col-lg-4 col-md-6">
      <div className="product-card">
        <div className="product-header">
          <div className="product-icon">
            <i className="fa-solid fa-box"></i>
          </div>

          <span
            className={`stock-badge ${
              product.stock > 0 ? "in-stock" : "out-stock"
            }`}
          >
            {product.stock > 0 ? `${product.stock} In Stock` : "Out Of Stock"}
          </span>
        </div>

        <div className="product-body">
          <h4>{product.name}</h4>

          <p>{product.description}</p>

          <h3>${product.price}</h3>
        </div>

        {isAdmin ? (
          <div className="product-footer">
            <button className="btn btn-warning" onClick={() => onEdit(product)}>
              <i className="fa-solid fa-pen"></i>
            </button>

            <button
              className="btn btn-danger"
              onClick={() => onDelete(product)}
            >
              <i className="fa-solid fa-trash"></i>
            </button>
          </div>
        ) : (
          <div className="product-footer">
            <div className="quantity-box">
              <button onClick={() => onDecrease(product.id)}>-</button>

              <span>{quantity}</span>

              <button onClick={() => onIncrease(product.id)}>+</button>
            </div>

            <button
              className="btn btn-primary"
              disabled={product.stock === 0}
              onClick={() => onAddToCart(product)}
            >
              <i className="fa-solid fa-cart-plus me-2"></i>
              Add
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
