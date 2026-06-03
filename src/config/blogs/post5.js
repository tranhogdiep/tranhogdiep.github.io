export default {
    id: 5,
    slug: "threejs-car-showroom-galaxy",
    show3DModel: false,
    en: {
        title: "[Demo] 3D Showroom for Web",
        date: "June 03, 2026",
        category: "Three.js / Web3D",
        excerpt: "An architectural study on designing a real-time 3D car showroom set in a cosmic galaxy, detailing bake lights, physics-based rendering (PBR), and Three.js post-processing.",
        content: `
            <p>Showcasing high-fidelity 3D assets like modern supercars on the web requires balancing realistic rendering with performance. By placing the showroom in a stylized space/galaxy environment, we create an immersive sci-fi aesthetic that leverages dark background contrast to make the vehicle's reflective surfaces truly pop.</p>
            
            <div class="blog-post-video-container">
                <iframe src="https://www.youtube.com/embed/wZf3bH_ilh4" title="Three.js Car Showroom in the Galaxy" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
            <span class="image-caption" style="display: block; text-align: center; margin-top: -25px; margin-bottom: 25px;">Project Demo: Interactive Three.js Car Showroom with Galaxy Background</span>

            <h3>1. Baking Lights for Real-Time Performance</h3>
            <p>To achieve high-fidelity lighting without sacrificing frame rate, lightmaps are baked directly inside the DCC tool (like Blender) before exporting to Three.js. This pre-calculates global illumination, ambient occlusion, and soft shadows into static textures, reducing the real-time lighting calculation overhead to zero:</p>
            <ul>
                <li><strong>UV2 Channel Mapping:</strong> During export, ensure the 3D model contains a second UV channel (UV2) specifically unwrapped and mapped for the baked lightmap texture.</li>
                <li><strong>Material Assignment:</strong> In Three.js, load the lightmap texture and apply it directly to the material's <code>lightMap</code> property.</li>
                <li><strong>Intensity Tuning:</strong> Set <code>material.lightMapIntensity</code> (typically between 1.0 and 2.0) to control the contribution of pre-calculated illumination, blending it seamlessly with dynamic reflection maps.</li>
            </ul>

            <h3>2. Configuring PBR Materials for Automotive Rendering</h3>
            <p>To achieve realistic car paint, we use <code>THREE.MeshPhysicalMaterial</code>, which extends standard materials with clearcoat and sheen options:</p>
            <ul>
                <li><strong>Clearcoat & Roughness:</strong> The outer clearcoat layer is set to 1.0 with a roughness of 0.05 to mimic the reflective, polished varnish of real supercars. The base roughness is adjusted to simulate metallic flake paint.</li>
                <li><strong>Metalness & Color:</strong> Set metalness to 1.0 for chromium elements and alloy rims. We use dark, rich body colors (e.g., carbon grey or cosmic orange) that contrast beautifully with the space environment.</li>
                <li><strong>Environment Reflections:</strong> A high-quality equirectangular HDR environment map of space or a studio lighting setup is mapped via <code>RGBELoader</code>. The environment map acts as the primary source of reflections for the car's curvy panels.</li>
            </ul>

            <h3>3. Post-processing in Three.js</h3>
            <p>To make the scene feel cinematic, we implement a post-processing pipeline using Three.js's <code>EffectComposer</code>. Instead of rendering directly to the canvas, the scene is rendered to offscreen buffers for texture filtering and shader effects:</p>
            <ul>
                <li><strong>EffectComposer & RenderPass:</strong> Set up the composer and add a basic <code>RenderPass</code> as the first pass to capture the base 3D scene.</li>
                <li><strong>UnrealBloomPass:</strong> Apply a high-quality bloom filter to make emissive materials (like headlights and neon rings) glow dynamically. Adjust threshold, strength, and radius to achieve a realistic glow.</li>
                <li><strong>OutputPass:</strong> Add the final <code>OutputPass</code> to handle color correction, tone mapping, and gamma correction before presenting the pixels to the screen.</li>
            </ul>
        `
    },
    vi: {
        title: "[Demo] 3D Showroom for Web",
        date: "3 tháng 6, 2026",
        category: "Three.js / Web3D",
        excerpt: "Nghiên cứu kiến trúc thiết kế showroom ô tô 3D thời gian thực đặt trong không gian vũ trụ, chi tiết về nướng ánh sáng (bake light), vật liệu vật lý (PBR) và hậu xử lý (post-processing) trong Three.js.",
        content: `
            <p>Trình diễn các mô hình 3D chất lượng cao như siêu xe trên trình duyệt đòi hỏi sự cân bằng tinh tế giữa độ chân thực và hiệu năng. Bằng cách đặt showroom trong không gian vũ trụ huyền ảo, chúng ta tạo ra một phong cách viễn tưởng cuốn hút, tận dụng nền tối của vũ trụ để làm nổi bật các bề mặt phản chiếu của thân xe.</p>
            
            <div class="blog-post-video-container">
                <iframe src="https://www.youtube.com/embed/wZf3bH_ilh4" title="Three.js Car Showroom in the Galaxy" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
            <span class="image-caption" style="display: block; text-align: center; margin-top: -25px; margin-bottom: 25px;">Video Minh Họa: Showroom Ô tô Three.js Tương Tác trên Nền Ngân Hà</span>

            <h3>1. Nướng Ánh Sáng (Bake Light) để Tối Ưu Hiệu Năng Thời Gian Thực</h3>
            <p>Để đạt được hiệu ứng ánh sáng chất lượng cao mà không làm giảm tốc độ khung hình (FPS), ánh sáng được nướng (bake) trực tiếp bên trong các công cụ 3D (như Blender) trước khi xuất sang Three.js. Quá trình này tính toán trước ánh sáng toàn cục (global illumination), đổ bóng môi trường (ambient occlusion) và bóng đổ mềm thành các texture tĩnh, giúp giảm tải hoàn toàn việc tính toán ánh sáng thời gian thực:</p>
            <ul>
                <li><strong>Trải Kênh UV2 (UV2 Mapping):</strong> Khi xuất mô hình, cần đảm bảo tệp 3D chứa kênh UV thứ hai (UV2) được trải riêng biệt dành cho bản đồ ánh sáng (lightmap texture).</li>
                <li><strong>Gán Vật Liệu:</strong> Trong Three.js, chúng ta tải texture lightmap và gán trực tiếp vào thuộc tính <code>lightMap</code> của vật liệu.</li>
                <li><strong>Điều Chỉnh Cường Độ (Intensity):</strong> Điều chỉnh <code>material.lightMapIntensity</code> (thông thường từ 1.0 đến 2.0) để kiểm soát độ sáng của luồng ánh sáng đã được tính toán trước này, kết hợp mượt mà với bản đồ phản chiếu động.</li>
            </ul>

            <h3>2. Cấu hình Vật liệu PBR cho Xe Ô tô</h3>
            <p>Để đạt được độ bóng sơn xe chân thực, chúng tôi sử dụng <code>THREE.MeshPhysicalMaterial</code> để mở rộng các đặc tính vật liệu tiêu chuẩn với lớp phủ bóng (clearcoat) và độ phản quang mịn:</p>
            <ul>
                <li><strong>Lớp phủ bóng (Clearcoat) & Độ nhám:</strong> Chỉ số Clearcoat được đặt ở mức 1.0 với độ nhám (roughness) cực thấp 0.05 để mô phỏng lớp sơn phủ bóng bẩy của siêu xe thực tế. Độ nhám cơ bản được tinh chỉnh để tạo cảm giác sơn ánh kim metallic.</li>
                <li><strong>Kim loại & Màu sắc:</strong> Thiết lập độ kim loại (metalness) bằng 1.0 cho các chi tiết mạ chrome và vành bánh xe. Màu sơn xe được chọn là các tông màu đậm, sâu (như xám carbon hoặc cam vũ trụ) tạo độ tương phản cao với không gian.</li>
                <li><strong>Phản chiếu Môi trường:</strong> Một bản đồ môi trường HDR chất lượng cao được tải thông qua <code>RGBELoader</code>. Bản đồ này là nguồn sáng phản chiếu chính lên các bề mặt cong mềm mại của vỏ xe.</li>
            </ul>

            <h3>3. Postprocessing của Three.js</h3>
            <p>Để tạo cảm giác điện ảnh cho khung cảnh, chúng ta thiết lập một quy trình hậu xử lý (post-processing) sử dụng <code>EffectComposer</code> của Three.js. Thay vì vẽ trực tiếp lên canvas, toàn bộ cảnh sẽ được kết xuất vào bộ đệm phụ để áp dụng các hiệu ứng shader nâng cao:</p>
            <ul>
                <li><strong>EffectComposer & RenderPass:</strong> Thiết lập composer và thêm <code>RenderPass</code> làm bước đầu tiên để ghi lại hình ảnh 3D cơ bản của scene.</li>
                <li><strong>UnrealBloomPass:</strong> Áp dụng bộ lọc bloom chất lượng cao giúp các vật liệu phát sáng (như đèn pha ô tô và các vòng neon) tỏa sáng chân thực. Tinh chỉnh threshold (ngưỡng), strength (cường độ) và radius (bán kính) để đạt hiệu ứng mong muốn.</li>
                <li><strong>OutputPass:</strong> Thêm <code>OutputPass</code> cuối cùng để xử lý hiệu chỉnh màu sắc (color correction), chuyển đổi tone mapping và hiệu chỉnh gamma trước khi hiển thị lên màn hình.</li>
            </ul>
        `
    }
};
