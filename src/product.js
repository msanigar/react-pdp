import React, { Component } from 'react';
import store from './store';
import Gallery from './Gallery';
import Details from './Details';
import * as actions from './actions';

import '../styles/main.scss';

class Product extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		let { data, ready, layout } = store.getState();
		this.state = {
			data,
      ready,
			layout,
			unsubscribe: store.subscribe(this.onStoreUpdated.bind(this))
		};
		store.dispatch(actions.getLayout());
	}

	componentWillUnmount() {
		this.state.unsubscribe();
	}

  componentDidMount() {
    store.dispatch(actions.getData());
  }

	onStoreUpdated() {
		let { data, ready, layout } = store.getState();

		this.setState({
			data,
      ready,
			layout
		});
	}

	render() {

		if(this.state.ready === true) {
			if(this.state.layout.switch === true) {
				return ( <section className="container"><Details /><Gallery /></section> );
			} else {
				return ( <section className="container"><Gallery /><Details /></section> );
			}
    } else {
      return (
        <div>
        	<p>Error fetching data :(</p>
        </div>
      )
    }
	}
}

export default Product;
