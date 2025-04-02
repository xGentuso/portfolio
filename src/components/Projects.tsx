"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { FiFolder, FiGithub, FiExternalLink } from "react-icons/fi";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubLink: string;
  liveLink?: string;
  type: string;
}

const featuredProjects: Project[] = [
  {
    title: "Petopia",
    description: "A modern virtual pet simulator built with SwiftUI for iOS. Features pet care mechanics, customization options, minigames, and an in-game economy system. Includes persistent save system and push notifications.",
    technologies: ["Swift", "SwiftUI", "iOS", "CoreData"],
    githubLink: "https://github.com/xGentuso/Petopia",
    type: "iOS Development"
  },
  {
    title: "HydrationTracker",
    description: "Native watchOS application built with SwiftUI that helps users track daily water intake. Features visual progress tracking, customizable goals, and local data storage.",
    technologies: ["Swift", "watchOS", "SwiftUI", "HealthKit"],
    githubLink: "https://github.com/xGentuso/HydrationTracker",
    type: "watchOS Development"
  },
  {
    title: "Portfolio Website",
    description: "Modern portfolio website built with Next.js and TypeScript. Features smooth scrolling, responsive design, dynamic content loading, and dark mode support.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    githubLink: "https://github.com/xGentuso/portfolio",
    type: "Web Development"
  },
  {
    title: "Weather App",
    description: "Comprehensive weather application providing real-time forecasts, location-based updates, and interactive weather maps with a clean, modern interface.",
    technologies: ["Swift", "iOS SDK", "CoreLocation", "WeatherKit"],
    githubLink: "https://github.com/xGentuso/WeatherApp",
    type: "iOS Development"
  },
  {
    title: "Grocerly",
    description: "Smart grocery shopping assistant that helps users manage shopping lists, track expenses, and find the best deals at local stores.",
    technologies: ["Swift", "UIKit", "CoreData", "MapKit"],
    githubLink: "https://github.com/xGentuso/Grocerly",
    type: "iOS Development"
  },
  {
    title: "CryptoExchange",
    description: "Real-time cryptocurrency trading platform with live price updates, portfolio tracking, and market analysis tools.",
    technologies: ["React", "Node.js", "WebSocket", "Crypto APIs"],
    githubLink: "https://github.com/xGentuso/CryptoExchange",
    type: "Full Stack"
  }
];

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: number[];
  size: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;
    this.connections = [];
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

export default function Projects() {
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
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      
      canvas.width = rect.width * pixelRatio;
      canvas.height = rect.height * pixelRatio;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(pixelRatio, pixelRatio);
    };

    const initParticles = () => {
      particles.current = [];
      const numParticles = Math.floor((canvas.width * canvas.height) / 15000);
      
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

    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    
    resizeCanvas();
    initParticles();
    drawParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <section id="projects" className="relative py-20 bg-[#0B1120]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-12">My Projects</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                onClick={() => window.open(project.githubLink, '_blank')}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="p-6 relative">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <FiFolder className="w-8 h-8 text-blue-400 group-hover:text-blue-300 transition-colors" />
                      <span className="px-3 py-1 bg-blue-900/30 text-blue-300 rounded-full text-sm group-hover:bg-blue-800/40 transition-colors">
                        {project.type}
                      </span>
                    </div>
                    <div className="flex gap-3">
                      <FiGithub className="w-5 h-5 text-gray-400 group-hover:text-blue-300 transition-colors" />
                      {project.liveLink && (
                        <FiExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-300 transition-colors" />
                      )}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-300 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-6 group-hover:text-gray-200 transition-colors">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-blue-900/30 text-blue-300 rounded-full text-sm group-hover:bg-blue-800/40 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm text-blue-300 flex items-center gap-1">
                    View Project <FiExternalLink className="w-4 h-4" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-12">
            <a
              href="https://github.com/xGentuso"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <FiGithub className="w-5 h-5" />
              View More Projects
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 