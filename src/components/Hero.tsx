import React from 'react';
import { ArrowDown, MoveDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaTiktok, FaDiscord } from 'react-icons/fa';
import './Hero.css';

export const Hero: React.FC = () => {
    const scrollToAbout = () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="hero">
            <div className="hero-background">
                <div className="blob blob-1 animate-float"></div>
                <div className="blob blob-2 animate-float-delayed"></div>
                <div className="blob blob-3 animate-float"></div>
            </div>

            <div className="hero-content">
                <div className="hero-badge animate-bounce-sm">
                    <span>Welcome to my website</span>
                </div>

                <h1 className="hero-title animate-fade-in-up">
                    Nice to Meet You! <br />
                    I'm <span className="highlight">Rumie</span>
                </h1>

                <p className="hero-subtitle animate-fade-in-up">
                    I love cats, playing games, and listening to music.
                    Explore my little corner of the internet! 🌸
                </p>

                <div className="social-links animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                    <a href="#" className="social-btn instagram"><FaInstagram size={20} /></a>
                    <a href="#" className="social-btn facebook"><FaFacebook size={20} /></a>
                    <a href="#" className="social-btn tiktok"><FaTiktok size={18} /></a>
                    <a href="#" className="social-btn discord"><FaDiscord size={20} /></a>
                </div>

                <div className="hero-actions animate-fade-in-up">
                    <button onClick={scrollToAbout} className="primary-btn">
                        <MoveDown size={20} />
                        About Me
                    </button>
                    <Link to="/gallery" className="secondary-btn">
                        See Gallery
                    </Link>
                </div>
            </div>

            <div className="scroll-indicator animate-bounce">
                <ArrowDown size={24} />
            </div>
        </section>
    );
};
