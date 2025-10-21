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

import { expect } from 'chai';
import {
  StreamingPipeline,
  SSEParser,
  Debouncer,
  LRUCache,
  RetryHelper,
} from '../../utilities/streamingPipeline';

suite('StreamingPipeline', () => {
  test('should process all chunks from async generator', async () => {
    async function* testGenerator() {
      yield 'chunk1';
      yield 'chunk2';
      yield 'chunk3';
    }

    const pipeline = new StreamingPipeline(testGenerator());
    const results: string[] = [];

    for await (const chunk of pipeline.process()) {
      results.push(chunk);
    }

    expect(results).to.deep.equal(['chunk1', 'chunk2', 'chunk3']);
  });

  test('should invoke chunk callback for each chunk', async () => {
    async function* testGenerator() {
      yield 1;
      yield 2;
      yield 3;
    }

    const chunkIndexes: number[] = [];
    const chunkValues: number[] = [];

    const pipeline = new StreamingPipeline(testGenerator(), {
      onChunk: (chunk, index) => {
        chunkValues.push(chunk);
        chunkIndexes.push(index);
      },
    });

    for await (const _ of pipeline.process()) {
      // Process chunks
    }

    expect(chunkValues).to.deep.equal([1, 2, 3]);
    expect(chunkIndexes).to.deep.equal([0, 1, 2]);
  });

  test('should invoke completion callback with metrics', async () => {
    async function* testGenerator() {
      yield 'test';
    }

    let completionCalled = false;
    let capturedMetrics: any;

    const pipeline = new StreamingPipeline(testGenerator(), {
      enableMetrics: true,
      onComplete: (metrics) => {
        completionCalled = true;
        capturedMetrics = metrics;
      },
    });

    for await (const _ of pipeline.process()) {
      // Process chunks
    }

    expect(completionCalled).to.be.true;
    expect(capturedMetrics.totalChunks).to.equal(1);
    expect(capturedMetrics.duration).to.be.greaterThanOrEqual(0);
  });

  test('should invoke error callback on exception', async () => {
    async function* testGenerator() {
      yield 'chunk1';
      throw new Error('Test error');
    }

    let errorCalled = false;
    let capturedError: any;

    const pipeline = new StreamingPipeline(testGenerator(), {
      onError: (error) => {
        errorCalled = true;
        capturedError = error;
      },
    });

    try {
      for await (const _ of pipeline.process()) {
        // Process chunks
      }
    } catch (error) {
      // Expected error
    }

    expect(errorCalled).to.be.true;
    expect(capturedError).to.be.instanceOf(Error);
    expect((capturedError as Error).message).to.equal('Test error');
  });

  test('should respect abort signal', async () => {
    async function* testGenerator() {
      yield 'chunk1';
      yield 'chunk2';
      yield 'chunk3';
    }

    const controller = new AbortController();
    const pipeline = new StreamingPipeline(testGenerator(), {
      signal: controller.signal,
    });

    const results: string[] = [];
    let iterationCount = 0;

    for await (const chunk of pipeline.process()) {
      results.push(chunk);
      iterationCount++;
      if (iterationCount === 1) {
        controller.abort();
      }
    }

    expect(results).to.have.lengthOf(1);
    expect(results[0]).to.equal('chunk1');
  });

  test('should collect metrics when enabled', async () => {
    async function* testGenerator() {
      yield 'a';
      yield 'bb';
      yield 'ccc';
    }

    const pipeline = new StreamingPipeline(testGenerator(), {
      enableMetrics: true,
    });

    for await (const _ of pipeline.process()) {
      // Process chunks
    }

    const metrics = pipeline.getMetrics();
    expect(metrics.totalChunks).to.equal(3);
    expect(metrics.totalBytes).to.be.greaterThan(0);
    expect(metrics.averageChunkSize).to.be.greaterThan(0);
  });

  test('should buffer chunks based on bufferSize', async () => {
    async function* testGenerator() {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
    }

    const pipeline = new StreamingPipeline(testGenerator(), {
      bufferSize: 2,
    });

    const batches: number[][] = [];
    for await (const chunk of pipeline.process()) {
      batches.push([chunk]);
    }

    expect(batches).to.have.lengthOf(4);
  });
});

suite('SSEParser', () => {
  test('should parse complete SSE messages', async () => {
    async function* testStream() {
      yield 'data: {"value": 1}\n\n';
      yield 'data: {"value": 2}\n\n';
    }

    const parser = new SSEParser();
    const results: any[] = [];

    for await (const chunk of parser.parse(testStream())) {
      results.push(chunk);
    }

    expect(results).to.deep.equal([{ value: 1 }, { value: 2 }]);
  });

  test('should handle partial SSE messages across chunks', async () => {
    async function* testStream() {
      yield 'data: {"va';
      yield 'lue": 42}\n\n';
    }

    const parser = new SSEParser();
    const results: any[] = [];

    for await (const chunk of parser.parse(testStream())) {
      results.push(chunk);
    }

    expect(results).to.deep.equal([{ value: 42 }]);
  });

  test('should handle multiple messages in single chunk', async () => {
    async function* testStream() {
      yield 'data: {"a": 1}\n\ndata: {"b": 2}\n\n';
    }

    const parser = new SSEParser();
    const results: any[] = [];

    for await (const chunk of parser.parse(testStream())) {
      results.push(chunk);
    }

    expect(results).to.deep.equal([{ a: 1 }, { b: 2 }]);
  });

  test('should skip empty lines', async () => {
    async function* testStream() {
      yield 'data: {"x": 1}\n\n\n\ndata: {"y": 2}\n\n';
    }

    const parser = new SSEParser();
    const results: any[] = [];

    for await (const chunk of parser.parse(testStream())) {
      results.push(chunk);
    }

    expect(results).to.deep.equal([{ x: 1 }, { y: 2 }]);
  });

  test('should handle custom data prefix', async () => {
    async function* testStream() {
      yield 'event: {"value": 123}\n\n';
    }

    const parser = new SSEParser('event: ');
    const results: any[] = [];

    for await (const chunk of parser.parse(testStream())) {
      results.push(chunk);
    }

    expect(results).to.deep.equal([{ value: 123 }]);
  });

  test('should handle malformed JSON gracefully', async () => {
    async function* testStream() {
      yield 'data: {invalid json}\n\n';
      yield 'data: {"valid": true}\n\n';
    }

    const parser = new SSEParser();
    const results: any[] = [];

    for await (const chunk of parser.parse(testStream())) {
      results.push(chunk);
    }

    // Only valid JSON should be yielded
    expect(results).to.deep.equal([{ valid: true }]);
  });

  test('should process final buffered data', async () => {
    async function* testStream() {
      yield 'data: {"final": true}';
    }

    const parser = new SSEParser();
    const results: any[] = [];

    for await (const chunk of parser.parse(testStream())) {
      results.push(chunk);
    }

    expect(results).to.deep.equal([{ final: true }]);
  });

  test('should reset buffer state', async () => {
    async function* testStream() {
      yield 'data: {"value": 1}\n\n';
    }

    const parser = new SSEParser();
    const results1: any[] = [];

    for await (const chunk of parser.parse(testStream())) {
      results1.push(chunk);
    }

    parser.reset();

    async function* testStream2() {
      yield 'data: {"value": 2}\n\n';
    }

    const results2: any[] = [];
    for await (const chunk of parser.parse(testStream2())) {
      results2.push(chunk);
    }

    expect(results1).to.deep.equal([{ value: 1 }]);
    expect(results2).to.deep.equal([{ value: 2 }]);
  });
});

suite('Debouncer', () => {
  test('should delay function execution', (done) => {
    const debouncer = new Debouncer(50);
    let executed = false;

    debouncer.debounce(() => {
      executed = true;
      expect(executed).to.be.true;
      done();
    });

    expect(executed).to.be.false;
  });

  test('should cancel previous debounced calls', (done) => {
    const debouncer = new Debouncer(50);
    let count = 0;

    debouncer.debounce(() => {
      count++;
    });

    debouncer.debounce(() => {
      count++;
    });

    debouncer.debounce(() => {
      count++;
      expect(count).to.equal(1);
      done();
    });
  });

  test('should manually cancel debounced call', (done) => {
    const debouncer = new Debouncer(50);
    let executed = false;

    debouncer.debounce(() => {
      executed = true;
    });

    debouncer.cancel();

    setTimeout(() => {
      expect(executed).to.be.false;
      done();
    }, 100);
  });

  test('should flush and execute immediately', () => {
    const debouncer = new Debouncer(1000);
    let executed = false;

    debouncer.flush(() => {
      executed = true;
    });

    expect(executed).to.be.true;
  });
});

suite('LRUCache', () => {
  test('should store and retrieve items', () => {
    const cache = new LRUCache<string, number>();
    cache.set('key1', 100);

    expect(cache.get('key1')).to.equal(100);
  });

  test('should evict oldest item when at capacity', () => {
    const cache = new LRUCache<string, number>(2);
    cache.set('key1', 1);
    cache.set('key2', 2);
    cache.set('key3', 3);

    expect(cache.has('key1')).to.be.false;
    expect(cache.has('key2')).to.be.true;
    expect(cache.has('key3')).to.be.true;
  });

  test('should update access time on get', async () => {
    const cache = new LRUCache<string, number>(2);
    cache.set('key1', 1);
    await new Promise(resolve => setTimeout(resolve, 5)); // Small delay to ensure different timestamps
    cache.set('key2', 2);
    await new Promise(resolve => setTimeout(resolve, 5)); // Small delay to ensure different timestamps
    cache.get('key1'); // Access key1
    await new Promise(resolve => setTimeout(resolve, 5)); // Small delay to ensure different timestamps
    cache.set('key3', 3); // Should evict key2

    expect(cache.has('key1')).to.be.true;
    expect(cache.has('key2')).to.be.false;
    expect(cache.has('key3')).to.be.true;
  });

  test('should check key existence', () => {
    const cache = new LRUCache<string, number>();
    cache.set('exists', 1);

    expect(cache.has('exists')).to.be.true;
    expect(cache.has('notexists')).to.be.false;
  });

  test('should delete items', () => {
    const cache = new LRUCache<string, number>();
    cache.set('key', 1);
    const deleted = cache.delete('key');

    expect(deleted).to.be.true;
    expect(cache.has('key')).to.be.false;
  });

  test('should clear cache', () => {
    const cache = new LRUCache<string, number>();
    cache.set('key1', 1);
    cache.set('key2', 2);
    cache.clear();

    expect(cache.size).to.equal(0);
  });

  test('should evict expired items based on TTL', (done) => {
    const cache = new LRUCache<string, number>(100, 50); // 50ms TTL
    cache.set('key', 1);

    setTimeout(() => {
      cache.set('key2', 2); // Trigger eviction check
      expect(cache.has('key')).to.be.false;
      done();
    }, 100);
  });
});

suite('RetryHelper', () => {
  test('should succeed on first attempt', async () => {
    const retry = new RetryHelper(2, 100);
    const result = await retry.execute(async () => 'success');

    expect(result).to.equal('success');
  });

  test('should retry on failure', async () => {
    const retry = new RetryHelper(2, 10);
    let attempts = 0;

    const result = await retry.execute(async () => {
      attempts++;
      if (attempts < 2) {
        throw new Error('Fail');
      }
      return 'success';
    });

    expect(result).to.equal('success');
    expect(attempts).to.equal(2);
  });

  test('should throw error after max retries', async () => {
    const retry = new RetryHelper(2, 10);
    let attempts = 0;

    try {
      await retry.execute(async () => {
        attempts++;
        throw new Error('Always fails');
      });
      expect.fail('Should have thrown');
    } catch (error) {
      expect((error as Error).message).to.equal('Always fails');
      expect(attempts).to.equal(3); // Initial + 2 retries
    }
  });

  test('should invoke retry callback', async () => {
    const retry = new RetryHelper(2, 10);
    const retryAttempts: number[] = [];
    let attempts = 0;

    await retry.execute(
      async () => {
        attempts++;
        if (attempts < 2) {
          throw new Error('Fail');
        }
        return 'success';
      },
      {
        onRetry: (attempt) => {
          retryAttempts.push(attempt);
        },
      }
    );

    expect(retryAttempts).to.deep.equal([1]);
  });

  test('should respect shouldRetry predicate', async () => {
    const retry = new RetryHelper(2, 10);
    let attempts = 0;

    try {
      await retry.execute(
        async () => {
          attempts++;
          throw new Error('NonRetryable');
        },
        {
          shouldRetry: (error) => {
            return (error as Error).message !== 'NonRetryable';
          },
        }
      );
      expect.fail('Should have thrown');
    } catch (error) {
      expect(attempts).to.equal(1); // No retry
    }
  });

  test('should use exponential backoff', async () => {
    const retry = new RetryHelper(2, 50);
    let attempts = 0;
    const timestamps: number[] = [];

    try {
      await retry.execute(async () => {
        timestamps.push(Date.now());
        attempts++;
        throw new Error('Fail');
      });
    } catch {
      // Expected
    }

    expect(attempts).to.equal(3);
    expect(timestamps).to.have.lengthOf(3);

    // Check that delays increase exponentially
    const delay1 = timestamps[1] - timestamps[0];
    const delay2 = timestamps[2] - timestamps[1];

    expect(delay1).to.be.greaterThanOrEqual(40); // ~50ms
    expect(delay2).to.be.greaterThanOrEqual(90); // ~100ms (2x)
  });
});
