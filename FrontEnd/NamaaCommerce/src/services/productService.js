import axiosInstance from "../api/axios";

const getProducts = async (
  pageIndex = 1,
  pageSize = 12,
  search = "",
  sortOrder = 1,
) => {
  let url = `Product?PageIndex=${pageIndex}&PageSize=${pageSize}`;

  if (search) {
    url += `&Search=${encodeURIComponent(search)}`;
  }

  if (sortOrder) {
    url += `&SortOrder=${sortOrder}`;
  }

  const { data } = await axiosInstance.get(url);

  return data;
};

const getProductById = async (id) => {
  const { data } = await axiosInstance.get(`Product/${id}`);

  return data;
};

const createProduct = async (product) => {
  const { data } = await axiosInstance.post("Product/CreateProduct", product);

  return data;
};

const updateProduct = async (id, product) => {
  const { data } = await axiosInstance.put(
    `Product/UpdateProduct/${id}`,
    product,
  );

  return data;
};

const deleteProduct = async (id) => {
  await axiosInstance.delete(`Product/${id}`);
};

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

