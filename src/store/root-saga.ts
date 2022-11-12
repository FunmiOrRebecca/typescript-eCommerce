import {all,  call} from 'typed-redux-saga/macro';
import { categoriesSaga } from './categoriesReducer/category.saga';
import { userSagas } from './userReducer/user.saga';


// npm add typed-redux-saga
// npm add --dev babel-plugin-macros
export function* rootSaga(){
        yield* all([call(categoriesSaga), call(userSagas)]);
}

function* gen() {
    console.log("a");
    console.log("b");

    
}

gen();