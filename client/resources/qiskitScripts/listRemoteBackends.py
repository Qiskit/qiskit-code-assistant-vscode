# Copyright (c) 2018, IBM.
#
# This source code is licensed under the Apache License, Version 2.0 found in
# the LICENSE.txt file in the root directory of this source tree.

from qiskit import __version__
from packaging import version
import argparse
import warnings
import json
from multiprocessing import Pool
from qiskitTools import QiskitTools


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

    backs = QiskitTools().listRemoteBackends(args['apiToken'],
                                             args['url'],
                                             args['hub'],
                                             args['group'],
                                             args['project'])

    if str(args['status']) == "True":
        statusDevices = []
        for back in backs:
            fullInfoBack = QiskitTools().createDeviceStatus(back)
            statusDevices.append(fullInfoBack)
        print(json.dumps(statusDevices, indent=2, sort_keys=True))
    else:
        print(json.dumps(backs, indent=2, sort_keys=True))


if __name__ == '__main__':
    main()
