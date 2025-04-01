import { cache } from 'react';

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string;
  homepage: string | null;
  stargazers_count: number;
  topics: string[];
  language: string;
  updated_at: string;
}

// Replace with your GitHub username
const GITHUB_USERNAME = 'xGentuso';

// Cache the fetch operation to prevent unnecessary API calls
export const fetchGitHubRepos = cache(async (): Promise<GitHubRepo[]> => {
  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 }, // Revalidate cache every hour
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API request failed with status ${response.status}`);
    }

    const repos = await response.json();
    
    // Filter out forked repositories and sort by updated date
    return repos
      .filter((repo: any) => !repo.fork)
      .map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        html_url: repo.html_url,
        description: repo.description || 'No description provided',
        homepage: repo.homepage,
        stargazers_count: repo.stargazers_count,
        topics: repo.topics || [],
        language: repo.language,
        updated_at: repo.updated_at,
      }));
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
}); 