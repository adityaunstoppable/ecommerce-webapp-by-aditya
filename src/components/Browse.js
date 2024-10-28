import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useGetProducts from '../api/useGetProducts';
import Shimmer from './Shimmer';
import { addProductToCart, decreaseProductCount } from '../redux-(toolkit)/cartSlice';
import Toast from '../utils/Toast';
import { motion } from 'framer-motion';
import { useSearch } from '../contextApi/searchContext';

const Browse = () => {
  const { filteredProducts, loading } = useGetProducts();
  const dispatch = useDispatch();
  const { searchTerm } = useSearch();
  const [toasts, setToasts] = useState([]);
  const cartItems = useSelector(state => state.cart.cartItems);

  const isProductInCart = (productId) => {
    const product = cartItems.find(item => item.id === productId);
    return product ? product.count : 0;
  };

  const addItemToCartSlice = (product) => {
    dispatch(addProductToCart(product));
    setToasts(prev => [...prev, { message: `${product.title} added successfully`, type: 'success', id: Date.now() }]);
  };

  const handleDecrease = (productId) => {
    const product = cartItems.find(item => item.id === productId);
    if (product) {
      if (product.count > 1) {
        dispatch(decreaseProductCount(productId));
        setToasts(prev => [...prev, { message: `${product.title} count decreased`, type: 'info', id: Date.now() }]);
      } else {
        dispatch(decreaseProductCount(productId));
        setToasts(prev => [...prev, { message: `${product.title} removed successfully`, type: 'error', id: Date.now() }]);
      }
    }
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      setToasts(prev => prev.slice(1));
    }, 2000);
    return () => clearInterval(timer);
  }, [toasts]);

  const filteredBySearchTerm = filteredProducts.filter(product => 
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen p-4">
        <h1 className="text-3xl font-bold text-center mb-10">Ecommerce Store</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-11/12 mx-auto">
          {Array.from({ length: 8 }).map((_, index) => (
            <Shimmer key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <h1 className="text-3xl font-bold text-center mb-10">Ecommerce Store</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-11/12 mx-auto">
        {filteredBySearchTerm.length > 0 ? (
          filteredBySearchTerm.map((product) => {
            const count = isProductInCart(product.id);

            return (
              <div
                key={product.id}
                className="bg-white p-4 rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-200"
              >
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-56 object-contain rounded-md mb-4"
                />
                <h2 className="text-lg font-semibold truncate mb-2">{product.title}</h2>
                <h3 className="text-sm text-gray-500 mb-2 mt-2">
                  <span className="font-bold">Category:</span> {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </h3>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-blue-500 font-bold">${product.price}</span>
                  <div className="flex items-center">
                    {Array.from({ length: 5 }, (_, index) => (
                      <svg
                        key={index}
                        className={`w-4 h-4 ${index < product.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M12 .288l2.833 8.684h9.118l-7.391 5.366 2.834 8.683L12 17.347l-7.399 5.365 2.834-8.683-7.391-5.366h9.118z" />
                      </svg>
                    ))}
                    <span className="text-sm mt-1 text-gray-500 ml-2">{product.rating}</span>
                  </div>
                </div>

                {count > 0 ? (
                  <div className="flex items-center justify-between mb-4">
                    <button
                      className="bg-gray-400 text-white px-2 py-1 rounded mx-1 hover:bg-gray-500"
                      onClick={() => handleDecrease(product.id)}
                    >
                      −
                    </button>
                    <span>{count}</span>
                    <button
                      className="bg-gray-400 text-white px-2 py-1 rounded mx-1 hover:bg-gray-500"
                      onClick={() => addItemToCartSlice(product)}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addItemToCartSlice(product)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md font-semibold transition-all duration-200 transform hover:scale-105"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center text-gray-500">
            <h2>No products found.</h2>
          </div>
        )}
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
    </div>
  );
};

export default Browse;
