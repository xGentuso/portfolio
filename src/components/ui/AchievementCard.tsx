import { motion } from "framer-motion";
import { IconType } from "react-icons";
import { FiAward, FiCode, FiGithub, FiStar } from "react-icons/fi";
import { cn } from "@/lib/utils";

interface AchievementCardProps {
  title: string;
  description: string;
  metric?: string;
  icon?: IconType;
  className?: string;
  link?: string;
}

export function AchievementCard({
  title,
  description,
  metric,
  icon: Icon = FiAward,
  className,
  link,
}: AchievementCardProps) {
  const content = (
    <motion.div
      whileHover={{ y: -5 }}
      className={cn(
        "p-6 rounded-xl bg-white dark:bg-gray-800/50 shadow-lg dark:shadow-gray-900/20 border border-gray-100 dark:border-gray-800",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-lg bg-primary-50 dark:bg-primary-900/20">
          <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-1">
            {title}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 text-sm">
            {description}
          </p>
          {metric && (
            <p className="mt-2 text-primary-600 dark:text-primary-400 font-medium">
              {metric}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );

  if (link) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block transition-colors"
      >
        {content}
      </a>
    );
  }

  return content;
} 