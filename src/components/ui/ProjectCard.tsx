"use client";

import { motion } from "framer-motion";
import { Button } from "./Button";
import { PlaceholderImage } from "./PlaceholderImage";
import { FiExternalLink, FiGithub } from "react-icons/fi";

export interface ProjectCardProps {
  title: string;
  description: string;
  imageSrc: string;
  tags: string[];
  demoUrl?: string;
  repoUrl?: string;
  direction?: "left" | "right";
}

export function ProjectCard({
  title,
  description,
  imageSrc,
  tags,
  demoUrl,
  repoUrl,
  direction = "left",
}: ProjectCardProps) {
  const variants = {
    hidden: { opacity: 0, x: direction === "left" ? -20 : 20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <motion.div
      className="grid md:grid-cols-2 gap-8 mb-24 last:mb-0"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5 }}
      variants={variants}
    >
      <div className={`${direction === "right" ? "md:order-2" : ""}`}>
        <PlaceholderImage title={title} />
      </div>
      <div className={`${direction === "right" ? "md:order-1" : ""}`}>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {title}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-6">{description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-100 rounded-full text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          {demoUrl && (
            <Button
              href={demoUrl}
              isExternal
              className="flex items-center gap-2"
            >
              <FiExternalLink className="w-4 h-4" />
              Live Demo
            </Button>
          )}
          {repoUrl && (
            <Button
              href={repoUrl}
              isExternal
              variant="outline"
              className="flex items-center gap-2"
            >
              <FiGithub className="w-4 h-4" />
              View Code
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
} 