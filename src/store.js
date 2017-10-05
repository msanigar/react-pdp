/* eslint-disable no-use-before-define */

import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { loadState, saveState } from './localStorage';
import { GET_DATA, INCREMENT_TEST, UPDATE_IMG, GET_LAYOUT } from './actions';

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

function updateImg(state, action) {
	var newState = Object.assign({}, state);
		newState.primaryImg = action.event;
	return newState;
	console.warn(action);
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
	layout: null
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
