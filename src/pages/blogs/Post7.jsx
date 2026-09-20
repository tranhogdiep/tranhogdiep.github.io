import React from 'react';
import { useLanguage } from '../../config/LanguageContext';

export default function Post7() {
    const { language } = useLanguage();

    if (language === 'vi') {
        return (
            <>
                {/* Hero / Cover image */}
                <div className="blog-post-image-container">
                    <img 
                        src="/assets/blog/threadJamArtCover/PhoneAspectRatioCover.png" 
                        alt="Thread Jam Game Art Cover" 
                        style={{ maxWidth: '420px', width: '100%', borderRadius: '16px' }}
                    />
                    <span className="image-caption">Thread Jam - Cover Art & In-game Visual trên tỷ lệ màn hình di động</span>
                </div>

                <p>
                    Trong quá trình phát triển các tựa game mobile casual và puzzle như <strong>Thread Jam</strong>, việc tối ưu hóa hiệu năng render song song với việc giữ trọn vẹn phong cách nghệ thuật hoạt hình (stylized art) là một bài toán then chốt. Bài viết này sẽ chia sẻ chi tiết quy trình từ khâu dựng hình 3D, kỹ thuật <strong>Bake Texture sử dụng Cage Mesh</strong> trong Blender, tạo hệ thống tường modular, cho tới thiết lập <strong>Unity URP</strong> với shader <em>Toony Colors Pro 2</em> và giải pháp <strong>Fake Shadow Shader</strong> tối ưu.
                </p>

                {/* PHẦN A: CHUẨN BỊ ASSETS */}
                <h3>A. Chuẩn Bị Assets Trong Blender</h3>

                <h4>1. Cuộn Chỉ (Skein Full & Half)</h4>
                
                <p><strong>1.1. Model & Sculpt High Poly:</strong></p>
                <p>
                    Mô hình chi tiết cao (High Poly) của cuộn chỉ được tạo dựng với đầy đủ các đường xoắn sợi len đan xen mềm mại để tạo độ gồ ghề chân thực. Chúng ta sẽ không đi sâu vào chi tiết sculpting trong bài viết này.
                </p>
                <div className="blog-post-image-container">
                    <img src="/assets/blog/threadJamArtCover/SkeinHigh.png" alt="High Poly Skein Model" />
                    <span className="image-caption">Mô hình High Poly Skein chứa nhiều chi tiết nếp gấp sợi chỉ</span>
                </div>

                <p><strong>1.2. Tạo Low Poly Mesh và Cage Mesh:</strong></p>
                <ul>
                    <li>
                        <strong>Low Poly Mesh:</strong> Dựng lưới poly thấp ôm sát phom dáng tổng thể của cuộn chỉ, tối giản số lượng đa giác nhằm đảm bảo hiệu năng tải tốt nhất khi hiển thị hàng chục cuộn chỉ cùng lúc trên màn hình game.
                        <div className="blog-post-image-container">
                            <img src="/assets/blog/threadJamArtCover/SkeinLow.png" alt="Low Poly Skein Mesh" />
                            <span className="image-caption">Lưới Low Poly tinh gọn tối ưu cho mobile</span>
                        </div>
                    </li>
                    <li>
                        <strong>Tạo Cage Mesh:</strong>
                        <div style={{ backgroundColor: 'rgba(56, 189, 248, 0.08)', borderLeft: '4px solid #38bdf8', padding: '15px', borderRadius: '4px', margin: '15px 0' }}>
                            <strong>Định nghĩa Cage Mesh:</strong> <em>Cage (Lồng bao bọc)</em> là một lưới đa giác đóng vai trò làm ranh giới xác định khoảng cách và hướng bắn tia ray (ray casting) trong quá trình nướng (bake) texture từ High Poly sang Low Poly. Việc sử dụng Cage giúp loại bỏ triệt để hiện tượng tia ray bị cắt xén (clipping/intersection), bề mặt lồi lõm bị lỗi đen, hay bắt nhầm chi tiết ở các góc gấp khúc hẹp.
                            <br /><br />
                            <strong style={{ color: '#ef4444' }}>⚠️ Lưu ý cực kỳ quan trọng:</strong> Cage mesh <u>bắt buộc phải có cùng cấu trúc lưới (topology) và số lượng đỉnh/poly (polycount) chính xác 100%</u> so với Low Poly mesh!
                        </div>
                        <p><strong>Các bước tạo Cage Mesh trong Blender:</strong></p>
                        <ol>
                            <li>Chọn <code>Skein_Low</code> và nhấn <code>Shift + D</code> để nhân bản (duplicate), sau đó nhấn chuột phải để giữ nguyên vị trí. Đổi tên mesh này thành <code>Skein_Cage</code>.</li>
                            <li>Vào <strong>Edit Mode</strong> (phím <code>Tab</code>), nhấn <code>A</code> để chọn tất cả các đỉnh và mặt lưới.</li>
                            <li>Nhấn <code>Alt + S</code> (công cụ <em>Shrink / Fatten</em>) và di chuyển chuột nhẹ ra phía ngoài để nở mesh đều theo vector pháp tuyến (normals), sao cho lưới Cage vừa vặn bao bọc trọn vẹn toàn bộ mô hình High Poly bên trong mà không bị biến dạng cấu trúc.</li>
                        </ol>
                        <div className="blog-post-image-container">
                            <img src="/assets/blog/threadJamArtCover/SkeinCage.png" alt="Skein Cage Mesh" />
                            <span className="image-caption">Lưới Cage Mesh bao bọc hoàn toàn High Poly Model</span>
                        </div>
                    </li>
                </ul>

                <p><strong>1.3. Quy Trình Bake Texture:</strong></p>
                <ol>
                    <li>
                        <strong>Chọn Render Engine:</strong> Chuyển sang <strong>Cycles</strong> trong tab <em>Render Properties</em> (Blender chỉ hỗ trợ nướng chi tiết đầy đủ khi dùng Cycles).
                        <div className="blog-post-image-container">
                            <img src="/assets/blog/threadJamArtCover/ChooseCyclesRenderEngine.png" alt="Chọn Cycles Render Engine" style={{ maxWidth: '400px' }} />
                            <span className="image-caption">Chọn Render Engine: Cycles</span>
                        </div>
                    </li>
                    <li>
                        <strong>Setup Material cho Skein_High:</strong> Đơn giản là thiết lập màu sắc cơ bản (Base Color) và độ nhám (Roughness) cho cuộn chỉ màu tương ứng.
                        <div className="blog-post-image-container">
                            <img src="/assets/blog/threadJamArtCover/SkeinHigh_Material.png" alt="Material Skein High" style={{ maxWidth: '450px' }} />
                            <span className="image-caption">Setup Material cho High Poly Mesh</span>
                        </div>
                    </li>
                    <li>
                        <strong>Setup Material cho Skein_Low:</strong> Trong Shader Editor của Low Poly, thêm một node <code>Image Texture</code> mới (nhấn <code>Shift + A &rarr; Texture &rarr; Image Texture</code>), nhấn <strong>New</strong> để tạo ảnh mới (ví dụ 1024x1024 hoặc 2048x2048) và đặt tên (ví dụ: <code>Skein_Combined</code>).
                        <br />
                        <span style={{ color: '#f59e0b', fontWeight: 600 }}>👉 Điểm mấu chốt:</span> Luôn luôn click chuột để <strong>Active (được bôi viền trắng/vàng)</strong> vào Node Image Texture này trong Shader Editor. Blender sẽ bake dữ liệu vào chính node đang được kích hoạt.
                        <div className="blog-post-image-container">
                            <img src="/assets/blog/threadJamArtCover/SkeinLow_Material.png" alt="Material Skein Low" style={{ maxWidth: '450px' }} />
                            <span className="image-caption">Tạo Image Texture node và đảm bảo node đang ở trạng thái Active</span>
                        </div>
                    </li>
                    <li>
                        <strong>Chọn Đối Tượng Theo Đúng Thứ Tự:</strong> Trong Outliner/Viewport, click chọn <code>Skein_High</code> trước, sau đó giữ phím <code>Shift</code> (hoặc <code>Ctrl</code>) và click chọn <code>Skein_Low</code> sau. Khi này <code>Skein_Low</code> là <em>Active Object</em>.
                    </li>
                    <li>
                        <strong>Thiết Lập Thông Số Bake (Tab Render Properties &rarr; Bake):</strong>
                        <ul>
                            <li><strong>Bake Type:</strong> Chọn <code>Combined</code> (kết hợp cả ánh sáng và màu sắc) hoặc <code>Normal</code> (nếu nướng riêng bản đồ pháp tuyến).</li>
                            <li>Tích chọn <strong>Selected to Active</strong>.</li>
                            <li>Tích chọn <strong>Cage</strong>, tại mục <em>Cage Object</em> hãy chọn <code>Skein_Cage</code> đã tạo ở bước trên.</li>
                        </ul>
                        <div className="blog-post-image-container">
                            <img src="/assets/blog/threadJamArtCover/BakeSetup_Combined.png" alt="Bake Setup Combined" style={{ maxWidth: '420px' }} />
                            <span className="image-caption">Cấu hình thông số Bake Combined với Cage trong Blender</span>
                        </div>
                        <div className="blog-post-image-container">
                            <img src="/assets/blog/threadJamArtCover/BakeSetup_Normal.png" alt="Bake Setup Normal" style={{ maxWidth: '420px' }} />
                            <span className="image-caption">Cấu hình Bake Normal Map khi cần chi tiết bề mặt bổ sung</span>
                        </div>
                    </li>
                    <li>
                        <strong>Bấm Bake & Lưu Texture:</strong> Nhấn nút <strong>Bake</strong>. Sau khi tiến trình tính toán xong, mở cửa sổ <em>Image Editor</em> để kiểm tra kết quả texture map vừa nướng và lưu lại (Save As <code>.png</code>) để sẵn sàng import vào Unity.
                        <div className="blog-post-image-container">
                            <img src="/assets/blog/threadJamArtCover/BakeResult.png" alt="Kết quả Bake Texture trong Blender" style={{ maxWidth: '420px' }} />
                            <span className="image-caption">Kết quả Texture sau khi hoàn tất quá trình Bake trong Blender</span>
                        </div>
                    </li>
                </ol>
                <p>
                    <em>Lặp lại quy trình trên cho các cuộn chỉ với các màu sắc khác nhau và mô hình nửa cuộn chỉ (Half Skein).</em>
                </p>

                <h4>2. Tường Module (Wall Elements)</h4>
                <p>
                    Vì layout các khối tường trong mỗi màn chơi (map/level) có thể thay đổi linh hoạt theo thuật toán giải đố, thay vì dựng nguyên một map tĩnh cố định, chúng ta sẽ tách thành các khối tường thành phần (modular wall elements): góc thẳng, góc vuông, ngã ba, điểm kết thúc...
                </p>
                <div className="blog-post-image-container">
                    <img src="/assets/blog/threadJamArtCover/WallElement.png" alt="Wall Elements" />
                    <span className="image-caption">Các khối tường Modular Wall Elements sẵn sàng cho việc sinh map tự động</span>
                </div>

                <h4>3. Các Chi Tiết Khác & Bảng Màu (Other Elements & Color Palette)</h4>
                <p>
                    Các vật thể trang trí và cơ chế trong màn chơi như kéo bấm chỉ, cúc áo, lõi gỗ, kim băng... được mô hình hóa và trải UV bình thường.
                </p>
                <div className="blog-post-image-container">
                    <img src="/assets/blog/threadJamArtCover/OtherElement.png" alt="Other Elements" />
                    <span className="image-caption">Các phụ kiện may vá & đạo cụ phụ trợ trong game</span>
                </div>
                <p>
                    Trong dự án này, toàn bộ các element phụ đều sử dụng chung một <strong>Bảng màu Gradient (Color Gradient Palette)</strong>. Kỹ thuật này giúp giảm thiểu tối đa số lượng Draw Calls (nhiều mesh dùng chung 1 texture kích thước nhỏ), giữ cho game hoạt động mượt mà ở 60 FPS trên mọi thiết bị di động tầm trung và giá rẻ.
                </p>
                <div className="blog-post-image-container">
                    <img src="/assets/blog/threadJamArtCover/ColorPelette.png" alt="Color Gradient Palette" style={{ maxWidth: '500px' }} />
                    <span className="image-caption">Color Gradient Palette Texture dùng chung cho các element phụ</span>
                </div>

                {/* PHẦN B: UNITY SETUP */}
                <h3>B. Thiết Lập Trong Unity (Unity URP Setup)</h3>

                <h4>1. Khởi Tạo Dự Án URP (Universal Render Pipeline)</h4>
                <p>
                    Khởi tạo hoặc chuyển đổi dự án Unity sang chuẩn <strong>URP</strong> để tận dụng các tính năng render di động hiệu quả cao, hỗ trợ Shader Graph và hệ thống Post-processing nhẹ nhàng.
                </p>

                <h4>2. Thiết Lập Scene & Camera Orthographic</h4>
                <p>
                    Để tạo góc nhìn Isometric/Casual đặc trưng không bị sai lệch phối cảnh xa gần khi xếp các cuộn chỉ, camera được thiết lập ở chế độ <strong>Orthographic</strong> với góc xoay trục nghiêng cân đối (thường là góc Pitch ~45-55 độ).
                </p>
                <div className="blog-post-image-container">
                    <img src="/assets/blog/threadJamArtCover/CameraSetup.png" alt="Camera Setup" style={{ maxWidth: '500px' }} />
                    <span className="image-caption">Cấu hình Camera Orthographic trong Unity Inspector</span>
                </div>
                <p>
                    Đồng thời, thiết lập <strong>Volume Profile</strong> với các hiệu ứng <em>Color Adjustments</em>, <em>Bloom</em> nhẹ nhàng và <em>Tonemapping</em> để màu sắc trở nên trong trẻo, bắt mắt.
                </p>
                <div className="blog-post-image-container">
                    <img src="/assets/blog/threadJamArtCover/VolumeProfile.png" alt="URP Volume Profile" style={{ maxWidth: '500px' }} />
                    <span className="image-caption">Cấu hình URP Global Volume Profile</span>
                </div>

                <h4>3. Thiết Lập Vật Liệu Với Toony Colors Pro 2 & Fake Shadow Shader</h4>
                <ul>
                    <li>
                        <strong>Skein & Objects Material:</strong> Sử dụng shader <strong>Toony Colors Pro 2</strong>. Gán trực tiếp texture <em>Combined</em> (Albedo) và <em>Normal Map</em> đã bake từ Blender vào material. Tinh chỉnh các thông số Ramp Shading để tạo dải bóng đổ hoạt hình mượt mà.
                        <div className="blog-post-image-container">
                            <img src="/assets/blog/threadJamArtCover/Skein_Material_Unity.png" alt="Skein Material Unity" style={{ maxWidth: '550px' }} />
                            <span className="image-caption">Cấu hình Toony Colors Pro 2 Shader cho cuộn chỉ Skein</span>
                        </div>
                    </li>
                    <li>
                        <strong>Giải Pháp Fake Shadow Texture:</strong>
                        <p>
                            Khi thử nghiệm với <em>Realtime Dynamic Shadows</em> của Unity, bóng đổ thường bị răng cưa (aliasing) trên mobile và làm tăng đáng kể chi phí render. Vì vậy, giải pháp tối ưu là sử dụng <strong>Fake Texture Shadow</strong>:
                        </p>
                        <ol>
                            <li>Tạo một texture tròn/elip màu đen có độ mờ biên (alpha gradient falloff mềm) trong Photoshop hoặc phần mềm 2D.</li>
                            <li>Tạo một đối tượng 3D Plane nhỏ (hoặc mesh quad tùy chỉnh) đặt sát trên bề mặt sàn ngay dưới chân mỗi vật thể.</li>
                            <li>
                                Cấu hình Material cho Plane bóng đổ: Chọn <strong>Surface Type: Transparent</strong>, <strong>Blending Mode: Alpha</strong>, gán texture alpha vào và điều chỉnh độ trong suốt vừa mắt.
                            </li>
                        </ol>
                        <div className="blog-post-image-container">
                            <img src="/assets/blog/threadJamArtCover/Shadows_Setup.png" alt="Shadows Setup Hierarchy" style={{ maxWidth: '600px' }} />
                            <span className="image-caption">Đặt Plane Fake Shadow dưới chân đối tượng trong Scene Hierarchy</span>
                        </div>
                        <div className="blog-post-image-container">
                            <img src="/assets/blog/threadJamArtCover/Shadows_Materials.png" alt="Shadows Material Setup" style={{ maxWidth: '500px' }} />
                            <span className="image-caption">Cấu hình Material Transparent & Alpha Blending cho bóng đổ</span>
                        </div>
                        <div className="blog-post-image-container">
                            <img src="/assets/blog/threadJamArtCover/Shadows.png" alt="Shadows Result" />
                            <span className="image-caption">Kết quả bóng đổ mềm mại, sạch sẽ và siêu nhẹ cho thiết bị di động</span>
                        </div>
                    </li>
                </ul>

                <h4>4. Dùng AI Để Tạo Script Sinh Map (Map Generation)</h4>
                <p>
                    Sử dụng AI để nhanh chóng sinh một script C# tạo bản đồ tự động dựa trên các <strong>Wall Elements</strong> đã dựng trong Blender.
                </p>
                <div className="blog-post-image-container">
                    <img src="/assets/blog/threadJamArtCover/BasicMapGenerationSetup.png" alt="Basic Map Generation Setup trong Unity" style={{ maxWidth: '650px' }} />
                    <span className="image-caption">Setup script Map Generation và gán các khối Wall Element prefab trong Unity Inspector</span>
                </div>
                <p>
                    <em>Lưu ý:</em> Đây chỉ là một script khởi đầu đơn giản để kết nối các element, trong thực tế sẽ cần mở rộng thêm nhiều logic kiểm tra ô lân cận (neighbor checking) và thuật toán phân bố chướng ngại vật để tạo nên một hệ thống generation map hoàn chỉnh.
                </p>
            </>
        );
    }

    // English Version
    return (
        <>
            {/* Hero / Cover image */}
            <div className="blog-post-image-container">
                <img 
                    src="/assets/blog/threadJamArtCover/PhoneAspectRatioCover.png" 
                    alt="Thread Jam Game Art Cover" 
                    style={{ maxWidth: '420px', width: '100%', borderRadius: '16px' }}
                />
                <span className="image-caption">Thread Jam - Cover Art & In-game Visual on Mobile Aspect Ratio</span>
            </div>

            <p>
                When developing casual and puzzle mobile titles like <strong>Thread Jam</strong>, balancing optimal runtime rendering performance with an expressive, polished stylized aesthetic is a key challenge. This article provides a comprehensive workflow breakdown from 3D modeling and <strong>Cage-based texture baking</strong> in Blender to modular level walls, <strong>Unity URP</strong> material setup with <em>Toony Colors Pro 2</em>, and high-performance <strong>Fake Shadow Shaders</strong>.
            </p>

            {/* SECTION A: ASSET PREPARATION */}
            <h3>A. Asset Preparation in Blender</h3>

            <h4>1. Thread Skeins (Full & Half Skein)</h4>
            
            <p><strong>1.1. High Poly Model & Sculpting:</strong></p>
            <p>
                The high-poly skein model is crafted with rich, curved yarn fiber folds to convey realistic tactile volume. We won't delve deeply into the sculpt brush techniques in this post.
            </p>
            <div className="blog-post-image-container">
                <img src="/assets/blog/threadJamArtCover/SkeinHigh.png" alt="High Poly Skein Model" />
                <span className="image-caption">High Poly Skein Model featuring high-density yarn folds</span>
            </div>

            <p><strong>1.2. Creating Low Poly Mesh & Cage Mesh:</strong></p>
            <ul>
                <li>
                    <strong>Low Poly Mesh:</strong> Built to capture the essential silhouette of the yarn roll with a minimal polycount to sustain high frame rates when numerous skeins are rendered simultaneously on screen.
                    <div className="blog-post-image-container">
                        <img src="/assets/blog/threadJamArtCover/SkeinLow.png" alt="Low Poly Skein Mesh" />
                        <span className="image-caption">Clean, lightweight Low Poly mesh optimized for mobile</span>
                    </div>
                </li>
                <li>
                    <strong>Creating the Cage Mesh:</strong>
                    <div style={{ backgroundColor: 'rgba(56, 189, 248, 0.08)', borderLeft: '4px solid #38bdf8', padding: '15px', borderRadius: '4px', margin: '15px 0' }}>
                        <strong>What is a Cage Mesh?</strong> A <em>Cage</em> is an inflated boundary mesh that guides ray-casting direction and maximum distance during texture baking from High Poly to Low Poly. Utilizing a Cage eliminates geometry clipping, black artifacts, and ray projection errors across tight crevices.
                        <br /><br />
                        <strong style={{ color: '#ef4444' }}>⚠️ Crucial Requirement:</strong> The Cage mesh <u>must share identical vertex count and mesh topology 100%</u> with the Low Poly mesh!
                    </div>
                    <p><strong>Steps to generate a Cage Mesh in Blender:</strong></p>
                    <ol>
                        <li>Select <code>Skein_Low</code>, press <code>Shift + D</code> to duplicate, and right-click to maintain position. Rename the duplicated mesh to <code>Skein_Cage</code>.</li>
                        <li>Switch to <strong>Edit Mode</strong> (<code>Tab</code> key) and press <code>A</code> to select all vertices and faces.</li>
                        <li>Press <code>Alt + S</code> (<em>Shrink / Fatten</em> tool) and drag the cursor outwards along surface normals so the Cage fully encapsulates the High Poly model without mesh self-intersections.</li>
                    </ol>
                    <div className="blog-post-image-container">
                        <img src="/assets/blog/threadJamArtCover/SkeinCage.png" alt="Skein Cage Mesh" />
                        <span className="image-caption">Inflated Cage Mesh safely covering the High Poly model</span>
                    </div>
                </li>
            </ul>

            <p><strong>1.3. Texture Baking Workflow:</strong></p>
            <ol>
                <li>
                    <strong>Select Render Engine:</strong> Switch the Render Engine to <strong>Cycles</strong> under <em>Render Properties</em> (Cycles is required for complete baking in Blender).
                    <div className="blog-post-image-container">
                        <img src="/assets/blog/threadJamArtCover/ChooseCyclesRenderEngine.png" alt="Choose Cycles Render Engine" style={{ maxWidth: '400px' }} />
                        <span className="image-caption">Select Render Engine: Cycles</span>
                    </div>
                </li>
                <li>
                    <strong>Material Setup for Skein_High:</strong> Assign basic yarn color (Base Color) and surface roughness values for the corresponding thread palette.
                    <div className="blog-post-image-container">
                        <img src="/assets/blog/threadJamArtCover/SkeinHigh_Material.png" alt="Material Skein High" style={{ maxWidth: '450px' }} />
                        <span className="image-caption">High Poly Mesh Material Configuration</span>
                    </div>
                </li>
                <li>
                    <strong>Material Setup for Skein_Low:</strong> In the Shader Editor for the Low Poly mesh, add a new <code>Image Texture</code> node (<code>Shift + A &rarr; Texture &rarr; Image Texture</code>), click <strong>New</strong>, set dimensions (e.g., 1024x1024 or 2048x2048), and name it <code>Skein_Combined</code>.
                    <br />
                    <span style={{ color: '#f59e0b', fontWeight: 600 }}>👉 Essential Step:</span> Keep this <code>Image Texture</code> node <strong>Active (highlighted with a white/yellow border)</strong>. Blender directs bake output to the actively selected texture node.
                    <div className="blog-post-image-container">
                        <img src="/assets/blog/threadJamArtCover/SkeinLow_Material.png" alt="Material Skein Low" style={{ maxWidth: '450px' }} />
                        <span className="image-caption">Create Image Texture node and ensure it remains Active</span>
                    </div>
                </li>
                <li>
                    <strong>Object Selection Order:</strong> In the Viewport/Outliner, select <code>Skein_High</code> first, then hold <code>Shift</code> and select <code>Skein_Low</code> second (ensuring <code>Skein_Low</code> is the active highlighted object).
                </li>
                <li>
                    <strong>Configure Bake Settings (Render Properties &rarr; Bake):</strong>
                    <ul>
                        <li><strong>Bake Type:</strong> Choose <code>Combined</code> (incorporating lighting and diffuse base colors) or <code>Normal</code> (for dedicated tangent-space normal maps).</li>
                        <li>Check <strong>Selected to Active</strong>.</li>
                        <li>Check <strong>Cage</strong>, and select <code>Skein_Cage</code> as the target Cage Object.</li>
                    </ul>
                    <div className="blog-post-image-container">
                        <img src="/assets/blog/threadJamArtCover/BakeSetup_Combined.png" alt="Bake Setup Combined" style={{ maxWidth: '420px' }} />
                        <span className="image-caption">Combined Bake parameters with Cage enabled in Blender</span>
                    </div>
                    <div className="blog-post-image-container">
                        <img src="/assets/blog/threadJamArtCover/BakeSetup_Normal.png" alt="Bake Setup Normal" style={{ maxWidth: '420px' }} />
                        <span className="image-caption">Normal Map Bake setup for micro surface details</span>
                    </div>
                </li>
                <li>
                    <strong>Execute Bake & Export Texture:</strong> Click <strong>Bake</strong>. When finished, open the <em>Image Editor</em> to inspect the resulting baked texture map and choose <strong>Image &rarr; Save As</strong> (<code>.png</code>) for Unity integration.
                    <div className="blog-post-image-container">
                        <img src="/assets/blog/threadJamArtCover/BakeResult.png" alt="Bake Texture Result in Blender" style={{ maxWidth: '420px' }} />
                        <span className="image-caption">Resulting baked texture map in Blender's Image Editor</span>
                    </div>
                </li>
            </ol>
            <p>
                <em>Repeat this process for alternate color variants and half-skein geometries.</em>
            </p>

            <h4>2. Modular Wall Elements</h4>
            <p>
                Because puzzle layouts vary across levels, we model individual modular wall components (straight corridors, corners, crossings, endcaps) rather than a single monolithic mesh. These blocks are dynamically assembled via procedural map scripts in Unity.
            </p>
            <div className="blog-post-image-container">
                <img src="/assets/blog/threadJamArtCover/WallElement.png" alt="Wall Elements" />
                <span className="image-caption">Modular Wall Elements designed for procedural grid generation</span>
            </div>

            <h4>3. Miscellaneous Elements & Color Palette</h4>
            <p>
                Game props and mechanics (thread shears, wooden spools, buttons, pins) are modeled and UV mapped cleanly.
            </p>
            <div className="blog-post-image-container">
                <img src="/assets/blog/threadJamArtCover/OtherElement.png" alt="Other Elements" />
                <span className="image-caption">Props and tailoring accessories used throughout levels</span>
            </div>
            <p>
                All auxiliary props share a unified <strong>Color Gradient Palette Texture</strong>. This significantly reduces draw calls through texture atlas batching while guaranteeing cohesive visual vibrancy on low-end mobile chipsets.
            </p>
            <div className="blog-post-image-container">
                <img src="/assets/blog/threadJamArtCover/ColorPelette.png" alt="Color Gradient Palette" style={{ maxWidth: '500px' }} />
                <span className="image-caption">Shared Color Gradient Palette Texture for lightweight batching</span>
            </div>

            {/* SECTION B: UNITY SETUP */}
            <h3>B. Unity URP Setup</h3>

            <h4>1. URP Project Initialization</h4>
            <p>
                Create or configure your project using Unity's <strong>Universal Render Pipeline (URP)</strong> for optimal mobile efficiency, customizable Shader Graph support, and low-overhead post-processing.
            </p>

            <h4>2. Scene & Orthographic Camera Setup</h4>
            <p>
                To achieve a clean isometric presentation free from perspective distortion, configure the main camera with an <strong>Orthographic</strong> projection mode and a fixed isometric tilt angle (typically 45–55 degrees pitch).
            </p>
            <div className="blog-post-image-container">
                <img src="/assets/blog/threadJamArtCover/CameraSetup.png" alt="Camera Setup" style={{ maxWidth: '500px' }} />
                <span className="image-caption">Orthographic Camera Inspector parameters in Unity</span>
            </div>
            <p>
                Configure a URP <strong>Global Volume Profile</strong> with subtle <em>Bloom</em>, <em>Color Adjustments</em>, and <em>Tonemapping</em> to give the overall scene bright, crisp, cartoony colors.
            </p>
            <div className="blog-post-image-container">
                <img src="/assets/blog/threadJamArtCover/VolumeProfile.png" alt="URP Volume Profile" style={{ maxWidth: '500px' }} />
                <span className="image-caption">URP Global Volume Profile with color grading</span>
            </div>

            <h4>3. Material Setup with Toony Colors Pro 2 & Fake Shadow Shaders</h4>
            <ul>
                <li>
                    <strong>Skein & Prop Materials:</strong> Powered by the <strong>Toony Colors Pro 2</strong> shader suite. Assign the baked <em>Combined</em> texture to the Albedo/Base slot and attach the <em>Normal Map</em>. Fine-tune the Ramp shading curves to deliver soft stylized lighting falloff.
                    <div className="blog-post-image-container">
                        <img src="/assets/blog/threadJamArtCover/Skein_Material_Unity.png" alt="Skein Material Unity" style={{ maxWidth: '550px' }} />
                        <span className="image-caption">Toony Colors Pro 2 material configuration for thread skeins</span>
                    </div>
                </li>
                <li>
                    <strong>Fake Texture Shadow Implementation:</strong>
                    <p>
                        Real-time dynamic shadows often incur heavy GPU shadow-pass overhead and suffer from aliasing artifacts on mobile screens. We solve this by implementing custom <strong>Fake Texture Shadows</strong>:
                    </p>
                    <ol>
                        <li>Create a soft circular/elliptical black vignette texture with smooth alpha gradient falloff in Photoshop or a 2D tool.</li>
                        <li>Instantiate a 3D Quad/Plane mesh positioned just above the floor layer beneath each game object.</li>
                        <li>
                            Set the Shadow Material to <strong>Surface Type: Transparent</strong> and <strong>Blending Mode: Alpha</strong>, applying the alpha texture to control blur and opacity.
                        </li>
                    </ol>
                    <div className="blog-post-image-container">
                        <img src="/assets/blog/threadJamArtCover/Shadows_Setup.png" alt="Shadows Setup Hierarchy" style={{ maxWidth: '600px' }} />
                        <span className="image-caption">Fake Shadow plane placement underneath objects in Scene Hierarchy</span>
                    </div>
                    <div className="blog-post-image-container">
                        <img src="/assets/blog/threadJamArtCover/Shadows_Materials.png" alt="Shadows Material Setup" style={{ maxWidth: '500px' }} />
                        <span className="image-caption">Transparent alpha material properties for soft contact shadows</span>
                    </div>
                    <div className="blog-post-image-container">
                        <img src="/assets/blog/threadJamArtCover/Shadows.png" alt="Shadows Result" />
                        <span className="image-caption">Crisp, stylized contact shadows with minimal performance footprint</span>
                    </div>
                </li>
            </ul>

            <h4>4. Using AI to Generate Map Script</h4>
            <p>
                Using AI to generate a starter procedural map generation script that instantiates the modular <strong>Wall Elements</strong> created in Blender.
            </p>
            <div className="blog-post-image-container">
                <img src="/assets/blog/threadJamArtCover/BasicMapGenerationSetup.png" alt="Basic Map Generation Setup in Unity" style={{ maxWidth: '650px' }} />
                <span className="image-caption">Map Generation component setup and Wall Element prefab references in Unity Inspector</span>
            </div>
            <p>
                <em>Note:</em> This is a simple starter script to instantiate elements. A full procedural generator requires additional neighbor checking and tile placement logic.
            </p>
        </>
    );
}
