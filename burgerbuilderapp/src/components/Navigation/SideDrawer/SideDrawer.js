import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';


const sideDrawer = ( props ) => {
    let attachedClasses = ['SideDrawer', 'Close'];
    if (props.open) {
        attachedClasses = ['SideDrawer', 'Open'];
    }
    return (
        <div className='Aux'>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <div className='Logo'>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems 
// @ts-ignore
                    isAuthenticated={props.isAuth}/>
                </nav>
            </div>
        </div>
    );
};

export default sideDrawer;