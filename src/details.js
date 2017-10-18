import React, { Component } from 'react';
import store from './store';
import * as actions from './actions';

class Details extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
    let { data, increment } = store.getState();
		this.state = {
			data,
      increment,
			unsubscribe: store.subscribe(this.onStoreUpdated.bind(this))
		};
	}

  increment() {
		store.dispatch(actions.incrementTest());
	}

	addToBasket() {
		store.dispatch(actions.addToBag());
	}

  componentWillUnmount() {
		this.state.unsubscribe();
	}

  onStoreUpdated() {
		let { data, increment } = store.getState();

		this.setState({
			data,
      increment
		});
	}

	render() {

    return (
      <div className="main-product-details">
        <h1>{ this.state.data.productBySKU.name }</h1>
        <p>{ this.state.data.productBySKU.price }</p>
        <p>{ this.state.data.productBySKU.sku }</p>
        <p>{ this.state.data.productBySKU.description }</p>
        <p>{ this.state.data.productBySKU.url_key }</p>
        <button onClick={ this.increment.bind(this) }> Click me! { this.state.increment } </button>
				<button onClick={ this.addToBasket.bind(this) }> add to bag </button>
      </div>
    )
	}
}

export default Details;
