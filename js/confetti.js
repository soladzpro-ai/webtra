// js/confetti.js
class ChibiConfetti {
    constructor() {
        this.canvas = document.getElementById("confetti-canvas");
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext("2d");
        this.pieces = [];
        this.isActive = false;
        this.colors = ["#ff7fa2", "#ffb3cb", "#74c0fc", "#91a7ff", "#ffd43b", "#63e6be"];
        
        window.addEventListener("resize", () => this.resize());
        this.resize();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    fire() {
        this.pieces = [];
        this.isActive = true;
        // Tạo 100 mảnh pháo hoa bắn ra từ giữa màn hình
        for (let i = 0; i < 100; i++) {
            this.pieces.push({
                x: this.canvas.width / 2,
                y: this.canvas.height / 2,
                size: Math.random() * 8 + 5,
                color: this.colors[Math.floor(Math.random() * this.colors.length)],
                speedX: (Math.random() - 0.5) * 15,
                speedY: (Math.random() - 0.7) * 15,
                gravity: 0.3,
                rotation: Math.random() * Math.PI,
                rotationSpeed: (Math.random() - 0.5) * 0.2,
                opacity: 1
            });
        }
        
        if (this.pieces.length > 0) {
            this.run();
        }
    }

    run() {
        if (!this.isActive) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        let hasLivePieces = false;

        this.pieces.forEach(p => {
            if (p.opacity <= 0) return;

            p.x += p.speedX;
            p.y += p.speedY;
            p.speedY += p.gravity;
            p.rotation += p.rotationSpeed;
            p.opacity -= 0.015;

            if (p.opacity > 0) {
                hasLivePieces = true;
                this.ctx.save();
                this.ctx.translate(p.x, p.y);
                this.ctx.rotate(p.rotation);
                this.ctx.fillStyle = p.color;
                this.ctx.globalAlpha = p.opacity;
                this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                this.ctx.restore();
            }
        });

        if (hasLivePieces) {
            requestAnimationFrame(() => this.run());
        } else {
            this.isActive = false;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const confettiSystem = new ChibiConfetti();
    // Xuất hàm ra phạm vi toàn cục để file điều khiển logic gọi được
    window.triggerConfetti = () => confettiSystem.fire();
});