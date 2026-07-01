// js/notification.js
class ChibiNotification {
    constructor() {
        this.container = document.getElementById("notification-container");
    }

    show(message, duration = 3000) {
        if (!this.container) return;

        const toast = document.createElement("div");
        toast.className = "toast";
        toast.innerText = `🌸 ${message}`;

        this.container.appendChild(toast);

        // Tự động biến mất sau khoảng thời gian đặt trước
        setTimeout(() => {
            toast.style.opacity = "0";
            toast.style.transform = "scale(0.9) translateY(-10px)";
            toast.style.transition = "all 0.3s ease";
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    window.chibiToast = new ChibiNotification();
});