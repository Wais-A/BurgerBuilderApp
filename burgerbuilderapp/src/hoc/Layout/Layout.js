import React from "react";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer.js";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import "./Layout.css";
import { connect } from "react-redux";
class Layout extends React.Component {
	state = {
		showSideDrawer: false
	};

	SideDrawerClosedHandler = () => {
		this.setState({ showSideDrawer: false });
	};

	sideDrawerToggleHandler = () => {
		this.setState(prevState => {
			return { showSideDrawer: !prevState.showSideDrawer };
		});
	};

	render() {
		return (
			<div className='Aux'>
				<Toolbar
                    isAuth={this.props.isAuthenticated}
                 drawerToggleClicked={this.sideDrawerToggleHandler} />
				<SideDrawer
                    isAuth={ this.props.isAuthenticated }
					open={this.state.showSideDrawer}
					closed={this.SideDrawerClosedHandler}
				/>
				<main className='Content'>{this.props.children}</main>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null
	};
};

export default connect(mapStateToProps)(Layout);
