import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";
import categoriesSlice from "./categoriesSlice";
import cartSlice from "./cartSlice";
import productsSlice from "./productsSlice";
import reviewSlice from "./reviewSlice"; // Import the review slice
import authSlice from "./authSlice";
import toastSlice from "./toastSlice";

const authPersistConfig = {
    key: "auth",
    storage,
  };

const categoriesPersistConfig = {
  key: "categories",
  storage,
};

const cartPersistConfig = {
  key: "cart",
  storage,
};

const productsPersistConfig = {
  key: "products",
  storage,
};

const reviewsPersistConfig = {
  key: "reviews", // Define persistence key for reviews
  storage,
};

const persistedCategoriesSlice = persistReducer(categoriesPersistConfig, categoriesSlice);
const persistedCartSlice = persistReducer(cartPersistConfig, cartSlice);
const persistedProductsSlice = persistReducer(productsPersistConfig, productsSlice);
const persistedReviewSlice = persistReducer(reviewsPersistConfig, reviewSlice); // Create persisted reducer for reviews
const persistedAuthSlice = persistReducer(authPersistConfig, authSlice); // Create persisted reducer for reviews

const store = configureStore({
  reducer: {
    categories: persistedCategoriesSlice,
    cart: persistedCartSlice,
    products: persistedProductsSlice,
    reviews: persistedReviewSlice, 
    auth: persistedAuthSlice,
    toast: toastSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
