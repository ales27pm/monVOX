/**
 * Performance optimization utilities for monVOX
 */

import { PerformanceMetric } from '../types/service';

/**
 * Debounce function calls to prevent excessive execution
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate = false
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;
  
  return function (this: any, ...args: Parameters<T>) {
    const callNow = immediate && !timeout;
    
    if (timeout) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(() => {
      timeout = null;
      if (!immediate) func.apply(this, args);
    }, wait);
    
    if (callNow) func.apply(this, args);
  };
}

/**
 * Throttle function calls to limit execution frequency
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean = false;
  
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * Memoize function results for performance optimization
 */
export function memoize<T extends (...args: any[]) => any>(
  func: T,
  maxSize = 100
): T {
  const cache = new Map<string, ReturnType<T>>();
  
  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    
    const result = func(...args);
    
    // Implement LRU cache behavior
    if (cache.size >= maxSize) {
      const firstKey = cache.keys().next().value;
      if (firstKey !== undefined) {
        cache.delete(firstKey);
      }
    }
    
    cache.set(key, result);
    return result;
  }) as T;
}

/**
 * Measure function execution time
 */
export function measureExecutionTime<T>(
  func: () => T,
  name?: string
): { result: T; executionTime: number } {
  const startTime = performance.now();
  const result = func();
  const executionTime = performance.now() - startTime;
  
  if (name && __DEV__) {
    console.log(`⏱️ ${name}: ${executionTime.toFixed(2)}ms`);
  }
  
  return { result, executionTime };
}

/**
 * Async version of measureExecutionTime
 */
export async function measureAsyncExecutionTime<T>(
  func: () => Promise<T>,
  name?: string
): Promise<{ result: T; executionTime: number }> {
  const startTime = performance.now();
  const result = await func();
  const executionTime = performance.now() - startTime;
  
  if (name && __DEV__) {
    console.log(`⏱️ ${name}: ${executionTime.toFixed(2)}ms`);
  }
  
  return { result, executionTime };
}

/**
 * Batch function calls to reduce overhead
 */
export class BatchProcessor<T> {
  private batch: T[] = [];
  private batchSize: number;
  private flushInterval: number;
  private processor: (items: T[]) => Promise<void>;
  private timer: NodeJS.Timeout | null = null;

  constructor(
    processor: (items: T[]) => Promise<void>,
    batchSize = 10,
    flushInterval = 1000
  ) {
    this.processor = processor;
    this.batchSize = batchSize;
    this.flushInterval = flushInterval;
  }

  add(item: T): void {
    this.batch.push(item);
    
    if (this.batch.length >= this.batchSize) {
      this.flush();
    } else if (!this.timer) {
      this.timer = setTimeout(() => this.flush(), this.flushInterval);
    }
  }

  async flush(): Promise<void> {
    if (this.batch.length === 0) return;
    
    const itemsToProcess = [...this.batch];
    this.batch = [];
    
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    
    try {
      await this.processor(itemsToProcess);
    } catch (error) {
      console.error('Batch processing failed:', error);
      // Re-add items to batch for retry
      this.batch.unshift(...itemsToProcess);
    }
  }
}

/**
 * Memory usage monitoring
 */
export class MemoryMonitor {
  private static instance: MemoryMonitor;
  private measurements: number[] = [];
  private maxMeasurements = 100;

  static getInstance(): MemoryMonitor {
    if (!MemoryMonitor.instance) {
      MemoryMonitor.instance = new MemoryMonitor();
    }
    return MemoryMonitor.instance;
  }

  recordMemoryUsage(): void {
    if (typeof performance !== 'undefined' && 'memory' in performance) {
      const memory = (performance as any).memory;
      if (memory && typeof memory.usedJSHeapSize === 'number') {
        const usage = memory.usedJSHeapSize;
        this.measurements.push(usage);
        
        if (this.measurements.length > this.maxMeasurements) {
          this.measurements.shift();
        }
      }
    }
  }

  getMemoryStats(): {
    current: number;
    average: number;
    peak: number;
    trend: 'increasing' | 'decreasing' | 'stable';
  } {
    if (this.measurements.length === 0) {
      return { current: 0, average: 0, peak: 0, trend: 'stable' };
    }

    const current = this.measurements[this.measurements.length - 1];
    const average = this.measurements.reduce((a, b) => a + b, 0) / this.measurements.length;
    const peak = Math.max(...this.measurements);
    
    // Calculate trend based on recent measurements
    const recentCount = Math.min(10, this.measurements.length);
    const recent = this.measurements.slice(-recentCount);
    const firstHalf = recent.slice(0, Math.floor(recentCount / 2));
    const secondHalf = recent.slice(Math.floor(recentCount / 2));
    
    const firstAvg = firstHalf.reduce((a, b) => a + b, 0) / firstHalf.length;
    const secondAvg = secondHalf.reduce((a, b) => a + b, 0) / secondHalf.length;
    
    let trend: 'increasing' | 'decreasing' | 'stable' = 'stable';
    const threshold = average * 0.05; // 5% threshold
    
    if (secondAvg > firstAvg + threshold) {
      trend = 'increasing';
    } else if (secondAvg < firstAvg - threshold) {
      trend = 'decreasing';
    }

    return { current, average, peak, trend };
  }
}

/**
 * Simple LRU Cache implementation
 */
export class LRUCache<K, V> {
  private cache = new Map<K, V>();
  private maxSize: number;

  constructor(maxSize: number) {
    this.maxSize = maxSize;
  }

  get(key: K): V | undefined {
    const value = this.cache.get(key);
    if (value !== undefined) {
      // Move to end (most recent)
      this.cache.delete(key);
      this.cache.set(key, value);
    }
    return value;
  }

  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.maxSize) {
      // Remove least recently used (first item)  
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }
    this.cache.set(key, value);
  }

  has(key: K): boolean {
    return this.cache.has(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

/**
 * Task queue for managing async operations
 */
export class TaskQueue {
  private queue: Array<() => Promise<any>> = [];
  private running = false;
  private concurrency: number;
  private activeCount = 0;

  constructor(concurrency = 1) {
    this.concurrency = concurrency;
  }

  add<T>(task: () => Promise<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.queue.push(async () => {
        try {
          const result = await task();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
      
      this.process();
    });
  }

  private async process(): Promise<void> {
    if (this.activeCount >= this.concurrency || this.queue.length === 0) {
      return;
    }

    this.activeCount++;
    const task = this.queue.shift()!;
    
    try {
      await task();
    } catch (error) {
      console.error('Task queue error:', error);
    } finally {
      this.activeCount--;
      this.process(); // Process next task
    }
  }

  clear(): void {
    this.queue = [];
  }

  size(): number {
    return this.queue.length;
  }
}

/**
 * Performance budget checker
 */
export class PerformanceBudget {
  private budgets: Map<string, number> = new Map();

  setBudget(operation: string, maxTimeMs: number): void {
    this.budgets.set(operation, maxTimeMs);
  }

  checkBudget(operation: string, actualTimeMs: number): {
    withinBudget: boolean;
    budget: number;
    actual: number;
    percentage: number;
  } {
    const budget = this.budgets.get(operation) || Infinity;
    const withinBudget = actualTimeMs <= budget;
    const percentage = (actualTimeMs / budget) * 100;

    return {
      withinBudget,
      budget,
      actual: actualTimeMs,
      percentage
    };
  }
}