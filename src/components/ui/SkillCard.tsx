"use client";

import React from "react";
import { motion } from "framer-motion";
import { IconType } from "react-icons";
import { cn } from "@/lib/utils";

interface SkillCardProps {
  title: string;
  description: string;
  icon: IconType;
  level?: number; // 1-5 for skill level
  className?: string;
}

export function SkillCard({
  title,
  description,
  icon: Icon,
  level = 0,
  className,
}: SkillCardProps) {
  return (
    <motion.div
      className={cn(
        "p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-md transition-shadow",
        className
      )}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center mb-4">
        <div className="flex-shrink-0 p-2 rounded-md bg-primary/10 text-primary">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="ml-3 text-lg font-medium text-gray-900 dark:text-white">
          {title}
        </h3>
      </div>
      
      <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
      
      {level > 0 && (
        <div className="flex items-center">
          <div className="text-sm text-gray-500 dark:text-gray-400 mr-2">
            Proficiency:
          </div>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <div
                key={star}
                className={`h-2 w-5 rounded-sm ${
                  star <= level
                    ? "bg-primary"
                    : "bg-gray-200 dark:bg-gray-700"
                }`}
                aria-hidden="true"
              />
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
} 