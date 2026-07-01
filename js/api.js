// ==========================================
// FILE: js/api.js - QUẢN LÝ KẾT NỐI SERVER RENDER
// ==========================================

// Địa chỉ gốc của Server dữ liệu đúng như cậu cấu hình trên Render
const BASE_URL = "https://server-xe33.onrender.com";

/**
 * 🌸 TÍNH NĂNG TỰ ĐỘNG ĐÁNH THỨC SERVER KHI VỪA MỞ WEB
 * Kêu cả 2 bên cùng thức giấc nhịp nhàng ngay từ giây đầu tiên.
 */
window.addEventListener("load", () => {
    console.log("🌸 Giao diện Web đã tải xong! Đang âm thầm gửi tín hiệu gõ cửa Server dữ liệu...");
    
    fetch(`${BASE_URL}/TuyenSinh/GetThongTinHocSinhTheoSoBaoDanh`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ soBaoDanh: "" }) // Bắn data rỗng sang để gọi dậy
    })
    .then(res => res.json())
    .then(data => {
        console.log("⚡ Tuyệt vời! Server dữ liệu đã phản hồi và báo:", data.message);
    })
    .catch(err => {
        console.log("⏳ Máy chủ dữ liệu đang ngủ đông, hệ thống đang ép khởi động lại...");
    });
});

/**
 * 🚀 HÀM CORE GỬI YÊU CẦU LẤY ĐIỂM THẬT
 * Hàm này dùng chung, sẽ được file search.js gọi đến khi người dùng bấm nút
 */
async function fetchDiemHocSinh(soBaoDanh) {
    const response = await fetch(`${BASE_URL}/TuyenSinh/GetThongTinHocSinhTheoSoBaoDanh`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ soBaoDanh: soBaoDanh }) // Truyền số báo danh thật lên
    });
    
    if (!response.ok) {
        throw new Error("Mạng kết nối đến Server dữ liệu gặp sự cố!");
    }
    
    return await response.json();
}