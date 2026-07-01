// js/animation.js
document.addEventListener("DOMContentLoaded", () => {
    const animatedButtons = document.querySelectorAll(".btn-cute-animation");

    animatedButtons.forEach(button => {
        // Tạo âm thanh hoặc hiệu ứng thu nhỏ nhẹ khi bấm xuống bằng tay
        button.addEventListener("mousedown", () => {
            button.style.transform = "scale(0.95) translateY(2px)";
        });

        // Trả lại trạng thái ban đầu khi thả chuột ra
        button.addEventListener("mouseup", () => {
            button.style.transform = "";
        });

        // Đề phòng trường hợp di chuột ra ngoài khi đang đè chuột
        button.addEventListener("mouseleave", () => {
            button.style.transform = "";
        });
    });
});