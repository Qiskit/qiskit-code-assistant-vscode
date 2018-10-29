# Copyright (c) 2018, IBM.
#
# This source code is licensed under the Apache License, Version 2.0 found in
# the LICENSE.txt file in the root directory of this source tree.

import warnings
import json
import argparse
from packaging import version
from qiskit import __version__
if (version.parse(__version__) > version.parse("0.5") and
        version.parse(__version__) < version.parse("0.6")):
    from qiskit import available_backends, register
    from IBMQuantumExperience import IBMQuantumExperience

if (version.parse(__version__) > version.parse("0.6")):
    from qiskit import IBMQ


def main():
    warnings.simplefilter('ignore')

    parser = argparse.ArgumentParser()

    parser.add_argument('--apiToken')
    parser.add_argument('--url', nargs='?',
                        default='https://quantumexperience.ng.bluemix.net/api')
    parser.add_argument('--hub', nargs='?', default=None)
    parser.add_argument('--group', nargs='?', default=None)
    parser.add_argument('--project', nargs='?', default=None)

    args = vars(parser.parse_args())

    if (args['url'] is None):
        args['url'] = 'https://quantumexperience.ng.bluemix.net/api'

    if (version.parse(__version__) > version.parse("0.5") and
            version.parse(__version__) < version.parse("0.6")):

        if (args['hub'] is None or args['group'] is None
                or args['project'] is None):
            api = IBMQuantumExperience(args['apiToken'], {'url': args['url']})
            register(args['apiToken'], args['url'])
        else:
            api = IBMQuantumExperience(args['apiToken'],
                                       {'url': args['url'],
                                        'hub': args['hub'],
                                        'group': args['group'],
                                        'project': args['project']})
            register(args['apiToken'], args['url'], args['hub'],
                     args['group'], args['project'])

        backs = available_backends({'local': False})

    if (version.parse(__version__) > version.parse("0.6")):

        if (args['hub'] is None or args['group'] is None
                or args['project'] is None):
            IBMQ.enable_account(args['apiToken'], args['url'])
        else:
            IBMQ.enable_account(args['apiToken'], url=args['url'],
                                hub=args['hub'], group=args['group'],
                                project=args['project'])

        backs = [backend.name() for backend in IBMQ.backends()]

    for back in backs:

        if (version.parse(__version__) > version.parse("0.5") and
                version.parse(__version__) < version.parse("0.6")):
            print(json.dumps(api.backend_status(back), indent=2, sort_keys=True))
        if (version.parse(__version__) > version.parse("0.6")):
            print(json.dumps(parseBackendStatus(IBMQ.get_backend(
                back).status()), indent=2, sort_keys=True))


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
