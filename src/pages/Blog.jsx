import { useNavigate, useParams } from 'react-router-dom';
import { useLanguage } from '../config/LanguageContext';
import './Blog.css';
import ModelViewer3D from '../components/ModelViewer3D';
import { BLOG_POSTS } from '../config/blogConfig';

export default function Blog() {
    const navigate = useNavigate();
    const { slug } = useParams();
    const { language, setLanguage, t } = useLanguage();

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

    const selectedPost = slug
        ? BLOG_POSTS.find(post => post.slug === slug || post.id.toString() === slug)
        : null;

    const translatedSelectedPost = getPostTranslation(selectedPost);

    return (
        <div className="blog-page-container">
            {/* Background Blur Elements */}
            <div className="blog-blur-circle circle-1"></div>
            <div className="blog-blur-circle circle-2"></div>

            <div className="blog-content-wrapper">
                {/* Top Bar (Back Button + Language Switcher) */}
                <div className="blog-top-bar">
                    <button className="blog-home-btn" onClick={() => navigate('/')}>
                        &larr; {t('blog.backToMenu')}
                    </button>
                    
                    <div className="blog-lang-container">
                        <button 
                            className={`blog-lang-btn ${language === 'en' ? 'active' : ''}`}
                            onClick={() => setLanguage('en')}
                            aria-label="Set language to English"
                        >
                            EN
                        </button>
                        <span className="blog-lang-slash">/</span>
                        <button 
                            className={`blog-lang-btn ${language === 'vi' ? 'active' : ''}`}
                            onClick={() => setLanguage('vi')}
                            aria-label="Set language to Vietnamese"
                        >
                            VI
                        </button>
                    </div>
                </div>


                {translatedSelectedPost ? (
                    <div className="blog-detail-container animate-slide-up">
                        <button className="blog-inner-back-btn" onClick={() => navigate('/blog')}>
                            &larr; {t('blog.allArticles')}
                        </button>
                        <div className="blog-detail-meta">
                            <span className="blog-detail-cat">{translatedSelectedPost.category}</span>
                            <span className="blog-detail-date">{translatedSelectedPost.date}</span>
                        </div>
                        <h1 className="blog-detail-title">{translatedSelectedPost.title}</h1>
                        <div className="blog-detail-divider"></div>
                        {translatedSelectedPost.show3DModel && <ModelViewer3D />}
                        <div 
                            className="blog-detail-body" 
                            dangerouslySetInnerHTML={{ __html: translatedSelectedPost.content }} 
                        />
                    </div>
                ) : (
                    <div className="blog-list-container animate-slide-up">
                        <header className="blog-header">
                            <span className="blog-tagline">{t('blog.devlogNotes')}</span>
                            <h1 className="blog-main-title">{t('blog.devBlog')}</h1>
                            <p className="blog-main-desc">
                                {t('blog.subtitle')}
                            </p>
                        </header>

                        <div className="blog-grid">
                            {BLOG_POSTS.map(post => {
                                const p = getPostTranslation(post);
                                return (
                                    <article 
                                        key={p.id} 
                                        className="blog-page-card"
                                        onClick={() => navigate(`/blog/${p.slug}`)}
                                    >
                                        <div className="blog-card-meta">
                                            <span className="blog-card-cat">{p.category}</span>
                                            <span className="blog-card-date">{p.date}</span>
                                        </div>
                                        <h2 className="blog-card-title">{p.title}</h2>
                                        <p className="blog-card-excerpt">{p.excerpt}</p>
                                        <span className="blog-card-link">{t('blog.readArticle')} &rarr;</span>
                                    </article>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
