/* eslint-disable no-use-before-define */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { loadState, saveState } from './localStorage';
import { GET_DATA, INCREMENT_TEST, UPDATE_IMG, GET_LAYOUT, ADD_TO_BAG } from './actions';

const mainReducer = (state = initialState, action) => {

	if (action.type === GET_DATA) {
		return getData(state, action);
	}

	if (action.type === INCREMENT_TEST) {
		return incrementTest(state, action);
	}

	if (action.type === UPDATE_IMG) {
		return updateImg(state, action);
	}

	if (action.type === GET_LAYOUT) {
		return getLayout(state, action);
	}

	if (action.type === ADD_TO_BAG) {
		return addToBag(state, action);
	}

	return state;
};

function getData(state, action) {
	var newState = Object.assign({}, state);
	var obj = action.data.data;
	newState.data = obj;
    newState.ready = true;
	return newState;
}

function incrementTest(state, action) {
	var newState = Object.assign({}, state);
    newState.increment = state.increment + 1;
	return newState;
}

function addToBag(state, action) {
	var newState = Object.assign({}, state);
	var obj = action.data.bag;
	newState.bag = obj;
	return newState;
}

function updateImg(state, action) {
	var newState = Object.assign({}, state);
		newState.primaryImg = action.event;
	return newState;
}

function getLayout(state, action) {
	var newState = Object.assign({}, state);
		newState.layout = window.layoutOverride ? window.layoutOverride : null;
	return newState;
}

const initialState = {
	data: {},
  ready: false,
	increment: 0,
	primaryImg: null,
	layout: null,
	bag: {}
};

let store;
const persistedState = loadState(initialState);

store = createStore(
	mainReducer,
	persistedState,
	compose(applyMiddleware(thunk),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
);

store.subscribe(() => {
	saveState(store.getState());
});

export default store;
