from qiskit import backends
import json

def main():
    print(json.dumps(backends.discover_local_backends(), indent=2, sort_keys=True))    

if __name__ == '__main__':
    main()