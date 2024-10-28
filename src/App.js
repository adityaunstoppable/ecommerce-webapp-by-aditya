import React from 'react';
import Browse from './components/Browse';
import Header from './components/Header';
import { createBrowserRouter, Outlet, Navigate } from 'react-router-dom';
import Cart from './components/Cart';
import Review from './components/Review';
import { useLocation } from 'react-router-dom';
import ProtectedRoute from './utils/ProtectedRoute';
import { BROWSE_PATH, CART_PATH, REVIEW_PATH, SIGNIN_PATH, SIGNUP_PATH } from './utils/contants';
import SignIn from './firebase/Signin';
import SignUp from './firebase/Signup';

const App = () => {
  const location = useLocation();

  // Determine if the header should be displayed
  const showHeader = ![SIGNIN_PATH, SIGNUP_PATH].includes(location.pathname);

  return (
    <>
      {showHeader && <Header />}
      <Outlet />
    </>
  );
};

export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Navigate to={BROWSE_PATH} replace /> }, // Redirect to Browse if authenticated
      { path: SIGNIN_PATH, element: <SignIn /> },
      { path: SIGNUP_PATH, element: <SignUp /> },
      {
        path: BROWSE_PATH,
        element: (
          <ProtectedRoute redirectTo={SIGNIN_PATH}>
            <Browse />
          </ProtectedRoute>
        ),
      },
      {
        path: CART_PATH,
        element: (
          <ProtectedRoute redirectTo={SIGNIN_PATH}>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: REVIEW_PATH,
        element: (
          <ProtectedRoute redirectTo={SIGNIN_PATH}>
            <Review />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default App;
