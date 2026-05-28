import { useState } from 'react';
import { useLanguage } from '../config/LanguageContext';
import './BlogModal.css';
import { BLOG_POSTS } from '../config/blogConfig';

export default function BlogModal({ onClose }) {
    const { language, t } = useLanguage();
    const [selectedPost, setSelectedPost] = useState(null);

    const getPostTranslation = (post) => {
        if (!post) return null;
        const localized = post[language] || post.en || {};
        return {
            ...post,
            title: localized.title || post.title,
            excerpt: localized.excerpt || post.excerpt,
            content: localized.content || post.content,
            date: localized.date || post.date,
            category: localized.category || post.category
        };
    };

    const handleOutsideClick = (e) => {
        if (e.target.classList.contains('blog-modal-wrapper')) {
            onClose();
        }
    };

    const translatedSelectedPost = getPostTranslation(selectedPost);

    return (
        <div className="blog-modal-wrapper" onClick={handleOutsideClick}>
            <div className="blog-modal-container">
                <button className="blog-modal-close" onClick={onClose} aria-label="Close modal">
                    &times;
                </button>

                {translatedSelectedPost ? (
                    <div className="blog-post-detail animate-fade-in">
                        <button className="blog-back-btn" onClick={() => setSelectedPost(null)}>
                            &larr; {t('blog.backToBlog')}
                        </button>
                        <div className="blog-post-meta">
                            <span className="blog-category">{translatedSelectedPost.category}</span>
                            <span className="blog-date">{translatedSelectedPost.date}</span>
                        </div>
                        <h2 className="blog-post-title-detail">{translatedSelectedPost.title}</h2>
                        <div 
                            className="blog-post-body" 
                            dangerouslySetInnerHTML={{ __html: translatedSelectedPost.content }} 
                        />
                    </div>
                ) : (
                    <div className="blog-list-view">
                        <h2 className="blog-title">{t('blog.devBlog')}</h2>
                        <p className="blog-subtitle">{t('blog.insightsSubtitle')}</p>
                        
                        <div className="blog-posts-grid">
                            {BLOG_POSTS.map(post => {
                                const p = getPostTranslation(post);
                                return (
                                    <div 
                                        key={p.id} 
                                        className="blog-card"
                                        onClick={() => setSelectedPost(post)}
                                    >
                                        <div className="blog-card-header">
                                            <span className="blog-category">{p.category}</span>
                                            <span className="blog-date">{p.date}</span>
                                        </div>
                                        <h3 className="blog-card-title">{p.title}</h3>
                                        <p className="blog-card-excerpt">{p.excerpt}</p>
                                        <span className="blog-card-more">{t('blog.readMore')} &rarr;</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
