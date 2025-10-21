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

import { setLoadingStatus, setDefaultStatus } from "../statusBar/statusBar";
import { StreamingMetrics } from "./streamingPipeline";

/**
 * Manages streaming status bar with progress indicators
 * Integrates with the main Qiskit Code Assistant status bar
 */
class StreamingStatusBarManager {
  private isActive: boolean = false;
  private updateInterval: NodeJS.Timeout | null = null;

  /**
   * Start showing streaming progress
   * Uses the existing main status bar with spinner
   */
  start(): void {
    // Only call setLoadingStatus if not already active to prevent flickering
    if (!this.isActive) {
      this.isActive = true;
      setLoadingStatus();
    }
    // Note: The main status bar already shows the spinner and model name
    // Example: "Qiskit Code Assistant: model-name $(sync~spin)"
  }

  /**
   * Update streaming progress with character count
   * This is informational only - the main status bar shows the spinner
   */
  updateProgress(_chars: number): void {
    if (!this.isActive) return;
    // The main status bar continues showing the spinner
    // We don't need to update it every chunk - it already shows progress
  }

  /**
   * Complete streaming and restore normal status
   */
  complete(metrics?: StreamingMetrics): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }

    // Only restore status if currently active
    if (this.isActive) {
      this.isActive = false;
      setDefaultStatus();
    }

    // Optionally log metrics for debugging
    if (metrics) {
      const durationSec = (metrics.duration / 1000).toFixed(1);
      const throughput =
        metrics.duration > 0
          ? Math.floor(metrics.totalBytes / (metrics.duration / 1000))
          : 0;
      console.log(
        `Streaming completed: ${metrics.totalBytes} bytes in ${durationSec}s (${throughput} chars/s)`
      );
    }
  }

  /**
   * Show error state
   */
  error(message: string = "Generation failed"): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }

    // Only restore status if currently active (prevents multiple calls)
    if (this.isActive) {
      this.isActive = false;
      setDefaultStatus();
    }

    // Log error
    console.error(`Streaming error: ${message}`);
  }

  /**
   * Hide/cancel streaming indicator
   */
  hide(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }

    // Only restore status if currently active
    if (this.isActive) {
      this.isActive = false;
      setDefaultStatus();
    }
  }

  /**
   * Check if currently active
   */
  get active(): boolean {
    return this.isActive;
  }

  /**
   * Dispose of resources
   */
  dispose(): void {
    this.hide();
  }
}

// Singleton instance
export const streamingStatusBar = new StreamingStatusBarManager();

/**
 * Additional telemetry data
 */
interface TelemetryData {
  [key: string]: any;
}

/**
 * Aggregated streaming metrics for reporting
 */
interface AggregatedStreamingMetrics {
  sessionId: string;
  totalRequests: number;
  successfulRequests: number;
  failedRequests: number;
  totalRetries: number;
  circuitBreakerTrips: number;
  totalBytes: number;
  totalDuration: number;
  averageThroughput: number;
  averageLatency: number;
  errorBreakdown: { [errorType: string]: number };
}

/**
 * Individual streaming event for telemetry
 */
interface StreamingEvent {
  eventType: 'start' | 'chunk' | 'complete' | 'error' | 'retry' | 'timeout' | 'cancel' | 'circuit_breaker';
  timestamp: number;
  operation: string;
  metrics?: StreamingMetrics;
  error?: string;
  additionalData?: TelemetryData;
}

/**
 * Telemetry logger for streaming metrics
 * Provides comprehensive tracking and reporting of streaming operations
 */
export class StreamingTelemetry {
  private static enabled: boolean = true;
  private static sessionId: string = Date.now().toString();
  private static events: StreamingEvent[] = [];
  private static aggregatedMetrics: AggregatedStreamingMetrics = {
    sessionId: this.sessionId,
    totalRequests: 0,
    successfulRequests: 0,
    failedRequests: 0,
    totalRetries: 0,
    circuitBreakerTrips: 0,
    totalBytes: 0,
    totalDuration: 0,
    averageThroughput: 0,
    averageLatency: 0,
    errorBreakdown: {},
  };

  /**
   * Log start of streaming operation
   */
  static logStart(operation: string, additionalData?: TelemetryData): void {
    if (!this.enabled) return;

    this.aggregatedMetrics.totalRequests++;

    const event: StreamingEvent = {
      eventType: 'start',
      timestamp: Date.now(),
      operation,
      additionalData,
    };

    this.events.push(event);
    console.log('[Streaming Telemetry] Start:', operation, additionalData);
  }

  /**
   * Log streaming chunk received
   */
  static logChunk(
    operation: string,
    chunkNumber: number,
    chunkSize: number,
    additionalData?: TelemetryData
  ): void {
    if (!this.enabled) return;

    const event: StreamingEvent = {
      eventType: 'chunk',
      timestamp: Date.now(),
      operation,
      additionalData: {
        chunkNumber,
        chunkSize,
        ...additionalData,
      },
    };

    this.events.push(event);
  }

  /**
   * Log streaming metrics on completion
   */
  static logMetrics(
    operation: string,
    metrics: StreamingMetrics,
    additionalData?: TelemetryData
  ): void {
    if (!this.enabled) return;

    this.aggregatedMetrics.successfulRequests++;
    this.aggregatedMetrics.totalBytes += metrics.totalBytes;
    this.aggregatedMetrics.totalDuration += metrics.duration;

    // Calculate average throughput
    if (this.aggregatedMetrics.successfulRequests > 0) {
      this.aggregatedMetrics.averageThroughput =
        this.aggregatedMetrics.totalBytes / (this.aggregatedMetrics.totalDuration / 1000);
      this.aggregatedMetrics.averageLatency =
        this.aggregatedMetrics.totalDuration / this.aggregatedMetrics.successfulRequests;
    }

    const throughput =
      metrics.duration > 0
        ? (metrics.totalBytes / (metrics.duration / 1000)).toFixed(2)
        : '0';

    const logData = {
      operation,
      totalChunks: metrics.totalChunks,
      totalBytes: metrics.totalBytes,
      duration: metrics.duration,
      errors: metrics.errors,
      averageChunkSize: metrics.averageChunkSize,
      throughput: `${throughput} bytes/s`,
      ...additionalData,
    };

    const event: StreamingEvent = {
      eventType: 'complete',
      timestamp: Date.now(),
      operation,
      metrics,
      additionalData,
    };

    this.events.push(event);
    console.log('[Streaming Metrics]', JSON.stringify(logData, null, 2));
  }

  /**
   * Log streaming error
   */
  static logError(
    operation: string,
    error: Error,
    additionalData?: TelemetryData
  ): void {
    if (!this.enabled) return;

    this.aggregatedMetrics.failedRequests++;

    // Track error breakdown
    const errorType = error.name || 'UnknownError';
    this.aggregatedMetrics.errorBreakdown[errorType] =
      (this.aggregatedMetrics.errorBreakdown[errorType] || 0) + 1;

    const event: StreamingEvent = {
      eventType: 'error',
      timestamp: Date.now(),
      operation,
      error: error.message,
      additionalData,
    };

    this.events.push(event);
    console.error('[Streaming Error]', {
      operation,
      error: error.message,
      stack: error.stack,
      ...additionalData,
    });
  }

  /**
   * Log retry attempt
   */
  static logRetry(
    operation: string,
    retryCount: number,
    maxRetries: number,
    delay: number,
    additionalData?: TelemetryData
  ): void {
    if (!this.enabled) return;

    this.aggregatedMetrics.totalRetries++;

    const event: StreamingEvent = {
      eventType: 'retry',
      timestamp: Date.now(),
      operation,
      additionalData: {
        retryCount,
        maxRetries,
        delay,
        ...additionalData,
      },
    };

    this.events.push(event);
    console.log(`[Streaming Telemetry] Retry ${retryCount}/${maxRetries} after ${delay}ms`);
  }

  /**
   * Log timeout event
   */
  static logTimeout(operation: string, timeout: number, additionalData?: TelemetryData): void {
    if (!this.enabled) return;

    const event: StreamingEvent = {
      eventType: 'timeout',
      timestamp: Date.now(),
      operation,
      additionalData: {
        timeout,
        ...additionalData,
      },
    };

    this.events.push(event);
    console.warn(`[Streaming Telemetry] Timeout after ${timeout}ms`);
  }

  /**
   * Log cancellation event
   */
  static logCancel(operation: string, additionalData?: TelemetryData): void {
    if (!this.enabled) return;

    const event: StreamingEvent = {
      eventType: 'cancel',
      timestamp: Date.now(),
      operation,
      additionalData,
    };

    this.events.push(event);
    console.log('[Streaming Telemetry] Cancelled:', operation);
  }

  /**
   * Log circuit breaker trip
   */
  static logCircuitBreakerTrip(
    operation: string,
    state: 'OPEN' | 'HALF_OPEN' | 'CLOSED',
    additionalData?: TelemetryData
  ): void {
    if (!this.enabled) return;

    if (state === 'OPEN') {
      this.aggregatedMetrics.circuitBreakerTrips++;
    }

    const event: StreamingEvent = {
      eventType: 'circuit_breaker',
      timestamp: Date.now(),
      operation,
      additionalData: {
        state,
        ...additionalData,
      },
    };

    this.events.push(event);
    console.log(`[Streaming Telemetry] Circuit Breaker ${state}:`, operation);
  }

  /**
   * Get aggregated metrics for the current session
   */
  static getAggregatedMetrics(): AggregatedStreamingMetrics {
    return { ...this.aggregatedMetrics };
  }

  /**
   * Get all streaming events
   */
  static getEvents(): StreamingEvent[] {
    return [...this.events];
  }

  /**
   * Get streaming statistics summary
   */
  static getStatistics(): {
    totalRequests: number;
    successRate: string;
    failureRate: string;
    averageThroughput: string;
    averageLatency: string;
    retryRate: string;
    circuitBreakerTrips: number;
    topErrors: Array<{ type: string; count: number }>;
  } {
    const totalRequests = this.aggregatedMetrics.totalRequests || 1; // Avoid division by zero

    const topErrors = Object.entries(this.aggregatedMetrics.errorBreakdown)
      .map(([type, count]) => ({ type, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      totalRequests: this.aggregatedMetrics.totalRequests,
      successRate: ((this.aggregatedMetrics.successfulRequests / totalRequests) * 100).toFixed(2) + '%',
      failureRate: ((this.aggregatedMetrics.failedRequests / totalRequests) * 100).toFixed(2) + '%',
      averageThroughput: this.aggregatedMetrics.averageThroughput.toFixed(2) + ' bytes/s',
      averageLatency: this.aggregatedMetrics.averageLatency.toFixed(2) + ' ms',
      retryRate: ((this.aggregatedMetrics.totalRetries / totalRequests) * 100).toFixed(2) + '%',
      circuitBreakerTrips: this.aggregatedMetrics.circuitBreakerTrips,
      topErrors,
    };
  }

  /**
   * Reset telemetry data (useful for testing or new sessions)
   */
  static reset(): void {
    this.sessionId = Date.now().toString();
    this.events = [];
    this.aggregatedMetrics = {
      sessionId: this.sessionId,
      totalRequests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      totalRetries: 0,
      circuitBreakerTrips: 0,
      totalBytes: 0,
      totalDuration: 0,
      averageThroughput: 0,
      averageLatency: 0,
      errorBreakdown: {},
    };
  }

  /**
   * Enable or disable telemetry
   */
  static setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }

  /**
   * Check if telemetry is enabled
   */
  static isEnabled(): boolean {
    return this.enabled;
  }
}
