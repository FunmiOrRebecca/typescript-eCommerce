import { CategoryItem } from "../categoriesReducer/category.types"


export enum CART_ACTION_TYPES{
    SET_IS_CART_OPEN = "SET_IS_CART_OPEN",
    SET_CART_ITEMS = "SET_CART_ITEMS",
    SET_CART_COUNT = "SET_CART_COUNT",
    SET_CART_TOTAL = "SET_CART_TOTAL"

}

export type CartItem = CategoryItem & {
    quantity: number;
}


// export const CART_ACTION_TYPES = {
//     SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
//     SET_CART_ITEMS: "SET_CART_ITEMS",
//     SET_CART_COUNT: "SET_CART_COUNT",
//     SET_CART_TOTAL: "SET_CART_TOTAL"
// }
// const CART_ACTION_TYPES = {
//     SET_IS_CART_OPEN: "cart/SET_IS_CART_OPEN",
//     SET_CART_ITEMS: "cart/SET_CART_ITEMS",
//     SET_CART_COUNT: "cart/SET_CART_COUNT",
//     SET_CART_TOTAL: "cart/SET_CART_TOTAL"
// }