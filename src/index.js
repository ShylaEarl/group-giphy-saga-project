import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';

import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';

import createSagaMiddleware from 'redux-saga';
import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

//Saga setup 1. create the saga middleware
const sagaMiddleware = createSagaMiddleware();

//--------------------Sagas-----------------------

//to get giphy from giphy api (GET)
function* getGiphy() {
    try{
        const response = yield axios.get('/api/favorite'); //route may need to change
        yield put({type: 'GET_GIPHY', payload: response.data});
        console.log(response.data);
    } catch(error) {
        alert('error in saga GET');
        console.log('error getting giphy', error);
    }
}

//indicate image is a favorite (POST) 
function* addFavorite(action){
    try{
         yield axios.post('/api/favorite', action.payload);
         yield put ({ type: 'FETCH_GIPHY' }); //type may need to change
    }
    catch(error) {
        alert('error in saga favorite POST');
        console.log('error adding favorite', error);
    }
}

//update by adding a category to the giphy (PUT) 
function* updateCategory(action){
    try{
         yield axios.put('/api/category'); //**directions indicate PUT uses /api/favorite... */
         yield put ({ type: 'UPDATE_CATEGORY' }); //this type may need to be changed
    } catch(error) {
        alert('error in saga category PUT');
        console.log('error updating category', error);
        
    }
}

//Saga setup 2. * makes this a 'generator' function (necessary)
function* rootSaga() {
    //yield takeEvery
    yield takeEvery('FETCH_GIPHY', getGiphy);
    yield takeEvery('ADD_FAVORITE', addFavorite);
    yield takeEvery('UPDATE_CATEGORY', updateCategory);
}

//----------------Reducers------------------------
//with this reducer we are holding the giphy object that we got back from the giphy api?
const giphy = (state = {}, action) => {
    if(action.type === 'GET_GIPHY') {
        return action.payload; 
    }
    return state;
}

//with this reducer we are holding a giphy object (or list of objects?) 
//and updating it (or specific ones) to be a 'favorite'
const favorite = (state = {}, action) => {
    // what should this action type be? 
    //'ADD_FAVORITE'? or 'GET_GIPHY'? or something else?
    if(action.type === 'ADD_FAVORITE') { //should this be the same as saga? No INFINATE LOOPS please!
        return action.payload; //do we need to spread state here?
    }
    return state;
}

//with this reducer we are holding one giphy object and updating it's category
const category = (state = {}, action) => {
    if(action.type === 'SET_CATEGORY') { //should this be the same as saga? No INFINATE LOOPS please!
        return action.payload; 
    } 
    return state;
}

//based off of wk11 PUT example, may need else if...
// else if (action.type === '') //example 'EDIT_ONCHANGE' what is our edit action?
//         return {
//             ...state,
//             //This sets a particular property in the Object
//             //the [] around the propety name lets us use a variable
//             [action.payload.property]: action.payload.value
//         }

//Store
const storeInstance = createStore(
    combineReducers({
        giphy,
        favorite,
        category,
    }),
    //saga setup 4.
    applyMiddleware(logger, sagaMiddleware),
);

//Saga setup 3. make the root/watcherSaga run
sagaMiddleware.run( rootSaga );

ReactDOM.render(<Provider store={storeInstance}>
                    <App />
                </Provider>, 
                document.getElementById('root')
                );

//redux PUT example from wk11
// hold only the single student object being edited
// const editStudent = (state  = {}, action) => {
//     if(action.type === 'SET_EDIT_STUDENT'){
//         return action.payload;
//     } else if (action.type === 'EDIT_ONCHANGE'){
//         return {
//             ...state, 
//             //This sets a particular property in the Object
//             //the [] around the propety name lets us use a variable
//             [action.payload.property]: action.payload.value
//         };
//     }
//     return state;
// }
