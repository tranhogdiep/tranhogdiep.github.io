import React, { Suspense, lazy } from 'react';
import { useLanguage } from '../../config/LanguageContext';

const MapDemo = lazy(() => import('../MapDemo'));

export default function Post6() {
    const { language } = useLanguage();

    return (
        <>
            {/* Showcase Section */}
            <div className="blog-ar-showcase-section">
                <h2 className="blog-ar-showcase-title">
                    {language === 'vi' ? 'Bản Đồ 3D & Chỉ Đường Tương Tác' : 'Interactive 3D Map & Routing'}
                </h2>
                <p className="blog-ar-showcase-subtitle">
                    {language === 'vi'
                        ? 'Khám phá mô hình 3D thực tế của thành phố cùng hiệu ứng chỉ đường neon.'
                        : 'Explore a realistic 3D city map with neon path animation.'}
                </p>

                <div className="blog-ar-grid" style={{ gridTemplateColumns: '1fr' }}>
                    <div className="blog-ar-card" style={{ height: '700px' }}>
                        <div className="blog-ar-card-header">
                            <h3>{language === 'vi' ? 'Bản thử nghiệm Map 3D' : '3D City Map Routing Demo'}</h3>
                            <span className="blog-ar-tech-tag">Three.js + UV Shifting</span>
                        </div>
                        <div className="blog-ar-viewer-container" style={{ height: 'calc(100% - 130px)', position: 'relative' }}>
                            <Suspense fallback={<div className="blog-ar-loading">{language === 'vi' ? 'Đang tải bản đồ 3D...' : 'Loading 3D Map...'}</div>}>
                                <MapDemo embedded={true} />
                            </Suspense>
                        </div>
                        <div className="blog-ar-card-footer" style={{ padding: '15px 20px', fontSize: '0.9rem', color: 'rgba(255, 255, 255, 0.7)', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                            <p style={{ margin: 0, lineHeight: '1.5' }}>
                                {language === 'vi'
                                    ? 'Mô hình thành phố được trích xuất từ Google Maps. Hiệu ứng chỉ đường được tạo ra bằng cách tịnh tiến toạ độ UV offset của mesh "Plane" chứa texture đường đi.'
                                    : 'City model captured from Google Maps. The routing path is animated by translating the UV texture coordinate offset of the "Plane" mesh.'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {language === 'vi' ? (
                <>
                    <p>Trong bài viết này, chúng ta sẽ tìm hiểu cách trích xuất mô hình 3D thực tế từ <strong>Google Earth / Google Maps</strong>, xử lý và tích hợp mô hình tòa nhà thiết kế riêng (custom building) trong <strong>Blender</strong>, thiết lập kỹ thuật dịch chuyển và xoay UV để tạo hiệu ứng VFX, cuối cùng là áp dụng hậu xử lý <strong>Bloom (Post-processing)</strong> trong <strong>Three.js</strong> để tạo nên một không gian đô thị 3D rực rỡ, lung linh.</p>

                    <h3>Phần 1: Trích xuất mô hình 3D từ Google Earth & Google Maps bằng RenderDoc</h3>
                    <p>Để trích xuất dữ liệu photogrammetry 3D từ Google Earth/Maps, chúng ta sẽ chụp (capture) bộ nhớ đệm đồ họa GPU trong quá trình dựng hình của trình duyệt.</p>

                    <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', borderLeft: '4px solid #ef4444', padding: '15px', borderRadius: '4px', margin: '15px 0' }}>
                        <strong><span role="img" aria-label="warning">⚠️</span> Lưu ý quan trọng về phiên bản Chrome & RenderDoc:</strong>
                        <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', lineHeight: '1.5' }}>
                            Các phiên bản Chrome mới gần đây đã chặn toàn bộ việc can thiệp (inject) tiến trình GPU nhằm bảo mật CPU/GPU. Để chụp thành công:
                            <br />• <strong>Google Chrome:</strong> Khuyên dùng phiên bản legacy (v108 - v114 là hoạt động tốt nhất). Nếu dùng phiên bản mới hơn, bắt buộc phải tắt sandbox GPU và tắt Direct Composition bằng cách chạy lệnh CLI đặc biệt.
                            <br />• <strong>RenderDoc:</strong> Khuyên dùng phiên bản <code>1.25</code> đến <code>1.31</code> (tương thích tốt nhất với add-on nhập file trên Blender).
                        </p>
                    </div>

                    <ul>
                        <li><strong>Công cụ chuẩn bị:</strong>
                            <ul>
                                <li><strong>RenderDoc:</strong> Bản <code>1.25</code> - <code>1.31</code>.</li>
                                <li><strong>Blender Add-on:</strong> <code>MapsModelsImporter</code> (phiên bản tương thích tương ứng, ví dụ v0.7.0 cho Blender 4.1+).</li>
                                <li><strong>Google Chrome:</strong> Chạy thông qua Command Prompt với các cờ bypass bảo mật.</li>
                            </ul>
                        </li>
                        <li><strong>Các bước chụp mô hình:</strong>
                            <ol>
                                <li>Đảm bảo đã đóng hoàn toàn mọi cửa sổ Chrome đang chạy ngầm trên hệ thống.</li>
                                <li>Mở Command Prompt và khởi chạy Chrome bằng lệnh sau (để tắt GPU sandbox và vô hiệu hóa cơ chế Direct Composition):
                                    <pre style={{ background: '#1e1e1e', padding: '10px', borderRadius: '6px', color: '#fff', fontSize: '0.9rem', overflowX: 'auto', marginTop: '5px' }}>
                                        C:\Windows\System32\cmd.exe /c "SET RENDERDOC_HOOK_EGL=0 && START "" ^"C:\Program Files\Google\Chrome\Application\chrome.exe^" --disable-gpu-sandbox --gpu-startup-dialog --disable-direct-composition=1"
                                    </pre>
                                </li>
                                <li>Một hộp thoại nhỏ xuất hiện hiển thị số <strong>PID (Process ID)</strong> của GPU Chrome. Hãy giữ nguyên hộp thoại đó.</li>
                                <li>Mở <strong>RenderDoc</strong>, vào <code>File &rarr; Attach to Running Instance</code>, nhập <code>localhost</code> và tìm kiếm tiến trình Chrome có số PID khớp với hộp thoại trên. Nhấp đúp (hoặc chọn và nhấn <strong>Connect to App</strong>) để kết nối.</li>
                                <li>Quay lại Chrome, nhấn OK trên hộp thoại. Truy cập Google Earth hoặc Google Maps, chuyển sang chế độ Vệ tinh và bật chế độ 3D Globe.</li>
                                <li>Di chuyển đến khu vực thành phố cần trích xuất. Nhấn giữ phím <code>Ctrl</code> và xoay/di chuyển camera liên tục để Chrome tải đầy đủ mesh và texture chi tiết cao.</li>
                                <li>Trong lúc camera đang di chuyển, nhấn phím <code>F12</code> trên bàn phím (hoặc click <strong>Capture Frame(s) Immediately</strong> trong RenderDoc).</li>
                                <li>RenderDoc sẽ lưu lại tệp tin chụp. Nhấp đúp vào thumbnail hiển thị và lưu dưới định dạng tệp <code>.rdc</code>.</li>
                            </ol>
                        </li>
                    </ul>

                    <h3>Phần 2: Nhập tệp tin vào Blender & Gán tòa nhà thiết kế riêng (Custom Building)</h3>
                    <p>Sau khi có file <code>.rdc</code> chứa lưới đa giác đô thị, chúng ta sẽ đưa vào Blender để tối ưu và gắn thêm tòa nhà của riêng mình.</p>
                    <ol>
                        <li><strong>Import file .rdc:</strong> Mở Blender, vào Preferences cài đặt add-on <code>MapsModelsImporter</code>. Sau đó chọn <code>File &rarr; Import &rarr; Google Maps Capture (.rdc)</code> và chọn file vừa lưu.</li>
                        <li><strong>Tối ưu hóa bản đồ:</strong> Bản đồ import vào sẽ gồm hàng trăm mesh nhỏ lẻ. Hãy chọn tất cả và nhấn <code>Ctrl + J</code> để gộp chung thành một mesh duy nhất. Đặt Origin về tọa độ <code>(0,0,0)</code>. Thêm modifier <strong>Decimate</strong> (giảm tỷ lệ xuống khoảng <code>0.2 - 0.3</code>) để giảm lượng poly giúp tải mượt mà trên trình duyệt.</li>
                        <li><strong>Gán Custom Building:</strong> Import mô hình 3D tòa nhà thiết kế riêng của bạn (file <code>.fbx</code>, <code>.obj</code> hoặc <code>.glb</code>) vào Blender.</li>
                        <li><strong>Căn chỉnh vị trí (Align & Fit):</strong> Sử dụng các công cụ di chuyển (<code>G</code>), xoay (<code>R</code>) và thu phóng (<code>S</code>) để đặt tòa nhà của bạn vào vị trí mong muốn trên bản đồ 3D thực tế.</li>
                        <li><strong>Dọn dẹp địa hình cũ:</strong> Vào Edit Mode của mesh bản đồ lớn, chọn các mặt (faces) của tòa nhà cũ nằm ở vị trí bạn vừa đặt custom building và xóa đi (Delete Faces) để tránh xung đột đè lưới đồ họa.</li>
                        <li><strong>Xuất bản:</strong> Chọn toàn bộ cảnh và xuất ra file <code>.glb</code>. Hãy bật tùy chọn <strong>Draco compression</strong> để nén tối đa dung lượng lưới.</li>
                    </ol>

                    <h3>Phần 3: Custom UV để làm hiệu ứng VFX (Rotation & Offset UV)</h3>
                    <p>Để tạo các hiệu ứng neon chạy dọc đường dẫn hay hiệu ứng radar quét xung quanh custom building, chúng ta sẽ thực hiện kỹ thuật cuộn và xoay toạ độ UV texture trong code Three.js.</p>
                    <div className="blog-post-image-container">
                        <img src="/assets/blog/demoMap/SimpleVFXUV.png" alt="Custom UV mapping trong Blender cho hiệu ứng VFX" />
                        <span className="image-caption">Custom UV mapping trong Blender cho hiệu ứng đường dẫn và xoay vòng</span>
                    </div>
                    <ol>
                        <li><strong>Trải UV (UV Unwrapping):</strong> Trong Blender, hãy trải UV mesh đường đi (routing path) thẳng tắp dọc theo trục dọc hoặc trục ngang. Đối với custom building, trải UV phẳng đều ở khu vực cần quét hiệu ứng.</li>
                        <li><strong>Tịnh tiến tọa độ UV (Offset UV) tạo hiệu ứng chuyển động:</strong>
                            Để làm đường dẫn neon chạy liên tục, ta cấu hình texture lặp (RepeatWrapping) và thay đổi giá trị <code>offset</code> trong hàm cập nhật khung hình (update loop):
                            <pre style={{ background: '#1e1e1e', padding: '10px', borderRadius: '6px', color: '#fff', fontSize: '0.9rem', overflowX: 'auto' }}>
                                {`// Thiết lập chế độ lặp cho texture đường dẫn
routeTexture.wrapS = THREE.RepeatWrapping;
routeTexture.wrapT = THREE.RepeatWrapping;

// Cập nhật offset theo thời gian trong render loop
function tick(deltaTime) {
    routeTexture.offset.y -= deltaTime * speed; // Cuộn texture theo chiều dọc
}`}
                            </pre>
                        </li>
                        <li><strong>Xoay tọa độ UV (Rotation UV) tạo hiệu ứng quét radar:</strong>
                            Để tạo hiệu ứng xoay tròn phát sáng từ tâm tòa nhà hoặc hiệu ứng quét vòng:
                            <pre style={{ background: '#1e1e1e', padding: '10px', borderRadius: '6px', color: '#fff', fontSize: '0.9rem', overflowX: 'auto' }}>
                                {`// Cài đặt tâm xoay của UV ở chính giữa (0.5, 0.5)
radarTexture.center.set(0.5, 0.5);

// Xoay tọa độ UV liên tục trong render loop
function tick(deltaTime) {
    radarTexture.rotation += deltaTime * rotationSpeed;
}`}
                            </pre>
                        </li>
                    </ol>

                    <h3>Phần 4: Thiết lập Hậu xử lý Bloom (Post-processing Bloom)</h3>
                    <p>Để biến các luồng sáng neon, vật liệu tự phát sáng (emissive) của custom building trở nên lung linh, phát tỏa ánh hào quang huyền ảo, chúng ta cần cấu hình hiệu ứng Bloom thông qua bộ hậu xử lý Post-processing.</p>
                    <ol>
                        <li><strong>Khởi tạo EffectComposer & UnrealBloomPass:</strong> Thay vì kết xuất cảnh trực tiếp từ renderer mặc định, chúng ta truyền renderer và scene qua <code>EffectComposer</code> và cấu hình <code>UnrealBloomPass</code>:
                            <pre style={{ background: '#1e1e1e', padding: '10px', borderRadius: '6px', color: '#fff', fontSize: '0.9rem', overflowX: 'auto' }}>
                                {`import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

// 1. Tạo composer
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

// 2. Cấu hình UnrealBloomPass (Độ phân giải, Cường độ sáng, Bán kính phát sáng, Ngưỡng phát sáng)
const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5,   // strength (Cường độ)
    0.4,   // radius (Bán kính)
    0.85   // threshold (Ngưỡng phát sáng - các vùng có độ sáng > 0.85 mới phát sáng bloom)
);
composer.addPass(bloomPass);`}
                            </pre>
                        </li>
                        <li><strong>Cập nhật Render Loop:</strong> Trong vòng lặp render, thay thế câu lệnh render cũ bằng lệnh render của composer:
                            <pre style={{ background: '#1e1e1e', padding: '10px', borderRadius: '6px', color: '#fff', fontSize: '0.9rem', overflowX: 'auto' }}>
                                {`// Thay vì: renderer.render(scene, camera);
// Sử dụng composer để render kèm hiệu ứng bloom:
function animate() {
    requestAnimationFrame(animate);
    
    // Cập nhật hiệu ứng UV vfx...
    
    composer.render();
}`}
                            </pre>
                        </li>
                    </ol>
                </>
            ) : (
                <>
                    <p>In this guide, we will explore how to extract a high-fidelity 3D photogrammetry model from <strong>Google Earth / Google Maps</strong>, import and integrate a custom-designed building model in <strong>Blender</strong>, implement custom UV shifting and rotation to create stunning VFX animations, and apply <strong>Bloom Post-processing</strong> in <strong>Three.js</strong> to render a glowing, futuristic digital-twin city.</p>

                    <h3>Step 1: Extracting 3D Models from Google Earth & Maps using RenderDoc</h3>
                    <p>To capture 3D photogrammetry assets from Google Earth/Maps, we capture the graphics API calls and GPU memory buffers from a hooked web browser process.</p>

                    <div style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', borderLeft: '4px solid #ef4444', padding: '15px', borderRadius: '4px', margin: '15px 0' }}>
                        <strong><span role="img" aria-label="warning">⚠️</span> Crucial Version Note (Chrome & RenderDoc):</strong>
                        <p style={{ margin: '5px 0 0 0', fontSize: '0.9rem', lineHeight: '1.5' }}>
                            Recent versions of Chrome have strengthened GPU security sandboxes, blocking standard RenderDoc CPU/GPU process injection. To bypass this:
                            <br />• <strong>Google Chrome:</strong> Legacy versions (v108 - v114 work best) are highly recommended. If using a newer version, you must disable the GPU sandbox and Direct Composition using specific command-line flags.
                            <br />• <strong>RenderDoc:</strong> Use version <code>1.25</code> to <code>1.31</code> (v1.25/v1.26 are highly stable with Blender's importer plugin).
                        </p>
                    </div>

                    <ul>
                        <li><strong>Tools Checklist:</strong>
                            <ul>
                                <li><strong>RenderDoc:</strong> Version <code>1.25</code> - <code>1.31</code>.</li>
                                <li><strong>Blender Add-on:</strong> <code>MapsModelsImporter</code> (e.g., v0.7.0 for Blender 4.1+).</li>
                                <li><strong>Google Chrome:</strong> Launched with bypass command flags.</li>
                            </ul>
                        </li>
                        <li><strong>Capture Workflow:</strong>
                            <ol>
                                <li>Ensure all background Google Chrome processes are completely closed.</li>
                                <li>Open Command Prompt and launch Chrome with sandbox and composition disabled:
                                    <pre style={{ background: '#1e1e1e', padding: '10px', borderRadius: '6px', color: '#fff', fontSize: '0.9rem', overflowX: 'auto', marginTop: '5px' }}>
                                        C:\Windows\System32\cmd.exe /c "SET RENDERDOC_HOOK_EGL=0 && START "" ^"C:\Program Files\Google\Chrome\Application\chrome.exe^" --disable-gpu-sandbox --gpu-startup-dialog --disable-direct-composition=1"
                                    </pre>
                                </li>
                                <li>Chrome will boot and show a tiny dialog box mentioning the GPU process <strong>PID</strong>. Keep this box active and do not close it yet.</li>
                                <li>Open <strong>RenderDoc</strong>, select <code>File &rarr; Attach to Running Instance</code>, type <code>localhost</code>, and find the Chrome process corresponding to the displayed PID. Double-click it to establish a connection.</li>
                                <li>Go back to Chrome, click OK on the PID dialog. Navigate to Google Earth or Google Maps, switch to Satellite View, and enable 3D Globe mode.</li>
                                <li>Pan to your target region. Hold down the <code>Ctrl</code> key and rotate/tilt the view continuously to force the browser to stream full-resolution meshes and textures.</li>
                                <li>While the view is moving smoothly, press <code>F12</code> on your keyboard (or click <strong>Capture Frame(s) Immediately</strong> in RenderDoc).</li>
                                <li>Double-click the captured frame thumbnail in RenderDoc and save it as an <code>.rdc</code> capture file.</li>
                            </ol>
                        </li>
                    </ul>

                    <h3>Step 2: Importing into Blender & Placing Custom Buildings</h3>
                    <p>Once you have the <code>.rdc</code> data, we will consolidate and optimize the capture, then integrate our custom 3D structures.</p>
                    <ol>
                        <li><strong>Importing the capture:</strong> Open Blender, go to Preferences to install and enable the <code>MapsModelsImporter</code> add-on. Then, choose <code>File &rarr; Import &rarr; Google Maps Capture (.rdc)</code> and select your saved file.</li>
                        <li><strong>Optimizing the Map Mesh:</strong> The capture will load as hundreds of tiny grid fragments. Select them all and press <code>Ctrl + J</code> to join them into a single mesh. Set the origin of the model to <code>(0,0,0)</code>. Apply a <strong>Decimate</strong> modifier (ratio set to <code>0.2 - 0.3</code>) to drastically reduce the polycount for WebGL efficiency.</li>
                        <li><strong>Adding Custom Buildings:</strong> Import your custom-designed building models (formatted as <code>.glb</code>, <code>.fbx</code>, or <code>.obj</code>) into the Blender workspace.</li>
                        <li><strong>Alignment & Fitting:</strong> Scale (<code>S</code>), rotate (<code>R</code>), and translate (<code>G</code>) your custom model to fit seamlessly onto the corresponding location of the Google Earth terrain.</li>
                        <li><strong>Clearing Collision Geometry:</strong> Enter Edit Mode on the main city mesh, select the faces of the old Google Earth building underneath your new structure, and delete them to prevent z-fighting (graphical overlaps).</li>
                        <li><strong>Exporting:</strong> Select all objects and export them as a compressed <code>.glb</code> file with <strong>Draco compression</strong> enabled.</li>
                    </ol>

                    <h3>Step 3: Custom UVs for VFX Animations (Rotation & Offset Shifting)</h3>
                    <p>To implement neon moving paths or radar scanner effects on our custom buildings, we manipulate the texture coordinates (UVs) inside the Three.js update loop.</p>
                    <div className="blog-post-image-container">
                        <img src="/assets/blog/demoMap/SimpleVFXUV.png" alt="Custom UV mapping in Blender for VFX effects" />
                        <span className="image-caption">Custom UV mapping in Blender for texture coordinate scrolling and rotation</span>
                    </div>
                    <ol>
                        <li><strong>UV Unwrapping:</strong> In Blender, unwrap the path (routing mesh) straight along the U or V axis. For scanner effects on buildings, unwrap the targets evenly.</li>
                        <li><strong>Shifting Texture Coordinates (UV Offset):</strong>
                            To create scrolling neon pathways, set the texture wrapping to repeat and change the <code>offset</code> properties over time:
                            <pre style={{ background: '#1e1e1e', padding: '10px', borderRadius: '6px', color: '#fff', fontSize: '0.9rem', overflowX: 'auto' }}>
                                {`// Set repeat wrapping on the pathway texture
routeTexture.wrapS = THREE.RepeatWrapping;
routeTexture.wrapT = THREE.RepeatWrapping;

// Update the offset over time in the render/tick loop
function tick(deltaTime) {
    routeTexture.offset.y -= deltaTime * speed; // Scroll texture vertically
}`}
                            </pre>
                        </li>
                        <li><strong>Rotating Texture Coordinates (UV Rotation):</strong>
                            To create circular radar scans or rotating effects around the center of the building:
                            <pre style={{ background: '#1e1e1e', padding: '10px', borderRadius: '6px', color: '#fff', fontSize: '0.9rem', overflowX: 'auto' }}>
                                {`// Anchor the rotation pivot at the center of the UV space (0.5, 0.5)
radarTexture.center.set(0.5, 0.5);

// Increment rotation in the render loop
function tick(deltaTime) {
    radarTexture.rotation += deltaTime * rotationSpeed;
}`}
                            </pre>
                        </li>
                    </ol>

                    <h3>Step 4: Setting up Post-processing Bloom</h3>
                    <p>To make the neon lines and emissive materials on the custom building glow and bloom with a beautiful dreamlike glow, we configure a post-processing pipeline.</p>
                    <ol>
                        <li><strong>Instantiating EffectComposer & UnrealBloomPass:</strong> Rather than rendering the scene directly via the WebGLRenderer, we pass the renderer and scene through an <code>EffectComposer</code>:
                            <pre style={{ background: '#1e1e1e', padding: '10px', borderRadius: '6px', color: '#fff', fontSize: '0.9rem', overflowX: 'auto' }}>
                                {`import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';

// 1. Create EffectComposer
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

// 2. Configure UnrealBloomPass (Resolution, Strength, Radius, Threshold)
const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    1.5,   // strength
    0.4,   // radius
    0.85   // threshold (only areas with brightness > 0.85 will bloom)
);
composer.addPass(bloomPass);`}
                            </pre>
                        </li>
                        <li><strong>Updating the Animation Loop:</strong> Replace your standard render calls with the composer render call:
                            <pre style={{ background: '#1e1e1e', padding: '10px', borderRadius: '6px', color: '#fff', fontSize: '0.9rem', overflowX: 'auto' }}>
                                {`// Instead of: renderer.render(scene, camera);
// Use composer to render with bloom postprocessing:
function animate() {
    requestAnimationFrame(animate);
    
    // Update UV offset/rotation animations here...
    
    composer.render();
}`}
                            </pre>
                        </li>
                    </ol>
                </>
            )}
        </>
    );
}
