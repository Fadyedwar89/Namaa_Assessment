import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import orderService from "../services/orderService";

export default function useCart(products) {
  const navigate = useNavigate();

  const [creatingOrder, setCreatingOrder] = useState(false);

  const [showCart, setShowCart] = useState(false);

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
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem(
      "cart",

      JSON.stringify(cart),
    );
  }, [cart]);
    
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
    return {
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
    };
}
