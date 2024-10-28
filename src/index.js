import React from 'react';
import ReactDOM from 'react-dom/client';
import { appRouter } from './App';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor, store } from './redux-(toolkit)/store';
import { PersistGate } from 'redux-persist/integration/react';
import { SearchProvider } from '../src/contextApi/searchContext'; // Import the SearchProvider
// import LoadingSpinner from './components/LoadingSpinner'; // Example loading spinner

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <SearchProvider> {/* Wrap the RouterProvider with SearchProvider */}
        <React.StrictMode>
          <RouterProvider router={appRouter} />
        </React.StrictMode>
      </SearchProvider>
    </PersistGate>
  </Provider>
);
