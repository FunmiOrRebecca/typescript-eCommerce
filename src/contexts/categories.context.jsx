// import { createContext, useState, useEffect } from "react";
import { createContext, useState, useEffect, useReducer} from "react";

import SHOP_DATA from '../shop-data.js';
import {addCollectionAndDocuments, getCategoriesAndDocuments} from '.././utils/firebase'

export const CategoriesContext = createContext({
  categoriesMap: {}

});


const CATEGORIES_ACTION_TYPES ={
  SET_CATEGORIES_MAP: "SET_CATEGORIES_MAP"
}

export const categoriesReducer = (state, action) => {
  const {type, payload} = action;
  switch(type){
    case CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP:
      return {...state, categoriesMap: payload}
      default:
        throw new Error(`Unhandled error ${type} in UserReducer`)
  }
}

const INITIAL_STATE = {
  categoriesMap: {}
}

const createAction = (type, payload) => ({type, payload})



export const CategoriesProvider = ({children}) => {
    // const [categoriesMap, setCategoriesMap] = useState({});
    const [state, dispatch] = useReducer(categoriesReducer, INITIAL_STATE);
    const {categoriesMap} = state;
    const setCategoriesMap = (categoriesMap) => {
      dispatch(createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP, categoriesMap))

    }
    //You only want this to fire once and we used use effect and after firing 
    //we need to delete the code if not it will keep writing the categories collection to the firestore 
    //and we dont want that
    // useEffect(() => {
    //   addCollectionAndDocuments("categories", SHOP_DATA)
    // }, []);

    useEffect(() => {
      const getCategoriesMap = async() => {
        const categoryMap = await getCategoriesAndDocuments();
        console.log(categoryMap)
        setCategoriesMap(categoryMap);
      }
      getCategoriesMap();
    }, [])

    const value = {categoriesMap};
    return <CategoriesContext.Provider value={value}>
             {children}
            </CategoriesContext.Provider>
}     

//     const value = {categoriesMap};
//     return <CategoriesContext.Provider value={value}> {children}</CategoriesContext.Provider>
// }
// import SHOP_DATA from '../shop-data.js';
// import { addCollectionAndDocuments, getCategoriesAndDocuments } from "../utils/firebase.js";


// export const CategoriesContext = createContext({
//     categoriesMap: {}
// })

// export const CategoriesProvider = ({ children }) => {
//     // const [categoriesMap, setCategoriesMap] = useState(SHOP_DATA);
//     const [categoriesMap, setCategoriesMap] = useState({});
//     //Use this once to send the data 
//     // useEffect(() => {
//     //     addCollectionAndDocuments("categories", SHOP_DATA);
//     // },[]);
//     useEffect(()=> {
//         const getCategoriesMap = async() => {
//             const categoryMap = await getCategoriesAndDocuments();
//             console.log(categoryMap);
//             setCategoriesMap(categoryMap);
//             console.log("categories context", categoriesMap);
//         }
//         getCategoriesMap();
//     }, [])

