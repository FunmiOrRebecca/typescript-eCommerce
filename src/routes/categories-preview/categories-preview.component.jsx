import { useContext } from "react";
// import { CategoriesContext } from "../../contexts/categories.context";
import { Fragment } from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import { selectCategoriesMap, selectCategoriesIsLoading } from "../../store/categoriesReducer/category-selector";
import { useSelector } from "react-redux";
import Spinner from "../../components/spinner/spinner.component";

const CategoriesPreview =  () => {
  // const {categoriesMap} = useContext(CategoriesContext);
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  console.log("mee", isLoading);
  return(
    <Fragment>
      { isLoading? <Spinner/> :
        Object.keys(categoriesMap).map(title => {
          const products = categoriesMap[title];
          return<CategoryPreview key={title} title={title} products={products}/>
      })}
     </Fragment>
  )   
}

export default CategoriesPreview;



//newly modified
// const CategoriesPreview =  () => {
//     const {categoriesMap} = useContext(CategoriesContext);
    
//     return(
//       <Fragment>
//         {
//         categoriesMap.map((category) => (
//             <CategoryPreview key={category.id} category={category}/>
//         ))
//         }
//        </Fragment>
//     )   
// }

// export default CategoriesPreview;

//Remeber that vday you wwere trying to build the component alone here
// const CategoriesPreview =  () => {
//     const {categoriesMap} = useContext(CategoriesContext);
    
//     return(
//       <div>
//         {
//         categoriesMap.map((category) => (
//             <div>
//                 <h2>{category.title}</h2>
//                 {category.items.filter((_, index) => index <4).map((item) => (
//                     <ProductCard product={item}/>

//                 ))}
//             </div>
//         ))
//         }
//        </div>
//     )   
// }


// SHOP_DATA.forEach(data => console.log(data.items.map((item) => console.log(item.imageUrl, item.price))));

//New one after creating Category preview component
// const CategoriesPreview =  () => {
//     const {categoriesMap} = useContext(CategoriesContext);
    
//     return(
//       <Fragment>
//         {
//         categoriesMap.map((category) => (
//             <CategoryPreview key={category.id} category={category}/>
//         ))
//         }
//        </Fragment>
//     )   
// }

// export default CategoriesPreview;