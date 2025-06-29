/**
 * Mock GitHub Service for Development
 * 
 * Simulates GitHub API responses for development and testing
 * In production, this would be replaced with the real proxy-based service
 */

import { PROJECT_CONSTANTS } from '../config/ProjectConfig';
import { AuditService } from './AuditService';

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

class MockGitHubService {
  private static instance: MockGitHubService;

  public static getInstance(): MockGitHubService {
    if (!MockGitHubService.instance) {
      MockGitHubService.instance = new MockGitHubService();
    }
    return MockGitHubService.instance;
  }

  private constructor() {}

  // Simulate API delay
  private async delay(ms: number = 500): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Get repository information (mocked)
  async getRepository(): Promise<GitHubRepo> {
    await this.delay();
    
    AuditService.getInstance().log('memory_write', 'Mock GitHub API: getRepository');
    
    return {
      name: PROJECT_CONSTANTS.REPO,
      full_name: `${PROJECT_CONSTANTS.OWNER}/${PROJECT_CONSTANTS.REPO}`,
      description: 'Privacy-first AI assistant built with React Native - monVOX',
      html_url: PROJECT_CONSTANTS.URL,
      clone_url: `${PROJECT_CONSTANTS.URL}.git`,
      ssh_url: `git@github.com:${PROJECT_CONSTANTS.OWNER}/${PROJECT_CONSTANTS.REPO}.git`,
      private: false,
      created_at: '2024-01-01T00:00:00Z',
      updated_at: new Date().toISOString(),
      stargazers_count: Math.floor(Math.random() * 100) + 10,
      forks_count: Math.floor(Math.random() * 20) + 2,
    };
  }

  // Create a new issue (mocked)
  async createIssue(title: string, body: string, labels?: string[]): Promise<GitHubIssue> {
    await this.delay();
    
    AuditService.getInstance().log('memory_write', `Mock GitHub: Created issue "${title}"`);
    
    return {
      id: Date.now(),
      number: Math.floor(Math.random() * 1000) + 1,
      title,
      body,
      state: 'open',
      html_url: `${PROJECT_CONSTANTS.URL}/issues/${Math.floor(Math.random() * 1000) + 1}`,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  }

  // Get repository issues (mocked)
  async getIssues(state: 'open' | 'closed' | 'all' = 'open'): Promise<GitHubIssue[]> {
    await this.delay();
    
    AuditService.getInstance().log('memory_write', `Mock GitHub: getIssues (${state})`);
    
    const mockIssues: GitHubIssue[] = [
      {
        id: 1,
        number: 1,
        title: 'Implement Core ML integration for local LLM',
        body: 'Add native Core ML support for on-device inference',
        state: 'open',
        html_url: `${PROJECT_CONSTANTS.URL}/issues/1`,
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      },
      {
        id: 2,
        number: 2,
        title: 'Add voice wake-word detection',
        body: 'Implement always-on wake-word detection using native audio processing',
        state: 'open',
        html_url: `${PROJECT_CONSTANTS.URL}/issues/2`,
        created_at: '2024-01-02T00:00:00Z',
        updated_at: '2024-01-02T00:00:00Z',
      },
      {
        id: 3,
        number: 3,
        title: 'Performance optimization for streaming responses',
        body: 'Optimize token-by-token streaming for better UX',
        state: state === 'closed' ? 'closed' : 'open',
        html_url: `${PROJECT_CONSTANTS.URL}/issues/3`,
        created_at: '2024-01-03T00:00:00Z',
        updated_at: '2024-01-03T00:00:00Z',
      },
    ];

    return state === 'all' ? mockIssues : mockIssues.filter(issue => issue.state === state);
  }

  // Get releases (mocked)
  async getReleases(): Promise<GitHubRelease[]> {
    await this.delay();
    
    AuditService.getInstance().log('memory_write', 'Mock GitHub: getReleases');
    
    return [
      {
        id: 1,
        tag_name: 'v1.0.0',
        name: 'monVOX v1.0.0 - Privacy-First AI Assistant',
        body: 'Initial release of monVOX React Native with full privacy architecture',
        published_at: '2024-01-01T00:00:00Z',
        html_url: `${PROJECT_CONSTANTS.URL}/releases/tag/v1.0.0`,
      },
      {
        id: 2,
        tag_name: 'v0.9.0-beta',
        name: 'Beta Release - Core Features',
        body: 'Beta release with streaming chat, biometric auth, and feature flags',
        published_at: '2023-12-15T00:00:00Z',
        html_url: `${PROJECT_CONSTANTS.URL}/releases/tag/v0.9.0-beta`,
      },
    ];
  }

  // Create a release (mocked)
  async createRelease(
    tagName: string, 
    name: string, 
    body: string, 
    prerelease: boolean = false
  ): Promise<GitHubRelease> {
    await this.delay();
    
    AuditService.getInstance().log('memory_write', `Mock GitHub: Created release "${name}"`);
    
    return {
      id: Date.now(),
      tag_name: tagName,
      name,
      body,
      published_at: new Date().toISOString(),
      html_url: `${PROJECT_CONSTANTS.URL}/releases/tag/${tagName}`,
    };
  }

  // Get repository statistics (mocked)
  async getRepoStats(): Promise<{
    stars: number;
    forks: number;
    issues: number;
    lastUpdate: string;
  }> {
    await this.delay(200);
    
    const repo = await this.getRepository();
    const openIssues = await this.getIssues('open');
    
    return {
      stars: repo.stargazers_count || 0,
      forks: repo.forks_count || 0,
      issues: openIssues.length,
      lastUpdate: repo.updated_at,
    };
  }

  // Check if GitHub integration is available (always true for mock)
  async isAvailable(): Promise<boolean> {
    await this.delay(100);
    return true;
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

export default MockGitHubService;