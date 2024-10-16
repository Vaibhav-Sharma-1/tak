"use client";
import React, { useEffect, useState } from 'react'
import { ShoppingCart, Search } from 'lucide-react'
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { getProducts } from '../api/products';
import Footer from '@/components/ui/Footer';
import Link from 'next/link';
import { toast } from 'react-toastify';
import Header from '@/components/ui/Header';
const CART_STORAGE_KEY = 'cartItems'

export default function Home() {
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(0)
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  useEffect(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY)
    if (storedCart) {
        setCount(JSON.parse(storedCart).length)
    }
}, [])

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts(currentPage, 9);
      console.log(data)
      setProducts(data?.products);
      setFilteredProducts(data?.products); // Initially set filteredProducts to all products
      setCurrentPage(data?.currentPage);
      setTotalPages(data?.totalPages);
      setTotalProducts(data?.totalProducts);
      setLoading(false);
    } catch (err) {
      setError(err?.response?.data?.message || err?.message || "Failed to login");
      setLoading(false);
    }
  };

  const addToCart = (product) => {
    // Retrieve existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];

    // Check if the product already exists in the cart
    const existingProductIndex = existingCart.findIndex(item => item._id === product._id);

    if (existingProductIndex > -1) {
      toast.success("Product already in cart");
    } else {
      // If it doesn't exist, add the new product
      existingCart.push({ ...product, quantity: 1 });
      toast.success("Added to cart");
      setCount(count + 1)
    }
    // Save the updated cart back to localStorage
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(existingCart));
  };

  // Filter products based on search input
  useEffect(() => {
    if (search === "") {
      setFilteredProducts(products); // Show all products if search is empty
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [search, products]);

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  return (
    <div className="min-h-screen flex flex-col">
    <Header search={true} setSearch={setSearch} value={search} count={count}/>
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
          <main className="flex-grow container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (

                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <Link href={`/products/${product._id}`} key={index}>
                    <img src={product.images[0]} alt={product.name} className="w-full  h-48 object-contain mb-4 rounded " />
                  </Link>
                  <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-bold"> ₹{product.price.toFixed(2)} INR</span>
                    <Button variant="outline" onClick={() => addToCart(product)}>Add to Cart</Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pagination">
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => handlePageChange(index + 1)}
                  className={currentPage === index + 1 ? 'active' : ''}
                >
                  {index + 1}
                </button>
              ))}
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          </main>
      }
      <Footer />
    </div >
  );
}
