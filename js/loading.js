// js/loading.js
const ChibiLoading = {
    show: () => {
        const loader = document.getElementById("loadingContainer");
        const result = document.getElementById("resultSection");
        
        if (loader) loader.classList.remove("hidden");
        if (result) result.classList.add("hidden"); // Ẩn kết quả cũ đi khi đang tải mới
    },
    
    hide: () => {
        const loader = document.getElementById("loadingContainer");
        if (loader) loader.classList.add("hidden");
    }
};

// Đính vào đối tượng window để các file khác sử dụng trực tiếp
window.ChibiLoading = ChibiLoading;