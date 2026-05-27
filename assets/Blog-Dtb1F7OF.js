import{A as e,E as t,F as n,I as r,M as i,N as a,P as o,a as s,b as c,c as l,f as u,h as d,i as f,l as p,m,n as h,o as g,p as _,r as v,t as y,u as b}from"./index-DQR8uI8P.js";import{t as x}from"./OrbitControls-DtQotacp.js";var S=r(n(),1),C=y();function w(){let n=(0,S.useRef)(null),r=(0,S.useRef)(null),[a,o]=(0,S.useState)(`/assets/blog/optimize3D/CSCDVN_Optimized_webp.glb`),[y,w]=(0,S.useState)(!0),[T,E]=(0,S.useState)(0),[D,O]=(0,S.useState)(null),[k,A]=(0,S.useState)({vertices:0,triangles:0}),[j,M]=(0,S.useState)(!0),N=(0,S.useRef)(null),P=t=>{t.dispose();for(let n of Object.keys(t)){let r=t[n];r&&typeof r.dispose==`function`&&r instanceof e&&r.dispose()}};(0,S.useEffect)(()=>{if(!r.current||!n.current)return;let e=n.current,o=e.clientWidth,y=e.clientHeight||450,S=new t;S.background=new b(1579036);let C=new c(45,o/y,.1,100);C.position.set(3,2,4);let T=new s({canvas:r.current,antialias:!0,alpha:!1,powerPreference:`high-performance`});T.setSize(o,y),T.setPixelRatio(Math.min(window.devicePixelRatio,2)),T.shadowMap.enabled=!0,T.shadowMap.type=2,T.toneMapping=4,T.toneMappingExposure=1;let D=null;new h().load(`/assets/hdris/spruit_sunrise_1k.hdr`,e=>{e.mapping=303,e.minFilter=d,e.magFilter=d,e.needsUpdate=!0,S.environment=e,D=e},void 0,e=>{console.error(`Error loading environment HDRI map:`,e)});let k=new g(16777215,.2);S.add(k);let M=new m(16777215,2894901,.4);M.position.set(0,20,0),S.add(M);let F=new u(16777215,.6);F.position.set(5,10,7),F.castShadow=!0,F.shadow.mapSize.width=1024,F.shadow.mapSize.height=1024,F.shadow.camera.near=.5,F.shadow.camera.far=25,F.shadow.bias=-5e-4,S.add(F);let I=new u(11193599,.2);I.position.set(-5,5,-5),S.add(I);let L=new x(C,T.domElement);L.enableDamping=!0,L.dampingFactor=.05,L.minDistance=.5,L.maxDistance=15,L.autoRotate=j,L.autoRotateSpeed=.8,N.current=L;let R=new _(10,20,4473932,2236968);R.position.y=-.8,S.add(R);let z=new v;z.setDecoderPath(`/assets/libs/gltf/`);let B=new f;B.setDRACOLoader(z);let V=null;w(!0),E(0),O(null),B.load(a,e=>{V=e.scene,S.add(V);let t=new l().setFromObject(V),n=t.getCenter(new i),r=t.getSize(new i);V.position.x=-n.x,V.position.y=-n.y+.1,V.position.z=-n.z,R.position.y=-r.y/2;let a=Math.max(r.x,r.y,r.z),o=0,s=0;V.traverse(e=>{if(e.isMesh){e.castShadow=!0,e.receiveShadow=!0;let t=e.geometry;if(t){let e=t.getAttribute(`position`);e&&(o+=e.count),t.index?s+=t.index.count/3:e&&(s+=e.count/3)}}}),A({vertices:o,triangles:Math.round(s)});let c=C.fov*(Math.PI/180),u=Math.abs(a/2/Math.tan(c/2));u*=1.35,C.position.set(u*.9,u*.4,u*1.1),L.target.set(0,0,0),L.update(),w(!1)},e=>{e.total>0?E(e.loaded/e.total*100):E(e=>Math.min(e+5,95))},e=>{console.error(`Error loading model`,e),O(`Error loading 3D asset model. Check the Draco decoder or the file path.`),w(!1)});let H;new p;let U=()=>{H=requestAnimationFrame(U),L&&L.update(),T.render(S,C)};U();let W=()=>{if(!n.current)return;let e=n.current.clientWidth,t=n.current.clientHeight||450;C.aspect=e/t,C.updateProjectionMatrix(),T.setSize(e,t)};return window.addEventListener(`resize`,W),()=>{window.removeEventListener(`resize`,W),cancelAnimationFrame(H),V&&(S.remove(V),V.traverse(e=>{e.isMesh&&(e.geometry&&e.geometry.dispose(),e.material&&(Array.isArray(e.material)?e.material.forEach(P):P(e.material)))})),S.remove(R),R.geometry.dispose(),R.material.dispose(),D&&D.dispose(),T.dispose(),z.dispose(),L.dispose()}},[a]),(0,S.useEffect)(()=>{N.current&&(N.current.autoRotate=j)},[j]);let F=a.includes(`Optimized`);return(0,C.jsxs)(`div`,{className:`viewer-3d-wrapper`,ref:n,children:[(0,C.jsx)(`canvas`,{ref:r,className:`viewer-3d-canvas`}),(0,C.jsxs)(`div`,{className:`viewer-3d-overlay stats-panel`,children:[(0,C.jsx)(`div`,{className:`stats-header`,children:`Model Details`}),(0,C.jsxs)(`div`,{className:`stats-row`,children:[(0,C.jsx)(`span`,{className:`stats-label`,children:`Vertices:`}),(0,C.jsx)(`span`,{className:`stats-value`,children:y?`Counting...`:k.vertices.toLocaleString()})]}),(0,C.jsxs)(`div`,{className:`stats-row`,children:[(0,C.jsx)(`span`,{className:`stats-label`,children:`Triangles:`}),(0,C.jsx)(`span`,{className:`stats-value`,children:y?`Counting...`:k.triangles.toLocaleString()})]}),(0,C.jsxs)(`div`,{className:`stats-row`,children:[(0,C.jsx)(`span`,{className:`stats-label`,children:`File size:`}),(0,C.jsx)(`span`,{className:`stats-value size-badge`,children:F?`4.82 MB (Optimized)`:`46.62 MB (Blender)`})]})]}),(0,C.jsxs)(`div`,{className:`viewer-3d-overlay controls-panel`,children:[(0,C.jsxs)(`button`,{className:`control-btn ${j?`active`:``}`,onClick:()=>M(!j),title:`Toggle Auto Rotate`,children:[(0,C.jsx)(`svg`,{viewBox:`0 0 24 24`,width:`16`,height:`16`,fill:`currentColor`,children:(0,C.jsx)(`path`,{d:`M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z`})}),(0,C.jsx)(`span`,{children:`Auto Rotate`})]}),(0,C.jsxs)(`div`,{className:`interaction-tips`,children:[(0,C.jsx)(`svg`,{viewBox:`0 0 24 24`,width:`14`,height:`14`,fill:`currentColor`,children:(0,C.jsx)(`path`,{d:`M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z`})}),`Drag to rotate • Pinch/Scroll to zoom`]})]}),(0,C.jsxs)(`div`,{className:`viewer-3d-overlay model-selector`,children:[(0,C.jsx)(`button`,{className:`selector-tab ${F?``:`active`}`,onClick:()=>o(`/assets/blog/optimize3D/CSCDVN_Draco.glb`),disabled:y&&!F,children:`Blender Draco (46.62 MB)`}),(0,C.jsx)(`button`,{className:`selector-tab ${F?`active`:``}`,onClick:()=>o(`/assets/blog/optimize3D/CSCDVN_Optimized_webp.glb`),disabled:y&&F,children:`Fully Optimized (4.82 MB)`})]}),y&&(0,C.jsxs)(`div`,{className:`viewer-loading-screen`,children:[(0,C.jsx)(`div`,{className:`viewer-loader`}),(0,C.jsxs)(`div`,{className:`viewer-loading-text`,children:[`Loading Asset: `,Math.round(T),`%`]})]}),D&&(0,C.jsxs)(`div`,{className:`viewer-error-screen`,children:[(0,C.jsx)(`div`,{className:`error-icon`,children:`⚠️`}),(0,C.jsx)(`div`,{className:`error-msg`,children:D})]})]})}var T=[{id:3,slug:`optimizing-3d-assets-for-web`,title:`Optimizing 3D Assets for Web`,date:`March 10, 2024`,category:`Game Dev`,excerpt:`A comprehensive guide to preparing 3D assets, texture mapping, and polycounts for real-time web rendering.`,content:`
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
        `}];function E(){let e=a(),{slug:t}=o(),n=t?T.find(e=>e.slug===t||e.id.toString()===t):null;return(0,C.jsxs)(`div`,{className:`blog-page-container`,children:[(0,C.jsx)(`div`,{className:`blog-blur-circle circle-1`}),(0,C.jsx)(`div`,{className:`blog-blur-circle circle-2`}),(0,C.jsxs)(`div`,{className:`blog-content-wrapper`,children:[(0,C.jsx)(`button`,{className:`blog-home-btn`,onClick:()=>e(`/`),children:`← Back to Menu`}),n?(0,C.jsxs)(`div`,{className:`blog-detail-container animate-slide-up`,children:[(0,C.jsx)(`button`,{className:`blog-inner-back-btn`,onClick:()=>e(`/blog`),children:`← All Articles`}),(0,C.jsxs)(`div`,{className:`blog-detail-meta`,children:[(0,C.jsx)(`span`,{className:`blog-detail-cat`,children:n.category}),(0,C.jsx)(`span`,{className:`blog-detail-date`,children:n.date})]}),(0,C.jsx)(`h1`,{className:`blog-detail-title`,children:n.title}),(0,C.jsx)(`div`,{className:`blog-detail-divider`}),n.id===3&&(0,C.jsx)(w,{}),(0,C.jsx)(`div`,{className:`blog-detail-body`,dangerouslySetInnerHTML:{__html:n.content}})]}):(0,C.jsxs)(`div`,{className:`blog-list-container animate-slide-up`,children:[(0,C.jsxs)(`header`,{className:`blog-header`,children:[(0,C.jsx)(`span`,{className:`blog-tagline`,children:`Devlog & Notes`}),(0,C.jsx)(`h1`,{className:`blog-main-title`,children:`Developer Blog`}),(0,C.jsx)(`p`,{className:`blog-main-desc`,children:`Insights, tutorials, and behind-the-scenes logs on WebGL, Three.js, and Game Development.`})]}),(0,C.jsx)(`div`,{className:`blog-grid`,children:T.map(t=>(0,C.jsxs)(`article`,{className:`blog-page-card`,onClick:()=>e(`/blog/${t.slug}`),children:[(0,C.jsxs)(`div`,{className:`blog-card-meta`,children:[(0,C.jsx)(`span`,{className:`blog-card-cat`,children:t.category}),(0,C.jsx)(`span`,{className:`blog-card-date`,children:t.date})]}),(0,C.jsx)(`h2`,{className:`blog-card-title`,children:t.title}),(0,C.jsx)(`p`,{className:`blog-card-excerpt`,children:t.excerpt}),(0,C.jsx)(`span`,{className:`blog-card-link`,children:`Read Article →`})]},t.id))})]})]})]})}export{E as default};