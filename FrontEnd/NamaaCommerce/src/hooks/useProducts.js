import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import productService from "../services/productService";
export default function useProducts() {
    const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  const [pageIndex, setPageIndex] = useState(1);

  const pageSize = 9;

  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");

  const [sortOrder, setSortOrder] = useState(1);

  const [showModal, setShowModal] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [saving, setSaving] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [productToDelete, setProductToDelete] = useState(null);

  const [deleting, setDeleting] = useState(false);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      loadProducts();
    }, 400);

    return () => clearTimeout(timer);
  }, [pageIndex, sortOrder, search]);

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
  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
    };
    const logout = () => {
      localStorage.clear();
      navigate("/login");
  };
  
  return {
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
  };
}
