/* eslint-disable no-use-before-define */

import store from './store';
import axios from 'axios';

export const GET_DATA = 'GET_DATA';
export const INCREMENT_TEST = 'INCREMENT_TEST';
export const UPDATE_IMG = 'UPDATE_IMG';
export const GET_LAYOUT = 'GET_LAYOUT';

export function getData() {
	return (dispatch, getState) => {
		getDataWithKey().then(function(response) {
			dispatch({ data: response, type: GET_DATA });
		});
	};
}

export function incrementTest() {
	return { type: INCREMENT_TEST, event: event };
}

export function updateImg(event) {
	return { type: UPDATE_IMG, event };
}

export function getLayout() {
	return { type: GET_LAYOUT, event: event };
}

function getDataWithKey() {

	const sku = document.querySelector('#root').getAttribute('data-sku');
  const api = '270385d8fdc840d29fe1d8cc54f2c1e8';
	const data = encodeURIComponent(`{
			productBySKU(sku: "${sku}") {
				name
		    price
		    description
		    sku
		    url_key
				image_url
				images_url
		  }
		}`)

	return new Promise(function(resolve, reject) {
		axios.get(`//localhost:3003/graphql?query=${data}`).then(function(response){
			resolve(response.data ? response.data : {});
		});
	});
}
