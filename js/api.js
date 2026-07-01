/* ==========================================================================
   FILE XỬ LÝ API TRA CỨU ĐIỂM - BẢN FIX CHẮC CHẮN CHẠY (FULL API)
   ========================================================================== */

const API_BASE_URL = "https://server-xe33.onrender.com";

// Hàm gọi API gửi SBD lên server bằng phương thức POST gửi dữ liệu ngầm
async function fetchStudentScore(sbd) {
    try {
        // Chuyển hoàn toàn sang phương thức POST gửi body lên server-xe33
        const response = await fetch(`${API_BASE_URL}/search`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sbd: sbd }) // Gửi số báo danh dạng JSON
        });

        if (!response.ok) {
            throw new Error(`Không tìm thấy dữ liệu hoặc lỗi server: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("❌ Lỗi API:", error);
        throw error;
    }
}

// LẮNG NGHE SỰ KIỆN CLICK TRỰC TIẾP TẠI ĐÂY ĐỂ ĐÈ LÊN CÁC FILE JS KHÁC BỊ LỖI
document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btnTraDiem') || document.querySelector('.btnSearch');
    const input = document.getElementById('sbdInput') || document.querySelector('.studentId');
    const statusBox = document.getElementById('statusMessage');
    const statusText = document.getElementById('statusText');
    const resultBox = document.getElementById('resultContainer');

    if (btn && input) {
        btn.addEventListener('click', async () => {
            const sbdValue = input.value.trim();
            if (!sbdValue) {
                alert("Cậu ơi, nhập Số Báo Danh vào đã nhé! 🐾");
                return;
            }

            // Hiển thị trạng thái đang tải dữ liệu
            if (statusBox && statusText) {
                statusText.innerText = "Đang xin dữ liệu từ máy chủ, cậu đợi xíu nha... ✨";
                statusBox.style.display = 'block';
            }
            if (resultBox) resultBox.style.display = 'none';

            try {
                const student = await fetchStudentScore(sbdValue);
                
                if (statusBox) statusBox.style.display = 'none';

                // Đổ dữ liệu thẳng vào bảng điểm Chibi trên giao diện
                if (student) {
                    document.getElementById('resSBD').innerText = student.sbd || student.SBD || sbdValue;
                    document.getElementById('resName').innerText = student.hoTen || student.name || student.Ten || "Học Sinh";
                    document.getElementById('resToan').innerText = student.toan || student.Toan || "0";
                    document.getElementById('resVan').innerText = student.van || student.Van || "0";
                    document.getElementById('resAnh').innerText = student.anh || student.Anh || "0";
                    document.getElementById('resTD').innerText = student.tongDiem || student.td || student.TĐ || "0";

                    // Hiện bảng điểm bồng bềnh
                    if (resultBox) resultBox.style.display = 'block';

                    // Bắn pháo hoa ăn mừng tung tóe
                    if (typeof confetti === 'function') {
                        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
                    }
                }
            } catch (err) {
                if (statusText) {
                    statusText.innerText = "⏰ Máy chủ đang bận tỉnh giấc (Render Free ngủ đông). Cậu đợi 20-30 giây rồi bấm lại lần nữa nha! 🌸";
                }
                console.error(err);
            }
        });
    }
});

window.fetchStudentScore = fetchStudentScore;