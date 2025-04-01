import { fetchGitHubRepos } from "@/lib/github";
import { Section } from "@/components/ui/Section";
import { RepoGrid } from "@/components/github/RepoGrid";

export const metadata = {
  title: "Projects | Ryan Mota",
  description: "Explore my projects and coding work pulled directly from GitHub",
};

export default async function ProjectsPage() {
  const repos = await fetchGitHubRepos();
  
  return (
    <Section
      title="My Projects"
      subtitle="Here are my latest projects, pulled directly from GitHub. These showcase my coding style, problem-solving approach, and technical skills."
    >
      <RepoGrid repos={repos} />
    </Section>
  );
} 