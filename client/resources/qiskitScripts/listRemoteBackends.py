# Copyright (c) 2018, IBM.
#
# This source code is licensed under the Apache License, Version 2.0 found in
# the LICENSE.txt file in the root directory of this source tree.

from qiskit import register, available_backends, get_backend
from IBMQuantumExperience import IBMQuantumExperience
import argparse
import json
import warnings
from multiprocessing import Pool

PUBLIC_NAMES = {
    'ibmq_20_tokyo': 'IBM Q 20 Tokyo',
    'QS1_1': 'IBM Q 20 Austin',
    'ibmqx5': 'IBM Q 16 Rueschlikon',
    'ibmqx4': 'IBM Q 5 Tenerife',
    'ibmqx2': 'IBM Q 5 Yorktown',
    'ibmq_qasm_simulator': 'IBM Q QASM Simulator'
}


def main():
    warnings.simplefilter('ignore')

    parser = argparse.ArgumentParser()

    parser.add_argument('--apiToken')
    parser.add_argument('--url', nargs='?',
                        default='https://quantumexperience.ng.bluemix.net/api')
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
        register(args['apiToken'], args['url'], args['hub'],
                 args['group'], args['project'])

    backs = available_backends({'local': False})

    if str(args['status']) == "True":
        with Pool(3) as p:
            statusDevices = list(p.map(createDeviceStatus, backs))
        print(json.dumps(statusDevices, indent=2, sort_keys=True))
    else:
        print(json.dumps(backs, indent=2, sort_keys=True))


def createDeviceStatus(back):
    return {
        'name': PUBLIC_NAMES[back],
        'status': parseBackendStatus(get_backend(back).status)
    }


def parseBackendStatus(backendStatus):
    return {
        'name': backendStatus['name'],
        'pending_jobs': backendStatus['pending_jobs'],
        'available': parseAvailability(backendStatus)
    }


def parseAvailability(backendStatus):
    try:
        return backendStatus['available']
    except KeyError:
        return backendStatus['operational']


if __name__ == '__main__':
    main()
