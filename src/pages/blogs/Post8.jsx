import React from 'react';
import { useLanguage } from '../../config/LanguageContext';

export default function Post8() {
    const { language } = useLanguage();

    if (language === 'vi') {
        return (
            <>
                {/* Hero / Cover image */}
                <div className="blog-post-image-container">
                    <img 
                        src="/assets/blog/fixelFollowArtCover/fixelFollowCover.png" 
                        alt="Fixel Follow Art Cover" 
                        style={{ maxWidth: '650px', width: '100%', borderRadius: '16px' }}
                    />
                    <span className="image-caption">Fixel Follow Art Cover - Kết quả hoàn thiện trong Unity URP</span>
                </div>

                <p>
                    Trong quá trình phát triển các tựa game casual phong cách hoạt hình (stylized) như <strong>Fixel Follow</strong>, việc tái hiện ánh sáng rực rỡ, phân tách rõ nét giữa các đối tượng (nhân vật, đường ray băng chuyền, nền) và tạo các hiệu ứng chuyển động mượt mà bằng shader là yếu tố sống còn để tạo nên trải nghiệm thị giác cuốn hút.
                </p>
                <p>
                    Trong bài viết này, chúng ta sẽ cùng đi qua toàn bộ quy trình: từ khâu chuẩn bị 3D modeling và <strong>làm phẳng UV (Straighten/Rectify UV)</strong> trong Blender, đến việc thiết lập <strong>Shader chuyển động băng chuyền (Conveyor Belt UV Offset Shader)</strong>, cấu hình vật liệu nhân vật bằng <em>Toony Colors Pro 2</em>, và đặc biệt là kỹ thuật <strong>Light Layers trong Unity URP</strong> để kiểm soát ánh sáng độc lập cho từng nhóm đối tượng, kết hợp tinh chỉnh <strong>Volume Profile</strong> hậu kỳ.
                </p>

                {/* PHẦN 1: CHUẨN BỊ ASSETS & UV */}
                <h3>1. Chuẩn Bị Assets & Kỹ Thuật Làm Phẳng UV</h3>
                <p>
                    Phần dựng hình (3D Modeling) của scene không có gì quá phức tạp hay đặc thù, chúng ta hoàn toàn sử dụng các kỹ năng dựng hình đa giác cơ bản (Hard Surface & Stylized Modeling) trong Blender hoặc Maya để tạo hình nhân vật chú heo (Pig), các khối voxel pixel, băng chuyền ray (Conveyor) và mặt đất (Ground).
                </p>
                <div className="blog-post-image-container">
                    <img src="/assets/blog/fixelFollowArtCover/modelling.png" alt="3D Modeling trong Blender" />
                    <span className="image-caption">Mô hình 3D tổng thể các đối tượng trong scene được dựng trong Blender</span>
                </div>

                <div style={{ backgroundColor: 'rgba(56, 189, 248, 0.08)', borderLeft: '4px solid #38bdf8', padding: '16px', borderRadius: '6px', margin: '20px 0' }}>
                    <strong style={{ color: '#38bdf8' }}>💡 Lưu ý kỹ thuật quan trọng về UV:</strong>
                    <p style={{ margin: '8px 0 0 0', lineHeight: '1.6' }}>
                        Để shader cuộn texture (UV Scrolling/Offset) trên bề mặt băng chuyền chạy đều theo một hướng mà không bị méo, biến dạng hay giật góc ở các đoạn uốn cong, <strong>UV của phần trượt (Conveyor Belt) bắt buộc phải được làm phẳng tuyệt đối thành một dải chữ nhật thẳng tắp</strong>.
                    </p>
                </div>

                <p>
                    Để làm thẳng (straighten/rectify) dải UV của băng chuyền nhanh chóng và chuẩn xác, bạn có thể sử dụng các addon UV hữu ích sau trong Blender:
                </p>
                <ul>
                    <li><strong>TexTools (Tính năng Rectify):</strong> Chọn đảo UV của băng chuyền và bấm <em>Rectify</em> để ép toàn bộ lưới UV cong thành dải hình chữ nhật thẳng hàng theo các trục U và V.</li>
                    <li><strong>Mio3 UV Tools (Tính năng Gridify):</strong> Tự động căn chỉnh các quad polygons trong UV island thành dạng lưới ô vuông/chữ nhật đồng đều.</li>
                </ul>

                <div className="blog-post-image-container">
                    <img src="/assets/blog/fixelFollowArtCover/ConveyorBeltUV.png" alt="Làm phẳng UV cho Conveyor Belt" />
                    <span className="image-caption">Dải UV của băng chuyền được làm phẳng hoàn toàn (Rectify/Gridify) để sẵn sàng cho UV Offset Shader</span>
                </div>

                {/* PHẦN 2: UNITY SETUP */}
                <h3>2. Unity Setup: Shader, Vật Liệu & Ánh Sáng</h3>

                <h4>2.1. ConveyorBelt Shader (Shader Graph)</h4>
                <p>
                    Để tạo hiệu ứng băng chuyền di chuyển mượt mà trong thời gian thực mà không cần xoay hoặc gắn xương phức tạp cho mô hình, chúng ta sử dụng Shader Graph trong Unity để dịch chuyển tọa độ UV theo trục thời gian (Time).
                </p>
                <p>
                    Cách thiết lập node cực kỳ tinh gọn như sau:
                </p>
                <ol>
                    <li>Sử dụng node <strong>Time</strong> và nhân với một giá trị tốc độ <strong>Speed (Multiply Node)</strong>.</li>
                    <li>Nối kết quả vào cổng <code>Y</code> (hoặc <code>X</code> tùy hướng UV) của node <strong>Vector 2</strong> để xác định vector dịch chuyển Offset.</li>
                    <li>Nối Vector 2 vào cổng <code>Offset</code> của node <strong>Tiling And Offset</strong>.</li>
                    <li>Đưa ngõ ra của <em>Tiling And Offset</em> vào cổng <code>UV</code> của node <strong>Sample Texture 2D</strong> chứa họa tiết của băng chuyền.</li>
                    <li>Nối màu Texture ra kênh <strong>Base Color</strong> của Master Stack.</li>
                </ol>

                <div className="blog-post-image-container">
                    <img src="/assets/blog/fixelFollowArtCover/ConveyorBeltShader.png" alt="Conveyor Belt Shader Graph Setup" />
                    <span className="image-caption">Cấu hình Shader Graph cho Conveyor Belt: Điều khiển dịch chuyển UV bằng Time và Offset</span>
                </div>

                <h4>2.2. Pig Material với Toony Colors Pro 2</h4>
                <p>
                    Nhân vật chú heo (Pig) đóng vai trò tâm điểm (focal point) của cảnh. Để đạt được chất lượng hoạt hình mềm mại kết hợp khối sáng rõ ràng, chúng ta tiếp tục sử dụng shader <strong>Toony Colors Pro 2</strong>.
                </p>
                <p>
                    Các thông số thiết lập chính bao gồm:
                </p>
                <ul>
                    <li><strong>Ramp Shading:</strong> Thiết lập dải chuyển màu sắc phân tầng (Toon Ramp) với độ chuyển mềm vừa phải để giữ cảm giác 3D tròn trịa.</li>
                    <li><strong>Rim Lighting / Highlight:</strong> Bật hiệu ứng viền sáng nhẹ để tách biệt nhân vật khỏi nền không gian xung quanh.</li>
                    <li><strong>Color / Specular Tint:</strong> Tinh chỉnh tông màu hồng ấm tươi sáng, phản xạ ánh sáng nhẹ nhàng.</li>
                </ul>

                <div className="blog-post-image-container">
                    <img src="/assets/blog/fixelFollowArtCover/PigShader.png" alt="Thiết lập Material Pig với Toony Colors Pro 2" />
                    <span className="image-caption">Setup Toony Colors Pro 2 Material cho nhân vật Pig</span>
                </div>

                <h4>2.3. Light Layers Trong Unity URP là gì?</h4>
                <p>
                    Trong phong cách đồ họa Stylized như <em>Fixel Follow</em>, rất khó để có thể tả được ánh sáng đẹp mắt và chuẩn phong cách nếu chỉ sử dụng ánh sáng chung thông thường. Khi dùng một nguồn sáng duy nhất cho toàn scene:
                </p>
                <ul>
                    <li>Ánh sáng đủ mạnh để tạo viền khối rõ nét cho nhân vật thì sẽ làm cháy sáng (overexposed) mặt đất hoặc làm mất chi tiết kim loại trên thanh ray.</li>
                    <li>Ngược lại, nếu giảm sáng để mặt đất dịu mắt thì nhân vật sẽ bị chìm và thiếu điểm nhấn.</li>
                </ul>

                <div style={{ backgroundColor: 'rgba(56, 189, 248, 0.08)', borderLeft: '4px solid #38bdf8', padding: '16px', borderRadius: '6px', margin: '20px 0' }}>
                    <strong style={{ color: '#38bdf8' }}>🌟 Khái niệm Light Layers (Rendering Layer Masks):</strong>
                    <p style={{ margin: '8px 0 0 0', lineHeight: '1.6' }}>
                        <strong>Light Layers</strong> trong Unity URP / HDRP là tính năng cho phép bạn phân nhóm các nguồn sáng (Lights) và các vật thể (Meshes) vào những lớp riêng biệt. Một nguồn sáng chỉ tác động và chiếu sáng lên các đối tượng có cùng Layer Mask với nó, hoàn toàn không gây ảnh hưởng hay làm lem sáng sang các nhóm vật thể khác.
                    </p>
                </div>

                <p>
                    Trong scene này, chúng ta phân chia thành <strong>2 nhóm layer chuyên biệt</strong>:
                </p>
                <ul>
                    <li><strong>Ray Conveyor (Thanh ray băng chuyền):</strong> Gán <code>Layer 1</code></li>
                    <li><strong>Pig và Pixel (Nhân vật heo & khối pixel):</strong> Gán <code>Layer 6</code></li>
                </ul>

                <p>
                    <strong>Cách thiết lập Rendering Layer Mask cho đối tượng:</strong> Chọn GameObject trong Hierarchy &rarr; trong cửa sổ Inspector tìm đến component <strong>Mesh Renderer</strong> &rarr; mở rộng mục <em>Additional Settings</em> &rarr; chỉnh sửa mục <strong>Rendering Layer Mask</strong> sang Layer tương ứng (ví dụ: Layer 1 hoặc Layer 6).
                </p>

                <div className="blog-post-image-container">
                    <img src="/assets/blog/fixelFollowArtCover/LayerSetup.png" alt="Setup Rendering Layer Mask trên Mesh Renderer" />
                    <span className="image-caption">Thiết lập Rendering Layer Mask trên Mesh Renderer component trong Unity</span>
                </div>

                <h4>2.4. Thiết Lập Hệ Thống Đèn (Setup Lights)</h4>
                <p>
                    Sau khi đã phân nhóm Layer cho các mesh, chúng ta tiến hành đặt đèn chung cho toàn cảnh và đèn riêng cho từng nhóm đối tượng:
                </p>

                <ol>
                    <li>
                        <strong>Light Chung (Directional Light):</strong>
                        <p>
                            Sử dụng 1 nguồn sáng <strong>Directional Light</strong> đóng vai trò ánh sáng mặt trời tự nhiên, chiếu sáng tổng thể toàn bộ scene. Nguồn sáng này để mặc định (tác động lên tất cả các Rendering Layers).
                        </p>
                        <p>
                            <em>Lưu ý:</em> Ví dụ với <code>Ground mesh</code> (mặt đất), chúng ta chỉ muốn nhận ánh sáng từ Directional Light này và không muốn bị tác động bởi các nguồn đèn cục bộ bên dưới.
                        </p>
                        <div className="blog-post-image-container">
                            <img src="/assets/blog/fixelFollowArtCover/DirectionnalLightSetup.png" alt="Thiết lập Directional Light tổng thể" />
                            <span className="image-caption">Cấu hình Directional Light chung cho toàn bộ scene</span>
                        </div>
                    </li>

                    <li>
                        <strong>Light Riêng Cho Nhóm Pig & Pixel (Layer 6):</strong>
                        <p>
                            Tạo 1 nguồn sáng <strong>Area Light</strong> (hoặc Spotlight góc rộng) với thông số <em>Rendering Layers</em> chỉ chọn duy nhất <code>Layer 6</code>.
                        </p>
                        <p>
                            Mục đích của nguồn sáng này là tạo ra <strong>các tầng highlight sắc nét và viền sáng cứng (hard-edge stylized outlines)</strong> trên bề mặt của nhân vật Pig và các khối Pixel, giúp nhân vật bật hẳn lên khỏi nền mà không làm thay đổi ánh sáng của mặt đất.
                        </p>
                        <div className="blog-post-image-container">
                            <img src="/assets/blog/fixelFollowArtCover/Layer6_AreaLight.png" alt="Thiết lập Area Light cho Layer 6" />
                            <span className="image-caption">Thiết lập Area Light chỉ tác động lên Layer 6 (Pig và Pixel)</span>
                        </div>
                        <div className="blog-post-image-container">
                            <img src="/assets/blog/fixelFollowArtCover/AreaLightEffect.png" alt="Hiệu ứng ánh sáng nổi bật trên Pig và Pixel" />
                            <span className="image-caption">So sánh hiệu ứng: Ánh sáng từ Area Light Layer 6 tạo nên mảng highlight viền sắc nét trên nhân vật</span>
                        </div>
                    </li>

                    <li>
                        <strong>Light Riêng Cho Nhóm Ray Conveyor (Layer 1):</strong>
                        <p>
                            Tạo thêm các <strong>Point Light</strong> đặt tại các vị trí gần thân băng chuyền và uốn khúc của ray, thiết lập <em>Rendering Layers</em> là <code>Layer 1</code>.
                        </p>
                        <p>
                            Các đèn Point Light này chỉ chiếu sáng riêng lên mesh thanh ray kim loại, giúp tạo vệt phản chiếu lấp lánh (specular highlight), làm nổi bật cảm giác chất liệu kim loại cứng cáp và sinh động khi cuộn texture.
                        </p>
                        <div className="blog-post-image-container">
                            <img src="/assets/blog/fixelFollowArtCover/Light1LightEffect.png" alt="Hiệu ứng Point Light trên Ray Conveyor Layer 1" />
                            <span className="image-caption">Hiệu ứng Point Light trên Layer 1 tăng cường độ bóng bẩy kim loại cho thanh ray Conveyor</span>
                        </div>
                    </li>
                </ol>

                {/* PHẦN 3: VOLUME PROFILE */}
                <h3>3. Hoàn Thiện Visual Với Volume Profile</h3>
                <p>
                    Bước cuối cùng để đưa hình ảnh đạt tới chất lượng cover art hoàn hảo là tinh chỉnh <strong>Volume Profile (Post-Processing)</strong> trong Unity URP:
                </p>
                <ul>
                    <li><strong>Bloom:</strong> Tăng độ rực rỡ nhẹ cho các vệt phản xạ ánh sáng trên thanh ray và khối pixel phát sáng.</li>
                    <li><strong>Color Adjustments / Tonemapping:</strong> Tăng nhẹ độ bão hòa (Saturation) và độ tương phản (Contrast) để màu sắc của game casual luôn bắt mắt và tràn đầy năng lượng.</li>
                    <li><strong>Shadows, Midtones, Highlights / Lift Gamma Gain:</strong> Cân bằng lại sắc độ vùng tối và vùng sáng, giữ cho tone màu trong trẻo, không bị xỉn màu.</li>
                </ul>

                <div className="blog-post-image-container">
                    <img src="/assets/blog/fixelFollowArtCover/VolumeProfile.png" alt="Cấu hình Volume Profile hậu kỳ trong Unity" />
                    <span className="image-caption">Thiết lập các hiệu ứng hậu kỳ trong Volume Profile</span>
                </div>

                <h3>Tổng Kết</h3>
                <p>
                    Bằng việc kết hợp chặt chẽ giữa:
                </p>
                <ul>
                    <li><strong>Kỹ thuật nắn thẳng UV (Rectify/Gridify UV)</strong> ngay từ bước 3D modeling.</li>
                    <li><strong>UV Offset Shader</strong> đơn giản và siêu nhẹ cho băng chuyền.</li>
                    <li>Sức mạnh phân tách ánh sáng của <strong>Light Layers trong Unity URP</strong>.</li>
                    <li>Shader hoạt hình <strong>Toony Colors Pro 2</strong> cùng hậu kỳ <strong>Volume Profile</strong>.</li>
                </ul>
                <p>
                    Chúng ta đã hoàn toàn kiểm soát được độ tương phản, điểm nhấn thị giác và chất liệu cho từng đối tượng trong cảnh <em>Fixel Follow</em>, tạo nên một tác phẩm 3D art cover bắt mắt, chuẩn phong cách game casual hiện đại!
                </p>
            </>
        );
    }

    // ENGLISH VERSION
    return (
        <>
            {/* Hero / Cover image */}
            <div className="blog-post-image-container">
                <img 
                    src="/assets/blog/fixelFollowArtCover/fixelFollowCover.png" 
                    alt="Fixel Follow Art Cover" 
                    style={{ maxWidth: '650px', width: '100%', borderRadius: '16px' }}
                />
                <span className="image-caption">Fixel Follow Art Cover - Final In-Engine Visuals in Unity URP</span>
            </div>

            <p>
                When developing vibrant stylized casual games like <strong>Fixel Follow</strong>, achieving vivid illumination, crisp contrast separation between scene elements (character, conveyor rails, ground), and smooth motion via shaders is essential for crafting captivating art covers.
            </p>
            <p>
                In this article, we will explore the end-to-end production pipeline: from 3D modeling and <strong>UV straightening (Rectify/Gridify UV)</strong> in Blender, to creating an animated <strong>Conveyor Belt UV Offset Shader</strong>, configuring character materials with <em>Toony Colors Pro 2</em>, and leveraging <strong>Unity URP Light Layers</strong> for isolated lighting control, topped off with <strong>Volume Profile</strong> post-processing.
            </p>

            {/* SECTION 1: ASSET PREPARATION & UV */}
            <h3>1. Asset Preparation & UV Straightening Technique</h3>
            <p>
                The 3D modeling stage follows standard poly modeling principles in Blender. We construct the cute pig character, pixel blocks, conveyor rail system, and background ground mesh using clean stylized proportions.
            </p>
            <div className="blog-post-image-container">
                <img src="/assets/blog/fixelFollowArtCover/modelling.png" alt="3D Modeling in Blender" />
                <span className="image-caption">Overall 3D asset modeling in Blender</span>
            </div>

            <div style={{ backgroundColor: 'rgba(56, 189, 248, 0.08)', borderLeft: '4px solid #38bdf8', padding: '16px', borderRadius: '6px', margin: '20px 0' }}>
                <strong style={{ color: '#38bdf8' }}>💡 Key UV Requirement:</strong>
                <p style={{ margin: '8px 0 0 0', lineHeight: '1.6' }}>
                    To allow the conveyor belt texture to scroll smoothly along the track without skewing, stretching, or warping around bends, <strong>the UV island of the sliding conveyor track must be straightened into a perfectly flat rectangular strip</strong>.
                </p>
            </div>

            <p>
                You can easily flatten and rectify the curved UV strip in Blender using common UV addons:
            </p>
            <ul>
                <li><strong>TexTools (Rectify):</strong> Select the conveyor UV island and click <em>Rectify</em> to automatically align all quad faces into straight horizontal/vertical UV coordinates.</li>
                <li><strong>Mio3 UV Tools (Gridify):</strong> Automatically aligns face loops into a clean rectangular grid.</li>
            </ul>

            <div className="blog-post-image-container">
                <img src="/assets/blog/fixelFollowArtCover/ConveyorBeltUV.png" alt="Conveyor Belt Flattened UV" />
                <span className="image-caption">Straightened UV strip of the conveyor track (Rectify/Gridify) ready for UV Offset Shader</span>
            </div>

            {/* SECTION 2: UNITY SETUP */}
            <h3>2. Unity Setup: Shader, Materials & Lighting</h3>

            <h4>2.1. ConveyorBelt Shader (Shader Graph)</h4>
            <p>
                To simulate smooth conveyor movement at runtime without rotating complex skinned meshes, we utilize Unity Shader Graph to offset UV coordinates over time:
            </p>
            <ol>
                <li>Take the <strong>Time</strong> node and multiply it with a float <strong>Speed (Multiply Node)</strong>.</li>
                <li>Connect the resulting value into the <code>Y</code> (or <code>X</code>) channel of a <strong>Vector 2</strong> node.</li>
                <li>Feed the Vector 2 into the <code>Offset</code> port of a <strong>Tiling And Offset</strong> node.</li>
                <li>Plug the output into the <code>UV</code> input of a <strong>Sample Texture 2D</strong> node.</li>
                <li>Connect the texture color to the <strong>Base Color</strong> output of the Master Stack.</li>
            </ol>

            <div className="blog-post-image-container">
                <img src="/assets/blog/fixelFollowArtCover/ConveyorBeltShader.png" alt="Conveyor Belt Shader Graph Setup" />
                <span className="image-caption">Shader Graph setup for Conveyor Belt: driving UV scroll with Time and Offset</span>
            </div>

            <h4>2.2. Pig Material with Toony Colors Pro 2</h4>
            <p>
                The pig character is the centerpiece of the scene. To achieve a soft animated look while retaining crisp volume definition, we configure a <strong>Toony Colors Pro 2</strong> shader material:
            </p>
            <ul>
                <li><strong>Ramp Shading:</strong> A stylized color gradient ramp providing smooth transitions that preserve soft 3D curvature.</li>
                <li><strong>Rim Lighting / Highlight:</strong> Subtle rim illumination helping detach the character from the background.</li>
                <li><strong>Warm Stylized Palette:</strong> Bright pink base tones with subtle specular shine.</li>
            </ul>

            <div className="blog-post-image-container">
                <img src="/assets/blog/fixelFollowArtCover/PigShader.png" alt="Pig Material setup with Toony Colors Pro 2" />
                <span className="image-caption">Toony Colors Pro 2 material configuration for the Pig character</span>
            </div>

            <h4>2.3. Understanding Light Layers in Unity URP</h4>
            <p>
                In stylized games like <em>Fixel Follow</em>, standard universal lighting fails to capture distinct art direction requirements:
            </p>
            <ul>
                <li>A bright light strong enough to create sharp character rim highlights will overexpose the ground plane.</li>
                <li>Dimming the light to preserve ground softness leaves the focal character looking flat and washed out.</li>
            </ul>

            <div style={{ backgroundColor: 'rgba(56, 189, 248, 0.08)', borderLeft: '4px solid #38bdf8', padding: '16px', borderRadius: '6px', margin: '20px 0' }}>
                <strong style={{ color: '#38bdf8' }}>🌟 What are Light Layers (Rendering Layer Masks)?</strong>
                <p style={{ margin: '8px 0 0 0', lineHeight: '1.6' }}>
                    <strong>Light Layers</strong> in Unity URP allow you to isolate lights and geometry into matching layer masks. A light will only illuminate objects whose <code>Rendering Layer Mask</code> matches its own mask, preventing unwanted light bleeding across different visual elements.
                </p>
            </div>

            <p>
                In this scene, we set up <strong>2 distinct layer groups</strong>:
            </p>
            <ul>
                <li><strong>Ray Conveyor (Conveyor rail system):</strong> Assigned to <code>Layer 1</code></li>
                <li><strong>Pig and Pixel (Character & pixel blocks):</strong> Assigned to <code>Layer 6</code></li>
            </ul>

            <p>
                <strong>How to assign Rendering Layer Masks:</strong> Select the GameObject &rarr; in the Inspector find the <strong>Mesh Renderer</strong> component &rarr; expand <em>Additional Settings</em> &rarr; set <strong>Rendering Layer Mask</strong> to the desired layer (e.g., Layer 1 or Layer 6).
            </p>

            <div className="blog-post-image-container">
                <img src="/assets/blog/fixelFollowArtCover/LayerSetup.png" alt="Setting Rendering Layer Mask on Mesh Renderer" />
                <span className="image-caption">Assigning Rendering Layer Mask on the Mesh Renderer component in Unity</span>
            </div>

            <h4>2.4. Setting Up Scene Lights (Global & Per-Group)</h4>
            <p>
                With layer masks designated, we set up both global illumination and specialized local lights:
            </p>

            <ol>
                <li>
                    <strong>Global Light (Directional Light):</strong>
                    <p>
                        A single <strong>Directional Light</strong> acts as the main sunlight, illuminating the whole scene with default Render Layers. For example, the <code>Ground mesh</code> receives only this global light and stays untouched by the specialized foreground lights.
                    </p>
                    <div className="blog-post-image-container">
                        <img src="/assets/blog/fixelFollowArtCover/DirectionnalLightSetup.png" alt="Directional Light Global Setup" />
                        <span className="image-caption">Directional Light setup for general environment lighting</span>
                    </div>
                </li>

                <li>
                    <strong>Pig & Pixel Group Light (Layer 6):</strong>
                    <p>
                        We create an <strong>Area Light</strong> set specifically to <em>Rendering Layers:</em> <code>Layer 6</code>.
                    </p>
                    <p>
                        This light creates <strong>crisp, stepped stylized rim highlights</strong> on the Pig and Pixel geometry, popping them off the screen without affecting the background floor.
                    </p>
                    <div className="blog-post-image-container">
                        <img src="/assets/blog/fixelFollowArtCover/Layer6_AreaLight.png" alt="Layer 6 Area Light Settings" />
                        <span className="image-caption">Area Light configured exclusively for Layer 6 (Pig and Pixel)</span>
                    </div>
                    <div className="blog-post-image-container">
                        <img src="/assets/blog/fixelFollowArtCover/AreaLightEffect.png" alt="Visual effect comparison of Area Light on Pig and Pixel" />
                        <span className="image-caption">Visual impact: Area Light on Layer 6 provides crisp highlight definition across characters</span>
                    </div>
                </li>

                <li>
                    <strong>Ray Conveyor Group Light (Layer 1):</strong>
                    <p>
                        Additional <strong>Point Lights</strong> placed near the conveyor track set to <em>Rendering Layers:</em> <code>Layer 1</code>.
                    </p>
                    <p>
                        These point lights accentuate metallic sheen and specular highlights along the rail curvature without over-brightening surrounding geometry.
                    </p>
                    <div className="blog-post-image-container">
                        <img src="/assets/blog/fixelFollowArtCover/Light1LightEffect.png" alt="Point Light Effect on Layer 1 Conveyor" />
                        <span className="image-caption">Point Lights on Layer 1 boosting metallic reflections on the conveyor rail</span>
                    </div>
                </li>
            </ol>

            {/* SECTION 3: VOLUME PROFILE */}
            <h3>3. Polishing Visuals with Volume Profile</h3>
            <p>
                The final touch to bring the art cover together is adjusting the <strong>URP Volume Profile</strong>:
            </p>
            <ul>
                <li><strong>Bloom:</strong> Adds soft glow to specular highlights and luminous pixel elements.</li>
                <li><strong>Color Adjustments / Tonemapping:</strong> Enhances saturation and contrast for a joyful, appealing casual game palette.</li>
                <li><strong>Shadows, Midtones, Highlights / Lift Gamma Gain:</strong> Balances exposure across the scene to keep color values clean and rich.</li>
            </ul>

            <div className="blog-post-image-container">
                <img src="/assets/blog/fixelFollowArtCover/VolumeProfile.png" alt="Volume Profile Post-Processing Settings in Unity" />
                <span className="image-caption">Post-processing configuration in the Volume Profile</span>
            </div>

            <h3>Summary</h3>
            <p>
                By combining:
            </p>
            <ul>
                <li><strong>Straightened (Rectified) UVs</strong> during 3D modeling,</li>
                <li>A lightweight <strong>UV Offset Shader</strong> for conveyor motion,</li>
                <li>Precise illumination control via <strong>Unity URP Light Layers</strong>, and</li>
                <li><strong>Toony Colors Pro 2</strong> materials alongside a polished <strong>Volume Profile</strong>,</li>
            </ul>
            <p>
                we achieved total control over visual contrast, material fidelity, and aesthetic appeal for the <em>Fixel Follow</em> art cover.
            </p>
        </>
    );
}
