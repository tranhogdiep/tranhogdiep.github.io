import React, { Suspense, lazy } from 'react';
import { useLanguage } from '../../config/LanguageContext';

const ChickenAR = lazy(() => import('../ChickenAR'));
const DragonAR = lazy(() => import('../DragonAR'));

export default function Post2() {
    const { language } = useLanguage();

    return (
        <>
            {language === 'vi' ? (
                <>
                    <p>Thực tế tăng cường (AR) trên web đã trưởng thành đáng kể trong vài năm qua. Ngày nay, người dùng có thể trải nghiệm nội dung AR ngay lập tức chỉ với một lần chạm trên màn hình điện thoại thông minh của họ.</p>
                    <h3>Sức mạnh của WebXR</h3>
                    <p>WebXR là tiêu chuẩn mở giúp AR và VR khả thi trên trình duyệt. Trong portfolio này, chúng tôi giới thiệu các model như Chicken AR và Dragon AR. Bằng cách sử dụng các tính năng WebXR hoặc các framework AR dựa trên web, chúng ta có thể đặt các mô hình 3D ảo trực tiếp lên các bề mặt thế giới thực qua camera.</p>
                    <h3>Thiết kế cho Thiết bị di động</h3>
                    <p>Khi phát triển AR cho di động, hãy nhớ rằng GPU di động bị giới hạn. Hãy hạn chế số lượng đa giác (polycount), tận dụng ánh sáng baked khi có thể, và đảm bảo các lớp giao diện UI rõ ràng và không cản trở tầm nhìn.</p>
                </>
            ) : (
                <>
                    <p>Augmented Reality (AR) on the web has matured significantly over the last few years. Today, users can experience AR content immediately with a single tap on their smartphone screen.</p>
                    <h3>The Power of WebXR</h3>
                    <p>WebXR is the open standard that makes AR and VR possible in browsers. In this portfolio, we showcase models like the Chicken AR and Dragon AR. By using WebXR features or web-based AR frameworks, we can place 3D virtual models right onto real-world surfaces seen through the camera.</p>
                    <h3>Designing for Mobile</h3>
                    <p>When developing mobile AR, keep in mind that mobile GPUs are constrained. Limit polygon counts, utilize baked lighting where possible, and ensure the UI overlays are clean and non-obtrusive.</p>
                </>
            )}

            {/* Showcase Section */}
            <div className="blog-ar-showcase-section">
                <h2 className="blog-ar-showcase-title">
                    {language === 'vi' ? 'Trải nghiệm AR Tương tác' : 'Interactive AR Showcases'}
                </h2>
                <p className="blog-ar-showcase-subtitle">
                    {language === 'vi' 
                        ? 'Khám phá các mô hình 3D trực tiếp trên trình duyệt của bạn. Nhấp vào nút Toàn màn hình để có trải nghiệm tốt nhất hoặc quét mã AR trên thiết bị di động.'
                        : 'Explore 3D models directly in your browser. Click the Fullscreen button for the best experience, or trigger AR on mobile devices.'}
                </p>
                
                <div className="blog-ar-grid">
                    <div className="blog-ar-card">
                        <div className="blog-ar-card-header">
                            <h3>{language === 'vi' ? 'Chicken AR (Mô hình Gà)' : 'Chicken AR'}</h3>
                            <span className="blog-ar-tech-tag">Model Viewer</span>
                        </div>
                        <div className="blog-ar-viewer-container">
                            <Suspense fallback={<div className="blog-ar-loading">Loading...</div>}>
                                <ChickenAR embedded={true} />
                            </Suspense>
                        </div>
                    </div>

                    <div className="blog-ar-card">
                        <div className="blog-ar-card-header">
                            <h3>{language === 'vi' ? 'Dragon AR (Mô hình Rồng Băng)' : 'Dragon AR'}</h3>
                            <span className="blog-ar-tech-tag">Three.js + WebXR</span>
                        </div>
                        <div className="blog-ar-viewer-container">
                            <Suspense fallback={<div className="blog-ar-loading">Loading...</div>}>
                                <DragonAR embedded={true} />
                            </Suspense>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
