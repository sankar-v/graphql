import React from 'react';
import '../style.css';

const Link = ({ children, ...props}) => (
    <div>
        <a {...props} target="_blank"  rel="noopener noreferrer">
            {children}
        </a>
    </div>
);

export default Link;