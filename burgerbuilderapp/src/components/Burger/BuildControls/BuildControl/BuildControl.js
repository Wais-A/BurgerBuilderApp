import React from 'react';
import './buildControl.css'

const buildControl = (props) => (

    <div className='BuildControl'>
        <div className='Label'>{props.label}</div>
        <button onClick={props.removed} disabled={props.disabled} className='Less'>Less</button>
        <button onClick={props.added} className='More'>more</button>
    </div>

)

export default buildControl