// src/components/Sidebar.js
import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { logout } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
// import HamburgerIcon from '../assets/icons/hamburger.svg'; // Use an appropriate icon

const Sidebar = () => {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(true);


    // Detect screen size on initial load and resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setIsOpen(false); // Close sidebar on smaller screens
            } else {
                setIsOpen(true); // Open sidebar on larger screens
            }
        };

        // Call resize handler on load
        handleResize();

        // Add event listener to handle window resizing
        window.addEventListener('resize', handleResize);

        // Clean up event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            {/* Hamburger icon for mobile view */}
            <div className="hamburger-menu" onClick={toggleSidebar}>
                {/* <img src={HamburgerIcon} alt="Toggle Menu" /> */} hamburgericon
            </div>

            {/* Sidebar component */}
            <div className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h2>CMS Dashboard</h2>
                </div>
                <ul className="sidebar-menu">
                    <li>
                        <a href="/dashboard">Dashboard</a>
                    </li>
                    <li>
                        <a href="/add-product">Add Product</a>
                    </li>
                    <li>
                        <button onClick={() => { logout(); navigate('/login') }}>Logout</button>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
