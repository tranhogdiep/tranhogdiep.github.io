import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Blog.css';

const BLOG_POSTS = [
    {
        id: 1,
        title: "Creating a 3D WebGL Portfolio with Three.js",
        date: "May 15, 2026",
        category: "Graphics",
        excerpt: "Learn the secrets behind building interactive 3D experiences on the web using Three.js, custom shaders, and GSAP animations.",
        content: `
            <p>Creating a 3D web experience requires a fine balance between art and technology. In this article, we dive deep into how to structure a WebGL portfolio that is both visually stunning and highly performant.</p>
            <h3>1. The Tech Stack</h3>
            <p>For modern 3D web development, a combination of Vite, React, and Three.js is extremely powerful. React helps us manage the state of overlay UI, while Three.js handles rendering WebGL context.</p>
            <h3>2. Asset Optimization</h3>
            <p>One of the biggest bottlenecks in WebGL is loading time. Always make sure to use Draco compression for your glTF/glb models. In this project, menu models are compressed down to a fraction of their original size, reducing load times dramatically.</p>
            <h3>3. Lighting and HDR</h3>
            <p>Using a high-quality HDR (High Dynamic Range) environment map brings out realistic metallic reflections and ambient lighting. We load HDR textures via RGBELoader to map environment lights in real-time.</p>
        `
    },
    {
        id: 2,
        title: "Unlocking AR on Web Browsers",
        date: "April 28, 2026",
        category: "Augmented Reality",
        excerpt: "An introduction to building augmented reality experiences directly in browsers without requiring external applications.",
        content: `
            <p>Augmented Reality (AR) on the web has matured significantly over the last few years. Today, users can experience AR content immediately with a single tap on their smartphone screen.</p>
            <h3>The Power of WebXR</h3>
            <p>WebXR is the open standard that makes AR and VR possible in browsers. In this portfolio, we showcase models like the Chicken AR and Dragon AR. By using WebXR features or web-based AR frameworks, we can place 3D virtual models right onto real-world surfaces seen through the camera.</p>
            <h3>Designing for Mobile</h3>
            <p>When developing mobile AR, keep in mind that mobile GPUs are constrained. Limit polygon counts, utilize baked lighting where possible, and ensure the UI overlays are clean and non-obtrusive.</p>
        `
    },
    {
        id: 3,
        title: "Optimizing 3D Assets for Web",
        date: "March 10, 2026",
        category: "Game Dev",
        excerpt: "A comprehensive guide to preparing 3D assets, texture mapping, and polycounts for real-time web rendering.",
        content: `
            <p>Creating low-poly models is an art form. When rendering in a web browser, optimization starts at the source: your 3D modeling tool.</p>
            <h3>Key Optimization Rules:</h3>
            <ul>
                <li><strong>Polycount Limits:</strong> Keep individual models under 50,000 polygons whenever possible.</li>
                <li><strong>Texture Atlasing:</strong> Combine multiple textures into a single texture atlas to reduce draw calls.</li>
                <li><strong>Texture Compression:</strong> Use formats like KTX2 or optimize png/jpg textures aggressively.</li>
                <li><strong>Draco Compression:</strong> Use gltf-pipeline or Blender export options to apply Draco geometry compression.</li>
            </ul>
        `
    }
];

export default function Blog() {
    const navigate = useNavigate();
    const [selectedPost, setSelectedPost] = useState(null);

    return (
        <div className="blog-page-container">
            {/* Background Blur Elements */}
            <div className="blog-blur-circle circle-1"></div>
            <div className="blog-blur-circle circle-2"></div>

            <div className="blog-content-wrapper">
                {/* Back to Home Button */}
                <button className="blog-home-btn" onClick={() => navigate('/')}>
                    &larr; Back to Menu
                </button>

                {selectedPost ? (
                    <div className="blog-detail-container animate-slide-up">
                        <button className="blog-inner-back-btn" onClick={() => setSelectedPost(null)}>
                            &larr; All Articles
                        </button>
                        <div className="blog-detail-meta">
                            <span className="blog-detail-cat">{selectedPost.category}</span>
                            <span className="blog-detail-date">{selectedPost.date}</span>
                        </div>
                        <h1 className="blog-detail-title">{selectedPost.title}</h1>
                        <div className="blog-detail-divider"></div>
                        <div 
                            className="blog-detail-body" 
                            dangerouslySetInnerHTML={{ __html: selectedPost.content }} 
                        />
                    </div>
                ) : (
                    <div className="blog-list-container animate-slide-up">
                        <header className="blog-header">
                            <span className="blog-tagline">Devlog & Notes</span>
                            <h1 className="blog-main-title">Developer Blog</h1>
                            <p className="blog-main-desc">
                                Insights, tutorials, and behind-the-scenes logs on WebGL, Three.js, and Game Development.
                            </p>
                        </header>

                        <div className="blog-grid">
                            {BLOG_POSTS.map(post => (
                                <article 
                                    key={post.id} 
                                    className="blog-page-card"
                                    onClick={() => setSelectedPost(post)}
                                >
                                    <div className="blog-card-meta">
                                        <span className="blog-card-cat">{post.category}</span>
                                        <span className="blog-card-date">{post.date}</span>
                                    </div>
                                    <h2 className="blog-card-title">{post.title}</h2>
                                    <p className="blog-card-excerpt">{post.excerpt}</p>
                                    <span className="blog-card-link">Read Article &rarr;</span>
                                </article>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
