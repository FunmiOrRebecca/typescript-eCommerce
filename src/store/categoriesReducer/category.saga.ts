// import {takeLatest, all, call, put, take} from 'redux-saga/effects'
// import {takeLatest, all, call, put, take} from 'typed-redux-saga'
import {takeLatest, all, call, put, take} from 'typed-redux-saga/macro'
import { getCategoriesAndDocuments } from '../../utils/firebase';
import { fetchCategoriesSuccess,  fetchCategoriesFailed} from './category-action';
import { CATEGORIES_ACTION_TYPES } from './category.types';



export function* fetchCategoriesAsync(){
    try {
        // const categoriesArray = await getCategoriesAndDocuments('categories');     normally for thunk
        // after changing yield to yield*, in order for the call error to go
        // go to tsconfig and add "downlevelIteration": true save it 
        const categoriesArray = yield* call(getCategoriesAndDocuments); 
        // You dont dispatch in saga you use put  dispatch(fetchCategoriesSuccess(categoriesArray))
        yield* put(fetchCategoriesSuccess(categoriesArray))
      } catch (error) {     
       yield* put(fetchCategoriesFailed(error as Error))
      }

}

export function* onFetchCategories(){
    yield* takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync)
}

export function* categoriesSaga(){
    yield* all([call(onFetchCategories)])
}