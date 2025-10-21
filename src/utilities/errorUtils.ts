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

/**
 * Determines if an error is retryable (network errors, transient server errors)
 *
 * Retryable errors include:
 * - Network errors (connection failures, timeouts, DNS failures)
 * - Transient 5xx server errors:
 *   - 500 Internal Server Error (often transient)
 *   - 502 Bad Gateway (proxy/gateway issue, usually transient)
 *   - 503 Service Unavailable (server temporarily unavailable, should retry with backoff)
 *   - 504 Gateway Timeout (timeout at gateway, worth retrying)
 *
 * Note: Retries use exponential backoff and circuit breaker to prevent overwhelming
 * an already struggling service.
 */
export function isRetryableError(error: unknown): boolean {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();

    // Network errors - always retryable
    if (message.includes('fetch failed') ||
        message.includes('network') ||
        message.includes('timeout') ||
        message.includes('econnrefused') ||
        message.includes('enotfound')) {
      return true;
    }

    // Transient server errors - retryable with backoff
    // 503 Service Unavailable is explicitly designed for temporary unavailability
    // and should be retried (the circuit breaker prevents overwhelming the service)
    if (message.includes('500') ||
        message.includes('502') ||
        message.includes('503') ||
        message.includes('504')) {
      return true;
    }
  }
  return false;
}
