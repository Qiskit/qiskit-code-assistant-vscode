from qiskit import available_backends
import json

def main():
    print(json.dumps(available_backends({'local': True}), indent=2, sort_keys=True))    

if __name__ == '__main__':
    main()