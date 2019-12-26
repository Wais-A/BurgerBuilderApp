import React from 'react';
import './Modal.css'
import Backdrop from '../Backdrop/Backdrop.js';

const modal = (props) => (
    <div className='Aux'>
        <Backdrop show={props.show} clicked={props.modalClosed}/>
        <div 
        className='Modal'
        style={{
            transform: props.show ? 'translateY(0)': 'translateY(-100vh)',
            opacity: props.show ? '1': '0'
        }}>
            {props.children}
        </div>
    </div>

)

export default modal;