"use client"
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Footer from '@/components/ui/Footer';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { X } from 'lucide-react'
import Header from '@/components/ui/Header';

const CART_STORAGE_KEY = 'cartItems'

export default function CheckoutPage() {
    const router = useRouter();
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [cartItems, setCartItems] = useState([]);
    const [address, setAddress] = useState({ firstName: "", lastName: "", address: "", city: "", zipCode: "" });
    const [cardDetails, setCardDetails] = useState({ cardNumber: "", cvv: "", exp: "" })

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const tax = subtotal * 0.1
    const total = subtotal + tax;

    useEffect(() => {
        const storedCart = localStorage.getItem(CART_STORAGE_KEY);
        const parsedProducts = JSON.parse(storedCart)
        if (parsedProducts.length > 0) {
            setCartItems(parsedProducts)
        } else {
            toast.error("No items in cart to proceed! Redirecting..");
            router.push("/")
        }
    }, []);

    const handleAddress = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setAddress({ ...address, [name]: value })
    }

    const handleCardDetails = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setCardDetails({ ...address, [name]: value })
    }


    const handlePlaceOrder = () => {
        console.log(address)
        if (!address.firstName || !address.lastName || !address.address || !address.city || !address.zipCode) {
            return toast.error("All the fields are reuired for address!")
        }

        if (paymentMethod === "card" && (!cardDetails.cardNumber || !cardDetails.cvv || !cardDetails.exp)) {
            return toast.error("All the fields are required for card!")
        }

        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify([]))
        router.push(
            `/thank-you?address=${JSON.stringify(address)}`,
        );


    }


    return (
        <div >
            <Header count={cartItems.length || 0} />
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <Card className="w-full max-w-2xl">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Checkout</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Shipping Address</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">First Name</Label>
                                    <Input id="firstName" placeholder="John" name='firstName' value={address.firstName} onChange={handleAddress} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" placeholder="Doe" name="lastName" value={address.lastName} onChange={handleAddress} />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Address</Label>
                                <Input id="address" placeholder="123 Main St" name="address" value={address.address} onChange={handleAddress} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input id="city" placeholder="New York" name="city" value={address.city} onChange={handleAddress} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="zipCode">ZIP Code</Label>
                                    <Input id="zipCode" placeholder="10001" name="zipCode" value={address.zipCode} onChange={handleAddress} />
                                </div>
                            </div>
                        </div>

                        <Separator />

                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold">Payment Method</h3>
                            <RadioGroup defaultValue="cod" onValueChange={setPaymentMethod}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="cod" id="cod" />
                                    <Label htmlFor="cod">Cash on Delivery (COD)</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="card" id="card" />
                                    <Label htmlFor="card">Credit/Debit Card</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        {paymentMethod === "card" && (
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="cardNumber">Card Number</Label>
                                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" name="cardNumber" value={cardDetails.cardNumber} onChange={handleCardDetails} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="expiryDate">Expiry Date</Label>
                                        <Input id="expiryDate" placeholder="MM/YY" name="exp" value={cardDetails.exp} onChange={handleCardDetails} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="cvv">CVV</Label>
                                        <Input id="cvv" placeholder="123" name="cvv" value={cardDetails.cvv} onChange={handleCardDetails} />
                                    </div>
                                </div>
                            </div>
                        )}
                        {cartItems && cartItems.length > 0 && cartItems.map((item) => (
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
                                    </div>
                                </CardContent>
                            </Card>))}
                        <div className="space-y-2">
                            <h3 className="text-lg font-semibold">Order Summary</h3>
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>₹{subtotal}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Tax</span>
                                <span>₹{tax.toFixed(2)}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-semibold">
                                <span>Total</span>
                                <span>₹{total.toFixed(2)}</span>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full bg-black text-white" onClick={handlePlaceOrder}>Place Order</Button>
                    </CardFooter>
                </Card>
            </div>
            <Footer />
        </div>
    );
}
