# Copyright (c) 2018, IBM.
#
# This source code is licensed under the Apache License, Version 2.0 found in
# the LICENSE.txt file in the root directory of this source tree.

import warnings
import json
import argparse
from packaging import version
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

    args = vars(parser.parse_args())

    if (args['url'] is None):
        args['url'] = 'https://quantumexperience.ng.bluemix.net/api'

    backs = QiskitTools().listRemoteBackends(args['apiToken'],
                                             args['url'],
                                             args['hub'],
                                             args['group'],
                                             args['project'])

    for back in backs:
        status = QiskitTools().getBackendStatus(back,
                                                args['apiToken'],
                                                args['url'],
                                                args['hub'],
                                                args['group'],
                                                args['project'])
        print(json.dumps(status, indent=2, sort_keys=True))


if __name__ == '__main__':
    main()
