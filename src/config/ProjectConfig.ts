/**
 * Project Configuration
 * 
 * React Native compatible configuration that hardcodes the project settings
 * while keeping the GitHub token secure through environment variables or backend proxy.
 */

interface ProjectConfig {
  githubAccount: string;
  githubRepo: string;
  projectOwner: string;
  projectName: string;
  githubUrl: string;
}

// Project configuration - safe to include in the app bundle
const PROJECT_CONFIG: ProjectConfig = {
  githubAccount: 'ales27pm',
  githubRepo: 'monVOX',
  projectOwner: 'ales27pm',
  projectName: 'monVOX',
  githubUrl: 'https://github.com/ales27pm/monVOX',
};

// Export project constants for use throughout the app
export const PROJECT_CONSTANTS = {
  NAME: PROJECT_CONFIG.projectName,
  OWNER: PROJECT_CONFIG.projectOwner,
  REPO: PROJECT_CONFIG.githubRepo,
  URL: PROJECT_CONFIG.githubUrl,
  ACCOUNT: PROJECT_CONFIG.githubAccount,
} as const;

// Export the configuration
export const ProjectConfig = PROJECT_CONFIG;

// For GitHub token, we'll use a secure backend proxy approach
// The token should never be stored in the React Native app bundle
export const getSecureGitHubToken = (): string | null => {
  // In a production app, this would make a request to your secure backend
  // which would then use the GitHub token stored server-side
  console.warn('GitHub token access should be implemented via secure backend proxy');
  return null;
};