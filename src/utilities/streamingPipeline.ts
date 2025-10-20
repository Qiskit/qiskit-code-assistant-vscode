/**
* This code is part of Qiskit.
*
* (C) Copyright IBM 2025.
*
* This code is licensed under the Apache License, Version 2.0. You may
* obtain a copy of this license in the LICENSE.txt file in the root directory
* of this source tree or at http://www.apache.org/licenses/LICENSE-2.0.
*
* Any modifications or derivative works of this code must retain this
* copyright notice, and modified files need to carry a notice indicating
* that they have been altered from the originals.
*/

import * as vscode from "vscode";

/**
 * Debug logger for streaming operations
 */
function debugLog(message: string, data?: any): void {
  const config = vscode.workspace.getConfiguration("qiskitCodeAssistant");
  const debugEnabled = config.get<boolean>("streamingDebug") ?? false;

  if (debugEnabled) {
    if (data !== undefined) {
      console.log(`[Streaming Debug] ${message}`, data);
    } else {
      console.log(`[Streaming Debug] ${message}`);
    }
  }
}

/**
 * Streaming metrics for performance tracking
 */
export interface StreamingMetrics {
  totalChunks: number;
  totalBytes: number;
  duration: number;
  errors: number;
  averageChunkSize: number;
  startTime: number;
  endTime: number;
}

/**
 * Options for configuring the streaming pipeline
 */
export interface StreamingPipelineOptions<T> {
  /** AbortSignal for cancellation */
  signal?: AbortSignal;
  /** Enable metrics collection */
  enableMetrics?: boolean;
  /** Buffer size for batch processing */
  bufferSize?: number;
  /** Callback invoked for each chunk */
  onChunk?: (chunk: T, index: number) => void;
  /** Callback invoked on completion */
  onComplete?: (metrics: StreamingMetrics) => void;
  /** Callback invoked on error */
  onError?: (error: unknown) => void;
}

/**
 * Unified streaming pipeline for processing async generators with monitoring,
 * error handling, and performance tracking.
 */
export class StreamingPipeline<T> {
  private readonly startTime: number;
  private metrics: StreamingMetrics;

  constructor(
    private readonly generator: AsyncGenerator<T>,
    private readonly options: StreamingPipelineOptions<T> = {}
  ) {
    this.startTime = Date.now();
    this.metrics = {
      totalChunks: 0,
      totalBytes: 0,
      duration: 0,
      errors: 0,
      averageChunkSize: 0,
      startTime: this.startTime,
      endTime: 0,
    };
  }

  /**
   * Process the stream with monitoring and error handling
   */
  async *process(): AsyncGenerator<T> {
    const buffer: T[] = [];
    let chunkIndex = 0;

    debugLog('StreamingPipeline started', {
      enableMetrics: this.options.enableMetrics,
      bufferSize: this.options.bufferSize ?? 1,
      hasSignal: !!this.options.signal
    });

    try {
      for await (const chunk of this.generator) {
        // Check for cancellation
        if (this.options.signal?.aborted) {
          debugLog('Streaming cancelled by abort signal');
          console.log('Streaming cancelled by abort signal');
          return;
        }

        // Update metrics
        if (this.options.enableMetrics) {
          this.metrics.totalChunks++;
          const chunkSize = JSON.stringify(chunk).length;
          this.metrics.totalBytes += chunkSize;

          debugLog(`Chunk ${this.metrics.totalChunks}`, {
            size: chunkSize,
            totalBytes: this.metrics.totalBytes,
            bufferLength: buffer.length
          });
        }

        // Invoke chunk callback
        this.options.onChunk?.(chunk, chunkIndex++);

        // Buffer management
        buffer.push(chunk);
        if (buffer.length >= (this.options.bufferSize ?? 1)) {
          debugLog(`Yielding ${buffer.length} chunks from buffer`);
          yield* buffer.splice(0);
        }
      }

      // Yield remaining buffered items
      if (buffer.length > 0) {
        debugLog(`Yielding final ${buffer.length} chunks from buffer`);
        yield* buffer;
      }

      // Finalize metrics
      this.metrics.endTime = Date.now();
      this.metrics.duration = this.metrics.endTime - this.metrics.startTime;
      if (this.metrics.totalChunks > 0) {
        this.metrics.averageChunkSize = this.metrics.totalBytes / this.metrics.totalChunks;
      }

      debugLog('StreamingPipeline completed', {
        totalChunks: this.metrics.totalChunks,
        totalBytes: this.metrics.totalBytes,
        duration: this.metrics.duration,
        averageChunkSize: this.metrics.averageChunkSize
      });

      // Invoke completion callback
      this.options.onComplete?.(this.metrics);
    } catch (error) {
      this.metrics.errors++;
      this.metrics.endTime = Date.now();
      this.metrics.duration = this.metrics.endTime - this.metrics.startTime;

      debugLog('StreamingPipeline error', {
        error: error instanceof Error ? error.message : String(error),
        metrics: this.metrics
      });

      // Invoke error callback
      this.options.onError?.(error);
      throw error;
    }
  }

  /**
   * Get current metrics snapshot
   */
  getMetrics(): StreamingMetrics {
    return { ...this.metrics };
  }
}

/**
 * SSE (Server-Sent Events) parser with proper partial chunk buffering
 */
export class SSEParser<T = any> {
  private buffer: string = '';
  private hasShownWarning: boolean = false;

  constructor(private readonly dataPrefix: string = 'data: ') {}

  /**
   * Parse SSE chunks with proper handling of partial messages
   */
  async *parse(streamGenerator: AsyncGenerator<string>): AsyncGenerator<T> {
    debugLog('SSEParser started', { dataPrefix: this.dataPrefix });
    let chunkCount = 0;

    for await (const chunk of streamGenerator) {
      chunkCount++;
      debugLog(`SSEParser raw chunk ${chunkCount}`, {
        size: chunk.length,
        preview: chunk.substring(0, 100)
      });

      // Accumulate chunk into buffer
      this.buffer += chunk;

      // Split by newlines
      const lines = this.buffer.split('\n');

      // Keep last incomplete line in buffer
      this.buffer = lines.pop() || '';

      // Process complete lines
      for (const line of lines) {
        const trimmedLine = line.trim();

        if (trimmedLine === '') {
          // Empty line - SSE message boundary
          continue;
        }

        if (trimmedLine.startsWith(this.dataPrefix)) {
          try {
            const jsonStr = trimmedLine.substring(this.dataPrefix.length);
            debugLog('Parsing SSE JSON', { length: jsonStr.length });
            const parsed = JSON.parse(jsonStr) as T;
            yield parsed;
          } catch (error) {
            debugLog('SSE parse error', {
              line: trimmedLine,
              error: error instanceof Error ? error.message : String(error)
            });
            console.error(`Failed to parse SSE message: ${trimmedLine}`, error);
            // Report to user for debugging (only once per parser instance to avoid spam)
            if (!this.hasShownWarning) {
              this.hasShownWarning = true;
              vscode.window
                .showWarningMessage(
                  `Received malformed data from service. Streaming may be incomplete.`,
                  'Details'
                )
                .then(selection => {
                  if (selection === 'Details') {
                    console.error('Malformed SSE chunk details:', { line: trimmedLine, error });
                  }
                });
            }
          }
        }
      }
    }

    // Process any remaining buffered data
    if (this.buffer.trim()) {
      const trimmedBuffer = this.buffer.trim();
      if (trimmedBuffer.startsWith(this.dataPrefix)) {
        try {
          const jsonStr = trimmedBuffer.substring(this.dataPrefix.length);
          const parsed = JSON.parse(jsonStr) as T;
          yield parsed;
        } catch (error) {
          console.warn('Incomplete final chunk in buffer:', trimmedBuffer);
        }
      }
    }

    // Clear buffer
    this.buffer = '';
  }

  /**
   * Reset the parser state
   */
  reset(): void {
    this.buffer = '';
    this.hasShownWarning = false;
  }
}

/**
 * Debouncer for rate-limiting function calls
 */
export class Debouncer {
  private timeout?: NodeJS.Timeout;

  constructor(private readonly delay: number = 100) {}

  /**
   * Debounce a function call
   */
  debounce(fn: () => void): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    this.timeout = setTimeout(fn, this.delay);
  }

  /**
   * Cancel pending debounced call
   */
  cancel(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = undefined;
    }
  }

  /**
   * Execute immediately and cancel pending
   */
  flush(fn: () => void): void {
    this.cancel();
    fn();
  }
}

/**
 * LRU Cache implementation for completion items
 */
export class LRUCache<K, V> {
  private cache: Map<K, V>;
  private timestamps: Map<K, number>;

  constructor(
    private readonly maxSize: number = 100,
    private readonly ttl: number = 5000 // milliseconds
  ) {
    this.cache = new Map();
    this.timestamps = new Map();
  }

  /**
   * Get item from cache
   */
  get(key: K): V | undefined {
    const item = this.cache.get(key);
    if (item) {
      // Update access time
      this.timestamps.set(key, Date.now());
      return item;
    }
    return undefined;
  }

  /**
   * Set item in cache with eviction if needed
   */
  set(key: K, value: V): void {
    // Evict expired items
    this.evictExpired();

    // Evict oldest if at capacity
    if (!this.cache.has(key) && this.cache.size >= this.maxSize) {
      this.evictOldest();
    }

    this.cache.set(key, value);
    this.timestamps.set(key, Date.now());
  }

  /**
   * Check if key exists
   */
  has(key: K): boolean {
    return this.cache.has(key);
  }

  /**
   * Delete item from cache
   */
  delete(key: K): boolean {
    this.timestamps.delete(key);
    return this.cache.delete(key);
  }

  /**
   * Clear entire cache
   */
  clear(): void {
    this.cache.clear();
    this.timestamps.clear();
  }

  /**
   * Get cache size
   */
  get size(): number {
    return this.cache.size;
  }

  /**
   * Get all keys
   */
  keys(): IterableIterator<K> {
    return this.cache.keys();
  }

  /**
   * Evict expired items based on TTL
   */
  private evictExpired(): void {
    const now = Date.now();
    const keysToDelete: K[] = [];

    for (const [key, timestamp] of this.timestamps.entries()) {
      if (now - timestamp > this.ttl) {
        keysToDelete.push(key);
      }
    }

    for (const key of keysToDelete) {
      this.cache.delete(key);
      this.timestamps.delete(key);
    }
  }

  /**
   * Evict oldest item
   */
  private evictOldest(): void {
    let oldestKey: K | undefined;
    let oldestTime = Infinity;

    for (const [key, timestamp] of this.timestamps.entries()) {
      if (timestamp < oldestTime) {
        oldestTime = timestamp;
        oldestKey = key;
      }
    }

    if (oldestKey !== undefined) {
      this.cache.delete(oldestKey);
      this.timestamps.delete(oldestKey);
    }
  }
}

/**
 * Options for retry execution
 */
export interface RetryOptions {
  /** Predicate to determine if error should trigger retry */
  shouldRetry?: (error: unknown) => boolean;
  /** Callback invoked on each retry attempt */
  onRetry?: (attempt: number, error: unknown) => void;
}

/**
 * Retry helper with exponential backoff
 */
export class RetryHelper {
  constructor(
    private readonly maxRetries: number = 2,
    private readonly baseDelay: number = 1000
  ) {}

  /**
   * Execute function with retry logic
   */
  async execute<T>(fn: () => Promise<T>, options: RetryOptions = {}): Promise<T> {
    let lastError: unknown;

    debugLog('RetryHelper started', {
      maxRetries: this.maxRetries,
      baseDelay: this.baseDelay
    });

    for (let attempt = 0; attempt <= this.maxRetries; attempt++) {
      try {
        debugLog(`RetryHelper attempt ${attempt + 1}/${this.maxRetries + 1}`);
        return await fn();
      } catch (error) {
        lastError = error;

        debugLog(`RetryHelper attempt ${attempt + 1} failed`, {
          error: error instanceof Error ? error.message : String(error)
        });

        // Check if we should retry
        if (options.shouldRetry && !options.shouldRetry(lastError)) {
          debugLog('RetryHelper: Error not retryable, throwing');
          throw lastError;
        }

        // Don't retry if we've exhausted attempts
        if (attempt === this.maxRetries) {
          debugLog('RetryHelper: Max retries exhausted, throwing');
          throw lastError;
        }

        // Invoke retry callback
        options.onRetry?.(attempt + 1, lastError);

        // Exponential backoff
        const delay = this.baseDelay * Math.pow(2, attempt);
        debugLog(`RetryHelper: Waiting ${delay}ms before retry`);
        await this.sleep(delay);
      }
    }

    throw lastError;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
