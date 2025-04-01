"use client";

import { motion } from "framer-motion";
import { FiGithub, FiStar, FiExternalLink } from "react-icons/fi";
import { Button } from "@/components/ui/Button";
import type { GitHubRepo } from "@/lib/github";

// Function to format dates in a readable way
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Function to get language color
function getLanguageColor(language: string): string {
  const colors: Record<string, string> = {
    TypeScript: "bg-blue-500",
    JavaScript: "bg-yellow-400",
    HTML: "bg-orange-500",
    CSS: "bg-purple-500",
    Python: "bg-green-500",
    Java: "bg-red-500",
    "C#": "bg-green-600",
    Ruby: "bg-red-600",
    PHP: "bg-indigo-500",
    Go: "bg-blue-400",
    Rust: "bg-orange-600",
    Swift: "bg-orange-500",
    Kotlin: "bg-purple-600",
    Dart: "bg-blue-300",
  };
  
  return colors[language] || "bg-gray-500";
}

interface RepoCardProps {
  repo: GitHubRepo;
}

export function RepoCard({ repo }: RepoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="card p-6 flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <FiGithub className="w-5 h-5 text-primary-500 dark:text-primary-400 mr-2" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white truncate">
            {repo.name}
          </h3>
        </div>
        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <FiStar className="w-4 h-4 mr-1" />
          <span className="text-sm">{repo.stargazers_count}</span>
        </div>
      </div>
      
      <p className="text-gray-700 dark:text-gray-300 mb-4 flex-grow">
        {repo.description}
      </p>
      
      {repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {repo.topics.slice(0, 4).map((topic) => (
            <span
              key={topic}
              className="px-2 py-1 bg-primary-100 dark:bg-primary-800 text-primary-700 dark:text-primary-100 rounded-full text-xs font-medium"
            >
              {topic}
            </span>
          ))}
          {repo.topics.length > 4 && (
            <span className="text-xs text-gray-500 dark:text-gray-400 self-center">
              +{repo.topics.length - 4} more
            </span>
          )}
        </div>
      )}
      
      <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center">
          {repo.language && (
            <div className="flex items-center">
              <span className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)} mr-2`}></span>
              <span className="text-sm text-gray-600 dark:text-gray-300">{repo.language}</span>
            </div>
          )}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Updated {formatDate(repo.updated_at)}
        </div>
      </div>
      
      <div className="flex gap-3 mt-4">
        <Button
          href={repo.html_url}
          isExternal
          size="sm"
          className="flex items-center gap-2 flex-1 justify-center"
        >
          <FiGithub className="w-4 h-4" /> View Code
        </Button>
        
        {repo.homepage && (
          <Button
            href={repo.homepage}
            isExternal
            variant="outline"
            size="sm"
            className="flex items-center gap-2 flex-1 justify-center"
          >
            <FiExternalLink className="w-4 h-4" /> Live Demo
          </Button>
        )}
      </div>
    </motion.div>
  );
} 