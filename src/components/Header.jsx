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
    const isBlogPage = location.pathname.startsWith('/blog');

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
                        <img 
                            src="/assets/only_logo.ico" 
                            alt="Logo" 
                            className="brand-logo-img" 
                        />
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
