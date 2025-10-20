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
import { StreamingTelemetry } from "./streamingStatusBar";

/**
 * Circuit breaker states
 */
export enum CircuitState {
  CLOSED = 'CLOSED',       // Normal operation, requests go through
  OPEN = 'OPEN',           // Too many failures, blocking requests
  HALF_OPEN = 'HALF_OPEN'  // Testing if service recovered
}

/**
 * Circuit breaker configuration
 */
export interface CircuitBreakerConfig {
  /** Number of consecutive failures before opening circuit */
  failureThreshold: number;
  /** Time in ms to wait before attempting recovery */
  resetTimeout: number;
  /** Number of successful requests needed to close circuit */
  successThreshold: number;
}

/**
 * Circuit Breaker pattern implementation for streaming services
 * Prevents cascading failures by temporarily blocking requests to failing services
 */
export class CircuitBreaker {
  private state: CircuitState = CircuitState.CLOSED;
  private failureCount: number = 0;
  private successCount: number = 0;
  private nextAttemptTime: number = 0;
  private lastErrorMessage: string = '';

  constructor(
    private readonly serviceName: string,
    private readonly config: CircuitBreakerConfig
  ) {}

  /**
   * Get current circuit state
   */
  getState(): CircuitState {
    return this.state;
  }

  /**
   * Check if request should be allowed
   * @throws Error if circuit is open
   */
  async beforeRequest(): Promise<void> {
    const now = Date.now();

    switch (this.state) {
      case CircuitState.OPEN:
        if (now >= this.nextAttemptTime) {
          // Time to try recovery
          console.log(`[Circuit Breaker] ${this.serviceName}: Entering HALF_OPEN state for recovery test`);
          this.state = CircuitState.HALF_OPEN;
          this.successCount = 0;
          StreamingTelemetry.logCircuitBreakerTrip(this.serviceName, 'HALF_OPEN', {
            reason: 'reset_timeout_elapsed'
          });
        } else {
          const remainingSeconds = Math.ceil((this.nextAttemptTime - now) / 1000);
          const errorMsg = `Service temporarily unavailable (circuit breaker open). Retry in ${remainingSeconds}s. Last error: ${this.lastErrorMessage}`;
          console.warn(`[Circuit Breaker] ${this.serviceName}: Request blocked - ${errorMsg}`);

          // Show user-friendly message
          vscode.window.showWarningMessage(
            `${this.serviceName} is temporarily unavailable. Will retry automatically in ${remainingSeconds} seconds.`,
            'Dismiss'
          );

          throw new Error(errorMsg);
        }
        break;

      case CircuitState.HALF_OPEN:
        // Allow request to test recovery
        console.log(`[Circuit Breaker] ${this.serviceName}: Testing recovery in HALF_OPEN state`);
        break;

      case CircuitState.CLOSED:
        // Normal operation
        break;
    }
  }

  /**
   * Record successful request
   */
  onSuccess(): void {
    this.failureCount = 0;
    this.lastErrorMessage = '';

    if (this.state === CircuitState.HALF_OPEN) {
      this.successCount++;
      console.log(`[Circuit Breaker] ${this.serviceName}: Success in HALF_OPEN (${this.successCount}/${this.config.successThreshold})`);

      if (this.successCount >= this.config.successThreshold) {
        // Enough successes to close circuit
        console.log(`[Circuit Breaker] ${this.serviceName}: Closing circuit - service recovered`);
        this.state = CircuitState.CLOSED;
        this.successCount = 0;

        StreamingTelemetry.logCircuitBreakerTrip(this.serviceName, 'CLOSED', {
          reason: 'recovery_successful',
          successCount: this.successCount
        });

        vscode.window.showInformationMessage(
          `${this.serviceName} connection restored`,
          'Dismiss'
        );
      }
    }
  }

  /**
   * Record failed request
   */
  onFailure(error: Error): void {
    this.failureCount++;
    this.lastErrorMessage = error.message;

    console.warn(`[Circuit Breaker] ${this.serviceName}: Failure ${this.failureCount}/${this.config.failureThreshold} - ${error.message}`);

    if (this.state === CircuitState.HALF_OPEN) {
      // Failed during recovery test - reopen circuit
      console.error(`[Circuit Breaker] ${this.serviceName}: Recovery test failed - reopening circuit`);
      this.openCircuit();
    } else if (this.failureCount >= this.config.failureThreshold) {
      // Too many failures - open circuit
      this.openCircuit();
    }
  }

  /**
   * Open the circuit
   */
  private openCircuit(): void {
    this.state = CircuitState.OPEN;
    this.nextAttemptTime = Date.now() + this.config.resetTimeout;
    this.successCount = 0;

    const resetMinutes = Math.ceil(this.config.resetTimeout / 60000);
    console.error(`[Circuit Breaker] ${this.serviceName}: Opening circuit - will retry in ${resetMinutes} minutes`);

    StreamingTelemetry.logCircuitBreakerTrip(this.serviceName, 'OPEN', {
      failureCount: this.failureCount,
      lastError: this.lastErrorMessage,
      resetTimeout: this.config.resetTimeout
    });

    vscode.window.showErrorMessage(
      `${this.serviceName} is experiencing issues. Streaming temporarily disabled for ${resetMinutes} minute(s). Will retry automatically.`,
      'Dismiss'
    );
  }

  /**
   * Reset circuit to closed state (for testing or manual recovery)
   */
  reset(): void {
    console.log(`[Circuit Breaker] ${this.serviceName}: Manual reset`);
    this.state = CircuitState.CLOSED;
    this.failureCount = 0;
    this.successCount = 0;
    this.nextAttemptTime = 0;
    this.lastErrorMessage = '';
  }

  /**
   * Get circuit breaker status for debugging
   */
  getStatus(): {
    state: CircuitState;
    failureCount: number;
    successCount: number;
    nextAttemptTime: number;
    lastError: string;
  } {
    return {
      state: this.state,
      failureCount: this.failureCount,
      successCount: this.successCount,
      nextAttemptTime: this.nextAttemptTime,
      lastError: this.lastErrorMessage,
    };
  }
}

/**
 * Global circuit breakers for each service
 */
const circuitBreakers = new Map<string, CircuitBreaker>();

/**
 * Get or create circuit breaker for a service
 */
export function getCircuitBreaker(
  serviceName: string,
  config?: CircuitBreakerConfig
): CircuitBreaker {
  if (!circuitBreakers.has(serviceName)) {
    const defaultConfig: CircuitBreakerConfig = {
      failureThreshold: 3,      // Open after 3 consecutive failures
      resetTimeout: 60000,      // Try recovery after 1 minute
      successThreshold: 2,      // Need 2 successes to fully recover
    };

    circuitBreakers.set(
      serviceName,
      new CircuitBreaker(serviceName, config || defaultConfig)
    );
  }

  return circuitBreakers.get(serviceName)!;
}

/**
 * Reset all circuit breakers (for testing)
 */
export function resetAllCircuitBreakers(): void {
  circuitBreakers.forEach((breaker) => breaker.reset());
}
