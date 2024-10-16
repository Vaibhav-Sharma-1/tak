import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import ProductList from '../components/Products/ProductList';
import { getProducts } from '../api/products';
import "../css/dashboard.css"
const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts(currentPage,9);
      console.log(data)
      setProducts(data?.products);
      setCurrentPage(data?.currentPage);
      setTotalPages(data?.totalPages);
      setTotalProducts(data?.totalProducts);
      setLoading(false);
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to login");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  return (
    <Layout>
      {loading ?
        <div className="loading-container">
          <div className="spinner"></div>
          Loading...
        </div>
        : error ?
          <div className="error-container">
            <div className="error-icon">⚠️</div>
            <h2>Error</h2>
            <p>{error}</p>
          </div>
          :
          <ProductList products={products}  currentPage={currentPage} onPageChange={setCurrentPage} totalPages={totalPages} totalProducts={totalProducts} />
      }
    </Layout>
  )
}

export default Dashboard