import React, { useState } from 'react';
import { useLanguage } from '../config/LanguageContext';
import './ContactModal.css';

export default function ContactModal({ onClose }) {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleOutsideClick = (e) => {
        if (e.target.classList.contains('contact-modal-wrapper')) {
            onClose();
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 1800);
    };

    return (
        <div className="contact-modal-wrapper" onClick={handleOutsideClick}>
            <div className="contact-modal-container">
                <button className="contact-modal-close" onClick={onClose} aria-label="Close modal">
                    &times;
                </button>

                <div className="contact-grid">
                    {/* Left Panel: Details & Socials */}
                    <div className="contact-info-panel">
                        <h2 className="contact-title">{t('contact.title')}</h2>
                        <p className="contact-desc">
                            {t('contact.description')}
                        </p>

                        <div className="contact-details-list">
                            <div className="contact-detail-item">
                                <span className="contact-detail-icon">📍</span>
                                <div>
                                    <h4>{t('contact.location')}</h4>
                                    <p>Da Nang City, Viet Nam</p>
                                </div>
                            </div>
                            <div className="contact-detail-item">
                                <span className="contact-detail-icon">✉️</span>
                                <div>
                                    <h4>{t('contact.email')}</h4>
                                    <p><a href="mailto:diepth.dd@gmail.com">diepth.dd@gmail.com</a></p>
                                </div>
                            </div>
                        </div>

                        <div className="contact-socials-wrapper">
                            <h4>{t('contact.findMe')}</h4>
                            <div className="contact-social-icons">
                                <a href="https://www.facebook.com/THDPA" target="_blank" rel="noreferrer" className="contact-social-btn fb" title="Facebook">
                                    <svg viewBox="0 0 32 32" width="18" height="18" fill="currentColor">
                                        <path d="M19 6h5v-6h-5c-3.86 0-7 3.14-7 7v3h-4v6h4v16h6v-16h5l1-6h-6v-3c0-0.542 0.458-1 1-1z" />
                                    </svg>
                                </a>
                                <a href="https://www.linkedin.com/in/diepth/" target="_blank" rel="noreferrer" className="contact-social-btn ln" title="LinkedIn">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                                    </svg>
                                </a>
                                <a href="https://www.artstation.com/dieptranhong" target="_blank" rel="noreferrer" className="contact-social-btn as" title="ArtStation">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="18" height="18" fill="currentColor">
                                        <path d="M2 377.4l43 74.3A51.4 51.4 0 0 0 90.9 480h285.4l-59.2-102.6zM501.8 350L335.6 59.3A51.4 51.4 0 0 0 290.2 32h-88.4l257.3 447.6 40.7-70.5c1.9-3.2 21-29.7 2-59.1zM275 304.5l-115.5-200L44 304.5z" />
                                    </svg>
                                </a>
                                <a href="https://sketchfab.com/tranhogdiep" target="_blank" rel="noreferrer" className="contact-social-btn sf" title="Sketchfab">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 50 50">
                                        <path d="M25,2C12.317,2,2,12.317,2,25s10.317,23,23,23s23-10.317,23-23S37.683,2,25,2z M24,38.805l-10-6.25V20.664l10,6.458V38.805z M14.367,18.484L25,11.819l10.633,6.665L25,25.149L14.367,18.484z M36,32.555l-10,6.25V27.122l10-6.458V32.555z" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Right Panel: Interactive Form */}
                    <div className="contact-form-panel">
                        {isSuccess ? (
                            <div className="contact-success-state animate-fade-in">
                                <div className="success-circle">
                                    <svg viewBox="0 0 52 52" className="success-checkmark">
                                        <circle cx="26" cy="26" r="25" fill="none" className="checkmark-circle" />
                                        <path fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" className="checkmark-check" />
                                    </svg>
                                </div>
                                <h3>{t('contact.successTitle')}</h3>
                                <p>{t('contact.successDesc')}</p>
                                <button className="contact-reset-btn" onClick={() => setIsSuccess(false)}>
                                    {t('contact.btnReset')}
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="contact-form">
                                <div className="form-group">
                                    <label htmlFor="name">{t('contact.labelName')}</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        name="name" 
                                        value={formData.name} 
                                        onChange={handleChange} 
                                        required 
                                        placeholder={t('contact.placeholderName')}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">{t('contact.labelEmail')}</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        name="email" 
                                        value={formData.email} 
                                        onChange={handleChange} 
                                        required 
                                        placeholder={t('contact.placeholderEmail')}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="subject">{t('contact.labelSubject')}</label>
                                    <input 
                                        type="text" 
                                        id="subject" 
                                        name="subject" 
                                        value={formData.subject} 
                                        onChange={handleChange} 
                                        required 
                                        placeholder={t('contact.placeholderSubject')}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">{t('contact.labelMessage')}</label>
                                    <textarea 
                                        id="message" 
                                        name="message" 
                                        value={formData.message} 
                                        onChange={handleChange} 
                                        required 
                                        rows="4"
                                        placeholder={t('contact.placeholderMessage')}
                                    />
                                </div>
                                <button type="submit" className={`contact-submit-btn ${isSubmitting ? 'submitting' : ''}`} disabled={isSubmitting}>
                                    {isSubmitting ? (
                                        <>
                                            <span className="form-spinner"></span> {t('contact.btnSending')}
                                        </>
                                    ) : (
                                        t('contact.btnSend')
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
