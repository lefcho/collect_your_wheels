import React from 'react';

function Footer() {
    return (
        <footer className="footer">
            <p>
                &copy; {new Date().getFullYear()} 
                Collect Your Wheels. All rights reserved.
            </p>
        </footer>
    );
}

export default Footer;
