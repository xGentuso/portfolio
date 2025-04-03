"use client";

import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiSwift,
  SiKotlin,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiMongodb,
  SiDocker,
  SiGithub,
  SiPhp,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

const technologies = [
  {
    name: "React",
    icon: SiReact,
    color: "text-blue-400",
    description: "Frontend Development",
    level: "Advanced"
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    color: "text-white dark:text-white",
    description: "React Framework",
    level: "Advanced"
  },
  {
    name: "Swift",
    icon: SiSwift,
    color: "text-orange-500",
    description: "iOS Development",
    level: "Advanced"
  },
  {
    name: "Kotlin",
    icon: SiKotlin,
    color: "text-purple-500",
    description: "Android Development",
    level: "Intermediate"
  },
  {
    name: "Java",
    icon: FaJava,
    color: "text-blue-500",
    description: "Backend Development",
    level: "Advanced"
  },
  {
    name: "PHP",
    icon: SiPhp,
    color: "text-purple-400",
    description: "Server-Side Development",
    level: "Intermediate"
  },
  {
    name: "JavaScript",
    icon: SiJavascript,
    color: "text-yellow-400",
    description: "Web Development",
    level: "Advanced"
  },
  {
    name: "TypeScript",
    icon: SiTypescript,
    color: "text-blue-500",
    description: "Type-Safe Development",
    level: "Advanced"
  },
  {
    name: "Node.js",
    icon: SiNodedotjs,
    color: "text-green-500",
    description: "Server-Side Development",
    level: "Intermediate"
  },
  {
    name: "MongoDB",
    icon: SiMongodb,
    color: "text-green-500",
    description: "Database Management",
    level: "Intermediate"
  },
  {
    name: "Docker",
    icon: SiDocker,
    color: "text-blue-500",
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

export default function TechStack() {
  return (
    <section className="relative py-20">
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
          {technologies.map((tech) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.name}
                variants={item}
                whileHover={{ scale: 1.05 }}
                className="relative group bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative flex flex-col items-center">
                  <Icon className={`w-12 h-12 ${tech.color} mb-4 transition-transform group-hover:scale-110`} />
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
            );
          })}
        </motion.div>
      </div>
    </section>
  );
} 