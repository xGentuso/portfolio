"use client";

import { motion } from "framer-motion";
import { 
  SiReact, 
  SiSwift, 
  SiKotlin,
  SiJavascript, 
  SiTypescript, 
  SiNodedotjs, 
  SiMongodb, 
  SiDocker, 
  SiGithub,
  SiNextdotjs,
  SiPhp 
} from "react-icons/si";
import { DiJava } from "react-icons/di";
import { useEffect, useRef } from "react";

const technologies = [
  {
    name: "React",
    icon: SiReact,
    color: "text-[#61DAFB]",
    description: "Frontend Development",
    level: "Advanced"
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    color: "text-[#000000] dark:text-white",
    description: "React Framework",
    level: "Advanced"
  },
  {
    name: "Swift",
    icon: SiSwift,
    color: "text-[#F05138]",
    description: "iOS Development",
    level: "Advanced"
  },
  {
    name: "Kotlin",
    icon: SiKotlin,
    color: "text-[#7F52FF]",
    description: "Android Development",
    level: "Intermediate"
  },
  {
    name: "Java",
    icon: DiJava,
    color: "text-[#007396]",
    description: "Backend Development",
    level: "Advanced"
  },
  {
    name: "PHP",
    icon: SiPhp,
    color: "text-[#777BB4]",
    description: "Server-Side Development",
    level: "Intermediate"
  },
  {
    name: "JavaScript",
    icon: SiJavascript,
    color: "text-[#F7DF1E]",
    description: "Web Development",
    level: "Advanced"
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    color: "text-[#3178C6]",
    description: "Type-Safe Development",
    level: "Advanced"
  },
  {
    name: "Node.js",
    icon: SiNodedotjs,
    color: "text-[#339933]",
    description: "Server-Side Development",
    level: "Intermediate"
  },
  {
    name: "MongoDB",
    icon: SiMongodb,
    color: "text-[#47A248]",
    description: "Database Management",
    level: "Intermediate"
  },
  {
    name: "Docker",
    icon: SiDocker,
    color: "text-[#2496ED]",
    description: "Containerization",
    level: "Intermediate"
  },
  {
    name: "GitHub",
    icon: SiGithub,
    color: "text-gray-900 dark:text-white",
    description: "Version Control",
    level: "Advanced"
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

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

export default function TechStack() {
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
    <section className="relative py-20 bg-[#0B1120]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-white mb-4"
          >
            Technologies I Work With
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-400"
          >
            My tech stack includes modern and industry-standard technologies
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {technologies.map((tech) => (
            <motion.div
              key={tech.name}
              variants={item}
              whileHover={{ scale: 1.05 }}
              className="relative group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative flex flex-col items-center">
                <tech.icon className={`w-12 h-12 ${tech.color} mb-4 transition-transform group-hover:scale-110`} />
                <h3 className="text-lg font-semibold text-white mb-2">{tech.name}</h3>
                <p className="text-sm text-gray-400 text-center mb-3">{tech.description}</p>
                <div className="flex items-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium
                    ${tech.level === "Advanced" ? "bg-green-900/50 text-green-200" :
                      "bg-blue-900/50 text-blue-200"}`}>
                    {tech.level}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 