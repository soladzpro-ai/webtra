// ==========================================
// FILE: js/search.js - XỬ LÝ LỘC ĐIỂM VÀ HIỆU ỨNG GIAO DIỆN
// ==========================================

/**
 * Hàm kích hoạt khi người dùng nhấn nút "Tra Điểm" trên giao diện
 */
function traCuuDiem() {
    // 1. Lấy các phần tử HTML cần tương tác
    const inputSBD = document.getElementById('txtSoBaoDanh');
    const vungKetQua = document.getElementById('ketQuaTraCuu'); 
    
    if (!inputSBD) {
        alert("Lỗi hệ thống: Không tìm thấy ô nhập số báo danh (id='txtSoBaoDanh') trên HTML!");
        return;
    }

    const soBaoDanh = inputSBD.value.trim();

    // 2. Kiểm tra dữ liệu đầu vào
    if (soBaoDanh === "") {
        alert("Cậu ơi, vui lòng nhập Số báo danh dự thi trước nhé!");
        return;
    }

    console.log(`🔎 Đang tiến hành kết nối lấy dữ liệu điểm cho SBD: ${soBaoDanh}`);
    
    // 3. Hiển thị trạng thái Loading (Cậu có thể chèn hiệu ứng quay quay đẹp mắt ở đây)
    if (vungKetQua) {
        vungKetQua.innerHTML = `
            <div style="text-align: center; padding: 20px;">
                <p style="color: #3498db; font-weight: bold; margin: 0;">🔄 Đang truy xuất dữ liệu từ máy chủ, cậu đợi xíu nhé...</p>
            </div>
        `;
    }

    // 4. Gọi hàm fetch từ file api.js để kết nối sang server.onrender.com
    fetchDiemHocSinh(soBaoDanh)
        .then(data => {
            console.log("🎁 Đã nhận phản hồi từ kho dữ liệu:", data);
            
            // Trường hợp 1: Tìm thấy học sinh khớp SBD trong file data.txt
            if (data && data.hocSinh) {
                
                // 🎉 KÍCH HOẠT HIỆU ỨNG PHÁO HOA TỪ FILE confetti.js CỦA CẬU
                // (Tớ gọi hàm giả định là triggerConfetti, cậu nhớ kiểm tra tên hàm thật trong file confetti.js của cậu nhé)
                if (typeof triggerConfetti === "function") {
                    triggerConfetti();
                } else if (typeof startConfetti === "function") {
                    startConfetti();
                }

                if (vungKetQua) {
                    vungKetQua.innerHTML = `
                        <div style="border: 2px solid #2ecc71; padding: 20px; border-radius: 8px; background-color: #f4fbf7; line-height: 1.6; margin-top: 15px; box-shadow: 0 4px 10px rgba(46, 204, 113, 0.15);">
                            <h3 style="color: #27ae60; margin-top: 0; text-align: center; font-size: 18px;">🎉 ĐÃ TÌM THẤY KẾT QUẢ THÀNH CÔNG!</h3>
                            <hr style="border: 0; border-top: 1px solid #e2f5ea; margin: 10px 0;">
                            <p style="margin: 8px 0;"><b>Họ và tên:</b> <span style="color: #2c3e50; font-size: 16px;">${data.hocSinh.HoVaTen || 'Chưa cập nhật'}</span></p>
                            <p style="margin: 8px 0;"><b>Số báo danh:</b> <span style="color: #2c3e50; font-size: 16px;">${data.hocSinh.SoBaoDanhDuThi}</span></p>
                            <p style="margin: 8px 0;"><b>Trạng thái điểm:</b> <span style="color: #27ae60; font-weight: bold;">Đã đạt yêu cầu tra cứu trên hệ thống</span></p>
                        </div>
                    `;
                }
            } 
            // Trường hợp 2: Server trả về null (Không có học sinh này)
            else {
                if (vungKetQua) {
                    vungKetQua.innerHTML = `
                        <div style="color: #e74c3c; font-weight: bold; border: 1px dashed #e74c3c; padding: 15px; border-radius: 5px; background: #fdf2f2; margin-top: 15px; text-align: center;">
                            ❌ Không tìm thấy thông tin cho SBD [${soBaoDanh}]. <br>
                            <span style="font-size: 13px; font-weight: normal; color: #555; display: block; margin-top: 5px;">Cậu kiểm tra lại xem gõ chính xác từng con số chưa nha!</span>
                        </div>
                    `;
                }
            }
        })
        .catch(error => {
            console.error("Lỗi đường truyền:", error);
            if (vungKetQua) {
                vungKetQua.innerHTML = `
                    <div style="color: #d35400; border: 1px solid #e67e22; padding: 15px; border-radius: 5px; background: #fffaf5; margin-top: 15px; line-height: 1.5;">
                        ⚠️ <b>Máy chủ dữ liệu đang bận tỉnh giấc!</b> <br>
                        <span style="font-size: 13px; color: #666; display:block; margin-top:5px;">
                            Render Free thường ngủ đông nếu sau 15 phút không có người vào. Cậu vui lòng đợi khoảng 20-30 giây để hệ thống kích hoạt rồi bấm nút <b>"Tra Điểm"</b> lại lần nữa nha!
                        </span>
                    </div>
                `;
            }
        });
}