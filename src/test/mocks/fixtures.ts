/**
 * Test fixtures and sample data for testing
 */

export const mockApiResponses = {
  models: [
    {
      id: 'granite-3.3-8b-qiskit',
      name: 'Granite 3.3 8b qiskit',
      description: 'Large language model for code generation'
    },
    {
      id: 'granite-code-8b',
      name: 'Granite Code 8B',
      description: 'Efficient code generation model'
    }
  ],

  modelInfo: {
    id: 'granite-3.3-8b-qiskit',
    name: 'Granite 3.3 8b qiskit',
    description: 'Large language model for code generation',
    capabilities: ['completion', 'chat']
  },

  disclaimer: {
    id: 'terms-v1',
    text: 'By using this service, you agree to the terms and conditions.',
    version: '1.0'
  },

  completionResponse: {
    id: 'completion-123',
    choices: [
      {
        text: 'def calculate_sum(a, b):\n    return a + b',
        index: 0,
        finish_reason: 'stop'
      }
    ],
    model: 'granite-3.3-8b-qiskit',
    usage: {
      prompt_tokens: 10,
      completion_tokens: 20,
      total_tokens: 30
    }
  },

  streamingChunks: [
    'def ',
    'calculate',
    '_sum',
    '(a, b):',
    '\n    return',
    ' a + b'
  ]
};

export const mockQiskitCode = {
  legacy: `from qiskit import QuantumCircuit, execute, Aer

qc = QuantumCircuit(2, 2)
qc.h(0)
qc.cx(0, 1)
qc.measure([0, 1], [0, 1])

backend = Aer.get_backend('qasm_simulator')
job = execute(qc, backend, shots=1000)
result = job.result()
counts = result.get_counts(qc)
print(counts)`,

  migrated: `from qiskit import QuantumCircuit
from qiskit_aer import AerSimulator

qc = QuantumCircuit(2, 2)
qc.h(0)
qc.cx(0, 1)
qc.measure([0, 1], [0, 1])

backend = AerSimulator()
job = backend.run(qc, shots=1000)
result = job.result()
counts = result.get_counts()
print(counts)`
};

export const mockCompletionItems = {
  simple: {
    insertText: 'print("Hello, World!")',
    range: {
      start: { line: 0, character: 0 },
      end: { line: 0, character: 0 }
    }
  },

  multiline: {
    insertText: 'def greet(name):\n    return f"Hello, {name}!"',
    range: {
      start: { line: 5, character: 0 },
      end: { line: 5, character: 0 }
    }
  },

  withContext: {
    insertText: 'qc.h(0)\nqc.cx(0, 1)',
    range: {
      start: { line: 10, character: 0 },
      end: { line: 10, character: 0 }
    },
    metadata: {
      model_id: 'granite-3.3-8b-qiskit',
      prompt_id: 'prompt-456',
      completion_kind: 'inline'
    }
  }
};

export const mockApiTokens = {
  valid: 'qiskit-api-token-valid-12345',
  invalid: 'invalid-token',
  expired: 'expired-token-67890'
};

export const mockErrors = {
  unauthorized: {
    status: 401,
    detail: 'API Token is not authorized'
  },

  forbidden: {
    status: 403,
    detail: 'You must accept the disclaimer before using this service'
  },

  notFound: {
    status: 404,
    detail: 'Model not found'
  },

  serverError: {
    status: 500,
    detail: 'Internal server error'
  },

  networkError: {
    message: 'Failed to fetch',
    code: 'NETWORK_ERROR'
  }
};

export const mockUrls = {
  serviceBase: 'https://qiskit-code-assistant.quantum.ibm.com',
  apiEndpoints: {
    models: '/api/v1/models',
    completion: '/api/v1/completions',
    migrate: '/api/v1/migrate',
    feedback: '/api/v1/feedback'
  }
};
