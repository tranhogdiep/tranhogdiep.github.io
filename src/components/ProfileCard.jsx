import React from 'react';
import './ProfileCard.css';

export default function ProfileCard({ onClose }) {
    const handleOutsideClick = (e) => {
        if (e.target.classList.contains('wrapper')) {
            onClose();
        }
    };

    return (
        <div id="infopopup" className="wrapper" onClick={handleOutsideClick}>
            <div className="profile-card js-profile-card">
                <button className="profile-card-close" onClick={onClose} aria-label="Close card">
                    &times;
                </button>

                <div className="profile-card__img">
                    <img src="/assets/images/avatar.jpg" alt="profile card" />
                </div>

                <div className="profile-card__cnt js-profile-cnt">
                    <div className="profile-card__name">Tran Hong Diep</div>
                    <div className="profile-card__txt"><strong>Game Developer </strong></div>
                    
                    <div className="profile-card-loc">
                        <span className="profile-card-loc__icon">
                            <svg className="icon" viewBox="0 0 32 32" width="16" height="16" fill="currentColor">
                                <path d="M16 31.68c-0.352 0-0.672-0.064-1.024-0.16-0.8-0.256-1.44-0.832-1.824-1.6l-6.784-13.632c-1.664-3.36-1.568-7.328 0.32-10.592 1.856-3.2 4.992-5.152 8.608-5.376h1.376c3.648 0.224 6.752 2.176 8.608 5.376 1.888 3.264 2.016 7.232 0.352 10.592l-6.816 13.664c-0.288 0.608-0.8 1.12-1.408 1.408-0.448 0.224-0.928 0.32-1.408 0.32zM15.392 2.368c-2.88 0.192-5.408 1.76-6.912 4.352-1.536 2.688-1.632 5.92-0.288 8.672l6.816 13.632c0.128 0.256 0.352 0.448 0.64 0.544s0.576 0.064 0.832-0.064c0.224-0.096 0.384-0.288 0.48-0.48l6.816-13.664c1.376-2.752 1.248-5.984-0.288-8.672-1.472-2.56-4-4.128-6.88-4.32h-1.216zM16 17.888c-3.264 0-5.92-2.656-5.92-5.92 0-3.232 2.656-5.888 5.92-5.888s5.92 2.656 5.92 5.92c0 3.264-2.656 5.888-5.92 5.888zM16 8.128c-2.144 0-3.872 1.728-3.872 3.872s1.728 3.872 3.872 3.872 3.872-1.728 3.872-3.872c0-2.144-1.76-3.872-3.872-3.872z" />
                            </svg>
                        </span>
                        <span className="profile-card-loc__txt">
                            Da Nang City, Viet Nam
                        </span>
                    </div>
                    
                    <div className="profile-card-loc">
                        <span className="profile-card-loc__icon">&#9993;</span>
                        <span className="profile-card-loc__txt">
                            diepth.dd@gmail.com
                        </span>
                    </div>

                    <div className="profile-card-inf">
                        <p>I'm very passionate about game development and the fields relating to it.<br />
                        I also love the games industry and learning new things daily, meeting new people,<br />
                        and getting involved with the community.</p>
                    </div>

                    <div className="profile-card-social">
                        <a href="https://www.facebook.com/THDPA" className="profile-card-social__item facebook" target="_blank" rel="noreferrer">
                            <span className="icon-font">
                                <svg className="icon" viewBox="0 0 32 32" width="16" height="16" fill="currentColor">
                                    <path d="M19 6h5v-6h-5c-3.86 0-7 3.14-7 7v3h-4v6h4v16h6v-16h5l1-6h-6v-3c0-0.542 0.458-1 1-1z" />
                                </svg>
                            </span>
                        </a>
                        <a href="https://www.linkedin.com/in/diepth/" className="profile-card-social__item twitter" target="_blank" rel="noreferrer">
                            <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                            </svg>
                        </a>
                        <a href="https://www.artstation.com/dieptranhong" className="profile-card-social__item behance" target="_blank" rel="noreferrer">
                            <span className="icon-font">
                                <svg className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16" fill="currentColor">
                                    <path d="M2 377.4l43 74.3A51.4 51.4 0 0 0 90.9 480h285.4l-59.2-102.6zM501.8 350L335.6 59.3A51.4 51.4 0 0 0 290.2 32h-88.4l257.3 447.6 40.7-70.5c1.9-3.2 21-29.7 2-59.1zM275 304.5l-115.5-200L44 304.5z" />
                                </svg>
                            </span>
                        </a>
                        <a href="https://sketchfab.com/tranhongdiep" className="profile-card-social__item sketfab" target="_blank" rel="noreferrer">
                            <span className="icon-font">
                                <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 50 50">
                                    <path d="M25,2C12.317,2,2,12.317,2,25s10.317,23,23,23s23-10.317,23-23S37.683,2,25,2z M24,38.805l-10-6.25V20.664l10,6.458V38.805z M14.367,18.484L25,11.819l10.633,6.665L25,25.149L14.367,18.484z M36,32.555l-10,6.25V27.122l10-6.458V32.555z" />
                                </svg>
                            </span>
                        </a>
                        <a href="https://ddevsin.gumroad.com/l/ReadyFaster" className="profile-card-social__item gumroad" target="_blank" rel="noreferrer">
                            <span className="icon-font">
                                <svg className="icon" fill="currentColor" width="16" height="16" viewBox="-6.5 0 32 32" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.656 22.844v-11.938c0-0.625 0.719-1.344 1.313-1.344h9.688c0.438 0.781 1.281 1.344 2.281 1.344 1.469 0 2.656-1.219 2.656-2.656 0-1.5-1.188-2.656-2.656-2.656-1 0-1.844 0.531-2.281 1.313h-9.688c-0.969 0-1.969 0.469-2.75 1.219-0.781 0.781-1.219 1.781-1.219 2.781v11.938c0 1 0.438 2 1.219 2.781 0.781 0.75 1.781 1.219 2.75 1.219h10.656c0.969 0 1.969-0.469 2.75-1.219 0.781-0.781 1.219-1.781 1.219-2.781v-6.625c0-1.094-0.438-2.125-1.25-2.875-0.75-0.719-1.75-1.125-2.719-1.125h-5.313c-1.063 0-2.063 0.438-2.844 1.25-0.719 0.75-1.156 1.75-1.156 2.75v1.313c0 1 0.438 2 1.219 2.75 0.781 0.781 1.781 1.25 2.781 1.25h0.344c0.469 0.781 1.313 1.313 2.313 1.313 1.469 0 2.656-1.188 2.656-2.656s-1.188-2.656-2.656-2.656c-1 0-1.844 0.531-2.313 1.344h-0.344c-0.625 0-1.344-0.75-1.344-1.344v-1.313c0-0.625 0.594-1.344 1.344-1.344h5.313c0.594 0 1.313 0.594 1.313 1.344v6.625c0 0.594-0.719 1.344-1.313 1.344h-10.656c-0.594 0-1.313-0.75-1.313-1.344z" />
                                </svg>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
