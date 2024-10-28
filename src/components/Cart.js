import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteProductFromCart, addProductToCart, decreaseProductCount } from '../redux-(toolkit)/cartSlice';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Modal from '../utils/OrderPlacedModal';
import { REVIEW_PATH } from '../utils/contants';

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [showModal, setShowModal] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  const totalPrice = cartItems.reduce((total, product) => total + product.price * product.count, 0);

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > 0) {
      const product = cartItems.find((item) => item.id === id);
      if (product) dispatch(addProductToCart({ ...product, count: newQuantity }));
    }
  };

  const handleDecreaseCount = (id) => dispatch(decreaseProductCount(id));

  const handleRemoveProduct = (id) => dispatch(deleteProductFromCart(id));

  const handleReviews = (product) => navigate(REVIEW_PATH, { state: { product } });

  const handlePayNow = () => {
    cartItems.forEach((product) => dispatch(deleteProductFromCart(product.id)));
    setTotalAmount(totalPrice);
    setOrderSuccess(true);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-200 py-8 px-4">
      <h1 className="text-3xl font-bold text-center mb-4">My Cart</h1>

      <div className="w-full flex justify-center mt-5 mb-5">
        <button 
          onClick={handlePayNow}
          className={`bg-green-500 w-56 text-black py-3 rounded-md justify-center px-4 ${totalPrice === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={totalPrice === 0}
        >
          Pay Now
        </button>
      </div>

      <div className="bg-gray-300 shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
        {cartItems.length > 0 ? (
          <div className="space-y-4">
            {cartItems.map((product) => (
              <div key={product.id} className="relative bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
                <button
                  className="absolute top-3 right-3 text-red-500 hover:text-red-700 transition-colors duration-200"
                  onClick={() => handleRemoveProduct(product.id)}
                  aria-label="Remove item"
                >
                  <FaTrash size={18} />
                </button>

                <div className="flex items-center space-x-4">
                  <img src={product.thumbnail} alt={product.title} className="w-24 h-24 object-cover rounded-md" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{product.title}</h3>
                    <p className="text-gray-500">Rating: {product.rating} ⭐</p>
                    <p className="text-blue-500 font-bold">${product.price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <button
                      className="bg-gray-400 text-white rounded-md px-3 py-2 mx-1 hover:bg-gray-500 transition-colors duration-300 disabled:bg-gray-300"
                      onClick={() => handleDecreaseCount(product.id)}
                      disabled={product.count <= 0}
                    >
                      −
                    </button>
                    <span className="text-gray-800 mx-2">{product.count}</span>
                    <button
                      className="bg-gray-400 text-white rounded-md px-3 py-2 mx-1 hover:bg-gray-500 transition-colors duration-300"
                      onClick={() => handleQuantityChange(product.id, product.count + 1)}
                    >
                      +
                    </button>
                  </div>

                  <p className="text-gray-600">Amount: ${(product.price * product.count).toFixed(2)}</p>
                  <button 
                    className="bg-blue-500 text-white px-2 py-1 rounded mx-1 hover:bg-blue-600"
                    onClick={() => handleReviews(product)}
                  >
                    Reviews
                  </button>
                </div>
              </div>
            ))}
            <div className="text-lg font-semibold text-right mt-4">
              Total Price: <span className="text-blue-500">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500">No products in the cart.</p>
        )}
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="bg-white rounded-lg p-8 shadow-lg text-center"
          >
            <motion.div 
              className="flex justify-center mb-4"
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }} 
              exit={{ scale: 0 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="green" className="bi bi-check-circle" viewBox="0 0 16 16">
                <path d="M16 8a8 8 0 1 0-16 0 8 8 0 0 0 16 0zm-1 0A7 7 0 1 1 1 8a7 7 0 0 1 14 0z"/>
                <path fillRule="evenodd" d="M12.354 5.354a.5.5 0 0 1 0 .708L7.707 11l-1.147-1.146a.5.5 0 0 1 .707-.707L7.5 10.293l4.647-4.646a.5.5 0 0 1 .707 0z"/>
              </svg>
            </motion.div>
            <h2 className="text-xl font-bold mb-2">Order Placed!</h2>
            <p>Your order has been successfully placed.</p>
            <p className="mt-2 font-semibold">Amount Paid: ${totalAmount.toFixed(2)}</p>
            <button 
              onClick={() => setShowModal(false)} 
              className="bg-red-500 text-white py-2 px-4 rounded mt-4"
            >
              Close
            </button>
          </motion.div>
        </Modal>
      )}
    </div>
  );
};

export default Cart;
