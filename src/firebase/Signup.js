import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import * as Yup from 'yup';
import { auth } from './firebase';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setEmail, setPassword } from '../redux-(toolkit)/authSlice';
import { BROWSE_PATH, SIGNIN_PATH } from '../utils/contants';

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.auth.email);
  const password = useSelector((state) => state.auth.password);

  const initialValues = { email: email || '', password: password || '', confirmPassword: '' };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Required'),
  });

  const onSubmit = (values, actions) => {
    dispatch(setEmail(values.email));
    dispatch(setPassword(values.password));

    createUserWithEmailAndPassword(auth, values.email, values.password)
      .then(() => {
        actions.resetForm();
        navigate(BROWSE_PATH);
      })
      .catch((error) => {
        actions.setFieldError('general', error.message);
      })
      .finally(() => {
        actions.setSubmitting(false);
      });
  };

  return (
    <div 
      className="flex items-center justify-center min-h-screen"
      style={{ 
        backgroundImage: "url('https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Sign Up</h1>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
          {({ errors, touched, isSubmitting }) => (
            <Form>
              {errors.general && <div className="text-red-500 mb-4 text-center">{errors.general}</div>}
              <div className="mb-6">
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className={`w-full border-2 rounded-lg p-3 transition duration-200 ${touched.email && errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
                {touched.email && errors.email && <div className="text-red-500">{errors.email}</div>}
              </div>
              <div className="mb-6">
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className={`w-full border-2 rounded-lg p-3 transition duration-200 ${touched.password && errors.password ? 'border-red-500' : 'border-gray-300'}`}
                />
                {touched.password && errors.password && <div className="text-red-500">{errors.password}</div>}
              </div>
              <div className="mb-6">
                <Field
                  name="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  className={`w-full border-2 rounded-lg p-3 transition duration-200 ${touched.confirmPassword && errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                />
                {touched.confirmPassword && errors.confirmPassword && <div className="text-red-500">{errors.confirmPassword}</div>}
              </div>
              <button
                type="submit"
                className={`w-full bg-blue-600 text-white py-3 rounded-lg transition duration-200 hover:bg-blue-700 ${isSubmitting ? 'opacity-50' : ''}`}
                disabled={isSubmitting}
              >
                Sign Up
              </button>
              <div className="text-center mt-4">
                <Link to={SIGNIN_PATH} className="text-blue-500 hover:underline">Already have an account? Sign In</Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUp;
