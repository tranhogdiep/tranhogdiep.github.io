import React, { useState } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import './Header.css';

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Helper to change search param tab or navigate to Blog page
    const handleNavClick = (tabName) => {
        setMobileMenuOpen(false);
        if (tabName === 'blog') {
            navigate('/blog');
        } else {
            navigate(`/?tab=${tabName}`);
        }
    };

    const handleHomeClick = () => {
        setMobileMenuOpen(false);
        navigate('/');
    };

    const activeTab = searchParams.get('tab');
    const artwork = searchParams.get('artwork');
    const isBlogPage = location.pathname === '/blog';

    // Hide header on standalone blog page or when portfolio (slideshow) is active on homepage
    if (isBlogPage || activeTab === 'portfolio' || !!artwork) {
        return null;
    }

    return (
        <header className="site-header">
            <div className="header-container">
                {/* Desktop Left Nav */}
                <nav className="desktop-nav left-nav">
                    <button 
                        className={`nav-link ${activeTab === 'about' ? 'active' : ''}`}
                        onClick={() => handleNavClick('about')}
                    >
                        About me
                    </button>
                    <span className="nav-separator">•</span>
                    <button 
                        className={`nav-link ${activeTab === 'portfolio' ? 'active' : ''}`}
                        onClick={() => handleNavClick('portfolio')}
                    >
                        Portfolio
                    </button>
                </nav>

                {/* Center Brand Identity (Logo + Name) */}
                <div className="brand-center" onClick={handleHomeClick}>
                    <div className="brand-logo-container">
                        {/* Custom SVG Line-Art Astronaut Helmet Logo */}
                        <svg 
                            className="brand-logo-svg" 
                            viewBox="0 0 100 100" 
                            width="50" 
                            height="50" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2.5" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        >
                            {/* Helmet Outer Dome */}
                            <path d="M25 45 C25 22, 75 22, 75 45 C75 58, 70 70, 50 72 C30 70, 25 58, 25 45 Z" />
                            {/* Visor Outer */}
                            <path d="M32 40 C32 30, 68 30, 68 40 C68 52, 60 58, 50 58 C40 58, 32 52, 32 40 Z" fill="rgba(255,255,255,0.05)" />
                            {/* Visor Glare Lines */}
                            <path d="M38 38 Q50 35 62 38" strokeWidth="1.5" opacity="0.6" />
                            <path d="M36 43 C42 45, 58 45, 64 43" strokeWidth="1.5" opacity="0.4" />
                            {/* Neck Ring / Base collar */}
                            <path d="M30 72 L30 78 C30 81, 70 81, 70 78 L70 72" />
                            <path d="M35 78 L35 84 C35 86, 65 86, 65 84 L65 78" />
                            {/* Little Crest Star on Top */}
                            <polygon points="50,14 52,19 57,19 53,22 55,27 50,24 45,27 47,22 43,19 48,19" fill="#f1c40f" stroke="none" />
                            {/* Side canisters/dials */}
                            <rect x="20" y="42" width="5" height="12" rx="2" />
                            <rect x="75" y="42" width="5" height="12" rx="2" />
                        </svg>
                    </div>
                    <h1 className="brand-name">Tran Hong Diep</h1>
                    <div className="brand-underline"></div>
                </div>

                {/* Desktop Right Nav */}
                <nav className="desktop-nav right-nav">
                    <button 
                        className={`nav-link ${isBlogPage ? 'active' : ''}`}
                        onClick={() => handleNavClick('blog')}
                    >
                        Blog
                    </button>
                    <span className="nav-separator">•</span>
                    <button 
                        className={`nav-link ${activeTab === 'contact' ? 'active' : ''}`}
                        onClick={() => handleNavClick('contact')}
                    >
                        Contact
                    </button>
                </nav>

                {/* Mobile Menu Toggle Button */}
                <button 
                    className={`mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle navigation menu"
                >
                    <span className="hamburger-bar"></span>
                    <span className="hamburger-bar"></span>
                    <span className="hamburger-bar"></span>
                </button>
            </div>

            {/* Mobile Dropdown Menu Overlay */}
            <div className={`mobile-nav-overlay ${mobileMenuOpen ? 'show' : ''}`}>
                <nav className="mobile-nav-links">
                    <button 
                        className={`mobile-nav-link ${activeTab === 'about' ? 'active' : ''}`}
                        onClick={() => handleNavClick('about')}
                    >
                        About me
                    </button>
                    <button 
                        className={`mobile-nav-link ${activeTab === 'portfolio' ? 'active' : ''}`}
                        onClick={() => handleNavClick('portfolio')}
                    >
                        Portfolio
                    </button>
                    <button 
                        className={`mobile-nav-link ${isBlogPage ? 'active' : ''}`}
                        onClick={() => handleNavClick('blog')}
                    >
                        Blog
                    </button>
                    <button 
                        className={`mobile-nav-link ${activeTab === 'contact' ? 'active' : ''}`}
                        onClick={() => handleNavClick('contact')}
                    >
                        Contact
                    </button>
                </nav>
            </div>
        </header>
    );
}
