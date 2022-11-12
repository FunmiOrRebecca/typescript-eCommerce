import './category.styles.jsx';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
// import { CategoriesContext } from '../../contexts/categories.context';
import ProductCard from '../../components/product-card/product-card.component';
import { Fragment } from 'react';
import { selectCategoriesIsLoading, selectCategoriesMap } from '../../store/categoriesReducer/category-selector';
import { useSelector } from 'react-redux';
import Spinner from '../../components/spinner/spinner.component';
import { Title,CategoryContainer } from './category.styles.jsx';

const Category = () => {
    const { category } = useParams();
    // const {categoriesMap } = useContext(CategoriesContext);
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    const [products, setProducts] = useState(categoriesMap[category]);


    useEffect(() => {
        setProducts(categoriesMap[category])
        console.group("products,", products);
    }, [category, categoriesMap])
    console.log("here", isLoading);
    return(
        <Fragment>
            <Title>{category.toUpperCase()}</Title>
            {

                isLoading ? <Spinner/> : 
                <CategoryContainer>
                {
                   products && products.map((product) => (<ProductCard key={product.id} product={product}/>))
                }
            </CategoryContainer>
            }
            
        </Fragment>
    )
}


export default Category;