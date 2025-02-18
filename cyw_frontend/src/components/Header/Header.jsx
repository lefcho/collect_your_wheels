import React from 'react';

function Header() {
    return (
        <header className="header">
            <nav>
                <a href="/">Home</a>
                <a href="/collected">Collected</a>
                <a href="/wishlisted">Wishlisted</a>
            </nav>
        </header>
    );
}

export default Header;
