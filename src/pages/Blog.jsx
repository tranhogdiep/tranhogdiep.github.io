import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './Blog.css';
import ModelViewer3D from '../components/ModelViewer3D';

const BLOG_POSTS = [
    // {
    //     id: 1,
    //     slug: "creating-3d-webgl-portfolio-with-threejs",
    //     title: "Creating a 3D WebGL Portfolio with Three.js",
    //     date: "May 15, 2026",
    //     category: "Graphics",
    //     excerpt: "Learn the secrets behind building interactive 3D experiences on the web using Three.js, custom shaders, and GSAP animations.",
    //     content: `
    //         <p>Creating a 3D web experience requires a fine balance between art and technology. In this article, we dive deep into how to structure a WebGL portfolio that is both visually stunning and highly performant.</p>
    //         <h3>1. The Tech Stack</h3>
    //         <p>For modern 3D web development, a combination of Vite, React, and Three.js is extremely powerful. React helps us manage the state of overlay UI, while Three.js handles rendering WebGL context.</p>
    //         <h3>2. Asset Optimization</h3>
    //         <p>One of the biggest bottlenecks in WebGL is loading time. Always make sure to use Draco compression for your glTF/glb models. In this project, menu models are compressed down to a fraction of their original size, reducing load times dramatically.</p>
    //         <h3>3. Lighting and HDR</h3>
    //         <p>Using a high-quality HDR (High Dynamic Range) environment map brings out realistic metallic reflections and ambient lighting. We load HDR textures via RGBELoader to map environment lights in real-time.</p>
    //     `
    // },
    // {
    //     id: 2,
    //     slug: "unlocking-ar-on-web-browsers",
    //     title: "Unlocking AR on Web Browsers",
    //     date: "April 28, 2026",
    //     category: "Augmented Reality",
    //     excerpt: "An introduction to building augmented reality experiences directly in browsers without requiring external applications.",
    //     content: `
    //         <p>Augmented Reality (AR) on the web has matured significantly over the last few years. Today, users can experience AR content immediately with a single tap on their smartphone screen.</p>
    //         <h3>The Power of WebXR</h3>
    //         <p>WebXR is the open standard that makes AR and VR possible in browsers. In this portfolio, we showcase models like the Chicken AR and Dragon AR. By using WebXR features or web-based AR frameworks, we can place 3D virtual models right onto real-world surfaces seen through the camera.</p>
    //         <h3>Designing for Mobile</h3>
    //         <p>When developing mobile AR, keep in mind that mobile GPUs are constrained. Limit polygon counts, utilize baked lighting where possible, and ensure the UI overlays are clean and non-obtrusive.</p>
    //     `
    // },
    {
        id: 3,
        slug: "optimizing-3d-assets-for-web",
        title: "Optimizing 3D Assets for Web",
        date: "March 10, 2024",
        category: "Game Dev",
        excerpt: "A comprehensive guide to preparing 3D assets, texture mapping, and polycounts for real-time web rendering.",
        content: `
            <p>Khi đưa các trải nghiệm 3D lên trình duyệt web, hiệu năng và thời gian tải (loading time) là những yếu tố sinh tử quyết định sự ở lại của người dùng. Một file 3D quá nặng sẽ làm đứng trình duyệt hoặc khiến người dùng thoát trang trước khi kịp chiêm ngưỡng tác phẩm.</p>
            <p>Trong bài viết này, chúng ta sẽ đi sâu vào quy trình tối ưu hóa một model 3D thực tế - chiếc khiên và trang bị chiến thuật <strong>CSCDVN</strong>. Model gốc có kích thước khổng lồ lên tới <strong>500 MB</strong>. Qua các kỹ thuật tối ưu hóa chuyên sâu dưới đây, chúng ta sẽ đưa kích thước này về chỉ còn <strong>4.82 MB</strong> (giảm tới 99.0%) mà vẫn giữ được chất lượng hiển thị sắc nét!</p>
            
            <h3>1. Sử dụng định dạng GLB thay vì glTF</h3>
            <p>glTF (GL Transmission Format) được mệnh danh là "JPEG của thế giới 3D". Tuy nhiên, glTF gốc thường đi kèm với nhiều file rời rạc (chứa file JSON mô tả, file .bin chứa dữ liệu đỉnh/chỉ mục, và các file texture rời dạng PNG/JPG). Điều này bắt trình duyệt phải thực hiện rất nhiều request HTTP đồng thời, tăng độ trễ mạng do thời gian thiết lập kết nối (round-trip time).</p>
            <p><strong>Giải pháp:</strong> Luôn xuất và sử dụng định dạng <strong>GLB</strong>. GLB là phiên bản nhị phân (binary) của glTF, đóng gói toàn bộ dữ liệu hình học, cấu trúc xương và texture vào một file duy nhất. Lợi ích:</p>
            <ul>
                <li>Chỉ cần 1 kết nối mạng duy nhất để tải về toàn bộ model.</li>
                <li>Kích thước file nhị phân nhỏ gọn hơn và header nhẹ hơn đáng kể so với JSON văn bản.</li>
                <li>Trình duyệt phân tích cú pháp (parse) file nhị phân nhanh hơn nhiều.</li>
            </ul>

            <h3>2. Nén hình học bằng Draco Compression</h3>
            <p>Draco là một thư viện mã nguồn mở của Google dùng để nén và giải nén các lưới 3D (meshes) và đám mây điểm (point clouds). Nó nén dữ liệu các đỉnh (vertices), vector pháp tuyến (normals), và tọa độ UV bằng thuật toán lượng tử hóa (quantization) và mã hóa entropy.</p>
            <p>Khi xuất file từ Blender, bạn chỉ cần bật tùy chọn <strong>Draco Compression</strong> trong cài đặt export GLTF/GLB (như hình minh họa Blender Export Settings ở thư mục tài nguyên). Chỉ với bước này, model CSCDVN gốc từ 500 MB đã được giảm xuống còn <strong>46.62 MB</strong>!</p>
            <p><em>Lưu ý kỹ thuật:</em> Draco nén hình học rất mạnh, nhưng trình duyệt sẽ phải giải nén (decode) bằng WebAssembly trên CPU của máy khách trước khi đẩy lên GPU. Do đó, cần có sự cân bằng để tránh làm nghẽn CPU khi model có số lượng polycount quá lớn.</p>

            <h3>3. Định dạng lại và tối ưu hóa Texture</h3>
            <p>Các texture độ phân giải cao (ví dụ: 4K - 4096x4096px) là thủ phạm ngốn bộ nhớ chính. Một bức ảnh JPEG 4K tuy chỉ nặng vài trăm KB trên đĩa, nhưng khi nạp vào bộ nhớ đồ họa (VRAM), GPU phải giải nén nó thành pixel thô dạng RGBA không nén. Công thức tính dung lượng VRAM chiếm dụng:</p>
            <p style="background: rgba(255,255,255,0.05); padding: 10px 15px; border-radius: 8px; font-family: monospace; text-align: center; margin: 15px 0;">4096 * 4096 * 4 bytes (RGBA) = 67.1 MB VRAM mỗi texture!</p>
            <p>Nếu model của bạn có nhiều bản đồ texture (Color, Normal, Roughness, Metallic, AO) ở mức 4K, nó có thể ngốn tới <strong>600MB+ VRAM</strong>, dễ dàng làm tràn bộ nhớ và crash trình duyệt trên thiết bị di động.</p>
            <p><strong>Cách tối ưu:</strong></p>
            <ul>
                <li><strong>Giới hạn kích thước (Resolution):</strong> Đưa các texture không quá quan trọng về mức 1K (1024px) hoặc tối đa 2K (2048px). Chỉ giữ lại 4K cho những chi tiết cực kỳ đặc tả và nằm gần camera.</li>
                <li><strong>Định dạng WebP / KTX2:</strong> Chuyển đổi texture sang định dạng <strong>WebP</strong> (giúp tối ưu dung lượng tải về qua mạng) hoặc dùng chuẩn <strong>KTX2 (Basis Universal)</strong>. KTX2 là định dạng nén GPU-native, nghĩa là nó truyền thẳng định dạng nén đó vào GPU VRAM mà không cần giải nén ra pixel thô, giúp tiết kiệm tới 75% VRAM!</li>
            </ul>

            <h3>4. Tận dụng sức mạnh của glTF Transform CLI</h3>
            <p>Để tự động hóa tất cả các bước trên và thực hiện tối ưu hóa sâu hơn những gì Blender có thể làm, công cụ dòng lệnh <strong>glTF Transform CLI</strong> (phát triển bởi Don McCurdy) là lựa chọn tối tân hàng đầu.</p>
            <p><strong>Cài đặt:</strong></p>
            <pre style="background: rgba(0,0,0,0.4); padding: 15px; border-radius: 8px; overflow-x: auto; color: #f1c40f; font-family: monospace; margin-bottom: 20px;">npm install --global @gltf-transform/cli</pre>
            <p>Hoặc chạy nhanh không cần cài đặt qua npx:</p>
            <pre style="background: rgba(0,0,0,0.4); padding: 15px; border-radius: 8px; overflow-x: auto; color: #f1c40f; font-family: monospace; margin-bottom: 20px;">npx @gltf-transform/cli --help</pre>

            <p><strong>Lệnh tối ưu hóa model CSCDVN_Draco.glb:</strong></p>
            <p>Chúng tôi đã chạy dòng lệnh sau để nén sâu model của chúng ta:</p>
            <pre style="background: rgba(0,0,0,0.4); padding: 15px; border-radius: 8px; overflow-x: auto; color: #fff; font-family: monospace; line-height: 1.4; margin-bottom: 25px;">npx @gltf-transform/cli optimize CSCDVN_Draco.glb CSCDVN_Optimized.glb --compress draco --texture-compress webp --texture-size 1024</pre>

            <p><strong>Giải thích các tham số trong pipeline:</strong></p>
            <ul>
                <li><code>optimize</code>: Lệnh gộp chạy chuỗi tối ưu hóa tự động của glTF Transform.</li>
                <li><code>--compress draco</code>: Nén hình học lưới bằng Draco.</li>
                <li><code>--texture-compress webp</code>: Tự động chuyển đổi và nén toàn bộ texture PNG/JPG sang định dạng WebP siêu nhẹ.</li>
                <li><code>--texture-size 1024</code>: Tự động scale down các texture lớn vượt quá 1024px về độ phân giải tối đa 1024x1024px.</li>
            </ul>

            <p>Dưới đây là một số tác vụ tối ưu hóa chuyên sâu mà bộ công cụ chạy ngầm trong lệnh <code>optimize</code>:</p>
            <ul>
                <li><strong>weld:</strong> Gộp các đỉnh trùng lặp có cùng tọa độ hình học, giúp giảm tổng số đỉnh vẽ.</li>
                <li><strong>simplify:</strong> Rút gọn đa giác lưới một cách thông minh mà không làm biến dạng hình dáng tổng thể của model.</li>
                <li><strong>dedup:</strong> Quét và gộp các texture hoặc accessor trùng lặp hoàn toàn trong file 3D.</li>
                <li><strong>prune:</strong> Dọn dẹp sạch sẽ các node rác, các dữ liệu UV, vật liệu dư thừa không được scene tham chiếu đến.</li>
            </ul>

            <h3>5. Bảng đối chiếu kết quả thực tế</h3>
            <p>Hãy nhìn vào các con số đo lường hiệu quả nén của model CSCDVN:</p>
            <table style="width: 100%; border-collapse: collapse; margin: 25px 0; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.1); font-size: 0.95rem;">
                <thead>
                    <tr style="background: rgba(241,196,15,0.1); border-bottom: 2px solid #f1c40f;">
                        <th style="padding: 12px; text-align: left; border: 1px solid rgba(255,255,255,0.1);">Phiên bản Model</th>
                        <th style="padding: 12px; text-align: left; border: 1px solid rgba(255,255,255,0.1);">Dung lượng file</th>
                        <th style="padding: 12px; text-align: left; border: 1px solid rgba(255,255,255,0.1);">Tỷ lệ nén</th>
                        <th style="padding: 12px; text-align: left; border: 1px solid rgba(255,255,255,0.1);">Ghi chú</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: 12px; border: 1px solid rgba(255,255,255,0.1);">CSCDVN_Origin.glb (Gốc)</td>
                        <td style="padding: 12px; border: 1px solid rgba(255,255,255,0.1); font-weight: bold;">500.2 MB</td>
                        <td style="padding: 12px; border: 1px solid rgba(255,255,255,0.1); color: #ff4a5a;">0% (Gốc)</td>
                        <td style="padding: 12px; border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.6);">Chưa qua xử lý, lưới mật độ cao, texture 4K thô.</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px; border: 1px solid rgba(255,255,255,0.1);">Blender Export Setting (Draco)</td>
                        <td style="padding: 12px; border: 1px solid rgba(255,255,255,0.1); font-weight: bold;">46.62 MB</td>
                        <td style="padding: 12px; border: 1px solid rgba(255,255,255,0.1); color: #2ecc71;">Nén ~90.6%</td>
                        <td style="padding: 12px; border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.6);">Nén Draco trực tiếp trong Blender, texture giữ nguyên 4K.</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px; border: 1px solid rgba(255,255,255,0.1);">gltf-transform (Draco + Default)</td>
                        <td style="padding: 12px; border: 1px solid rgba(255,255,255,0.1); font-weight: bold;">21.91 MB</td>
                        <td style="padding: 12px; border: 1px solid rgba(255,255,255,0.1); color: #2ecc71;">Nén ~95.6%</td>
                        <td style="padding: 12px; border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.6);">Dọn dẹp weld/dedup/prune, giữ nguyên định dạng ảnh.</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px; border: 1px solid rgba(255,255,255,0.1);">gltf-transform (WebP + 2048px)</td>
                        <td style="padding: 12px; border: 1px solid rgba(255,255,255,0.1); font-weight: bold;">16.99 MB</td>
                        <td style="padding: 12px; border: 1px solid rgba(255,255,255,0.1); color: #2ecc71;">Nén ~96.6%</td>
                        <td style="padding: 12px; border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.6);">Textures chuyển sang WebP tối đa 2048px.</td>
                    </tr>
                    <tr style="background: rgba(46, 204, 113, 0.05);">
                        <td style="padding: 12px; border: 1px solid rgba(255,255,255,0.1); color: #2ecc71; font-weight: bold;">gltf-transform (WebP + 1024px)</td>
                        <td style="padding: 12px; border: 1px solid rgba(255,255,255,0.1); font-weight: bold; color: #2ecc71;">4.82 MB</td>
                        <td style="padding: 12px; border: 1px solid rgba(255,255,255,0.1); color: #2ecc71; font-weight: bold;">Nén ~99.0%</td>
                        <td style="padding: 12px; border: 1px solid rgba(255,255,255,0.1); color: #2ecc71;">Rất nhẹ cho web! Tải cực nhanh trên cả mạng di động.</td>
                    </tr>
                </tbody>
            </table>

            <p><strong>Kết luận:</strong> Tối ưu hóa 3D không chỉ đơn thuần là giảm dung lượng file tải về qua mạng, mà còn là bảo vệ hiệu năng phần cứng thiết bị của người dùng (tiết kiệm GPU VRAM). Bằng việc sử dụng kết hợp định dạng GLB nhị phân, nén Draco cho lưới hình học, và chuyển đổi texture tối ưu (như WebP 1024px qua công cụ glTF Transform CLI), chúng ta có thể mang lại trải nghiệm WebGL mượt mà, chuyên nghiệp nhất.</p>
        `
    }
];

export default function Blog() {
    const navigate = useNavigate();
    const { slug } = useParams();

    const selectedPost = slug
        ? BLOG_POSTS.find(post => post.slug === slug || post.id.toString() === slug)
        : null;

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
                        <button className="blog-inner-back-btn" onClick={() => navigate('/blog')}>
                            &larr; All Articles
                        </button>
                        <div className="blog-detail-meta">
                            <span className="blog-detail-cat">{selectedPost.category}</span>
                            <span className="blog-detail-date">{selectedPost.date}</span>
                        </div>
                        <h1 className="blog-detail-title">{selectedPost.title}</h1>
                        <div className="blog-detail-divider"></div>
                        {selectedPost.id === 3 && <ModelViewer3D />}
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
                                    onClick={() => navigate(`/blog/${post.slug}`)}
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
