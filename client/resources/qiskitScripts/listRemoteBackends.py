from qiskit import register, available_backends, get_backend
from IBMQuantumExperience import IBMQuantumExperience
import argparse
import json

def main():
    parser = argparse.ArgumentParser()

    parser.add_argument('--apiToken')
    parser.add_argument('--url', nargs='?', default='https://quantumexperience.ng.bluemix.net/api')
    parser.add_argument('--hub', nargs='?', default=None)
    parser.add_argument('--group', nargs='?', default=None)
    parser.add_argument('--project', nargs='?', default=None)
    parser.add_argument('--status', default=False)
    
    args = vars(parser.parse_args())

    if (args['url'] is None):
        args['url'] = 'https://quantumexperience.ng.bluemix.net/api' 

    if (args['hub'] is None) or (args['group'] is None) or (args['project'] is None):
        register(args['apiToken'], args['url'])
    else:
        register(args['apiToken'], args['url'], args['hub'], args['group'], args['project'])

    backs = available_backends({'local': False})

    publicNameDevices = {}
    publicNameDevices['QS1_1'] = "IBM Q 20 Austin [QS1_1]"
    publicNameDevices['ibmqx5'] = "IBM Q 16 Rueschlikon [ibmqx5]"
    publicNameDevices['ibmqx4'] = "IBM Q 5 Tenerife [ibmqx4]"
    publicNameDevices['ibmqx2'] = "IBM Q 5 Yorktown [ibmqx2]"
    publicNameDevices['ibmq_qasm_simulator'] = "IBM Q QASM Simulator [ibmq_qasm_simulator]"

    if str(args['status']) == "True": 
        statusDevices = []
        for back in backs:
            deviceStatus = {}
            deviceStatus['name']= publicNameDevices[get_backend(back).name]
            deviceStatus['status']= get_backend(back).status
            statusDevices.append(deviceStatus)
        print(json.dumps(statusDevices, indent=2, sort_keys=True))
    else:
        print(json.dumps(backs, indent=2, sort_keys=True))

if __name__ == '__main__':
    main()