import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import portfolioData from '../../public/assets/data/portfolio_data.json';
import './SlideShow.css';

export default function SlideShow({ onClose }) {
    const [projects, setProjects] = useState(portfolioData);
    const [currentProject, setCurrentProject] = useState(null);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const slidesContainerRef = useRef(null);
    const paginationRef = useRef(null);

    // Parse URL parameter 'artwork' if exists, otherwise load first project
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const artwork = urlParams.get('artwork');
        let selectedProject = projects[0];

        if (artwork) {
            const index = projects.findIndex(p =>
                p.name.replace(/\s+/g, '-').toLowerCase() === artwork.replace(/\s+/g, '-').toLowerCase() ||
                p.name === artwork
            );
            if (index !== -1) {
                selectedProject = projects[index];
            }
        }
        setCurrentProject(selectedProject);
        setCurrentSlideIndex(0);
    }, [projects]);

    // Update URL when current project changes
    const selectProject = (project) => {
        setCurrentProject(project);
        setCurrentSlideIndex(0);

        try {
            const newUrl = new URL(window.location.href);
            newUrl.searchParams.set('artwork', project.name);
            window.history.replaceState({}, '', newUrl);
        } catch (e) {
            console.error(e);
        }
    };

    const handlePrevSlide = () => {
        if (isTransitioning || !currentProject) return;
        const nextIndex = currentSlideIndex === 0 ? currentProject.contents.length - 1 : currentSlideIndex - 1;
        switchSlide(nextIndex, 'prev');
    };

    const handleNextSlide = () => {
        if (isTransitioning || !currentProject) return;
        const nextIndex = currentSlideIndex === currentProject.contents.length - 1 ? 0 : currentSlideIndex + 1;
        switchSlide(nextIndex, 'next');
    };

    const switchSlide = (targetIndex, direction = null) => {
        if (targetIndex === currentSlideIndex || isTransitioning) return;

        setIsTransitioning(true);
        const containerWidth = slidesContainerRef.current.clientWidth;

        const slides = slidesContainerRef.current.querySelectorAll('.slide');
        const activeSlide = slides[currentSlideIndex];
        const newSlide = slides[targetIndex];

        const activeImageContainer = activeSlide.querySelector('.image-container');
        const newImageContainer = newSlide.querySelector('.image-container');
        const newCaptionElements = newSlide.querySelectorAll('.caption > *');

        // Determine direction if not specified
        const isNext = direction ? direction === 'next' : targetIndex > currentSlideIndex;

        // Reset and prepare new slide style before animation
        gsap.set(newSlide, {
            display: 'block',
            width: 0,
            left: isNext ? 'auto' : 0,
            right: isNext ? 0 : 'auto',
            zIndex: 2
        });

        gsap.set(newImageContainer, {
            width: containerWidth,
            left: isNext ? 'auto' : -containerWidth / 8,
            right: isNext ? -containerWidth / 8 : 'auto'
        });

        gsap.set(newSlide.querySelector('.slide-content'), {
            width: containerWidth,
            left: isNext ? 'auto' : 0,
            right: isNext ? 0 : 'auto'
        });

        gsap.set(newCaptionElements, { y: 20, opacity: 0 });

        // Timeline for transition
        const tl = gsap.timeline({
            onComplete: () => {
                // Set final classes and clean up styles
                setCurrentSlideIndex(targetIndex);
                setIsTransitioning(false);

                // Reset styles to default CSS state
                gsap.set([newSlide, activeSlide, newImageContainer, activeImageContainer, newSlide.querySelector('.slide-content')], {
                    clearProps: 'all'
                });
            }
        });

        // 1. Move active slide image
        tl.to(activeImageContainer, {
            left: isNext ? -containerWidth / 4 : containerWidth / 4,
            duration: 1,
            ease: 'power3.inOut'
        }, 0);

        // 2. Expand new slide width (reveal effect)
        tl.to(newSlide, {
            width: containerWidth,
            duration: 1,
            ease: 'power3.inOut'
        }, 0);

        // 3. Move new slide image
        tl.to(newImageContainer, {
            left: isNext ? 0 : 0,
            right: isNext ? 0 : 0,
            duration: 1,
            ease: 'power3.inOut'
        }, 0);

        // 4. Stagger caption elements in new slide
        tl.to(newCaptionElements, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out'
        }, 0.1);
    };

    if (!currentProject) return null;

    return (
        <div id="portfolio" className="portfolio" style={{ display: 'block' }}>
            <div id="backbutton" className="back-button" onClick={onClose}>
                X
            </div>

            <div className="container">
                <div id="projectlist" className="button-list">
                    {projects.map((project, idx) => (
                        <li
                            key={idx}
                            className={`image-button ${currentProject.name === project.name ? 'active' : ''}`}
                            onClick={() => selectProject(project)}
                        >
                            <img src={`/${project.thumbnail}`} alt={project.name} />
                        </li>
                    ))}
                </div>
            </div>

            <main id="slideContent" className="main-content">
                <section id="slideshow" className="slideshow" ref={slidesContainerRef}>
                    <div className="slideshow-inner">
                        <div id="slides" className="slides">
                            {currentProject.contents.map((content, idx) => {
                                const isActive = idx === currentSlideIndex;
                                return (
                                    <div
                                        key={idx}
                                        className={`slide is-loaded ${isActive ? 'is-active' : ''}`}
                                        style={{ display: isActive ? 'block' : 'none' }}
                                    >
                                        <div className="slide-content">
                                            <div className="caption">
                                                <div className="title">{currentProject.name}</div>
                                            </div>
                                        </div>
                                        <div className="image-container">
                                            {content.includes('youtube') ? (
                                                <iframe
                                                    className="iframe"
                                                    src={content}
                                                    title="YouTube video player"
                                                    frameBorder="0"
                                                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    referrerPolicy="strict-origin-when-cross-origin"
                                                    allowFullScreen
                                                />
                                            ) : (
                                                <img className="image" src={`/${content}`} alt="" />
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div id="pagination" className="pagination" ref={paginationRef}>
                            {currentProject.contents.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`item ${idx === currentSlideIndex ? 'is-active' : ''}`}
                                    onClick={() => switchSlide(idx)}
                                >
                                    <span className="icon">{idx}</span>
                                </div>
                            ))}
                        </div>

                        <div className="arrows">
                            <div className="arrow prev" onClick={handlePrevSlide}>
                                <span className="svg svg-arrow-left">
                                    <svg viewBox="0 0 14 26" width="20px" height="50px">
                                        <path d="M13,26c-0.256,0-0.512-0.098-0.707-0.293l-12-12c-0.391-0.391-0.391-1.023,0-1.414l12-12c0.391-0.391,1.023-0.391,1.414,0s0.391,1.023,0,1.414L2.414,13l11.293,11.293c0.391,0.391,0.391,1.023,0,1.414C13.512,25.902,13.256,26,13,26z" />
                                    </svg>
                                </span>
                            </div>
                            <div className="arrow next" onClick={handleNextSlide}>
                                <span className="svg svg-arrow-right">
                                    <svg viewBox="0 0 14 26" width="20px" height="50px">
                                        <path d="M1,0c0.256,0,0.512,0.098,0.707,0.293l12,12c0.391,0.391,0.391,1.023,0,1.414l-12,12c-0.391,0.391-1.023,0.391-1.414,0s-0.391-1.023,0-1.414L11.586,13L0.293,1.707c-0.391-0.391-0.391-1.023,0-1.414C0.488,0.098,0.744,0,1,0z" />
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
