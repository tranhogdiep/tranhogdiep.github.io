import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import portfolioData from '../../public/assets/data/portfolio_data.json';
import './SlideShow.css';

const ChickenAR = lazy(() => import('../pages/ChickenAR'));
const DragonAR = lazy(() => import('../pages/DragonAR'));
const Panorama = lazy(() => import('../pages/Panorama'));
const MapDemo = lazy(() => import('../pages/MapDemo'));


function ImageWithLoader({ src, alt, className, ...props }) {
    const [isLoaded, setIsLoaded] = useState(false);
    const imgRef = useRef(null);

    useEffect(() => {
        if (imgRef.current && imgRef.current.complete) {
            setIsLoaded(true);
        }
    }, [src]);

    return (
        <div className="image-loader-container">
            {!isLoaded && <div className="image-spinner" />}
            <img
                ref={imgRef}
                src={src}
                alt={alt}
                className={`${className} ${isLoaded ? 'loaded' : 'loading'}`}
                onLoad={() => setIsLoaded(true)}
                {...props}
            />
        </div>
    );
}

export default function SlideShow({ onClose }) {
    const [projects, setProjects] = useState(portfolioData);
    const [currentProject, setCurrentProject] = useState(null);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [videoPlaying, setVideoPlaying] = useState(false);
    const [demoPlaying, setDemoPlaying] = useState(false);

    // Reset video and demo playing state when switching slides or project
    useEffect(() => {
        setVideoPlaying(false);
        setDemoPlaying(false);
    }, [currentSlideIndex, currentProject]);

    const slidesContainerRef = useRef(null);
    const paginationRef = useRef(null);

    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const isDragging = useRef(false);
    const dragStartX = useRef(0);
    const dragEndX = useRef(0);

    const handleTouchStart = (e) => {
        touchStartX.current = e.targetTouches[0].clientX;
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        const threshold = 50;
        const diffX = touchStartX.current - touchEndX.current;

        if (Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                handleNextSlide();
            } else {
                handlePrevSlide();
            }
        }
    };

    const handleMouseDown = (e) => {
        isDragging.current = true;
        dragStartX.current = e.clientX;
        dragEndX.current = e.clientX;
    };

    const handleMouseMove = (e) => {
        if (!isDragging.current) return;
        dragEndX.current = e.clientX;
    };

    const handleMouseUp = () => {
        if (!isDragging.current) return;
        isDragging.current = false;

        const threshold = 80;
        const diffX = dragStartX.current - dragEndX.current;

        if (Math.abs(diffX) > threshold) {
            if (diffX > 0) {
                handleNextSlide();
            } else {
                handlePrevSlide();
            }
        }
    };

    const handleMouseLeave = () => {
        isDragging.current = false;
    };

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

    const getYouTubeVideoId = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    };

    const getSlideOffset = (idx) => {
        if (!currentProject) return 0;
        const total = currentProject.contents.length;
        let offset = idx - currentSlideIndex;

        // Circular math for carousel offset wrapping
        if (offset < -total / 2) offset += total;
        if (offset > total / 2) offset -= total;

        return offset;
    };

    const handlePrevSlide = () => {
        if (isTransitioning || !currentProject) return;
        const nextIndex = currentSlideIndex === 0 ? currentProject.contents.length - 1 : currentSlideIndex - 1;
        switchSlide(nextIndex);
    };

    const handleNextSlide = () => {
        if (isTransitioning || !currentProject) return;
        const nextIndex = currentSlideIndex === currentProject.contents.length - 1 ? 0 : currentSlideIndex + 1;
        switchSlide(nextIndex);
    };

    const switchSlide = (targetIndex) => {
        if (targetIndex === currentSlideIndex || isTransitioning) return;

        setIsTransitioning(true);
        setCurrentSlideIndex(targetIndex);

        // Throttle rapid switching to match CSS transition duration
        setTimeout(() => {
            setIsTransitioning(false);
        }, 300);
    };

    if (!currentProject) return null;

    return (
        <div id="portfolio" className="portfolio">
            <div id="backbutton" className="back-button" onClick={onClose} aria-label="Close">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </div>

            <div className="portfolio-title">
                {currentProject.name}
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

            <main
                id="slideContent"
                className="main-content"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
            >
                <section id="slideshow" className="slideshow" ref={slidesContainerRef}>
                    <div className="slideshow-inner">
                        <div id="slides" className="slides">
                            {currentProject.contents.map((content, idx) => {
                                const offset = getSlideOffset(idx);
                                const isActive = offset === 0;

                                let cardClass = '';
                                if (offset === 0) cardClass = 'is-active';
                                else if (offset === -1) cardClass = 'is-left';
                                else if (offset === 1) cardClass = 'is-right';
                                else if (offset < -1) cardClass = 'is-far-left';
                                else if (offset > 1) cardClass = 'is-far-right';

                                return (
                                    <div
                                        key={idx}
                                        className={`slide is-loaded ${cardClass}`}
                                        onClick={() => {
                                            const totalDrag = Math.abs(dragStartX.current - dragEndX.current);
                                            if (totalDrag < 10) {
                                                if (!isActive) switchSlide(idx);
                                            }
                                        }}
                                        style={{ cursor: isActive ? 'default' : 'pointer' }}
                                    >
                                        <div className="image-container">
                                            <div className="artwork-wrapper">
                                                 {content.includes('youtube') ? (
                                                     (isActive && videoPlaying) ? (
                                                         <iframe
                                                             className="iframe"
                                                             src={`${content}&autoplay=1`}
                                                             title="YouTube video player"
                                                             frameBorder="0"
                                                             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                             referrerPolicy="strict-origin-when-cross-origin"
                                                             allowFullScreen
                                                         />
                                                     ) : (
                                                         <div
                                                             className="video-placeholder"
                                                             onClick={(e) => {
                                                                 const totalDrag = Math.abs(dragStartX.current - dragEndX.current);
                                                                 if (totalDrag < 10 && isActive) {
                                                                     e.stopPropagation();
                                                                     setVideoPlaying(true);
                                                                 }
                                                             }}
                                                         >
                                                             <ImageWithLoader
                                                                 key={content}
                                                                 className="image"
                                                                 src={`https://img.youtube.com/vi/${getYouTubeVideoId(content)}/hqdefault.jpg`}
                                                                 alt="Video thumbnail"
                                                                 draggable="false"
                                                             />
                                                             <div className="play-button">
                                                                 <svg viewBox="0 0 24 24" width="26" height="26">
                                                                     <polygon points="5 3 19 12 5 21 5 3" />
                                                                 </svg>
                                                             </div>
                                                         </div>
                                                     )
                                                 ) : content.startsWith('react:') ? (
                                                     (isActive && demoPlaying) ? (
                                                         <div className="react-demo-container">
                                                             <Suspense fallback={<div className="demo-loading-spinner"><div className="image-spinner" /></div>}>
                                                                 {(() => {
                                                                     const componentName = content.substring(6);
                                                                     if (componentName === 'MapDemo') return <MapDemo embedded={true} />;
                                                                     if (componentName === 'ChickenAR') return <ChickenAR embedded={true} />;
                                                                     if (componentName === 'DragonAR') return <DragonAR embedded={true} />;
                                                                     if (componentName === 'Panorama') return <Panorama embedded={true} />;
                                                                     return null;
                                                                 })()}
                                                             </Suspense>
                                                         </div>
                                                     ) : (
                                                         <div
                                                             className="demo-placeholder"
                                                             onClick={(e) => {
                                                                 const totalDrag = Math.abs(dragStartX.current - dragEndX.current);
                                                                 if (totalDrag < 10 && isActive) {
                                                                     e.stopPropagation();
                                                                     setDemoPlaying(true);
                                                                 }
                                                             }}
                                                         >
                                                             <div className="launcher-card">
                                                                 <div className="launcher-icon">
                                                                     {(() => {
                                                                         const componentName = content.substring(6);
                                                                         if (componentName === 'MapDemo') {
                                                                             return (
                                                                                 <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                                                     <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                                                                                     <line x1="8" y1="2" x2="8" y2="18"></line>
                                                                                     <line x1="16" y1="6" x2="16" y2="22"></line>
                                                                                 </svg>
                                                                             );
                                                                         }
                                                                         if (componentName === 'ChickenAR') {
                                                                             return (
                                                                                 <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                                                     <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                                                                                     <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                                                                                     <line x1="12" y1="22.08" x2="12" y2="12"></line>
                                                                                 </svg>
                                                                             );
                                                                         }
                                                                         if (componentName === 'DragonAR') {
                                                                             return (
                                                                                 <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                                                     <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                                                                                     <polyline points="2 17 12 22 22 17"></polyline>
                                                                                     <polyline points="2 12 12 17 22 12"></polyline>
                                                                                 </svg>
                                                                             );
                                                                         }
                                                                         if (componentName === 'Panorama') {
                                                                             return (
                                                                                 <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                                                     <circle cx="12" cy="12" r="10"></circle>
                                                                                     <line x1="22" y1="12" x2="18" y2="12"></line>
                                                                                     <line x1="6" y1="12" x2="2" y2="12"></line>
                                                                                     <line x1="12" y1="6" x2="12" y2="2"></line>
                                                                                     <line x1="12" y1="22" x2="12" y2="18"></line>
                                                                                 </svg>
                                                                             );
                                                                         }
                                                                         return null;
                                                                     })()}
                                                                 </div>
                                                                 <h3 className="launcher-title">
                                                                     {(() => {
                                                                         const componentName = content.substring(6);
                                                                         if (componentName === 'MapDemo') return '3D City Map Routing';
                                                                         if (componentName === 'ChickenAR') return 'Chicken AR Viewer';
                                                                         if (componentName === 'DragonAR') return 'Dragon AR Viewer';
                                                                         if (componentName === 'Panorama') return '360° Panorama Viewer';
                                                                         return 'Interactive 3D Demo';
                                                                     })()}
                                                                 </h3>
                                                                 <span className="launcher-subtitle">Interactive WebGL Experience</span>
                                                                 <button className="launcher-button">
                                                                     <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" style={{ marginRight: '8px', display: 'inline-block', verticalAlign: 'middle' }}>
                                                                         <polygon points="5 3 19 12 5 21 5 3" />
                                                                     </svg>
                                                                     Run Interactive Demo
                                                                 </button>
                                                             </div>
                                                         </div>
                                                     )
                                                 ) : (
                                                    <ImageWithLoader
                                                        key={content}
                                                        className="image"
                                                        src={`/${content}`}
                                                        alt=""
                                                        draggable="false"
                                                    />
                                                 )}
                                            </div>
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
