import { getCategoriesAndDocuments } from "../../utils/firebase";
import { createAction } from "../../utils/reducer.utils";
import { CATEGORIES_ACTION_TYPES } from "./category.types";
import { Category} from "./category.types";
import { Action,  ActionWithPayload} from "../../utils/reducer.utils";
import { withMatcher } from "../../utils/reducer.utils";



export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;
export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>;
export type FetchCategoriesFailed = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>;

export const fetchCategoriesStart = withMatcher((): FetchCategoriesStart => {
 return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START);
});

export const fetchCategoriesSuccess = withMatcher((categoriesArray: Category[]): FetchCategoriesSuccess => {
  return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray);
});

export const fetchCategoriesFailed = withMatcher((error: Error) : FetchCategoriesFailed => {
  return createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error);
});


export type CategoryAction = FetchCategoriesStart | FetchCategoriesSuccess | FetchCategoriesFailed;

// This fetchCategoriesAsync is for thunk the one for saga s in categories.saga
// export const fetchCategoriesAsync = () => async (dispatch) => {
//   dispatch(fetchCategoriesStart());
//   try {
//     const categoriesArray = await getCategoriesAndDocuments('categories');
//      dispatch(fetchCategoriesSuccess(categoriesArray))
//     // const categoriesArray = await dispatch(fetchCategoriesSucess(categoriesArray))
//   } catch (error) {
//     dispatch(fetchCategoriesFailed(error))
//   }
// }

// export const setCategories = (categoriesArray) => {
//     return createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray);

//   }

  // const setCategoriesMap = (categoriesMap) => {
  //   return createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP, categoriesMap);

  // }


