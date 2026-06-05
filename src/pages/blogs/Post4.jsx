import React from 'react';
import { useLanguage } from '../../config/LanguageContext';

export default function Post4() {
    const { language } = useLanguage();

    if (language === 'vi') {
        return (
            <>
                <p>Tài liệu kỹ thuật này trình bày chi tiết quy trình (pipeline) thiết lập và vận hành hệ thống Virtual Production (trường quay ảo) thời gian thực. Quy trình sử dụng <strong>Blender</strong> để tối ưu hóa tài nguyên 3D, <strong>Unreal Engine 4 (UE4)</strong> làm công cụ render thời gian thực và <strong>Aximmetry</strong> để xử lý luồng tín hiệu hình ảnh, tách phông xanh (chroma keying) và phát sóng trực tiếp (broadcasting).</p>
                
                <div className="blog-post-video-container">
                    <iframe src="https://www.youtube.com/embed/z7jjlB_QI1g" title="Virtual Production Demo 1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </div>
                <span className="image-caption" style={{ display: 'block', textAlign: 'center', marginTop: '-25px', marginBottom: '25px' }}>Video Thử Nghiệm 1: Đồng bộ kết xuất thời gian thực giữa camera vật lý và môi trường ảo</span>

                <h3>1. Tối ưu hóa và Chuẩn bị Tài nguyên trong Blender</h3>
                <p>Để đảm bảo hiệu năng khung hình (FPS) ổn định bên trong game engine, toàn bộ tài nguyên 3D cần được xử lý tối ưu ngay từ giai đoạn thiết kế mô hình trong Blender:</p>
                <ul>
                    <li><strong>Cân chỉnh Tỉ lệ (Scale Calibration):</strong> Hệ đơn vị được thiết lập là Metric với Unit Scale bằng 1.0. Tất cả mesh phải được dựng theo đúng kích thước thực tế (1 đơn vị trong Blender = 1 mét, khi xuất FBX sang UE4 sẽ tự động chuyển thành 1 đơn vị = 1 centimet) nhằm đảm bảo thông số ống kính camera ảo khớp với camera vật lý.</li>
                    <li><strong>Quản lý Lưới & Vật liệu:</strong> Tối ưu hóa mật độ đa giác (polycount) ở mức trung bình/thấp (low/mid-poly). Gán các Material ID riêng biệt để tạo điều kiện thuận lợi cho việc thiết lập vật liệu và shader trong Unreal Engine. Toàn bộ ma trận biến đổi (Location, Rotation, Scale) phải được áp dụng (Apply - Ctrl+A) để tránh lệch trục tọa độ.</li>
                    <li><strong>Quy trình xuất tệp (Export):</strong> Xuất dưới dạng tệp FBX nhị phân (binary) tuân theo quy tắc đặt tên tiền tố hệ thống (ví dụ: <code>SM_Stage_Floor</code> cho mesh tĩnh và <code>M_Stage_Floor</code> cho vật liệu). Thiết lập Smoothing trong bộ xuất FBX thành "Face" để bảo toàn vertex normals (pháp tuyến đỉnh).</li>
                </ul>

                <h3>2. Thiết lập Render Thiết bị thời gian thực trong Unreal Engine 4 (Aximmetry DE)</h3>
                <p>Unreal Engine 4 đóng vai trò là engine kết xuất hình ảnh. Dự án sử dụng phiên bản Unreal Engine tích hợp sẵn của Aximmetry (Aximmetry DE), đi kèm các API chuyên dụng để liên kết trực tiếp với phần mềm điều phối ngoài.</p>
                <ul>
                    <li><strong>Aximmetry Camera Blueprints:</strong> Thay thế camera mặc định của UE4 bằng các blueprint camera ảo của Aximmetry (ví dụ: <code>Aximmetry_VirtualCam_3Cam</code>). Các blueprint này sẽ nhận lệnh điều khiển từ Aximmetry để ghi đè các thông số transform (tọa độ), focal length (tiêu cự) và khẩu độ của camera trong scene.</li>
                    <li><strong>Tính toán Ánh sáng (Lighting & Lightmaps):</strong> Để tối ưu hóa hiệu năng render, ánh sáng tĩnh được tính toán và lưu trữ (bake) vào lightmap sử dụng hệ thống Lightmass. Thiết lập độ phân giải lightmap hợp lý cho từng mesh để cân bằng giữa chất lượng đổ bóng và dung lượng VRAM. Các hiệu ứng phản chiếu Screen-space (SSR) hoặc Planar Reflections chỉ được cấu hình ở các vùng sàn phản chiếu chính nhằm tối ưu hóa GPU.</li>
                    <li><strong>Cấu hình dự án (Project Settings):</strong> Khóa tần số quét hiển thị trùng khớp với định dạng phát sóng truyền hình (ví dụ: 1080p ở 59.94Hz hoặc 2160p ở 29.97Hz). Tinh chỉnh Motion Blur và Temporal Anti-Aliasing (TAA) để loại bỏ hiện tượng bóng mờ (ghosting) trên viền của MC/diễn viên khi di chuyển nhanh.</li>
                </ul>

                <div className="blog-post-video-container">
                    <iframe src="https://www.youtube.com/embed/c6xwDc1d3WI" title="Virtual Production Demo 2" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
                </div>
                <span className="image-caption" style={{ display: 'block', textAlign: 'center', marginTop: '-25px', marginBottom: '25px' }}>Chroma Keying and Studio Lighting Integration Test</span>

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
            </>
        );
    }

    return (
        <>
            <p>This technical note outlines the configuration and deployment pipeline for real-time virtual production and live broadcasting. The pipeline integrates <strong>Blender</strong> for 3D stage modeling, <strong>Unreal Engine 4 (UE4)</strong> as the real-time render engine, and <strong>Aximmetry</strong> for video compositing, chroma keying, and multi-input broadcasting.</p>
            
            <div className="blog-post-video-container">
                <iframe src="https://www.youtube.com/embed/z7jjlB_QI1g" title="Virtual Production Demo 1" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
            <span className="image-caption" style={{ display: 'block', textAlign: 'center', marginTop: '-25px', marginBottom: '25px' }}>Integration Demo: Real-Time Compositing and Render Stream</span>

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

            <div className="blog-post-video-container">
                <iframe src="https://www.youtube.com/embed/c6xwDc1d3WI" title="Virtual Production Demo 2" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            </div>
            <span className="image-caption" style={{ display: 'block', textAlign: 'center', marginTop: '-25px', marginBottom: '25px' }}>Chroma Keying and Studio Lighting Integration Test</span>

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
        </>
    );
}
