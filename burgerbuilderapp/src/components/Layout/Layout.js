import React from 'react';


import'./Layout';

const Layout = (props) => (
    <div>
        <div>Toolbar, SideDrawer, Backdrop</div>
        <main className={'Content'}>
            {props.children} 
        </main>
    </div>
)

export default Layout