import React, { Component } from 'react';
import store from './store';
import * as actions from './actions';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Gallery extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
    let { data, primaryImg } = store.getState();
		this.state = {
			data,
			primaryImg,
			unsubscribe: store.subscribe(this.onStoreUpdated.bind(this))
		};
	}

	changeImg(e) {
		store.dispatch(actions.updateImg(e));
	}

  componentWillUnmount() {
		this.state.unsubscribe();
	}

  onStoreUpdated() {
		let { data, primaryImg } = store.getState();

		this.setState({
			data,
			primaryImg
		});
	}

	render() {

    let galleryImages = this.state.data.productBySKU.images_url.split(",");
		let primaryImg = this.state.primaryImg ? this.state.primaryImg : galleryImages[0];
		const callChangeImg = e => this.changeImg(e.currentTarget.src);

    return (
			<div>
	      <div className="gallery-container">
						<ReactCSSTransitionGroup
		          transitionName="fade-in-out"
		          transitionEnterTimeout={500}
		          transitionLeaveTimeout={300}>
							<div key={ primaryImg } >
			          <img className="main-product-img" src={ primaryImg } />
							</div>
						</ReactCSSTransitionGroup>
					<div className="gallery-thumbs">
					    { galleryImages.map((img, index) => {
					    return <img
					            key={ img }
					            className="thumb-product-img" src={ img }
					            onClick={ callChangeImg } />;
					  }) }
					</div>
	      </div>
			</div>
    )
	}
}

export default Gallery;
