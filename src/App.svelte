<script>
  import { onMount } from 'svelte';
  
  let canvas;
  let ctx;
  let particles = [];
  let animationFrameId;
  
  // Configuration for the matrix background
  const particleCount = 120;
  const particleMaxSize = 4;
  const connectionDistance = 200;
  const particleSpeed = 0.8;
  
  onMount(() => {
    if (typeof window !== 'undefined') {
      initCanvas();
      createParticles();
      animate();
      
      // Handle window resize
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
      };
    }
  });
  
  function initCanvas() {
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  function handleResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  function createParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * particleMaxSize + 1,
        speedX: (Math.random() - 0.5) * particleSpeed,
        speedY: (Math.random() - 0.5) * particleSpeed
      });
    }
  }
  
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      let p = particles[i];
      
      // Move particles
      p.x += p.speedX;
      p.y += p.speedY;
      
      // Bounce off edges
      if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
      if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      
      // Draw particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(100, 200, 255, 0.8)';
      ctx.fill();
      
      // Add glow effect to particles
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(100, 200, 255, 0.2)';
      ctx.fill();
      
      // Connect particles with lines
      for (let j = i + 1; j < particles.length; j++) {
        let p2 = particles[j];
        let distance = Math.sqrt(
          Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2)
        );
        
        if (distance < connectionDistance) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(100, 200, 255, ${1 - distance / connectionDistance})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          
          // Add subtle pulse effect to connections
          const pulseIntensity = Math.sin(Date.now() * 0.003) * 0.2 + 0.8;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(150, 220, 255, ${(1 - distance / connectionDistance) * 0.3 * pulseIntensity})`;
          ctx.lineWidth = 2.5;
          ctx.stroke();
        }
      }
    }
    
    animationFrameId = requestAnimationFrame(animate);
  }
</script>

<canvas bind:this={canvas} class="background-canvas"></canvas>

<main>
  <div class="container">
    <header>
      <h1>Tan Nguyen Pte. Ltd.</h1>
      <h2>Software Architecture & Engineering</h2>
    </header>

    <section class="services">
      <div class="service-item">
        <h3>Software Development</h3>
        <p>Custom software solutions built with modern technologies and best practices</p>
      </div>
      
      <div class="service-item">
        <h3>Architecture Design</h3>
        <p>Scalable and maintainable system architectures tailored to your business needs</p>
      </div>
      
      <div class="service-item">
        <h3>Engineering Management</h3>
        <p>Technical leadership and team management for successful project delivery</p>
      </div>
    </section>

    <section class="contact">
      <p>tan@nguyen.software</p>
      <p>68 Circular Rd, #02-01, Singapore, 049422</p>
    </section>
  </div>
</main>

<style>
  :global(body) {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #040b1a;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
  }

  .background-canvas {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: #040b1a;
  }

  .container {
    max-width: 800px;
    margin: 0 auto;
    padding: 4rem 4rem;
    position: relative;
    z-index: 1;
    background: rgba(0,0,0,0.6);
    border-radius: 1rem;
  }

  header {
    text-align: center;
    margin-bottom: 4rem;
  }

  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: #fff;
    text-shadow: 0 0 10px rgba(100, 200, 255, 0.5);
  }

  h2 {
    font-size: 1.2rem;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.7);
    margin-top: 0;
    letter-spacing: 0.05em;
  }

  h3 {
    font-size: 1.3rem;
    font-weight: 600;
    color: #222;
    margin-bottom: 0.5rem;
  }

  section {
    margin-bottom: 4rem;
  }

  .services {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
  }

  .service-item {
    padding: 1.5rem;
    background-color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border-radius: 8px;
    transition: transform 0.2s, box-shadow 0.2s;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }

  .service-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.05);
  }

  .service-item p {
    color: #666;
    margin-top: 0.5rem;
    font-size: 0.95rem;
  }

  .contact {
    text-align: center;
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.7);
    background-color: rgba(0, 20, 40, 0.7);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    padding: 1.5rem;
    border-radius: 8px;
    border: 1px solid rgba(100, 200, 255, 0.2);
  }

  .contact p {
    margin: 0.5rem 0;
  }
</style>
