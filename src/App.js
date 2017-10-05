import React, { Component } from 'react';
import Product from './product';

export default class App extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
        <div>
          <h3 className="notification-banner">New React product page powered by GraphQL!</h3>

          <Product />

        </div>
    );
  }

}
