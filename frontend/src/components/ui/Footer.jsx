import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-gray-100 border-t">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="font-semibold mb-4">TAK STORE</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-600 hover:text-gray-900">Home</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900">About</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900">Terms & Conditions</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Customer Service</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-600 hover:text-gray-900">Shipping & Return Policy</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900">FAQ</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Customer Service</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-600 hover:text-gray-900">Shipping & Return Policy</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900">FAQ</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold mb-4">Customer Service</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-600 hover:text-gray-900">Shipping & Return Policy</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-600 hover:text-gray-900">FAQ</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t text-center text-gray-500">
                    <p>&copy; 2024-2025 TAK, Inc. All rights reserved.</p>
                </div>
            </div>
        </footer>)
}

export default Footer