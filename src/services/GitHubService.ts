/**
 * GitHub Integration Service
 * 
 * Provides secure GitHub API integration via backend proxy
 * Following the multi-tier secrets management architecture
 * 
 * In development, uses MockGitHubService for testing
 */

import { PROJECT_CONSTANTS } from '../config/ProjectConfig';
import SecretsManager from './SecretsManager';
import { AuditService } from './AuditService';
import MockGitHubService from './MockGitHubService';

interface GitHubRepo {
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  clone_url: string;
  ssh_url: string;
  private: boolean;
  created_at: string;
  updated_at: string;
  stargazers_count?: number;
  forks_count?: number;
}

interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  body: string;
  state: 'open' | 'closed';
  html_url: string;
  created_at: string;
  updated_at: string;
}

interface GitHubRelease {
  id: number;
  tag_name: string;
  name: string;
  body: string;
  published_at: string;
  html_url: string;
}

class GitHubService {
  private static instance: GitHubService;
  private baseUrl = 'https://api.github.com';
  private useMock = __DEV__; // Use mock service in development

  public static getInstance(): GitHubService {
    if (!GitHubService.instance) {
      GitHubService.instance = new GitHubService();
    }
    return GitHubService.instance;
  }

  private constructor() {}

  private async makeAuthenticatedRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
    // Use the secure backend proxy for GitHub API calls
    // This follows the Tier 3 secrets management pattern
    const proxyResponse = await SecretsManager.getInstance().callSecureAPI({
      provider: 'github' as any, // GitHub would need to be added to the proxy
      endpoint: endpoint,
      method: (options.method as any) || 'GET',
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string> || {}),
      },
      body: options.body ? JSON.parse(options.body as string) : undefined,
    });

    if (!proxyResponse.success) {
      throw new Error(`GitHub API proxy error: ${proxyResponse.error}`);
    }

    // Log API usage (but never the token)
    AuditService.getInstance().log(
      'memory_write', 
      `GitHub API call via proxy: ${endpoint}`
    );
    
    return proxyResponse.data;
  }

  // Get repository information
  async getRepository(): Promise<GitHubRepo> {
    if (this.useMock) {
      return MockGitHubService.getInstance().getRepository();
    }
    
    try {
      const repo = await this.makeAuthenticatedRequest(
        `/repos/${PROJECT_CONSTANTS.OWNER}/${PROJECT_CONSTANTS.REPO}`
      );
      return repo;
    } catch (error) {
      console.error('Failed to get repository info:', error);
      throw error;
    }
  }

  // Create a new issue
  async createIssue(title: string, body: string, labels?: string[]): Promise<GitHubIssue> {
    if (this.useMock) {
      return MockGitHubService.getInstance().createIssue(title, body, labels);
    }
    
    try {
      const issue = await this.makeAuthenticatedRequest(
        `/repos/${PROJECT_CONSTANTS.OWNER}/${PROJECT_CONSTANTS.REPO}/issues`,
        {
          method: 'POST',
          body: JSON.stringify({
            title,
            body,
            labels: labels || [],
          }),
        }
      );
      
      AuditService.getInstance().log('memory_write', `Created GitHub issue: ${title}`);
      return issue;
    } catch (error) {
      console.error('Failed to create issue:', error);
      throw error;
    }
  }

  // Get repository issues
  async getIssues(state: 'open' | 'closed' | 'all' = 'open'): Promise<GitHubIssue[]> {
    if (this.useMock) {
      return MockGitHubService.getInstance().getIssues(state);
    }
    
    try {
      const issues = await this.makeAuthenticatedRequest(
        `/repos/${PROJECT_CONSTANTS.OWNER}/${PROJECT_CONSTANTS.REPO}/issues?state=${state}`
      );
      return issues;
    } catch (error) {
      console.error('Failed to get issues:', error);
      throw error;
    }
  }

  // Get releases
  async getReleases(): Promise<GitHubRelease[]> {
    if (this.useMock) {
      return MockGitHubService.getInstance().getReleases();
    }
    
    try {
      const releases = await this.makeAuthenticatedRequest(
        `/repos/${PROJECT_CONSTANTS.OWNER}/${PROJECT_CONSTANTS.REPO}/releases`
      );
      return releases;
    } catch (error) {
      console.error('Failed to get releases:', error);
      throw error;
    }
  }

  // Create a release
  async createRelease(
    tagName: string, 
    name: string, 
    body: string, 
    prerelease: boolean = false
  ): Promise<GitHubRelease> {
    if (this.useMock) {
      return MockGitHubService.getInstance().createRelease(tagName, name, body, prerelease);
    }
    
    try {
      const release = await this.makeAuthenticatedRequest(
        `/repos/${PROJECT_CONSTANTS.OWNER}/${PROJECT_CONSTANTS.REPO}/releases`,
        {
          method: 'POST',
          body: JSON.stringify({
            tag_name: tagName,
            target_commitish: 'main',
            name,
            body,
            draft: false,
            prerelease,
          }),
        }
      );
      
      AuditService.getInstance().log('memory_write', `Created GitHub release: ${name}`);
      return release;
    } catch (error) {
      console.error('Failed to create release:', error);
      throw error;
    }
  }

  // Get repository statistics
  async getRepoStats(): Promise<{
    stars: number;
    forks: number;
    issues: number;
    lastUpdate: string;
  }> {
    if (this.useMock) {
      return MockGitHubService.getInstance().getRepoStats();
    }
    
    try {
      const repo = await this.getRepository();
      const openIssues = await this.getIssues('open');
      
      return {
        stars: repo.stargazers_count || 0,
        forks: repo.forks_count || 0,
        issues: openIssues.length,
        lastUpdate: repo.updated_at,
      };
    } catch (error) {
      console.error('Failed to get repository stats:', error);
      return {
        stars: 0,
        forks: 0,
        issues: 0,
        lastUpdate: new Date().toISOString(),
      };
    }
  }

  // Check if GitHub integration is available
  async isAvailable(): Promise<boolean> {
    if (this.useMock) {
      return MockGitHubService.getInstance().isAvailable();
    }
    
    try {
      // Test with a simple API call via proxy
      await this.makeAuthenticatedRequest('/user');
      return true;
    } catch (error) {
      console.warn('GitHub proxy not available');
      return false;
    }
  }

  // Get project constants (safe to expose)
  getProjectInfo() {
    return {
      name: PROJECT_CONSTANTS.NAME,
      owner: PROJECT_CONSTANTS.OWNER,
      repo: PROJECT_CONSTANTS.REPO,
      url: PROJECT_CONSTANTS.URL,
      account: PROJECT_CONSTANTS.ACCOUNT,
    };
  }
}

export default GitHubService;