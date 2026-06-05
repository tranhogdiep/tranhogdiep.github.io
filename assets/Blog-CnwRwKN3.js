import{D as e,F as t,I as n,L as r,N as i,P as a,a as o,d as s,g as c,h as l,i as u,j as d,l as f,m as p,n as m,o as h,p as g,r as _,s as v,t as y,u as b,x}from"./index-Dfrh1tep.js";import{t as S}from"./OrbitControls-DXKef88H.js";var C=r(n(),1),w=m();function T(){let{t}=y(),n=(0,C.useRef)(null),r=(0,C.useRef)(null),[a,m]=(0,C.useState)(`/assets/blog/optimize3D/CSCDVN_Optimized_webp.glb`),[T,E]=(0,C.useState)(!0),[D,O]=(0,C.useState)(0),[k,A]=(0,C.useState)(null),[j,M]=(0,C.useState)({vertices:0,triangles:0}),[N,P]=(0,C.useState)(!0),F=(0,C.useRef)(null),I=e=>{e.dispose();for(let t of Object.keys(e)){let n=e[t];n&&typeof n.dispose==`function`&&n instanceof d&&n.dispose()}};(0,C.useEffect)(()=>{if(!r.current||!n.current)return;let d=n.current,m=d.clientWidth,y=d.clientHeight||450,C=new e;C.background=new s(1579036);let w=new x(45,m/y,.1,100);w.position.set(3,2,4);let T=new h({canvas:r.current,antialias:!0,alpha:!1,powerPreference:`high-performance`});T.setSize(m,y),T.setPixelRatio(Math.min(window.devicePixelRatio,2)),T.shadowMap.enabled=!0,T.shadowMap.type=2,T.toneMapping=4,T.toneMappingExposure=1;let D=null;new _().load(`/assets/hdris/spruit_sunrise_1k.hdr`,e=>{e.mapping=303,e.minFilter=c,e.magFilter=c,e.needsUpdate=!0,C.environment=e,D=e},void 0,e=>{console.error(`Error loading environment HDRI map:`,e)});let k=new v(16777215,.2);C.add(k);let j=new l(16777215,2894901,.4);j.position.set(0,20,0),C.add(j);let P=new g(16777215,.6);P.position.set(5,10,7),P.castShadow=!0,P.shadow.mapSize.width=1024,P.shadow.mapSize.height=1024,P.shadow.camera.near=.5,P.shadow.camera.far=25,P.shadow.bias=-5e-4,C.add(P);let L=new g(11193599,.2);L.position.set(-5,5,-5),C.add(L);let R=new S(w,T.domElement);R.enableDamping=!0,R.dampingFactor=.05,R.minDistance=.5,R.maxDistance=15,R.autoRotate=N,R.autoRotateSpeed=.8,F.current=R;let z=new p(10,20,4473932,2236968);z.position.y=-.8,C.add(z);let B=new u;B.setDecoderPath(`/assets/libs/gltf/`);let V=new o;V.setDRACOLoader(B);let H=null;E(!0),O(0),A(null),V.load(a,e=>{H=e.scene,C.add(H);let t=new f().setFromObject(H),n=t.getCenter(new i),r=t.getSize(new i);H.position.x=-n.x,H.position.y=-n.y+.1,H.position.z=-n.z,z.position.y=-r.y/2;let a=Math.max(r.x,r.y,r.z),o=0,s=0;H.traverse(e=>{if(e.isMesh){e.castShadow=!0,e.receiveShadow=!0;let t=e.geometry;if(t){let e=t.getAttribute(`position`);e&&(o+=e.count),t.index?s+=t.index.count/3:e&&(s+=e.count/3)}}}),M({vertices:o,triangles:Math.round(s)});let c=w.fov*(Math.PI/180),l=Math.abs(a/2/Math.tan(c/2));l*=1.35,w.position.set(l*.9,l*.4,l*1.1),R.target.set(0,0,0),R.update(),E(!1)},e=>{e.total>0?O(e.loaded/e.total*100):O(e=>Math.min(e+5,95))},e=>{console.error(`Error loading model`,e),A(t(`modelViewer.error`)),E(!1)});let U;new b;let W=()=>{U=requestAnimationFrame(W),R&&R.update(),T.render(C,w)};W();let G=()=>{if(!n.current)return;let e=n.current.clientWidth,t=n.current.clientHeight||450;w.aspect=e/t,w.updateProjectionMatrix(),T.setSize(e,t)};return window.addEventListener(`resize`,G),()=>{window.removeEventListener(`resize`,G),cancelAnimationFrame(U),H&&(C.remove(H),H.traverse(e=>{e.isMesh&&(e.geometry&&e.geometry.dispose(),e.material&&(Array.isArray(e.material)?e.material.forEach(I):I(e.material)))})),C.remove(z),z.geometry.dispose(),z.material.dispose(),D&&D.dispose(),T.dispose(),B.dispose(),R.dispose()}},[a]),(0,C.useEffect)(()=>{F.current&&(F.current.autoRotate=N)},[N]);let L=a.includes(`Optimized`);return(0,w.jsxs)(`div`,{className:`viewer-3d-wrapper`,ref:n,children:[(0,w.jsx)(`canvas`,{ref:r,className:`viewer-3d-canvas`}),(0,w.jsxs)(`div`,{className:`viewer-3d-overlay stats-panel`,children:[(0,w.jsx)(`div`,{className:`stats-header`,children:t(`modelViewer.details`)}),(0,w.jsxs)(`div`,{className:`stats-row`,children:[(0,w.jsxs)(`span`,{className:`stats-label`,children:[t(`modelViewer.vertices`),`:`]}),(0,w.jsx)(`span`,{className:`stats-value`,children:T?t(`modelViewer.counting`):j.vertices.toLocaleString()})]}),(0,w.jsxs)(`div`,{className:`stats-row`,children:[(0,w.jsxs)(`span`,{className:`stats-label`,children:[t(`modelViewer.triangles`),`:`]}),(0,w.jsx)(`span`,{className:`stats-value`,children:T?t(`modelViewer.counting`):j.triangles.toLocaleString()})]}),(0,w.jsxs)(`div`,{className:`stats-row`,children:[(0,w.jsxs)(`span`,{className:`stats-label`,children:[t(`modelViewer.fileSize`),`:`]}),(0,w.jsx)(`span`,{className:`stats-value size-badge`,children:L?`4.82 MB (Optimized)`:`46.62 MB (Blender)`})]})]}),(0,w.jsxs)(`div`,{className:`viewer-3d-overlay controls-panel`,children:[(0,w.jsxs)(`button`,{className:`control-btn ${N?`active`:``}`,onClick:()=>P(!N),title:`Toggle Auto Rotate`,children:[(0,w.jsx)(`svg`,{viewBox:`0 0 24 24`,width:`16`,height:`16`,fill:`currentColor`,children:(0,w.jsx)(`path`,{d:`M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z`})}),(0,w.jsx)(`span`,{children:t(`modelViewer.autoRotate`)})]}),(0,w.jsxs)(`div`,{className:`interaction-tips`,children:[(0,w.jsx)(`svg`,{viewBox:`0 0 24 24`,width:`14`,height:`14`,fill:`currentColor`,children:(0,w.jsx)(`path`,{d:`M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z`})}),t(`modelViewer.tips`)]})]}),(0,w.jsxs)(`div`,{className:`viewer-3d-overlay model-selector`,children:[(0,w.jsx)(`button`,{className:`selector-tab ${L?``:`active`}`,onClick:()=>m(`/assets/blog/optimize3D/CSCDVN_Draco.glb`),disabled:T&&!L,children:`Blender Draco (46.62 MB)`}),(0,w.jsx)(`button`,{className:`selector-tab ${L?`active`:``}`,onClick:()=>m(`/assets/blog/optimize3D/CSCDVN_Optimized_webp.glb`),disabled:T&&L,children:`Fully Optimized (4.82 MB)`})]}),T&&(0,w.jsxs)(`div`,{className:`viewer-loading-screen`,children:[(0,w.jsx)(`div`,{className:`viewer-loader`}),(0,w.jsxs)(`div`,{className:`viewer-loading-text`,children:[t(`modelViewer.loading`),`: `,Math.round(D),`%`]})]}),k&&(0,w.jsxs)(`div`,{className:`viewer-error-screen`,children:[(0,w.jsx)(`div`,{className:`error-icon`,children:`⚠️`}),(0,w.jsx)(`div`,{className:`error-msg`,children:k})]})]})}var E=[{id:5,slug:`threejs-car-showroom-galaxy`,show3DModel:!1,en:{title:`[Demo] 3D Showroom for Web`,date:`June 03, 2026`,category:`Three.js / Web3D`,excerpt:`An architectural study on designing a real-time 3D car showroom set in a cosmic galaxy, detailing bake lights, physics-based rendering (PBR), and Three.js post-processing.`,content:`
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
        `},vi:{title:`[Demo] 3D Showroom for Web`,date:`3 tháng 6, 2026`,category:`Three.js / Web3D`,excerpt:`Nghiên cứu kiến trúc thiết kế showroom ô tô 3D thời gian thực đặt trong không gian vũ trụ, chi tiết về nướng ánh sáng (bake light), vật liệu vật lý (PBR) và hậu xử lý (post-processing) trong Three.js.`,content:`
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
        `}},{id:4,slug:`virtual-production-with-aximmetry-ue4-blender`,show3DModel:!1,en:{title:`Virtual Production Pipeline: Technical Integration of Aximmetry, UE4 & Blender`,date:`June 02, 2026`,category:`Virtual Production`,excerpt:`Technical documentation of the real-time virtual production workflow: modeling stages in Blender, setting up integration blueprints in Unreal Engine 4, and configuring live chroma keying and camera tracking in Aximmetry.`,content:`
            <p>This technical note outlines the configuration and deployment pipeline for real-time virtual production and live broadcasting. The pipeline integrates <strong>Blender</strong> for 3D stage modeling, <strong>Unreal Engine 4 (UE4)</strong> as the real-time render engine, and <strong>Aximmetry</strong> for video compositing, chroma keying, and multi-input broadcasting.</p>
            
            <div class="blog-post-video-container">
                <iframe src="https://www.youtube.com/embed/z7jjlB_QI1g" title="Virtual Production Demo 1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
            <span class="image-caption" style="display: block; text-align: center; margin-top: -25px; margin-bottom: 25px;">Integration Demo: Real-Time Compositing and Render Stream</span>

            <h3>1. Asset Optimization and Prep in Blender</h3>
            <p>To maintain stable viewport performance and render rates inside the game engine, the 3D assets must be optimized during the DCC (Digital Content Creation) stage in Blender:</p>
            <ul>
                <li><strong>Scale Calibration:</strong> Units are set to metric with unit scale at 1.0. All meshes must be scaled to real-world dimensions (1 unit = 1 meter for Blender, converting to 1 unit = 1 centimeter upon FBX export to UE4) to guarantee that camera lens calculations match physical space.</li>
                <li><strong>Geometry & Material Allocation:</strong> Meshes are optimized to low/mid-poly limits. Distinct Material IDs are allocated to facilitate easy material assignments and shader layering in Unreal Engine. All transformation matrices (Location, Rotation, Scale) are applied (Ctrl+A) to avoid axis offsets.</li>
                <li><strong>Export Pipeline:</strong> Exported as binary FBX files using the naming convention prefix <code>SM_</code> (Static Mesh) and <code>M_</code> (Material). Mesh smoothing options are configured to "Face" to preserve vertex normals.</li>
            </ul>

            <h3>2. Real-Time Render Setup in Unreal Engine 4 (Aximmetry DE)</h3>
            <p>Unreal Engine 4 serves as the real-time renderer. We utilize the specialized Aximmetry DE (Dual Engine) build of Unreal Engine, which contains the API plugins required to interface with Aximmetry's compositing engine.</p>
            <ul>
                <li><strong>Aximmetry Camera Blueprints:</strong> Replace default cinematic cameras with Aximmetry virtual camera blueprints (e.g., <code>Aximmetry_VirtualCam_3Cam</code>). These blueprints read external control inputs, allowing Aximmetry to override the scene camera transform, focal length, and aperture settings.</li>
                <li><strong>Lighting & Lightmaps:</strong> To achieve optimal render performance, static lighting is baked using Lightmass. Lightmap resolution is optimized per mesh to balance shadow quality and texture memory usage. Ray-traced reflections (RTR) or Planar Reflections are configured specifically on reflective floor surfaces to mimic realistic stage spill.</li>
                <li><strong>Project Settings:</strong> Render settings are locked to match the broadcast format (e.g., 1080p at 59.94Hz or 2160p at 29.97Hz). Motion blur and temporal anti-aliasing (TAA) are fine-tuned to prevent ghosting artifacts on keyed human actors.</li>
            </ul>

            <div class="blog-post-video-container">
                <iframe src="https://www.youtube.com/embed/c6xwDc1d3WI" title="Virtual Production Demo 2" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
            <span class="image-caption" style="display: block; text-align: center; margin-top: -25px; margin-bottom: 25px;">Chroma Keying and Studio Lighting Integration Test</span>

            <h3>3. Compositing, Keying, and Signal Routing in Aximmetry</h3>
            <p>Aximmetry processes signal routing, chroma keying, and camera tracking, stitching the real-time video feed and the Unreal Engine render stream together.</p>
            <ul>
                <li><strong>Signal Input & Video Capture:</strong> SDI or HDMI feeds from physical cameras are routed into Aximmetry via capture cards (e.g., Blackmagic DeckLink). Video parameters (resolution, frame rate, color space) must match the project's output profile exactly.</li>
                <li><strong>Chroma Keying Configuration:</strong> We implement Aximmetry’s Advanced Keyer. Key parameters (Clean Plate, Spill reduction, and Matte Clean) are calibrated to isolate the talent from the green screen, preserving hair details and minimizing edge fringing.</li>
                <li><strong>Camera Tracking Integration:</strong> Tracking nodes are mapped to translate physical pan, tilt, zoom, and translation values (from PTZ protocols or Vive tracker inputs) to the virtual camera in Unreal Engine, ensuring zero-latency movement synchronization.</li>
                <li><strong>Composite Blending & Output:</strong> Real-world talent and digital assets are blended using custom color correction nodes to align black levels, ambient light color temperature, and shadow intensity. The final broadcast stream is output via SDI/NDI or streamed directly using RTMP to OBS/Streaming servers.</li>
            </ul>

            <h3>Conclusion</h3>
            <p>Mastering this pipeline requires strict adherence to scale calibration in Blender, precise blueprint configuration in Aximmetry DE, and high-performance rendering in UE4. This integration provides a robust, low-latency solution for high-fidelity virtual studio productions.</p>
        `},vi:{title:`Virtual Production: Đồng bộ Kỹ thuật giữa Aximmetry, UE4 & Blender`,date:`2 tháng 6, 2026`,category:`Virtual Production`,excerpt:`Tài liệu kỹ thuật về quy trình Virtual Production thời gian thực: dựng mô hình sân khấu trong Blender, thiết lập blueprint tích hợp trong Unreal Engine 4, và cấu hình tách phông xanh (chroma keying) cùng camera tracking trong Aximmetry.`,content:`
            <p>Tài liệu kỹ thuật này trình bày chi tiết quy trình (pipeline) thiết lập và vận hành hệ thống Virtual Production (trường quay ảo) thời gian thực. Quy trình sử dụng <strong>Blender</strong> để tối ưu hóa tài nguyên 3D, <strong>Unreal Engine 4 (UE4)</strong> làm công cụ render thời gian thực và <strong>Aximmetry</strong> để xử lý luồng tín hiệu hình ảnh, tách phông xanh (chroma keying) và phát sóng trực tiếp (broadcasting).</p>
            
            <div class="blog-post-video-container">
                <iframe src="https://www.youtube.com/embed/z7jjlB_QI1g" title="Virtual Production Demo 1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
            <span class="image-caption" style="display: block; text-align: center; margin-top: -25px; margin-bottom: 25px;">Video Thử Nghiệm 1: Đồng bộ kết xuất thời gian thực giữa camera vật lý và môi trường ảo</span>

            <h3>1. Tối ưu hóa và Chuẩn bị Tài nguyên trong Blender</h3>
            <p>Để đảm bảo hiệu năng khung hình (FPS) ổn định bên trong game engine, toàn bộ tài nguyên 3D cần được xử lý tối ưu ngay từ giai đoạn thiết kế mô hình trong Blender:</p>
            <ul>
                <li><strong>Cân chỉnh Tỉ lệ (Scale Calibration):</strong> Hệ đơn vị được thiết lập là Metric với Unit Scale bằng 1.0. Tất cả mesh phải được dựng theo đúng kích thước thực tế (1 đơn vị trong Blender = 1 mét, khi xuất FBX sang UE4 sẽ tự động chuyển thành 1 đơn vị = 1 centimet) nhằm đảm bảo thông số ống kính camera ảo khớp với camera vật lý.</li>
                <li><strong>Quản lý Lưới & Vật liệu:</strong> Tối ưu hóa mật độ đa giác (polycount) ở mức trung bình/thấp (low/mid-poly). Gán các Material ID riêng biệt để tạo điều kiện thuận lợi cho việc thiết lập vật liệu và shader trong Unreal Engine. Toàn bộ ma trận biến đổi (Location, Rotation, Scale) phải được áp dụng (Apply - Ctrl+A) để tránh lệch trục tọa độ.</li>
                <li><strong>Quy trình xuất tệp (Export):</strong> Xuất dưới dạng tệp FBX nhị phân (binary) tuân theo quy tắc đặt tên tiền tố hệ thống (ví dụ: <code>SM_Stage_Floor</code> cho mesh tĩnh và <code>M_Stage_Floor</code> cho vật liệu). Thiết lập Smoothing trong bộ xuất FBX thành "Face" để bảo toàn vertex normals (pháp tuyến đỉnh).</li>
            </ul>

            <h3>2. Thiết lập Render Thời gian thực trong Unreal Engine 4 (Aximmetry DE)</h3>
            <p>Unreal Engine 4 đóng vai trò là engine kết xuất hình ảnh. Dự án sử dụng phiên bản Unreal Engine tích hợp sẵn của Aximmetry (Aximmetry DE), đi kèm các API chuyên dụng để liên kết trực tiếp với phần mềm điều phối ngoài.</p>
            <ul>
                <li><strong>Aximmetry Camera Blueprints:</strong> Thay thế camera mặc định của UE4 bằng các blueprint camera ảo của Aximmetry (ví dụ: <code>Aximmetry_VirtualCam_3Cam</code>). Các blueprint này sẽ nhận lệnh điều khiển từ Aximmetry để ghi đè các thông số transform (tọa độ), focal length (tiêu cự) và khẩu độ của camera trong scene.</li>
                <li><strong>Tính toán Ánh sáng (Lighting & Lightmaps):</strong> Để tối ưu hóa hiệu năng render, ánh sáng tĩnh được tính toán và lưu trữ (bake) vào lightmap sử dụng hệ thống Lightmass. Thiết lập độ phân giải lightmap hợp lý cho từng mesh để cân bằng giữa chất lượng đổ bóng và dung lượng VRAM. Các hiệu ứng phản chiếu Screen-space (SSR) hoặc Planar Reflections chỉ được cấu hình ở các vùng sàn phản chiếu chính nhằm tối ưu hóa GPU.</li>
                <li><strong>Cấu hình dự án (Project Settings):</strong> Khóa tần số quét hiển thị trùng khớp với định dạng phát sóng truyền hình (ví dụ: 1080p ở 59.94Hz hoặc 2160p ở 29.97Hz). Tinh chỉnh Motion Blur và Temporal Anti-Aliasing (TAA) để loại bỏ hiện tượng bóng mờ (ghosting) trên viền của MC/diễn viên khi di chuyển nhanh.</li>
            </ul>

            <h3>3. Tách Phông, Đồng bộ Camera và Định tuyến Tín hiệu trong Aximmetry</h3>
            <p>Aximmetry là trung tâm xử lý trung gian, thực hiện nhiệm vụ định tuyến tín hiệu camera vật lý, tách phông xanh và đồng bộ hóa tọa độ camera thật - ảo.</p>
            <ul>
                <li><strong>Định tuyến Tín hiệu đầu vào (Input Routing):</strong> Luồng video từ camera vật lý (SDI/HDMI) được kết nối trực tiếp vào Aximmetry thông qua card thu phát (capture card như Blackmagic DeckLink). Định dạng video đầu vào (độ phân giải, khung hình, hệ màu) phải đồng bộ tuyệt đối với profile đầu ra của dự án.</li>
                <li><strong>Cấu hình Bộ tách phông (Chroma Keying):</strong> Sử dụng bộ tách phông nâng cao (Advanced Keyer) của Aximmetry. Tiến hành tinh chỉnh các thông số Clean Plate, khử ám màu xanh (Spill reduction) và Matte Clean để tách biệt MC khỏi phông nền xanh lá, bảo toàn các chi tiết mảnh như tóc và loại bỏ viền xanh phản chiếu lên trang phục.</li>
                <li><strong>Đồng bộ Camera Tracking:</strong> Liên kết các node dữ liệu tracking (nhận tín hiệu từ giao thức PTZ hoặc thiết bị Vive Tracker) vào camera ảo của Unreal Engine thông qua Aximmetry, giảm thiểu độ trễ cơ học khi camera di chuyển xoay/quét.</li>
                <li><strong>Hòa trộn và Xuất bản luồng (Signal Output):</strong> Đồng bộ hóa sắc độ giữa MC thực tế và môi trường 3D bằng các node Color Correction (điều chỉnh mức độ đen, nhiệt độ màu môi trường và cường độ bóng đổ). Kết quả cuối cùng được xuất ra qua SDI/NDI phục vụ phát sóng truyền hình hoặc stream trực tiếp qua giao thức RTMP tới các máy chủ phát sóng hoặc OBS.</li>
            </ul>

            <h3>Kết luận</h3>
            <p>Quy trình vận hành hệ thống Virtual Production đòi hỏi sự chuẩn xác cao về mặt thông số: từ kiểm soát tỉ lệ kích thước trong Blender, gán blueprint camera liên kết trong Aximmetry DE cho đến tối ưu hóa ánh sáng render trong UE4. Việc đồng bộ hóa chặt chẽ các thành phần này là điều kiện bắt buộc để đạt được sản phẩm truyền hình trực tiếp chất lượng cao với độ trễ tối thiểu.</p>
        `}},{id:1,slug:`creating-3d-webgl-portfolio-with-threejs`,show3DModel:!1,en:{title:`Creating a 3D WebGL Portfolio with Three.js`,date:`May 15, 2026`,category:`Graphics`,excerpt:`Learn the secrets behind building interactive 3D experiences on the web using Three.js, custom shaders, and GSAP animations.`,content:`
            <p>Creating a 3D web experience requires a fine balance between art and technology. In this article, we dive deep into how to structure a WebGL portfolio that is both visually stunning and highly performant.</p>
            <h3>1. The Tech Stack</h3>
            <p>For modern 3D web development, a combination of Vite, React, and Three.js is extremely powerful. React helps us manage the state of overlay UI, while Three.js handles rendering WebGL context.</p>
            <h3>2. Asset Optimization</h3>
            <p>One of the biggest bottlenecks in WebGL is loading time. Always make sure to use Draco compression for your glTF/glb models. In this project, menu models are compressed down to a fraction of their original size, reducing load times dramatically.</p>
            <h3>3. Lighting and HDR</h3>
            <p>Using a high-quality HDR (High Dynamic Range) environment map brings out realistic metallic reflections and ambient lighting. We load HDR textures via RGBELoader to map environment lights in real-time.</p>
        `},vi:{title:`Tạo Portfolio 3D WebGL với Three.js`,date:`15 tháng 5, 2026`,category:`Đồ họa`,excerpt:`Tìm hiểu bí quyết xây dựng trải nghiệm 3D tương tác trên web bằng Three.js, custom shader và hoạt ảnh GSAP.`,content:`
            <p>Tạo một trải nghiệm 3D trên web đòi hỏi sự cân bằng tinh tế giữa nghệ thuật và công nghệ. Trong bài viết này, chúng ta sẽ đi sâu vào cách cấu trúc một portfolio WebGL vừa đẹp mắt vừa có hiệu năng cao.</p>
            <h3>1. Công nghệ sử dụng</h3>
            <p>Đối với phát triển web 3D hiện đại, sự kết hợp giữa Vite, React và Three.js là vô cùng mạnh mẽ. React giúp quản lý trạng thái của giao diện overlay, trong khi Three.js xử lý việc render WebGL.</p>
            <h3>2. Tối ưu hóa Tài nguyên</h3>
            <p>Một trong những nút thắt cổ chai lớn nhất trong WebGL là thời gian tải. Luôn đảm bảo sử dụng nén Draco cho các model glTF/glb của bạn. Trong dự án này, các model menu được nén xuống chỉ còn một phần nhỏ so với kích thước ban đầu, giúp giảm đáng kể thời gian tải.</p>
            <h3>3. Ánh sáng và HDR</h3>
            <p>Sử dụng bản đồ môi trường HDR (High Dynamic Range) chất lượng cao mang lại phản chiếu kim loại chân thực và ánh sáng xung quanh sống động. Chúng tôi tải các texture HDR thông qua RGBELoader để ánh xạ ánh sáng môi trường trong thời gian thực.</p>
        `}},{id:2,slug:`unlocking-ar-on-web-browsers`,show3DModel:!1,en:{title:`Unlocking AR on Web Browsers`,date:`April 28, 2026`,category:`Augmented Reality`,excerpt:`An introduction to building augmented reality experiences directly in browsers without requiring external applications.`,content:`
            <p>Augmented Reality (AR) on the web has matured significantly over the last few years. Today, users can experience AR content immediately with a single tap on their smartphone screen.</p>
            <h3>The Power of WebXR</h3>
            <p>WebXR is the open standard that makes AR and VR possible in browsers. In this portfolio, we showcase models like the Chicken AR and Dragon AR. By using WebXR features or web-based AR frameworks, we can place 3D virtual models right onto real-world surfaces seen through the camera.</p>
            <h3>Designing for Mobile</h3>
            <p>When developing mobile AR, keep in mind that mobile GPUs are constrained. Limit polygon counts, utilize baked lighting where possible, and ensure the UI overlays are clean and non-obtrusive.</p>
        `},vi:{title:`Khai phá AR trên Trình duyệt Web`,date:`28 tháng 4, 2026`,category:`Thực tế tăng cường`,excerpt:`Giới thiệu về việc xây dựng trải nghiệm thực tế tăng cường trực tiếp trên trình duyệt mà không cần ứng dụng ngoài.`,content:`
            <p>Thực tế tăng cường (AR) trên web đã trưởng thành đáng kể trong vài năm qua. Ngày nay, người dùng có thể trải nghiệm nội dung AR ngay lập tức chỉ với một lần chạm trên màn hình điện thoại thông minh của họ.</p>
            <h3>Sức mạnh của WebXR</h3>
            <p>WebXR là tiêu chuẩn mở giúp AR và VR khả thi trên trình duyệt. Trong portfolio này, chúng tôi giới thiệu các model như Chicken AR và Dragon AR. Bằng cách sử dụng các tính năng WebXR hoặc các framework AR dựa trên web, chúng ta có thể đặt các mô hình 3D ảo trực tiếp lên các bề mặt thế giới thực qua camera.</p>
            <h3>Thiết kế cho Thiết bị di động</h3>
            <p>Khi phát triển AR cho di động, hãy nhớ rằng GPU di động bị giới hạn. Hãy hạn chế số lượng đa giác (polycount), tận dụng ánh sáng baked khi có thể, và đảm bảo các lớp giao diện UI rõ ràng và không cản trở tầm nhìn.</p>
        `}},{id:3,slug:`optimizing-3d-assets-for-web`,show3DModel:!0,en:{title:`Optimizing 3D Assets for Web`,date:`March 10, 2024`,category:`Game Dev`,excerpt:`A comprehensive guide to preparing 3D assets, texture mapping, and polycounts for real-time web rendering.`,content:`
            <p>When bringing 3D experiences to web browsers, performance and loading time are critical factors that determine user retention. A 3D file that is too heavy can freeze the browser or cause users to leave before they can even see the artwork.</p>
            <p>In this article, we'll dive deep into the optimization process of a real-world 3D model - the shield and tactical gear of <strong>CSCDVN</strong>. The original model was massive, weighing in at <strong>500 MB</strong>. Through the advanced optimization techniques below, we reduced this size to just <strong>4.82 MB</strong> (a 99.0% reduction) while maintaining crisp visual quality!</p>
            
            <h3>1. Use GLB Format instead of glTF</h3>
            <p>glTF (GL Transmission Format) is known as the "JPEG of 3D". However, original glTF files often come with multiple separate files (a JSON description file, a .bin file containing vertex/index data, and separate texture files like PNG/JPG). This forces the browser to make many concurrent HTTP requests, increasing network latency due to connection setup round-trip time.</p>
            <p><strong>Solution:</strong> Always export and use the <strong>GLB</strong> format. GLB is the binary version of glTF, packaging all geometric data, bone structure, and textures into a single file. Benefits:</p>
            <ul>
                <li>Only 1 network connection is needed to download the entire model.</li>
                <li>Binary file size is smaller and has a lighter header compared to text-based JSON.</li>
                <li>Browsers parse binary files much faster.</li>
            </ul>

            <h3>2. Compress Geometry with Draco Compression</h3>
            <p>Draco is a Google open-source library for compressing and decompressing 3D geometric meshes and point clouds. It compresses vertex data, normal vectors, and UV mapping coordinates using quantization and entropy encoding.</p>
            <p>When exporting from Blender, simply enable the <strong>Draco Compression</strong> option in the GLTF/GLB export settings. With just this step, the original 500 MB CSCDVN model was reduced to <strong>46.62 MB</strong>!</p>
            <div class="blog-post-image-container">
                <img src="/assets/blog/optimize3D/Blender_export_settings.png" alt="Blender GLTF/GLB Export Settings with Draco Compression" />
                <span class="image-caption">GLTF/GLB Export Settings in Blender showing Draco Compression option</span>
            </div>
            <p><em>Technical Note:</em> Draco compresses geometry heavily, but the browser will have to decompress (decode) it using WebAssembly on the client's CPU before sending it to the GPU. Therefore, balance is needed to avoid bottlenecking the CPU when the model has an excessively high polycount.</p>

            <h3>3. Reformat and Optimize Textures</h3>
            <p>High-resolution textures (e.g. 4K - 4096x4096px) are the main VRAM hog. A 4K JPEG photo may only weigh a few hundred KB on disk, but when loaded into graphics memory (VRAM), the GPU must unpack it into uncompressed raw RGBA pixels. VRAM consumption formula:</p>
            <p style="background: rgba(255,255,255,0.05); padding: 10px 15px; border-radius: 8px; font-family: monospace; text-align: center; margin: 15px 0;">4096 * 4096 * 4 bytes (RGBA) = 67.1 MB VRAM per texture!</p>
            <p>If your model has multiple texture maps (Color, Normal, Roughness, Metallic, AO) at 4K, it can consume up to <strong>600MB+ VRAM</strong>, easily overflowing memory and crashing browsers on mobile devices.</p>
            <p><strong>Optimization methods:</strong></p>
            <ul>
                <li><strong>Limit resolution:</strong> Downscale less critical textures to 1K (1024px) or a maximum of 2K (2048px). Keep 4K only for very detailed parts close to the camera.</li>
                <li><strong>WebP / KTX2 Formats:</strong> Convert textures to <strong>WebP</strong> (to optimize network download size) or use the <strong>KTX2 (Basis Universal)</strong> standard. KTX2 is a GPU-native compression format, meaning it passes the compressed texture directly into GPU VRAM without unpacking it into raw pixels, saving up to 75% VRAM!</li>
            </ul>

            <h3>4. Harness the Power of glTF Transform CLI</h3>
            <p>To automate all of the above steps and perform deeper optimizations beyond what Blender can do, the <strong>glTF Transform CLI</strong> command-line tool (developed by Don McCurdy) is a top-tier choice.</p>
            <p><strong>Installation:</strong></p>
            <pre style="background: rgba(0,0,0,0.4); padding: 15px; border-radius: 8px; overflow-x: auto; color: #38bdf8; font-family: monospace; margin-bottom: 20px;">npm install --global @gltf-transform/cli</pre>
            <p>Or run quickly without installing via npx:</p>
            <pre style="background: rgba(0,0,0,0.4); padding: 15px; border-radius: 8px; overflow-x: auto; color: #38bdf8; font-family: monospace; margin-bottom: 20px;">npx @gltf-transform/cli --help</pre>

            <p><strong>Command to optimize CSCDVN_Draco.glb model:</strong></p>
            <p>We ran the following command line to compress our model deeply:</p>
            <pre style="background: rgba(0,0,0,0.4); padding: 15px; border-radius: 8px; overflow-x: auto; color: #fff; font-family: monospace; line-height: 1.4; margin-bottom: 25px;">npx @gltf-transform/cli optimize CSCDVN_Draco.glb CSCDVN_Optimized.glb --compress draco --texture-compress webp --texture-size 1024</pre>

            <p><strong>Explanation of pipeline parameters:</strong></p>
            <ul>
                <li><code>optimize</code>: Master command to run glTF Transform's auto-optimization sequence.</li>
                <li><code>--compress draco</code>: Compress mesh geometry using Draco.</li>
                <li><code>--texture-compress webp</code>: Convert and compress all PNG/JPG textures to WebP.</li>
                <li><code>--texture-size 1024</code>: Automatically scale down textures larger than 1024px to a maximum resolution of 1024x1024px.</li>
            </ul>

            <p>Here are some of the background optimizations run by the <code>optimize</code> command:</p>
            <ul>
                <li><strong>weld:</strong> Merge duplicate vertices sharing the exact same coordinates, reducing total vertex draw count.</li>
                <li><strong>simplify:</strong> Intelligently reduce polygon mesh count without deforming the model's overall shape.</li>
                <li><strong>dedup:</strong> Scan and merge identical textures or accessors in the 3D file.</li>
                <li><strong>prune:</strong> Clean up unused nodes, UV sets, and materials not referenced by the scene.</li>
            </ul>

            <h3>5. Comparison Table of Real-world Results</h3>
            <table style="width: 100%; border-collapse: collapse; margin: 25px 0; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.1); font-size: 0.95rem;">
                <thead>
                    <tr style="background: rgba(56, 189, 248, 0.1); border-bottom: 2px solid #38bdf8;">
                        <th style="padding: 12px; text-align: left; border: 1px solid rgba(255,255,255,0.1);">Model Version</th>
                        <th style="padding: 12px; text-align: left; border: 1px solid rgba(255,255,255,0.1);">File Size</th>
                        <th style="padding: 12px; text-align: left; border: 1px solid rgba(255,255,255,0.1);">Compression Ratio</th>
                        <th style="padding: 12px; text-align: left; border: 1px solid rgba(255,255,255,0.1);">Notes</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style="padding: 12px; border: 1px solid rgba(255,255,255,0.1);">CSCDVN_Origin.glb (Original)</td>
                        <td style="padding: 12px; border: 1px solid rgba(255,255,255,0.1); font-weight: bold;">500.2 MB</td>
                        <td style="padding: 12px; border: 1px solid rgba(255,255,255,0.1); color: #ff4a5a;">0% (Original)</td>
                        <td style="padding: 12px; border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.6);">Unprocessed, high-density mesh, raw 4K textures.</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px; border: 1px solid rgba(255,255,255,0.1);">Blender Export Setting (Draco)</td>
                        <td style="padding: 12px; border: 1px solid rgba(255,255,255,0.1); font-weight: bold;">46.62 MB</td>
                        <td style="padding: 12px; border: 1px solid rgba(255,255,255,0.1); color: #2ecc71;">Compressed ~90.6%</td>
                        <td style="padding: 12px; border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.6);">Draco compression directly in Blender, textures kept at 4K.</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px; border: 1px solid rgba(255,255,255,0.1);">gltf-transform (Draco + Default)</td>
                        <td style="padding: 12px; border: 1px solid rgba(255,255,255,0.1); font-weight: bold;">21.91 MB</td>
                        <td style="padding: 12px; border: 1px solid rgba(255,255,255,0.1); color: #2ecc71;">Compressed ~95.6%</td>
                        <td style="padding: 12px; border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.6);">Cleaned up weld/dedup/prune, images kept in original format.</td>
                    </tr>
                    <tr>
                        <td style="padding: 12px; border: 1px solid rgba(255,255,255,0.1);">gltf-transform (WebP + 2048px)</td>
                        <td style="padding: 12px; border: 1px solid rgba(255,255,255,0.1); font-weight: bold;">16.99 MB</td>
                        <td style="padding: 12px; border: 1px solid rgba(255,255,255,0.1); color: #2ecc71;">Compressed ~96.6%</td>
                        <td style="padding: 12px; border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.6);">Textures converted to WebP with max resolution of 2048px.</td>
                    </tr>
                    <tr style="background: rgba(46, 204, 113, 0.05);">
                        <td style="padding: 12px; border: 1px solid rgba(255,255,255,0.1); color: #2ecc71; font-weight: bold;">gltf-transform (WebP + 1024px)</td>
                        <td style="padding: 12px; border: 1px solid rgba(255,255,255,0.1); font-weight: bold; color: #2ecc71;">4.82 MB</td>
                        <td style="padding: 12px; border: 1px solid rgba(255,255,255,0.1); color: #2ecc71; font-weight: bold;">Compressed ~99.0%</td>
                        <td style="padding: 12px; border: 1px solid rgba(255,255,255,0.1); color: #2ecc71;">495.38 MB lighter than original (99.0% reduction).</td>
                    </tr>
                </tbody>
            </table>

            <p><strong>Conclusion:</strong> 3D optimization is not just about reducing file sizes for download, but also about protecting user hardware performance (saving VRAM). By combining binary GLB format, Draco compression for meshes, and WebP texture conversion (max 1024px via glTF Transform CLI), we can deliver the smoothest, most professional WebGL experience.</p>
        `},vi:{title:`Tối ưu hóa 3D Asset cho Web`,date:`10 tháng 3, 2024`,category:`Game Dev`,excerpt:`Hướng dẫn toàn diện về chuẩn bị các 3D asset, lập bản đồ kết cấu (texture mapping) và số lượng đa giác (polycounts) cho kết xuất web thời gian thực.`,content:`
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
            <p>Draco là một thư viện mã nguồn mở của Google để nén và giải nén các lưới hình học 3D (geometric meshes) và đám mây điểm (point clouds). Nó nén dữ liệu đỉnh, vectơ pháp tuyến, và tọa độ bản đồ UV bằng cách sử dụng lượng tử hóa và mã hóa entropy.</p>
            <p>Khi xuất file từ Blender, bạn chỉ cần bật tùy chọn <strong>Draco Compression</strong> trong cài đặt export GLTF/GLB (như hình minh họa bên dưới). Chỉ với bước này, model CSCDVN gốc từ 500 MB đã được giảm xuống còn <strong>46.62 MB</strong>!</p>
            <div class="blog-post-image-container">
                <img src="/assets/blog/optimize3D/Blender_export_settings.png" alt="Cài đặt export GLTF/GLB trong Blender với Draco Compression" />
                <span class="image-caption">Cài đặt export GLTF/GLB trong Blender hiển thị tùy chọn Draco Compression</span>
            </div>
            <p><em>Lưu ý kỹ thuật:</em> Draco nén hình học rất mạnh, nhưng trình duyệt sẽ phải giải nén (decode) bằng WebAssembly trên CPU của máy khách trước khi đẩy lên GPU. Do đó, cần có sự cân bằng để tránh làm nghẽn CPU khi model có số lượng polycount quá lớn.</p>

            <h3>3. Định dạng lại và tối ưu hóa Texture</h3>
            <p>Các texture độ phân giải cao (ví dụ: 4K - 4096x4096px) là thủ phạm ngốn bộ nhớ chính. Một bức ảnh JPEG 4K tuy chỉ nặng vài thường vài trăm KB trên đĩa, nhưng khi nạp vào bộ nhớ đồ họa (VRAM), GPU phải giải nén nó thành pixel thô dạng RGBA không nén. Công thức tính dung lượng VRAM chiếm dụng:</p>
            <p style="background: rgba(255,255,255,0.05); padding: 10px 15px; border-radius: 8px; font-family: monospace; text-align: center; margin: 15px 0;">4096 * 4096 * 4 bytes (RGBA) = 67.1 MB VRAM mỗi texture!</p>
            <p>If model của bạn có nhiều bản đồ texture (Color, Normal, Roughness, Metallic, AO) ở mức 4K, nó có thể ngốn tới <strong>600MB+ VRAM</strong>, dễ dàng làm tràn bộ nhớ và crash trình duyệt trên thiết bị di động.</p>
            <p><strong>Cách tối ưu:</strong></p>
            <ul>
                <li><strong>Giới hạn kích thước (Resolution):</strong> Đưa các texture không quá quan trọng về mức 1K (1024px) hoặc tối đa 2K (2048px). Chỉ giữ lại 4K cho những chi tiết cực kỳ đặc tả và nằm gần camera.</li>
                <li><strong>Định dạng WebP / KTX2:</strong> Chuyển đổi texture sang định dạng <strong>WebP</strong> (giúp tối ưu dung lượng tải về qua mạng) hoặc dùng chuẩn <strong>KTX2 (Basis Universal)</strong>. KTX2 là định dạng nén GPU-native, nghĩa là nó truyền thẳng định dạng nén đó vào GPU VRAM mà không cần giải nén ra pixel thô, giúp tiết kiệm tới 75% VRAM!</li>
            </ul>

            <h3>4. Tận dụng sức mạnh của glTF Transform CLI</h3>
            <p>Để tự động hóa tất cả các bước trên và thực hiện tối ưu hóa sâu hơn những gì Blender có thể làm, công cụ dòng lệnh <strong>glTF Transform CLI</strong> (phát triển bởi Don McCurdy) là lựa chọn tối tân hàng đầu.</p>
            <p><strong>Cài đặt:</strong></p>
            <pre style="background: rgba(0,0,0,0.4); padding: 15px; border-radius: 8px; overflow-x: auto; color: #38bdf8; font-family: monospace; margin-bottom: 20px;">npm install --global @gltf-transform/cli</pre>
            <p>Hoặc chạy nhanh không cần cài đặt qua npx:</p>
            <pre style="background: rgba(0,0,0,0.4); padding: 15px; border-radius: 8px; overflow-x: auto; color: #38bdf8; font-family: monospace; margin-bottom: 20px;">npx @gltf-transform/cli --help</pre>

            <p><strong>Lệnh tối ưu hóa model CSCDVN_Draco.glb:</strong></p>
            <p>Chúng tôi đã chạy dòng lệnh sau để nén sâu model của chúng ta:</p>
            <pre style="background: rgba(0,0,0,0.4); padding: 15px; border-radius: 8px; overflow-x: auto; color: #fff; font-family: monospace; line-height: 1.4; margin-bottom: 25px;">npx @gltf-transform/cli optimize CSCDVN_Draco.glb CSCDVN_Optimized.glb --compress draco --texture-compress webp --texture-size 1024</pre>

            <p><strong>Giải thích các tham số trong pipeline:</strong></p>
            <ul>
                <li><code>optimize</code>: Lệnh gộp chạy chuỗi tối ưu hóa tự động của glTF Transform.</li>
                <li><code>--compress draco</code>: Nén hình học lưới bằng Draco.</li>
                <li><code>--texture-compress webp</code>: Tự động chuyển đổi và nén toàn bộ texture PNG/JPG sang định dạng WebP.</li>
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
            <table style="width: 100%; border-collapse: collapse; margin: 25px 0; background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.1); font-size: 0.95rem;">
                <thead>
                    <tr style="background: rgba(56, 189, 248, 0.1); border-bottom: 2px solid #38bdf8;">
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
                        <td style="padding: 12px; border: 1px solid rgba(255,255,255,0.1); color: #2ecc71;">Nhẹ hơn bản gốc 495.38 MB (giảm 99.0%).</td>
                    </tr>
                </tbody>
            </table>

            <p><strong>Kết luận:</strong> Tối ưu hóa 3D không chỉ đơn thuần là giảm dung lượng file tải về qua mạng, mà còn là bảo vệ hiệu năng phần cứng thiết bị của người dùng (tiết kiệm GPU VRAM). Bằng việc sử dụng kết hợp định dạng GLB nhị phân, nén Draco cho lưới hình học, và chuyển đổi texture tối ưu (như WebP 1024px qua công cụ glTF Transform CLI), chúng ta có thể mang lại trải nghiệm WebGL mượt mà, chuyên nghiệp nhất.</p>
        `}}];function D(){let e=a(),{slug:n}=t(),{language:r,setLanguage:i,t:o}=y(),s=e=>{if(!e)return null;let t=e[r]||e.en||{};return{...e,title:t.title||e.title,excerpt:t.excerpt||e.excerpt,content:t.content||e.content,date:t.date||e.date,category:t.category||e.category}},c=s(n?E.find(e=>e.slug===n||e.id.toString()===n):null);return(0,w.jsxs)(`div`,{className:`blog-page-container`,children:[(0,w.jsx)(`div`,{className:`blog-blur-circle circle-1`}),(0,w.jsx)(`div`,{className:`blog-blur-circle circle-2`}),(0,w.jsxs)(`div`,{className:`blog-content-wrapper`,children:[(0,w.jsxs)(`div`,{className:`blog-top-bar`,children:[(0,w.jsxs)(`button`,{className:`blog-home-btn`,onClick:()=>e(`/`),children:[`← `,o(`blog.backToMenu`)]}),(0,w.jsxs)(`div`,{className:`blog-lang-container`,children:[(0,w.jsx)(`button`,{className:`blog-lang-btn ${r===`en`?`active`:``}`,onClick:()=>i(`en`),"aria-label":`Set language to English`,children:`EN`}),(0,w.jsx)(`span`,{className:`blog-lang-slash`,children:`/`}),(0,w.jsx)(`button`,{className:`blog-lang-btn ${r===`vi`?`active`:``}`,onClick:()=>i(`vi`),"aria-label":`Set language to Vietnamese`,children:`VI`})]})]}),c?(0,w.jsxs)(`div`,{className:`blog-detail-container animate-slide-up`,children:[(0,w.jsxs)(`button`,{className:`blog-inner-back-btn`,onClick:()=>e(`/blog`),children:[`← `,o(`blog.allArticles`)]}),(0,w.jsxs)(`div`,{className:`blog-detail-meta`,children:[(0,w.jsx)(`span`,{className:`blog-detail-cat`,children:c.category}),(0,w.jsx)(`span`,{className:`blog-detail-date`,children:c.date})]}),(0,w.jsx)(`h1`,{className:`blog-detail-title`,children:c.title}),(0,w.jsx)(`div`,{className:`blog-detail-divider`}),c.show3DModel&&(0,w.jsx)(T,{}),(0,w.jsx)(`div`,{className:`blog-detail-body`,dangerouslySetInnerHTML:{__html:c.content}})]}):(0,w.jsxs)(`div`,{className:`blog-list-container animate-slide-up`,children:[(0,w.jsxs)(`header`,{className:`blog-header`,children:[(0,w.jsx)(`span`,{className:`blog-tagline`,children:o(`blog.devlogNotes`)}),(0,w.jsx)(`h1`,{className:`blog-main-title`,children:o(`blog.devBlog`)}),(0,w.jsx)(`p`,{className:`blog-main-desc`,children:o(`blog.subtitle`)})]}),(0,w.jsx)(`div`,{className:`blog-grid`,children:E.map(t=>{let n=s(t);return(0,w.jsxs)(`article`,{className:`blog-page-card`,onClick:()=>e(`/blog/${n.slug}`),children:[(0,w.jsxs)(`div`,{className:`blog-card-meta`,children:[(0,w.jsx)(`span`,{className:`blog-card-cat`,children:n.category}),(0,w.jsx)(`span`,{className:`blog-card-date`,children:n.date})]}),(0,w.jsx)(`h2`,{className:`blog-card-title`,children:n.title}),(0,w.jsx)(`p`,{className:`blog-card-excerpt`,children:n.excerpt}),(0,w.jsxs)(`span`,{className:`blog-card-link`,children:[o(`blog.readArticle`),` →`]})]},n.id)})})]})]})]})}export{D as default};