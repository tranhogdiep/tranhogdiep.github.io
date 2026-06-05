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
                    <h3>Google &lt;model-viewer&gt;</h3>
                    <p>Google <code>&lt;model-viewer&gt;</code> là một web component mã nguồn mở và khai báo (declarative) giúp việc nhúng mô hình 3D tương tác lên trang web trở nên dễ dàng như chèn một thẻ ảnh. Nó tự động tối ưu hóa hiệu năng, xử lý cử chỉ điều hướng camera, và hỗ trợ trực tiếp các chế độ AR như WebXR (trên các trình duyệt tương thích), Scene Viewer (Android) và Quick Look (iOS) bằng tệp tin <code>.glb</code> và <code>.usdz</code>. Trong bài viết Chicken AR, chúng tôi sử dụng component này kết hợp với thư viện <code>model-viewer-effects</code> để thêm hiệu ứng Bloom (tỏa sáng) và Color Grading ấn tượng.</p>
                    <h3>Thiết kế cho Thiết bị di động</h3>
                    <p>Khi phát triển AR cho di động, hãy nhớ rằng GPU di động bị giới hạn. Hãy hạn chế số lượng đa giác (polycount), tận dụng ánh sáng baked khi có thể, và đảm bảo các lớp giao diện UI rõ ràng và không cản trở tầm nhìn.</p>
                </>
            ) : (
                <>
                    <p>Augmented Reality (AR) on the web has matured significantly over the last few years. Today, users can experience AR content immediately with a single tap on their smartphone screen.</p>
                    <h3>The Power of WebXR</h3>
                    <p>WebXR is the open standard that makes AR and VR possible in browsers. In this portfolio, we showcase models like the Chicken AR and Dragon AR. By using WebXR features or web-based AR frameworks, we can place 3D virtual models right onto real-world surfaces seen through the camera.</p>
                    <h3>Google &lt;model-viewer&gt;</h3>
                    <p>Google <code>&lt;model-viewer&gt;</code> is an open-source, declarative web component that makes embedding interactive 3D models on web pages as simple as inserting an image tag. It automatically handles performance optimizations, camera controls, and natively supports AR experiences such as WebXR (on compatible browsers), Scene Viewer (Android), and Quick Look (iOS) using <code>.glb</code> and <code>.usdz</code> files. In our Chicken AR demo, we combine this component with the <code>model-viewer-effects</code> library to achieve stunning Bloom and Color Grading effects.</p>
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
                        <div className="blog-ar-card-footer" style={{ padding: '15px 20px', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.7)', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                            <p style={{ margin: 0, lineHeight: '1.5' }}>
                                {language === 'vi' 
                                    ? 'Sử dụng thẻ <model-viewer> của Google để nhúng nhanh mô hình 3D, hỗ trợ AR Scene Viewer/Quick Look và bộ lọc màu hậu kỳ.' 
                                    : 'Utilizes Google\'s <model-viewer> to quickly embed 3D models with built-in AR Quick Look/Scene Viewer support.'}
                            </p>
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
                        <div className="blog-ar-card-footer" style={{ padding: '15px 20px', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.7)', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                            <p style={{ margin: 0, lineHeight: '1.5' }}>
                                {language === 'vi' 
                                    ? 'Sử dụng Three.js kết hợp WebXR API để dựng môi trường 3D tùy biến, tạo bóng đổ và bộ điều khiển camera tùy chỉnh.' 
                                    : 'Uses Three.js with WebXR API for custom 3D environment, custom shadows, and tailored camera controls.'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
