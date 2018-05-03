from qiskit import backends
import json

print(json.dumps(backends.discover_local_backends(), indent=2, sort_keys=True))