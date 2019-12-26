import React from 'react';

import Toolbar from '../Navigation/Toolbar/Toolbar'
import'./Layout.css';

const Layout = (props) => (
    <div className='Aux'>
        <Toolbar/>
        <main className='Content'>
            {props.children} 
        </main>
    </div>
)

export default Layout