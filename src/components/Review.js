import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReview, selectReviewById } from '../redux-(toolkit)/reviewSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { CART_PATH } from '../utils/contants';

const ReviewPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;
  const [review, setReview] = useState('');

  const existingReview = useSelector(state => selectReviewById(state, product?.id));

  useEffect(() => {
    if (existingReview) {
      setReview(existingReview.text);
    } else {
      setReview('');
    }
  }, [existingReview]);

  if (!product) {
    return (
      <div className="max-w-2xl mx-auto p-5">
        <h1 className="text-center text-2xl font-bold mb-4">Product Not Found</h1>
        <button 
          className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 mb-4" 
          onClick={() => navigate(CART_PATH)}
        >
          Back to Cart
        </button>
        <p>Please go back to the cart and select a product to review.</p>
      </div>
    );
  }

  const { title, thumbnail } = product;

  const handleSubmit = (e) => {
    e.preventDefault();
    const reviewData = {
      text: review,
      timestamp: new Date().toLocaleString(),
    };
    dispatch(addReview({ productId: product.id, review: reviewData }));
    setReview('');
  };

  return (
    <div className="max-w-2xl mx-auto p-5 relative">
      <button 
        className="absolute top-4 right-4 bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700" 
        onClick={() => navigate("/cart")}
      >
        Back to Cart
      </button>

      <h1 className="text-center text-2xl font-bold mb-4">{title}</h1>
      <img 
        src={thumbnail} 
        alt={title} 
        className="w-3/4 h-auto mx-auto rounded-md mb-4"
      />

      <h2 className="text-xl font-semibold mb-2">Review</h2>

      {existingReview ? (
        <div className="bg-gray-200 p-4 rounded mb-4">
          <p>{existingReview.text}</p>
          <small className="text-gray-600">Reviewed on: {existingReview.timestamp}</small>
        </div>
      ) : (
        <p>You haven't reviewed this product yet. Write your review below!</p>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col bg-white p-5 rounded-lg shadow-md">
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review here..."
          required
          className="border border-gray-300 p-2 rounded-md resize-none min-h-[100px] mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
        ></textarea>
        <button 
          type="submit" 
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200"
        >
          {existingReview ? 'Update Review' : 'Submit Review'}
        </button>
      </form>
    </div>
  );
};

export default ReviewPage;
