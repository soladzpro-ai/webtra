/* ==========================================================================
   FILE XỬ LÝ API TRA CỨU ĐIỂM - THPT NTB (FULL API)
   ========================================================================== */

// 1. Cấu hình đường dẫn gốc hướng thẳng tới server Render thực tế của cậu
const API_BASE_URL = "https://server-xe33.onrender.com";

/**
 * Hàm gọi API gửi số báo danh lên server để lấy kết quả điểm thi
 * @param {string} sbd - Số báo danh cần tra cứu
 * @returns {Promise<Object|null>} Dữ liệu học sinh hoặc null nếu có lỗi
 */
async function fetchStudentScore(sbd) {
    try {
        // Tùy thuộc vào cấu hình route backend cũ của cậu, thông thường sẽ là /api/search hoặc /search hoặc /scores/
        // Ở đây tớ bọc sẵn url gọi endpoint phổ biến nhất. Cậu có thể điều chỉnh '/search' nếu backend dùng tên khác nhé.
        const response = await fetch(`${API_BASE_URL}/search?sbd=${sbd}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Nếu server báo lỗi (ví dụ không tìm thấy SBD)
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Lỗi server: ${response.status}`);
        }

        // Trả về cục dữ liệu JSON chứa điểm số nhận từ server
        return await response.json();

    } catch (error) {
        console.error("❌ Lỗi khi gọi API tra cứu điểm:", error);
        throw error; // Đẩy lỗi ra ngoài để file search.js/app.js bắt lấy và hiển thị thông báo lên UI
    }
}

// Xuất hàm ra global để các file script khác (search.js, app.js) có thể gọi trực tiếp
window.fetchStudentScore = fetchStudentScore;