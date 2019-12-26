import React from 'react';
import Logo from '../../Logo/Logo.js'
import NavigationItems from '../NavigationItems/NavigationItems.js'
import './SideDrawer.css'
import Backdrop from '../../UI/Backdrop/Backdrop.js'


const sideDrawer = (props) => {

    let attachedClasses = ['SideDrawer', 'Close' ];

    if (props.open){
        attachedClasses = ['SideDrawer', 'Open']
    }

    return (
        <div className='Aux'>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>
                <Logo height='11%' className='Logo'/>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </div>
    )
}

export default sideDrawer;