// js/app.js
document.addEventListener('DOMContentLoaded', () => {
    // Kích hoạt tầng bắt sự kiện click nút bấm và gõ Enter nhập số báo danh
    if (window.ChibiSearch) {
        window.ChibiSearch.init();
    }
    
    // Log nhẹ một cái thông báo hệ thống đã chạy mượt mà ổn định
    console.log('%c🌸 Tra cứu điểm thi Chibi Tây Ninh v1.0 đã kích hoạt thành công!', 'color: #e6678e; font-weight: bold; font-size: 13px;');
});