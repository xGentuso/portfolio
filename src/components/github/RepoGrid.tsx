"use client";

import { useState } from "react";
import { RepoCard } from "./RepoCard";
import type { GitHubRepo } from "@/lib/github";
import { Button } from "@/components/ui/Button";

interface RepoGridProps {
  repos: GitHubRepo[];
}

export function RepoGrid({ repos }: RepoGridProps) {
  const [displayCount, setDisplayCount] = useState(6);
  
  if (repos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-300">
          No repositories available. Please check back later.
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.slice(0, displayCount).map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>
      
      {repos.length > displayCount && (
        <div className="text-center mt-8">
          <Button 
            onClick={() => setDisplayCount(displayCount + 3)}
            variant="outline"
          >
            Load More Projects
          </Button>
        </div>
      )}
    </div>
  );
} 