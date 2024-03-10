document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("aiCanvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const points = [];
  const pointCount = 100; // Number of points, adjust for density

  for (let i = 0; i < pointCount; i++) {
    points.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
    });
  }

  function connectPoints(pointA, pointB) {
    const distance = Math.sqrt(
      Math.pow(pointA.x - pointB.x, 2) + Math.pow(pointA.y - pointB.y, 2)
    );
    if (distance < 150) {
      // Distance threshold for connecting points
      ctx.beginPath();
      ctx.moveTo(pointA.x, pointA.y);
      ctx.lineTo(pointB.x, pointB.y);
      ctx.stroke();
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set colors for drawing
    ctx.fillStyle = "rgba(173, 216, 230, 1)"; // Light blue for points
    ctx.strokeStyle = "rgba(173, 216, 230, 0.5)"; // Light blue for lines, with some transparency
    ctx.lineWidth = 1;

    points.forEach((point) => {
      point.x += point.vx;
      point.y += point.vy;

      // Boundary conditions to keep points within canvas
      if (point.x <= 0 || point.x >= canvas.width) point.vx *= -1;
      if (point.y <= 0 || point.y >= canvas.height) point.vy *= -1;

      // Draw each point
      ctx.beginPath();
      ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI);
      ctx.fill();

      // Draw lines between points
      points.forEach((other) => {
        connectPoints(point, other);
      });
    });

    requestAnimationFrame(animate); // Loop the animation
  }

  animate(); // Start the animation
});
