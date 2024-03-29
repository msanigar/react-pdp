import React, { Component } from 'react';
import Product from './product';

export default class App extends Component {

  constructor(props){
    super(props);
  }

  render() {

    const styles = {
      background: '#fff'
    };

    return (
        <div style={ styles }>
          <h3 className="notification-banner">New React product page powered by GraphQL!</h3>

          <Product />

        </div>
    );
  }

}
