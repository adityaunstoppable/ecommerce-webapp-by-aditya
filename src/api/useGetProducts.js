import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setProducts, filterProductsByCategory, setLoading } from '../redux-(toolkit)/productsSlice';
import { addAllCategories } from '../redux-(toolkit)/categoriesSlice';
import { GET_PRODUCTS_URL } from '../utils/contants';

const useGetProducts = () => {
  const dispatch = useDispatch();
  const { productsList, filteredProducts, loading } = useSelector(state => state.products);
  const { selectedCategory } = useSelector(state => state.categories);

  useEffect(() => {
    if (productsList.length === 0) {
      fetchProducts();
    } else {
      updateFilter(selectedCategory);
    }
  }, [selectedCategory, productsList]);

  const fetchProducts = async () => {
    dispatch(setLoading(true));
    try {
      const response = await fetch(GET_PRODUCTS_URL);
      const data = await response.json();
      dispatch(setProducts(data.products));
      setCategoriesInStore(data.products);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const setCategoriesInStore = (products) => {
    const categoriesArray = ["Remove Filter", ...new Set(products.map(item => item.category))];
    dispatch(addAllCategories(categoriesArray));
  };

  const updateFilter = (category) => {
    dispatch(filterProductsByCategory(category));
  };

  return { filteredProducts, loading };
};

export default useGetProducts;
