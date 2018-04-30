from qiskit import backends
from IBMQuantumExperience import IBMQuantumExperience
import argparse

def main():
    parser = argparse.ArgumentParser()

    parser.add_argument('--apiToken')
    parser.add_argument('--url', nargs='?', default='https://quantumexperience.ng.bluemix.net/api')
    parser.add_argument('--hub', default=None)
    parser.add_argument('--group', default=None)
    parser.add_argument('--project', default=None)
    
    args = vars(parser.parse_args())
    api = IBMQuantumExperience(args['apiToken'], {'url': args['url'], 'hub': args['hub'], 'group': args['group'], 'project': args['project']})

    print(str(backends.discover_remote_backends(api)))

if __name__ == '__main__':
    main()