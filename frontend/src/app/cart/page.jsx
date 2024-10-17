'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Minus, Plus, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Separator } from "@/components/ui/Separator"
import Footer from '@/components/ui/Footer'
import Header from '@/components/ui/Header'
import { useRouter } from 'next/navigation'

const CART_STORAGE_KEY = 'cartItems'

export default function CartPage() {
    const [cartItems, setCartItems] = useState([]);
    const router = useRouter()
    const [count, setCount] = useState(0)
    useEffect(() => {
        const storedCart = localStorage.getItem(CART_STORAGE_KEY)
        if (storedCart) {
            setCount(JSON.parse(storedCart).length)
        }
    }, [])
    // Load cart items from localStorage on initial render
    useEffect(() => {
        const storedCart = localStorage.getItem(CART_STORAGE_KEY)
        if (storedCart) {
            setCartItems(JSON.parse(storedCart))
        }
    }, [])

    const updateQuantity = (id, newQuantity) => {
        console.log(newQuantity, id)
        const items = cartItems.map(item =>
            item._id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
        )
        setCartItems(items)
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
    }

    const removeItem = (id) => {
        const items = cartItems.filter(item => item._id !== id)
        setCartItems(items)
        setCount(count - 1)
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))

    }

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const tax = subtotal * 0.1 // Assuming 10% tax
    const total = subtotal + tax;


    const handleCheckout = () => {
        router.push("/checkout")
    }

    return (
        <div>
            <Header count={count} />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        {cartItems.length === 0 ?
                            <div className="flex-grow">
                                <h3 className="font-semibold">No Items in the Cart</h3>
                                <p className="text-gray-600"></p>
                            </div>
                            : cartItems.map((item) => (
                                <Card key={item._id} className="mb-4">
                                    <CardContent className="p-4">
                                        <div className="flex items-center">
                                            <div className="relative w-24 h-24 mr-4">
                                                <Image
                                                    src={item.images[0]}
                                                    alt={item.name}
                                                    layout="fill"
                                                    objectFit="cover"
                                                    className="rounded-md"
                                                />
                                            </div>
                                            <div className="flex-grow">
                                                <h3 className="font-semibold">{item.name}</h3>
                                                <p className="text-gray-600">${item.price.toFixed(2)}</p>
                                            </div>
                                            <div className="flex items-center">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                >
                                                    <Minus className="h-4 w-4" />
                                                </Button>
                                                <Input
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
                                                    className="w-16 mx-2 text-center"
                                                />
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                >
                                                    <Plus className="h-4 w-4" />
                                                </Button>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="ml-4"
                                                onClick={() => removeItem(item._id)}
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                    </div>
                    <div>
                        <Card>
                            <CardContent className="p-4">
                                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span> ₹{subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Tax</span>
                                        <span> ₹{tax.toFixed(2)}</span>
                                    </div>
                                    <Separator className="my-2" />
                                    <div className="flex justify-between font-semibold">
                                        <span>Total</span>
                                        <span> ₹{total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full bg-black text-white" onClick={handleCheckout}>Proceed to Checkout</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
