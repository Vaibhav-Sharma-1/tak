'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Mail } from "lucide-react"
import Header from "@/components/ui/Header"
import Footer from "@/components/ui/Footer"
import { useEffect, useState } from "react"
import { getUserData } from "@/api/user"
import { toast } from "react-toastify"
import { logout } from "@/api/auth"
import { useRouter } from "next/navigation"

export default function UserProfile() {
    const CART_STORAGE_KEY = 'cartItems'

    const [userDetail, setUserDetail] = useState({});
    const [count, setCount] = useState(0)

    const router = useRouter()

    const fetchUserDetails = async () => {
        try {

            const data = await getUserData();
            setUserDetail(data);
            console.log('data>>', data)

        } catch (err) {
            toast.error(err?.response?.data?.message || err?.message || "Failed to fetch user details");
        }
    }

    useEffect(() => {
        const storedCart = localStorage.getItem(CART_STORAGE_KEY)
        if (storedCart) {
            setCount(JSON.parse(storedCart).length)
        }
    }, [])

    useEffect(() => {
        fetchUserDetails()
    }, [])
    return (
        <div >
            <Header count={count}/>
            <div className="my-6 flex items-center justify-center p-4">
                <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-xl">
                    <CardHeader className="text-center pb-0">
                        <div className="mx-auto mb-4">
                            <button
                                className="h-14 w-14 rounded-full bg-gray-200 flex items-center justify-center focus:outline-none"
                            >
                                {/* Placeholder for user avatar or icon, replace with your preferred icon */}
                                <span className="text-lg font-bold">{userDetail ? userDetail?.name?.[0] : "A"}</span>
                            </button>
                        </div>
                        <CardTitle className="text-3xl font-bold text-gray-800 mb-1">{userDetail?.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <div className="flex items-center justify-center space-x-2 text-gray-600 mt-4">
                            <Mail className="w-5 h-5 text-teal-500" />
                            <span className="text-lg">{userDetail?.email}</span>
                        </div>
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <button onClick={() => { logout(); router.push("/login") }} className="text-sm text-gray-500">
                                Logout
                            </button>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Footer />
        </div>
    )
}
