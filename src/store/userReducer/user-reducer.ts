import { USER_ACTION_TYPES } from "./user.types";
import { signInSuccess,  signOutSuccess, signUpFailed, signInFailed, signOutFailed } from "./user-action";
import { UserData } from "../../utils/firebase";
import { AnyAction } from "redux";

export type UserState = {
    currentUser: UserData | null;
    isLoading: boolean;
    error: Error | null;  

}
export const USER_INITIAL_STATE: UserState = {
    currentUser: null,
    isLoading: false,
    error: null
}

export const userReducer = (state = USER_INITIAL_STATE, action: AnyAction) => {
    if(signInSuccess.match(action)){
        return {...state, currentUser: action.payload}
    }
    if(signOutSuccess.match(action)){
        return{...state, currentUser: null};
    }
    if(signUpFailed.match(action) || signInFailed.match(action) || signOutFailed.match(action)){
        return{...state, error: action.payload}
    }
        return state;

}