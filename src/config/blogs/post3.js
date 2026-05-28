export default {
    id: 3,
    slug: "optimizing-3d-assets-for-web",
    show3DModel: true,
    en: {
        title: "Optimizing 3D Assets for Web",
        date: "March 10, 2024",
        category: "Game Dev",
        excerpt: "A comprehensive guide to preparing 3D assets, texture mapping, and polycounts for real-time web rendering.",
        content: `
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
            <pre style="background: rgba(0,0,0,0.4); padding: 15px; border-radius: 8px; overflow-x: auto; color: #f1c40f; font-family: monospace; margin-bottom: 20px;">npm install --global @gltf-transform/cli</pre>
            <p>Or run quickly without installing via npx:</p>
            <pre style="background: rgba(0,0,0,0.4); padding: 15px; border-radius: 8px; overflow-x: auto; color: #f1c40f; font-family: monospace; margin-bottom: 20px;">npx @gltf-transform/cli --help</pre>

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
                    <tr style="background: rgba(241,196,15,0.1); border-bottom: 2px solid #f1c40f;">
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
                        <td style="padding: 12px; border: 1px solid rgba(255,255,255,0.1); color: #2ecc71;">Very lightweight for web! Fast loading even on mobile networks.</td>
                    </tr>
                </tbody>
            </table>

            <p><strong>Conclusion:</strong> 3D optimization is not just about reducing file sizes for download, but also about protecting user hardware performance (saving VRAM). By combining binary GLB format, Draco compression for meshes, and WebP texture conversion (max 1024px via glTF Transform CLI), we can deliver the smoothest, most professional WebGL experience.</p>
        `
    },
    vi: {
        title: "Tối ưu hóa 3D Asset cho Web",
        date: "10 tháng 3, 2024",
        category: "Game Dev",
        excerpt: "Hướng dẫn toàn diện về chuẩn bị các 3D asset, lập bản đồ kết cấu (texture mapping) và số lượng đa giác (polycounts) cho kết xuất web thời gian thực.",
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
};
