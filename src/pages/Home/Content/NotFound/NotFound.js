import React from 'react';
import Logo from '../../../../public/cerebral_icon.png';

const notFound = () => (
    <div style={{textAlign: 'center'}}>
        <img style={{width: '75px', height: '75px'}} src={Logo} alt = "Cerebral Logo" />
        <h1>Sorry, this page isn't available. </h1>
        <p>The link you followed may be broken, or the page may have been removed.</p>
    </div>
);

export default notFound