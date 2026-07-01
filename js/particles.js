// js/particles.js
class ChibiParticles {
    constructor() {
        this.canvas = document.getElementById("particles-canvas");
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext("2d");
        this.particles = [];
        this.colors = ["#ffccd5", "#fff0f3", "#ccebff", "#e6f5ff", "#ffe5ec"];
        
        this.init();
        window.addEventListener("resize", () => this.resize());
    }

    init() {
        this.resize();
        // Khởi tạo 25 hạt bong bóng
        for (let i = 0; i < 25; i++) {
            this.particles.push(this.createParticle());
        }
        this.animate();
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticle() {
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height + this.canvas.height,
            radius: Math.random() * 6 + 4,
            color: this.colors[Math.floor(Math.random() * this.colors.length)],
            speed: Math.random() * 0.5 + 0.2,
            wobble: Math.random() * 2,
            wobbleSpeed: Math.random() * 0.02
        };
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(p => {
            p.y -= p.speed;
            p.wobble += p.wobbleSpeed;
            p.x += Math.sin(p.wobble) * 0.3;

            // Nếu hạt bay lên đỉnh màn hình thì reset xuống đáy
            if (p.y < -10) {
                p.y = this.canvas.height + 10;
                p.x = Math.random() * this.canvas.width;
            }

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.globalAlpha = 0.6;
            this.ctx.fill();
        });

        requestAnimationFrame(() => this.animate());
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new ChibiParticles();
});