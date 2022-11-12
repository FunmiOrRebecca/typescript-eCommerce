import { createContext } from "react";
import { useState, useEffect, useReducer } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth, signOutUser} from "../utils/firebase";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
});


export const USER_ACTION_TYPES = {
    SET_CURRENT_USER: "SET_CURRENT_USER"
}
const userReducer = (state, action) => {
    const { type, payload } = action;
    switch(type){
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {...state, currentUser: payload}
        default:
            throw new Error(`Unhandled error ${type} in UserReducer`)
    }
}

const INITIAL_STATE = {
    currentUser: null
}
export const createAction = (type, payload) => ({type, payload});




export const UserProvider = ({children}) => {
    // const [currentUser, setCurrentUser] = useState(null);
    const [state, dispatch] = useReducer(userReducer,INITIAL_STATE )
    const  {currentUser} = state;
    const setCurrentUser = (user) => {
        //dispatch({type:USER_ACTION_TYPES.SET_CURRENT_USER, payload: user}); 
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
    }

    const value = {currentUser, setCurrentUser};
    useEffect(() => {
       const check = async() => {
        const unsubscribe = await onAuthStateChangedListener((user) => {
            if(user){
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user);
        });
        return unsubscribe;
       } 
       check();
    }, [])


    // useEffect(() => {
    //     async function fetchData() {
    //       // You can await here
    //       const response = await MyAPI.getData(someId);
    //       // ...
    //     }
    //     fetchData();
    //   }, [someId]); // Or [] if effect doesn't need props or state
      

    return<UserContext.Provider value={value}>{children}</UserContext.Provider>
}