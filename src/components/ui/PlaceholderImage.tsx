import { motion } from "framer-motion";

interface PlaceholderImageProps {
  title: string;
  className?: string;
}

export function PlaceholderImage({ title, className = "" }: PlaceholderImageProps) {
  return (
    <motion.div
      className={`relative aspect-video bg-gradient-to-br from-primary-200 to-primary-300 dark:from-primary-800 dark:to-primary-700 rounded-lg overflow-hidden shadow-lg ${className}`}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <h3 className="text-2xl font-bold text-primary-800 dark:text-primary-50 text-center px-4">
          {title}
        </h3>
      </div>
    </motion.div>
  );
} 