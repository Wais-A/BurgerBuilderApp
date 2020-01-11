import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from './containers/Orders/Orders';
import {connect} from 'react-redux'
import * as actions from './Store/actions/index'

class App extends Component {

	componentDidMount (){
		this.props.onTryAutoSignup()
	}
	render() {
		return (
			<div>
				<Layout>
					<Switch>
						<Route path='/checkout' component={Checkout} />
						<Route path='/orders' exact component={Orders} />
						<Route path='/auth' exact component={Auth} />
						<Route path='/logout' exact component={Logout} />
						<Route path="/" component={ BurgerBuilder } />

					</Switch>

				</Layout>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onTryAutoSignup: () => dispatch(actions.authCheckState())
		
	};
};

export default connect(null, mapDispatchToProps)(App);
