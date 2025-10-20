# Streaming Code Generation

The Qiskit Code Assistant supports **real-time streaming** for code completions, providing instant feedback as code is generated token-by-token.

## Overview

Streaming allows you to see code suggestions appear in real-time as they're being generated, similar to how modern AI chat interfaces work. This provides a more interactive and responsive experience compared to waiting for the entire completion.

## Streaming Status

Streaming is **enabled by default** starting with this version, providing the best user experience with real-time code generation.

### Disabling Streaming

If you prefer to receive complete code suggestions all at once, you can disable streaming:

1. Open VSCode Settings (`Cmd+,` on Mac or `Ctrl+,` on Windows/Linux)
2. Search for "Qiskit Code Assistant"
3. Uncheck the box for **"Enable Streaming"**

Alternatively, add this to your `settings.json`:

```json
{
  "qiskitCodeAssistant.enableStreaming": false
}
```

## Configuration Options

### Basic Settings

#### Enable Streaming
- **Setting**: `qiskitCodeAssistant.enableStreaming`
- **Type**: Boolean
- **Default**: `true`
- **Description**: Enable real-time streaming of code completions

### Advanced Settings

#### Buffer Size
- **Setting**: `qiskitCodeAssistant.streamingBufferSize`
- **Type**: Number (1-10)
- **Default**: `1`
- **Description**: Number of chunks to buffer before displaying

**When to adjust**:
- Set to `1` for lowest latency (instant feedback)
- Set to `5-10` for smoother rendering on slower networks

#### Retry Attempts
- **Setting**: `qiskitCodeAssistant.streamingRetryAttempts`
- **Type**: Number (0-5)
- **Default**: `2`
- **Description**: Number of automatic retry attempts on network failures

**When to adjust**:
- Increase for unreliable network connections
- Decrease to fail faster on persistent errors

#### Retry Delay
- **Setting**: `qiskitCodeAssistant.streamingRetryDelay`
- **Type**: Number (100-5000 milliseconds)
- **Default**: `1000` (1 second)
- **Description**: Base delay between retry attempts (uses exponential backoff)

**How it works**:
- First retry: waits `retryDelay` ms (e.g., 1000ms)
- Second retry: waits `retryDelay × 2` ms (e.g., 2000ms)
- Third retry: waits `retryDelay × 4` ms (e.g., 4000ms)

#### Timeout
- **Setting**: `qiskitCodeAssistant.streamingTimeout`
- **Type**: Number (5000-120000 milliseconds)
- **Default**: `30000` (30 seconds)
- **Description**: Maximum time to wait for streaming completion

**When to adjust**:
- Increase for complex code generation tasks
- Decrease for faster failure on slow connections
- Set to `0` to disable timeout (not recommended)

### Reliability Settings

#### Circuit Breaker Enabled
- **Setting**: `qiskitCodeAssistant.circuitBreakerEnabled`
- **Type**: Boolean
- **Default**: `true`
- **Description**: Enable circuit breaker pattern to prevent cascading failures

**What it does**:
- Temporarily disables streaming after repeated failures
- Prevents overwhelming a failing service with requests
- Automatically attempts recovery after a timeout period

#### Circuit Breaker Threshold
- **Setting**: `qiskitCodeAssistant.circuitBreakerThreshold`
- **Type**: Number (1-10)
- **Default**: `3`
- **Description**: Number of consecutive failures before circuit opens

**When to adjust**:
- Increase to tolerate more failures before blocking
- Decrease for faster failure detection

#### Circuit Breaker Reset Timeout
- **Setting**: `qiskitCodeAssistant.circuitBreakerResetTimeout`
- **Type**: Number (10000-300000 milliseconds)
- **Default**: `60000` (1 minute)
- **Description**: Time to wait before attempting recovery

**When to adjust**:
- Increase for longer service outages
- Decrease for faster recovery attempts

### Debug Settings

#### Streaming Debug
- **Setting**: `qiskitCodeAssistant.streamingDebug`
- **Type**: Boolean
- **Default**: `false`
- **Description**: Enable detailed debug logging for streaming operations

**What it logs**:
- Chunk counts and sizes
- Parse errors and malformed data
- Retry attempts and backoff delays
- Circuit breaker state changes
- Performance metrics

**When to enable**:
- Troubleshooting streaming issues
- Investigating performance problems
- Reporting bugs to the development team

**Note**: Debug logs appear in the Developer Tools Console (Help → Toggle Developer Tools)

## Telemetry and Metrics

The extension collects comprehensive streaming metrics when telemetry is enabled (`qiskitCodeAssistant.enableTelemetry: true`).

### Collected Metrics

The extension tracks:
- **Request metrics**: Total requests, success/failure rates
- **Performance metrics**: Average throughput (bytes/s), latency (ms)
- **Reliability metrics**: Retry rates, circuit breaker trips
- **Error tracking**: Error types and frequencies
- **Event timeline**: Start, chunk, complete, retry, timeout, circuit breaker state changes

### Accessing Streaming Statistics

You can view aggregated streaming statistics in the Developer Console:

```javascript
// In Developer Tools Console (Help → Toggle Developer Tools)
StreamingTelemetry.getStatistics()
```

**Output example**:
```json
{
  "totalRequests": 25,
  "successRate": "92.00%",
  "failureRate": "8.00%",
  "averageThroughput": "1543.21 bytes/s",
  "averageLatency": "2345.67 ms",
  "retryRate": "12.00%",
  "circuitBreakerTrips": 1,
  "topErrors": [
    { "type": "NetworkError", "count": 2 }
  ]
}
```

### Telemetry Events

All streaming events are logged with timestamps:

- **start**: Streaming request initiated
- **chunk**: Data chunk received (logged per chunk when debug mode enabled)
- **complete**: Streaming completed successfully
- **error**: Error occurred during streaming
- **retry**: Automatic retry attempt
- **timeout**: Request timed out
- **cancel**: Request cancelled by user
- **circuit_breaker**: Circuit breaker state change

### Privacy

- Telemetry is opt-in via `qiskitCodeAssistant.enableTelemetry` setting
- VSCode's global telemetry setting (`telemetry.telemetryLevel`) takes precedence
- No code content is logged, only metadata and performance metrics
- All data is aggregated locally for statistics

## Example Configurations

### Low Latency (Recommended for Fast Networks)
```json
{
  "qiskitCodeAssistant.enableStreaming": true,
  "qiskitCodeAssistant.streamingBufferSize": 1,
  "qiskitCodeAssistant.streamingRetryAttempts": 2,
  "qiskitCodeAssistant.streamingRetryDelay": 1000,
  "qiskitCodeAssistant.streamingTimeout": 30000
}
```

### Optimized for Slow/Unreliable Networks
```json
{
  "qiskitCodeAssistant.enableStreaming": true,
  "qiskitCodeAssistant.streamingBufferSize": 5,
  "qiskitCodeAssistant.streamingRetryAttempts": 3,
  "qiskitCodeAssistant.streamingRetryDelay": 2000,
  "qiskitCodeAssistant.streamingTimeout": 60000
}
```

### Conservative (Fast Failure)
```json
{
  "qiskitCodeAssistant.enableStreaming": true,
  "qiskitCodeAssistant.streamingBufferSize": 1,
  "qiskitCodeAssistant.streamingRetryAttempts": 1,
  "qiskitCodeAssistant.streamingRetryDelay": 500,
  "qiskitCodeAssistant.streamingTimeout": 15000
}
```

## How It Works

When streaming is enabled:

1. **Request Initiated**: You trigger a code completion
2. **Connection Established**: Extension connects to the Qiskit Code Assistant API
3. **Token-by-Token Generation**: Code appears in real-time as it's generated
4. **Visual Feedback**: Status bar shows a spinner during generation
5. **Automatic Retry**: Network failures are automatically retried with exponential backoff
6. **Completion**: Final code appears as an inline suggestion

## Visual Indicators

### Status Bar

The status bar provides real-time feedback:

- **"Qiskit Code Assistant: model-name"** - Ready
- **"Qiskit Code Assistant: model-name $(sync~spin)"** - Generating...
- **"Retrying... (1/2)"** - Automatic retry in progress

### Inline Suggestions

As code streams in, you'll see:
- Ghost text appearing character-by-character
- Smooth, responsive updates
- No flickering or jumps

## Cancellation

You can cancel streaming at any time:

- **Press `ESC`** - Immediately cancels the current completion
- **Start typing** - Automatically cancels and starts a new completion
- **Timeout** - Automatically cancels after the configured timeout

## Error Handling

### Automatic Retry

The extension automatically retries on:
- Network connection failures
- Server temporary errors (500, 502, 503, 504)
- Timeout errors

### No Retry (Immediate Failure)

The extension immediately fails on:
- Authentication errors (401, 403)
- Bad request errors (400, 404)
- Invalid API token

### User Feedback

You'll see warning messages for:
- Network issues with retry status: "Connection issue detected. Retrying... (1/2)"
- Timeout errors: "Streaming request timed out"
- Authentication errors: "API Token is not authorized"

### Circuit Breaker Protection

The circuit breaker automatically protects against repeated failures:

**States**:
1. **CLOSED** (Normal) - Requests flow through normally
2. **OPEN** (Blocked) - Too many failures detected, temporarily blocking requests
3. **HALF_OPEN** (Testing) - Testing if service has recovered

**Behavior**:
- After `circuitBreakerThreshold` consecutive failures, circuit opens
- While open, requests are immediately rejected with a friendly message
- After `circuitBreakerResetTimeout`, circuit enters HALF_OPEN state
- A successful request in HALF_OPEN closes the circuit
- A failed request in HALF_OPEN reopens the circuit

**User Experience**:
- **Circuit Opens**: "Qiskit Code Assistant is experiencing issues. Streaming temporarily disabled for 1 minute(s). Will retry automatically."
- **Circuit Recovers**: "Qiskit Code Assistant connection restored"
- No manual intervention needed - recovery is automatic

## Performance Considerations

### Network Usage

Streaming uses **Server-Sent Events (SSE)** which:
- Maintains an open HTTP connection
- Sends data in small chunks
- Is more efficient than polling

### Memory Usage

The extension efficiently manages memory by:
- Buffering only configured chunks
- Cleaning up completed streams
- Limiting cache size (LRU eviction)

### CPU Usage

Streaming has minimal CPU overhead:
- Async processing (non-blocking)
- Efficient JSON parsing
- Optimized buffer management

## Troubleshooting

### Streaming Not Working

**Symptoms**: No real-time updates, only final completion appears

**Solutions**:
1. Verify `enableStreaming` is `true` in settings
2. Check that your API token is valid
3. Ensure network connectivity
4. Check browser console for errors (Help → Toggle Developer Tools)

### Slow or Choppy Streaming

**Symptoms**: Code appears slowly or in large chunks

**Solutions**:
1. Increase `streamingBufferSize` to 3-5 for smoother rendering
2. Check network bandwidth and latency
3. Increase `streamingTimeout` if timing out prematurely

### Frequent Retries

**Symptoms**: Warning messages about connection issues

**Solutions**:
1. Check network stability
2. Increase `streamingRetryDelay` to reduce server load
3. Verify API service status
4. Check firewall/proxy settings

### Timeouts

**Symptoms**: "Streaming request timed out" errors

**Solutions**:
1. Increase `streamingTimeout` setting
2. Check network latency
3. Reduce input context size (simpler prompts)

### Circuit Breaker Blocking Requests

**Symptoms**: "Service temporarily unavailable (circuit breaker open)" message

**What it means**: The service has experienced repeated failures and the circuit breaker has opened to protect the system.

**Solutions**:
1. **Wait it out**: The circuit will automatically attempt recovery after the reset timeout (default 1 minute)
2. **Check service status**: Verify the backend API is operational
3. **Adjust threshold**: Increase `circuitBreakerThreshold` if failures are temporary/expected
4. **Disable if needed**: Set `circuitBreakerEnabled: false` (not recommended for production)

### Debugging Streaming Issues

**When to enable debug mode**:
- Investigating connection problems
- Understanding retry behavior
- Reporting issues to support

**Steps**:
1. Enable debug logging: Set `qiskitCodeAssistant.streamingDebug: true`
2. Open Developer Tools: Help → Toggle Developer Tools → Console tab
3. Reproduce the issue
4. Review debug logs with `[Streaming Debug]` prefix
5. Look for:
   - Chunk counts and sizes
   - Parse errors
   - Retry attempts
   - Circuit breaker state changes

**Example debug output**:
```
[Streaming Debug] StreamingPipeline started { enableMetrics: true, bufferSize: 1 }
[Streaming Debug] Chunk 1 { size: 156, totalBytes: 156 }
[Streaming Debug] SSEParser raw chunk 1 { size: 200, preview: "data: {...}" }
[Streaming Debug] RetryHelper attempt 1/3
[Circuit Breaker] qiskit-code-assistant: Failure 1/3 - Network error
```

## Best Practices

### For Development

1. **Enable Streaming**: Get immediate feedback on code suggestions
2. **Use Default Settings**: Start with defaults, adjust as needed
3. **Monitor Performance**: Check console logs for metrics

### For Production/Teams

1. **Test Network Conditions**: Verify settings work on team's network
2. **Document Configuration**: Share optimal settings with team
3. **Monitor Errors**: Track retry rates and timeout frequency

### For Slow Networks

1. **Increase Buffer Size**: Reduces visual updates, improves smoothness
2. **Increase Retry Attempts**: Better reliability on flaky connections
3. **Increase Timeout**: Allow more time for completion

## Technical Details

For developers and advanced users interested in the implementation details:

### Architecture

```
User Trigger
    ↓
runCompletion()
    ↓
Service API (CodeAssistant/OpenAI)
    ↓
StreamingPipeline (monitoring, metrics)
    ↓
SSEParser (parse Server-Sent Events)
    ↓
ServiceAPI.runFetchStreaming() (HTTP streaming)
    ↓
Backend API
```

### Key Features

- **Async Generators**: Efficient, memory-safe streaming
- **SSE Protocol**: Standard Server-Sent Events implementation
- **Exponential Backoff**: Smart retry timing
- **AbortController**: Proper cancellation support
- **Metrics Collection**: Performance monitoring
- **Type Safety**: Full TypeScript typing
- **Circuit Breaker Pattern**: Prevents cascading failures
- **Debug Logging**: Detailed troubleshooting information

### Source Files

For technical reference, see:
- `src/utilities/streamingPipeline.ts` - Core streaming infrastructure (StreamingPipeline, SSEParser, RetryHelper, LRUCache, Debouncer)
- `src/utilities/streamingStatusBar.ts` - Status bar integration and telemetry
- `src/utilities/circuitBreaker.ts` - Circuit breaker implementation
- `src/utilities/errorUtils.ts` - Error classification utilities
- `src/services/codeAssistant.ts` - Qiskit API streaming
- `src/services/openAI.ts` - OpenAI API streaming
- `src/test/suite/streamingPipeline.test.ts` - Comprehensive test suite
- `STREAMING.md` - Detailed technical documentation

## FAQ

### Does streaming use more bandwidth?

No. Streaming uses the same amount of data as non-streaming mode. The difference is how the data is transmitted (incrementally vs. all at once).

### Is streaming more reliable?

Yes. Streaming includes automatic retry logic and better error recovery compared to non-streaming mode.

### Can I use streaming offline?

No. Streaming requires an active internet connection to the Qiskit Code Assistant API.

### Will streaming drain my battery faster?

The impact is negligible. Streaming is designed to be efficient with minimal CPU and network overhead.

### Can I disable streaming for specific files?

Currently, streaming is a global setting. You can toggle it on/off in VSCode settings.

## Support

If you encounter issues with streaming:

1. Check this documentation for troubleshooting steps
2. Review the [main README](../README.md) for general setup
3. Report issues at [GitHub Issues](https://github.com/Qiskit/qiskit-code-assistant-vscode/issues)

---

**Note**: Settings changes take effect immediately without requiring an extension reload.
