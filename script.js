class RainbowSpiral {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        this.x = this.centerX;
        this.y = this.centerY;
        this.angle = 0;
        this.isAnimating = false;
        this.animationSpeed = 10; // milliseconds between iterations
        
        // RGB values starting with red
        this.r = 255;
        this.g = 0;
        this.b = 0;
        
        this.setupCanvas();
    }
    
    setupCanvas() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.lineWidth = 1;
    }
    
    reset() {
        this.isAnimating = false;
        this.x = this.centerX;
        this.y = this.centerY;
        this.angle = 0;
        this.r = 255;
        this.g = 0;
        this.b = 0;
        this.setupCanvas();
        
        // Re-enable start button
        document.getElementById('startBtn').disabled = false;
        document.getElementById('resetBtn').disabled = false;
    }
    
    updateColor(i) {
        // Same color transition logic as Python code
        if (i < 255/3) {
            this.g += 3;
        } else if (i < 255*2/3) {
            this.r -= 3;
        } else if (i < 255) {
            this.b += 3;
        } else if (i < 255*4/3) {
            this.g -= 3;
        } else if (i < 255*5/3) {
            this.r += 3;
        } else {
            this.b -= 3;
        }
        
        // Clamp values to 0-255 range
        this.r = Math.max(0, Math.min(255, this.r));
        this.g = Math.max(0, Math.min(255, this.g));
        this.b = Math.max(0, Math.min(255, this.b));
    }
    
    drawLine(distance) {
        const startX = this.x;
        const startY = this.y;
        
        // Calculate new position
        this.x += distance * Math.cos(this.angle * Math.PI / 180);
        this.y += distance * Math.sin(this.angle * Math.PI / 180);
        
        // Draw line with current color
        this.ctx.strokeStyle = `rgb(${this.r}, ${this.g}, ${this.b})`;
        this.ctx.beginPath();
        this.ctx.moveTo(startX, startY);
        this.ctx.lineTo(this.x, this.y);
        this.ctx.stroke();
    }
    
    async drawSpiral() {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        document.getElementById('startBtn').disabled = true;
        document.getElementById('resetBtn').disabled = true;
        
        const totalIterations = 255 * 2; // 510 iterations like Python code
        
        for (let i = 0; i < totalIterations && this.isAnimating; i++) {
            // Update color based on current iteration
            this.updateColor(i);
            
            // Draw line with increasing distance (same as Python: 50+i)
            const distance = 50 + i;
            this.drawLine(distance);
            
            // Turn right by 91 degrees (same as Python)
            this.angle += 91;
            
            // Keep angle in reasonable range
            if (this.angle > 360) {
                this.angle -= 360;
            }
            
            // Add small delay for animation effect
            if (i % 5 === 0) { // Every 5 iterations to speed up
                await new Promise(resolve => setTimeout(resolve, this.animationSpeed));
            }
        }
        
        document.getElementById('resetBtn').disabled = false;
        this.isAnimating = false;
    }
    
    stop() {
        this.isAnimating = false;
    }
}

// Initialize the spiral when page loads
let spiral;

document.addEventListener('DOMContentLoaded', function() {
    spiral = new RainbowSpiral('spiralCanvas');
    
    document.getElementById('startBtn').addEventListener('click', function() {
        spiral.drawSpiral();
    });
    
    document.getElementById('resetBtn').addEventListener('click', function() {
        spiral.reset();
    });
});