import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Music, Gamepad2, Image } from 'lucide-react';
import './Navbar.css';

export const Navbar: React.FC = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 50;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [scrolled]);

    // Always show solid navbar on non-home pages if desired, or keep clear->solid behavior
    const isHome = location.pathname === '/';
    // Force scrolled look on non-home pages if they don't have a hero? 
    // Actually the hero is only on Home. So other pages should probably have a solid/visible navbar always OR have a spacer.
    // We added `paddingTop: 80px` to other pages, so the navbar sits on top of white/bg.
    // Let's keep the transparent-to-solid behavior but maybe force solid if not top?
    // Or just let it be transparent on top of the background color (which is fine if background is not white).

    const navbarClass = `navbar ${scrolled || !isHome ? 'scrolled' : ''}`;

    return (
        <nav className={navbarClass}>
            <div className="navbar-container">
                <Link to="/" className="logo animate-wiggle" style={{ textDecoration: 'none' }}>
                    <Heart className="logo-icon" fill="currentColor" />
                    <span>Rumie</span>
                </Link>

                <ul className="nav-links">
                    <li>
                        <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
                            <Heart size={18} />
                            <span>Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/gallery" className={`nav-link ${location.pathname === '/gallery' ? 'active' : ''}`}>
                            <Image size={18} />
                            <span>Gallery</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/music" className={`nav-link ${location.pathname === '/music' ? 'active' : ''}`}>
                            <Music size={18} />
                            <span>Music</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/games" className={`nav-link ${location.pathname === '/games' ? 'active' : ''}`}>
                            <Gamepad2 size={18} />
                            <span>Games</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};
