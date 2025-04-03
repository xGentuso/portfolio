"use client";

import { useEffect, useRef } from "react";

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;
    this.size = Math.random() * 2 + 1;
  }

  update(width: number, height: number, mouse: { x: number; y: number }) {
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 100 && mouse.x !== 0 && mouse.y !== 0) {
      this.vx -= (dx / distance) * 2;
      this.vy -= (dy / distance) * 2;
    }

    if (Math.random() < 0.05) {
      this.vx += (Math.random() - 0.5) * 0.5;
      this.vy += (Math.random() - 0.5) * 0.5;
    }

    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0) this.x = width;
    if (this.x > width) this.x = 0;
    if (this.y < 0) this.y = height;
    if (this.y > height) this.y = 0;

    this.vx *= 0.99;
    this.vy *= 0.99;
  }
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const animationFrameId = useRef<number>();
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const pixelRatio = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * pixelRatio;
      canvas.height = window.innerHeight * pixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(pixelRatio, pixelRatio);
    };

    const initParticles = () => {
      particles.current = [];
      const numParticles = Math.floor((canvas.width * canvas.height) / 6000);
      
      for (let i = 0; i < numParticles; i++) {
        particles.current.push(
          new Particle(
            Math.random() * canvas.width,
            Math.random() * canvas.height
          )
        );
      }
    };

    const drawParticles = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';

      particles.current.forEach((particle, i) => {
        particle.update(canvas.width, canvas.height, mousePosition.current);
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();

        particles.current.forEach((otherParticle, j) => {
          if (i === j) return;
          
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 150;

          if (distance < maxDistance) {
            const opacity = (maxDistance - distance) / maxDistance;
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.15})`;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      animationFrameId.current = requestAnimationFrame(drawParticles);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mousePosition.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
    };

    const handleMouseLeave = () => {
      mousePosition.current = { x: 0, y: 0 };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', resizeCanvas);
    
    resizeCanvas();
    initParticles();
    drawParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0" style={{ zIndex: 0 }}>
      <div className="absolute inset-0 bg-[#0B1120]" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ opacity: 0.5 }}
      />
    </div>
  );
} 