import './category-preview.styles.jsx';
import ProductCard from '../product-card/product-card.component';
import { Link } from 'react-router-dom';
import { CategoryPreviewContainer, Preview, Title } from './category-preview.styles.jsx';


const CategoryPreview = ({title, products}) => {
        return(
            <CategoryPreviewContainer>
                    <h2>
                        <Title to={title}>{title.toUpperCase()}</Title>
                    </h2>
                    <Preview>
                    {products.filter((_, index) => index <4).map((product) => (
                        <ProductCard key={product.id} product={product}/>
    
                    ))}
                    </Preview>
                </CategoryPreviewContainer>
        )
    }
    
    export default CategoryPreview;

    
//before exporting shop data
// const CategoryPreview = ({category}) => {
//     return(
//         <div className='category-preview-container'>
//                 <h2>
//                     <Link className='title' to={category.title}>{category.title.toUpperCase()}</Link>
//                 </h2>
//                 <div className='preview'>
//                 {category.items.filter((_, index) => index <4).map((item) => (
//                     <ProductCard key={item.id} product={item}/>

//                 ))}
//                 </div>
//             </div>
//     )
// }

// export default CategoryPreview;


//THe one i did before sending the data to firebase

// const CategoryPreview = ({category}) => {
//     return(
//         <div className='category-preview-container'>
//                 <h2>
//                     <Link className='title' to={category.title}>{category.title.toUpperCase()}</Link>
//                 </h2>
//                 <div className='preview'>
//                 {category.items.filter((_, index) => index <4).map((item) => (
//                     <ProductCard key={item.id} product={item}/>

//                 ))}
//                 </div>
//             </div>
//     )
// }

// export default CategoryPreview;