import React, { useEffect, useState } from 'react'
import { ShoppingCart, Search } from 'lucide-react'
import Link from 'next/link';
import { Input } from "./input"
import { Button } from "./button"
import { isTokenExpired } from '@/utils/authToken';
import { logout } from '@/api/auth';
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import { getUserData } from '@/api/user';


const Header = ({ search = false, setSearch, value, count = 0 }) => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(false);
    const auth = !isTokenExpired();
    const [userDetail, setUserDetail] = useState({})

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

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
        fetchUserDetails()
    }, [])


    return (
        <header className="bg-white border-b">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link href="/">
                        <h1 className="text-xl font-bold">TAK STORE</h1>
                    </Link>
                    {/* <nav>
                        <ul className="flex space-x-4">
                            <li><a href="#" className="text-gray-600 hover:text-gray-900">All</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900">Shirts</a></li>
                        </ul>
                    </nav> */}
                </div>
                <div className="flex items-center space-x-4">
                    {search &&
                        <div className="relative">
                            <Input
                                type="search"
                                placeholder="Search for products..."
                                className="pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                value={value}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        </div>
                    }
                    <Button variant="ghost" size="icon">
                        <Link href="/cart">
                            <div className='relative'>
                                <ShoppingCart className="h-6 w-6" />
                                {count > 0 && (
                                    <span className="absolute bottom-4 left-4 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                                        {count}
                                    </span>
                                )}
                                <span className="sr-only"></span>
                            </div>
                        </Link>
                    </Button>
                    <div className="relative">
                        {/* Circular user button */}
                        <button
                            className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center focus:outline-none"
                            onClick={toggleDropdown}
                        >
                            {/* Placeholder for user avatar or icon, replace with your preferred icon */}
                            <span className="text-sm font-bold">{userDetail ? userDetail?.name?.[0] : "A"}</span>
                        </button>

                        {/* Dropdown menu */}
                        {isOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg">
                                <ul className="py-1 text-gray-700">
                                    {auth &&
                                        <li>
                                            <Link href="/user-profile" className="block px-4 py-2 hover:bg-gray-100">
                                                User Profile
                                            </Link>
                                        </li>
                                    }

                                    {
                                        !auth && <>

                                            <li>
                                                <Link href="/login" className="block px-4 py-2 hover:bg-gray-100">
                                                    Login
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/register" className="block px-4 py-2 hover:bg-gray-100">
                                                    Register
                                                </Link>
                                            </li>
                                        </>
                                    }

                                    {auth &&
                                        <li>
                                            <button onClick={() => {
                                                logout(); router.push("/login")
                                            }} className="w-full  text-start block px-4 py-2 hover:bg-gray-100">
                                                LogOut
                                            </button>
                                        </li>
                                    }
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header