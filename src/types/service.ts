/**
 * Service-level type definitions for monVOX
 */

// Performance Monitoring Types
export interface PerformanceMetric {
  name: string;
  value: number;
  timestamp: number;
  category: 'memory' | 'network' | 'computation' | 'ui' | 'battery';
  unit: 'ms' | 'bytes' | 'percent' | 'count';
}

export interface PerformanceSummary {
  averages: {
    coldStartTime: number;
    warmStartTime: number;
    memoryUsage: number;
    apiResponseTime: number;
    inferenceTime: number;
    tokensPerSecond: number;
  };
  counts: {
    totalRequests: number;
    successfulRequests: number;
    failedRequests: number;
    cacheHits: number;
  };
  trends: {
    responseTimeHistory: number[];
    memoryUsageHistory: number[];
    errorRateHistory: number[];
  };
}

// Service Configuration Types
export interface ServiceConfig {
  maxRetries: number;
  timeoutMs: number;
  enableCaching: boolean;
  enableMetrics: boolean;
  enableAuditLogging: boolean;
}

// Authentication Types
export interface BiometricResult {
  success: boolean;
  error?: string;
  biometryType?: 'FaceID' | 'TouchID' | 'Fingerprint' | 'None';
}

export interface AuthenticationOptions {
  promptMessage: string;
  fallbackTitle?: string;
  cancelTitle?: string;
  disableDeviceFallback?: boolean;
}

// Memory Service Types
export interface MemorySearchQuery {
  query: string;
  limit?: number;
  offset?: number;
  dateRange?: {
    start: Date;
    end: Date;
  };
  categories?: string[];
}

export interface MemorySearchResult {
  items: MemoryItem[];
  totalCount: number;
  hasMore: boolean;
  searchTime: number;
}

export interface MemoryItem {
  id: string;
  content: string;
  metadata: Record<string, any>;
  timestamp: number;
  category: string;
  relevanceScore?: number;
}

// LLM Provider Types
export interface LLMHealthCheck {
  provider: string;
  available: boolean;
  responseTime: number;
  errorRate: number;
  lastCheck: number;
}

export interface LLMConfiguration {
  provider: 'openai' | 'anthropic' | 'grok' | 'local';
  model: string;
  maxTokens: number;
  temperature: number;
  streamingEnabled: boolean;
  fallbackEnabled: boolean;
}

// Feature Flag Types
export interface FeatureFlagOverride {
  flagKey: string;
  enabled: boolean;
  reason: string;
  expiresAt?: number;
  targetGroups?: string[];
}

export interface FeatureFlagAnalytics {
  flagKey: string;
  usageCount: number;
  lastUsed: number;
  enabled: boolean;
  userGroups: string[];
}

// Audit Service Types
export type AuditEventType = 
  | 'auth_success' 
  | 'auth_failed' 
  | 'memory_read' 
  | 'memory_write' 
  | 'memory_delete'
  | 'settings_change' 
  | 'panic_wipe' 
  | 'app_error'
  | 'api_call'
  | 'biometric_used'
  | 'data_export'
  | 'data_import';

export interface AuditEvent {
  id: string;
  type: AuditEventType;
  message: string;
  timestamp: number;
  metadata?: Record<string, any>;
  severity: 'low' | 'medium' | 'high' | 'critical';
  userId?: string;
  ipAddress?: string;
}

// Error Handling Types
export interface ServiceError {
  code: string;
  message: string;
  service: string;
  timestamp: number;
  retryable: boolean;
  context?: Record<string, any>;
}

export interface ErrorRecoveryStrategy {
  retryCount: number;
  backoffMs: number;
  fallbackAction?: () => Promise<void>;
  circuitBreakerEnabled: boolean;
}

// Service Status Types
export interface ServiceStatus {
  name: string;
  status: 'healthy' | 'degraded' | 'unhealthy' | 'unknown';
  lastCheck: number;
  version: string;
  dependencies: ServiceDependency[];
  metrics: PerformanceMetric[];
}

export interface ServiceDependency {
  name: string;
  status: 'available' | 'unavailable' | 'timeout';
  responseTime: number;
  required: boolean;
}

// App Configuration Types
export interface AppConfiguration {
  features: Record<string, boolean>;
  services: Record<string, ServiceConfig>;
  security: SecurityConfiguration;
  ui: UIConfiguration;
}

export interface SecurityConfiguration {
  biometricAuthRequired: boolean;
  sessionTimeoutMs: number;
  auditLoggingEnabled: boolean;
  encryptionEnabled: boolean;
  strictLocalMode: boolean;
}

export interface UIConfiguration {
  theme: 'light' | 'dark' | 'auto';
  language: 'fr-CA' | 'en-US';
  animations: boolean;
  accessibilityMode: boolean;
}

// Utility Types
export type Awaitable<T> = T | Promise<T>;
export type NonNullable<T> = T extends null | undefined ? never : T;
export type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> };
export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;