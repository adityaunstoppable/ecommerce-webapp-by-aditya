import React, { useState, useEffect, useRef } from 'react';
import { FiShoppingCart, FiFilter, FiHome } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory } from '../redux-(toolkit)/categoriesSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSearch } from '../contextApi/searchContext';
import { logout } from '../redux-(toolkit)/authSlice';
import { motion } from 'framer-motion';
import Toast from '../utils/Toast';
import { BROWSE_PATH, CART_PATH, SIGNIN_PATH } from '../utils/contants';

const Header = ({ userName }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const [toasts, setToasts] = useState([]);
    const email = useSelector((state) => state.auth.email); // Access email from Redux state

    const { searchTerm, setSearchTerm } = useSearch();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { selectedCategory, categoriesList } = useSelector(state => state?.categories);
    const cartItems = useSelector(state => state.cart.cartItems);
    const totalCount = cartItems.reduce((total, item) => total + item.count, 0);

    const onLogout = () => {
        dispatch(logout());
        const logoutToast = { message: `Logging out ${email}`, type: 'info', id: Date.now() };
        setToasts(prev => [...prev, logoutToast]);

        // Set a timeout to remove the toast after 2 seconds
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== logoutToast.id));
            navigate(SIGNIN_PATH);
        }, 2000);
    };

    const handleCategoryChange = (category) => {
        dispatch(setCategory(category === 'Remove Filter' ? '' : category.charAt(0).toUpperCase() + category.slice(1)));
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 shadow-md py-4 px-6 flex justify-between items-center">
            <div className="flex items-center space-x-4">
                <button onClick={() => navigate(BROWSE_PATH)} className="text-gray-700 hover:text-blue-600 transition">
                    <FiHome size={30} />
                </button>
            </div>

            {location.pathname === BROWSE_PATH && (
                <>
                    <div className="flex-1 mx-4 ml-20">
                        <input
                            type="text"
                            placeholder="Search for products"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-3/4 md:w-1/2 py-2 px-4 bg-gray-200 rounded-lg outline-none"
                        />
                    </div>

                    <div className="relative inline-block text-left mr-10" ref={dropdownRef}>
                        <button
                            className="flex items-center justify-center w-60 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            aria-haspopup="true"
                            aria-expanded={isDropdownOpen}
                        >
                            <span>{selectedCategory || 'Filter by Categories'}</span>
                            <FiFilter className="ml-1" />
                        </button>

                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-60 bg-white rounded-md shadow-lg z-10">
                                <ul className="py-1 text-gray-700">
                                    {categoriesList.map((category) => (
                                        <li
                                            key={category}
                                            onClick={() => handleCategoryChange(category)}
                                            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                        >
                                            {category.charAt(0).toUpperCase() + category.slice(1)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center space-x-6 ml-4">
                        <button
                            className="relative mr-2 text-white hover:text-gray-200 transition"
                            onMouseEnter={() => setIsTooltipVisible(true)}
                            onMouseLeave={() => setIsTooltipVisible(false)}
                            onClick={() => navigate(CART_PATH)}
                        >
                            <FiShoppingCart size={24} />
                            <span className={`absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold`}>
                                {totalCount > 99 ? '99+' : totalCount}
                            </span>
                            {isTooltipVisible && (
                                <div className="absolute left-1/2 transform -translate-x-1/2 translate-y-1 mt-1 w-32 text-center text-black bg-green-200 rounded-md py-1 text-xs">
                                    Go to My Cart
                                </div>
                            )}
                        </button>
                    </div>
                </>
            )}

            <div className="flex items-center space-x-6 ml-4">
                <span className="text-white font-medium">{email}</span>
                <button
                    onClick={onLogout}
                    className="text-red-200 mr-10 hover:text-red-100 transition font-medium"
                >
                    Logout
                </button>
            </div>

            <div className="fixed top-20 right-6 space-y-2 z-50">
                {toasts.map((toast) => (
                    <motion.div
                        key={toast.id}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Toast
                            message={toast.message}
                            type={toast.type}
                            onClose={() => setToasts(toasts.filter(t => t.id !== toast.id))}
                        />
                    </motion.div>
                ))}
            </div>
        </header>
    );
};

export default Header;
