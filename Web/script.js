// Get the canvas element
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set canvas dimensions to match viewport
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Generate random triangles
const triangles = [];
const numTriangles = 30; // Adjust as needed

// Function to generate DNA-like pattern
function generateDNA() {
    const startX = canvas.width; // Start from right edge of canvas
    const startY = Math.random() * canvas.height; // Random y-coordinate

    let x = startX;
    let y = startY;

    for (let i = 0; i < numTriangles; i++) {
        const length = Math.random() * 50 + 10; // Random length of triangle side

        triangles.push({
            x1: x,
            y1: y,
            x2: x - length / 2,
            y2: y - length,
            x3: x + length / 2,
            y3: y - length,
            color: '#000000' // Black color
        });

        // Update coordinates for next triangle
        x -= length / 4;
        y -= length;
    }
}

generateDNA();

// Animation loop
function animate() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw triangles as lines
    triangles.forEach(triangle => {
        ctx.beginPath();
        ctx.moveTo(triangle.x1, triangle.y1);
        ctx.lineTo(triangle.x2, triangle.y2);
        ctx.lineTo(triangle.x3, triangle.y3);
        ctx.closePath(); // Connect last point to first point
        ctx.strokeStyle = triangle.color;
        ctx.stroke();
    });

    // Move triangles from right to left
    triangles.forEach(triangle => {
        triangle.x1 -= Math.random() * 2 + 1; // Move left with random speed
        triangle.x2 -= Math.random() * 2 + 1;
        triangle.x3 -= Math.random() * 2 + 1;

        // Wrap around if triangles go out of bounds
        if (triangle.x1 + triangle.x2 + triangle.x3 < 0) {
            // Reset triangle to right edge of canvas
            triangle.x1 = canvas.width;
            triangle.x2 = canvas.width - (triangle.x1 - triangle.x2);
            triangle.x3 = canvas.width - (triangle.x1 - triangle.x3);
        }
    });

    // Request animation frame
    requestAnimationFrame(animate);
}

// Start animation loop
animate();

// Resize canvas when window is resized
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Regenerate DNA pattern on resize
    triangles.length = 0;
    generateDNA();
});
