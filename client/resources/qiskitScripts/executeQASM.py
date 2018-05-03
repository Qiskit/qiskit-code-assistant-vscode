from qiskit import QuantumProgram
import argparse
import json

def main():
    parser = argparse.ArgumentParser()

    parser.add_argument('--file')
    
    args = vars(parser.parse_args())

    qp = QuantumProgram()
    qp.load_qasm_file(args['file'])

    result = qp.execute(None)
    
    print(json.dumps(result._result, indent=2, sort_keys=True))
    '''
    for circuit in result.get_names():
        print(json.dumps(result.get_data(circuit), indent=2, sort_keys=True))
    '''

if __name__ == '__main__':
    main()