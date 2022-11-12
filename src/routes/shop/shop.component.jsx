import './shop.styles.scss';
import ProductCard from '../../components/product-card/product-card.component';
import { ProductsContext } from '../../contexts/products.context';
import { useContext } from 'react';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import { Route, Routes } from 'react-router-dom';
import Category from '../category/category.component'
import { getCategoriesAndDocuments } from '../../utils/firebase';
import { useEffect } from 'react';
// import {setCategories} from '../../store/categoriesReducer/category-action';
import { fetchCategoriesAsync, fetchCategoriesStart } from '../../store/categoriesReducer/category-action';
import { useDispatch } from 'react-redux';
const Shop = () => {
    // const {products} = useContext(ProductsContext);
    const dispatch = useDispatch()
    
    // useEffect(() => {
    //     const getCategoriesMap = async() => {
    //       const categoryMap = await getCategoriesAndDocuments();
    //       console.log(categoryMap)
    //       dispatch(setCategories(categoryMap));
    //     }
    //     getCategoriesMap();
    //   }, [])

      // useEffect(() => {
      //   const getCategoriesMap = async() => {
      //     const categoriesArray = await getCategoriesAndDocuments();
      //     console.log(categoriesArray)
      //     dispatch(setCategories(categoriesArray));
      //   }
      //   getCategoriesMap();
      // }, [])
  
    useEffect(() => {
      dispatch(fetchCategoriesStart());
    }, [])
    return(
        <Routes>
            <Route index element={<CategoriesPreview/>}/>
            <Route path=":category" element={<Category/>}/>
        </Routes>
    )
}


export default Shop;

//when you were still using product context
// <div className='products-container'>
// <CategoriesPreview/>
// {products.map((product) => (
//     <ProductCard key={product.id} product={product} />
    
// ))}    
// </div>