import React from 'react';
import { useLanguage } from '../../config/LanguageContext';

export default function Post1() {
    const { language } = useLanguage();

    if (language === 'vi') {
        return (
            <>
                <p>Tạo một trải nghiệm 3D trên web đòi hỏi sự cân bằng tinh tế giữa nghệ thuật và công nghệ. Trong bài viết này, chúng ta sẽ đi sâu vào cách cấu trúc một portfolio WebGL vừa đẹp mắt vừa có hiệu năng cao.</p>
                <h3>1. Công nghệ sử dụng</h3>
                <p>Đối với phát triển web 3D hiện đại, sự kết hợp giữa Vite, React và Three.js là vô cùng mạnh mẽ. React giúp quản lý trạng thái của giao diện overlay, trong khi Three.js xử lý việc render WebGL.</p>
                <h3>2. Tối ưu hóa Tài nguyên</h3>
                <p>Một trong những nút thắt cổ chai lớn nhất trong WebGL là thời gian tải. Luôn đảm bảo sử dụng nén Draco cho các model glTF/glb của bạn. Trong dự án này, các model menu được nén xuống chỉ còn một phần nhỏ so với kích thước ban đầu, giúp giảm đáng kể thời gian tải.</p>
                <h3>3. Ánh sáng và HDR</h3>
                <p>Sử dụng bản đồ môi trường HDR (High Dynamic Range) chất lượng cao mang lại phản chiếu kim loại chân thực và ánh sáng xung quanh sống động. Chúng tôi tải các texture HDR thông qua RGBELoader để ánh xạ ánh sáng môi trường trong thời gian thực.</p>
            </>
        );
    }

    return (
        <>
            <p>Creating a 3D web experience requires a fine balance between art and technology. In this article, we dive deep into how to structure a WebGL portfolio that is both visually stunning and highly performant.</p>
            <h3>1. The Tech Stack</h3>
            <p>For modern 3D web development, a combination of Vite, React and Three.js is extremely powerful. React helps us manage the state of overlay UI, while Three.js handles rendering WebGL context.</p>
            <h3>2. Asset Optimization</h3>
            <p>One of the biggest bottlenecks in WebGL is loading time. Always make sure to use Draco compression for your glTF/glb models. In this project, menu models are compressed down to a fraction of their original size, reducing load times dramatically.</p>
            <h3>3. Lighting and HDR</h3>
            <p>Using a high-quality HDR (High Dynamic Range) environment map brings out realistic metallic reflections and ambient lighting. We load HDR textures via RGBELoader to map environment lights in real-time.</p>
        </>
    );
}
