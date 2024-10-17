'use client'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Truck } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Footer from "@/components/ui/Footer"

export default function ThankYouPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const address = JSON.parse(searchParams.get('address'));

    const orderNumber = "ORD-12345"


    useEffect(() => {
        if (!address) {
            router.push("/")
        }
    }, [])

    return (
        <div className="">
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <Card className="w-full max-w-2xl">
                    <CardHeader className="text-center">
                        <div className="mx-auto mb-4 bg-green-100 rounded-full p-2 w-16 h-16 flex items-center justify-center">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-green-600">Order Placed Successfully!</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="text-center">
                            <p className="text-lg">Thank you for your order.</p>
                            <p className="text-sm text-gray-600">Order number: {orderNumber}</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="flex items-center mb-2">
                                <Truck className="w-5 h-5 mr-2 text-blue-600" />
                                <h3 className="text-lg font-semibold">Delivery Address</h3>
                            </div>
                            {address &&
                                <address className="not-italic">
                                    {address.firstName} {address.lastName}<br />
                                    {address.address} <br />
                                    {address.city},  {address.zipCode}<br />
                                </address>
                            }
                        </div>

                        <div className="text-center space-y-2">
                            <p>{`We'll`} send you shipping confirmation when your item(s) are on the way!</p>
                            <p className="text-sm text-gray-600">
                                You can check your order status at any time by visiting your account.
                            </p>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-center space-x-4">
                        <Button asChild className="bg-black text-white">
                            <Link href="/">View Order</Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="/">Continue Shopping</Link>
                        </Button>
                    </CardFooter>
                </Card>
            </div>
            <Footer />
        </div >
    )
}