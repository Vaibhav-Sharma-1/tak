'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react'
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import Footer from '@/components/ui/Footer'
import { useParams } from 'next/navigation'
import { getProduct } from '@/api/products'
import { toast } from 'react-toastify'
import Header from '@/components/ui/Header'

export default function ProductPage() {
    const CART_STORAGE_KEY = 'cartItems'
    const { id } = useParams();

    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    const [magnifyPosition, setMagnifyPosition] = useState({ x: 0, y: 0 });
    const [product, setProduct] = useState({})
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(0)

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
        const x = ((e.pageX - left) / width) * 100
        const y = ((e.pageY - top) / height) * 100
        setMagnifyPosition({ x, y })
    }

    const nextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
        )
    }

    const prevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
        )
    }

    const fetchProduct = async () => {
        setLoading(true)
        try {
            const data = await getProduct(id);
            setLoading(false);
            setProduct(data)

        } catch (err) {
            toast.error(err?.response?.data?.message || err?.message || "Failed to Fetch Product");
            setLoading(false);
        }
    }
    const addToCart = (product) => {
        // Retrieve existing cart from localStorage
        const existingCart = JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];

        // Check if the product already exists in the cart
        const existingProductIndex = existingCart.findIndex(item => item._id === product._id);

        if (existingProductIndex > -1) {
            // If it exists, update the quantity
            existingCart[existingProductIndex].quantity += product.quantity;
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
    useEffect(() => {
        const storedCart = localStorage.getItem(CART_STORAGE_KEY)
        if (storedCart) {
            setCount(JSON.parse(storedCart).length)
        }
    }, [])
    useEffect(() => {
        fetchProduct()
    }, [])

    return (
        <div>
            <Header count={count}/>
            {loading ?
                <div className="loading-container">
                    <div className="spinner"></div>
                    Loading...
                </div> :
                product && <div className="container mx-auto px-4 py-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="relative">
                            <div
                                className="relative w-full h-[400px] overflow-hidden rounded-lg"
                                onMouseMove={handleMouseMove}
                            >
                                <Image
                                    src={product.images[currentImageIndex]}
                                    alt={product.name}
                                    layout="fill"
                                    objectFit="contain"
                                    className="transition-transform duration-500 ease-in-out transform hover:scale-110"
                                />
                                <div
                                    className="absolute inset-0 bg-no-repeat bg-cover opacity-0 hover:opacity-100 transition-opacity duration-300"
                                    style={{
                                        backgroundImage: `url(${product.images[currentImageIndex]})`,
                                        backgroundPosition: `${magnifyPosition.x}% ${magnifyPosition.y}%`,
                                        backgroundSize: '200%'
                                    }}
                                />
                            </div>
                            <Button
                                variant="outline"
                                size="icon"
                                className="absolute top-1/2 left-2 transform -translate-y-1/2"
                                onClick={prevImage}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outline"
                                size="icon"
                                className="absolute top-1/2 right-2 transform -translate-y-1/2"
                                onClick={nextImage}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                            <div className="flex justify-center mt-4 space-x-2">
                                {product.images.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-blue-600' : 'bg-gray-300'}`}
                                        onClick={() => setCurrentImageIndex(index)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                            <p className="text-gray-600 mb-4">{product.description}</p>
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-2xl font-bold"> ₹{product.price.toFixed(2)}</span>
                                <Badge variant="destructive">{product.category}</Badge>
                            </div>
                            <div className="space-y-2 mb-4">
                                <p><strong>Brand:</strong> {product.brand}</p>
                                <p><strong>In Stock:</strong> {product.stock}</p>
                            </div>
                            <Button className="w-full bg-black text-white" onClick={()=>addToCart(product)}>
                                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                            </Button>
                        </div>
                    </div>
                    {/* <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="relative w-full h-48 mb-4">
                  <Image
                    src="/placeholder.svg?height=200&width=200"
                    alt="Related Product"
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <h3 className="font-semibold mb-2">Related Product {index + 1}</h3>
                <p className="text-sm text-gray-600 mb-2">Brief description of the related product.</p>
                <span className="font-bold">${(Math.random() * 100).toFixed(2)}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div> */}

                </div>}
            <Footer />
        </div>
    )
}
