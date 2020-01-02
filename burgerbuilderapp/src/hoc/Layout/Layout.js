import React from 'react';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer.js'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import'./Layout.css';

class Layout extends React.Component{

    state = {
        showSideDrawer: false
    }

    SideDrawerClosedHandler= () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState)=>{
         return {showSideDrawer: !prevState.showSideDrawer}
        });
    }

    render(){
        return(
            <div className='Aux'>
        <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler}/>
        <SideDrawer open={this.state.showSideDrawer} closed={this.SideDrawerClosedHandler}/>
        <main className='Content'>
            {this.props.children} 
        </main>
    </div>
        )
        
}
    }
    

export default Layout