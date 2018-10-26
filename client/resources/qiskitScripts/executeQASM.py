# Copyright (c) 2018, IBM.
#
# This source code is licensed under the Apache License, Version 2.0 found in
# the LICENSE.txt file in the root directory of this source tree.

from qiskit import __version__
from packaging import version
import argparse
import json
import subprocess
import os

if (version.parse(__version__) > version.parse("0.5") and 
    version.parse(__version__) < version.parse("0.6")):
    import executeQASMv05

if (version.parse(__version__) > version.parse("0.6")):
    import executeQASMv06

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--file')
    args = vars(parser.parse_args())

    if (version.parse(__version__) > version.parse("0.5") and 
        version.parse(__version__) < version.parse("0.6")):

        result = executeQASMv05.process(args['file'])
        print(json.dumps(result._result, indent=2, sort_keys=True))

    if (version.parse(__version__) > version.parse("0.6")):

        result = executeQASMv06.process(args['file'])
        print(json.dumps(result, indent=2, sort_keys=True))

if __name__ == '__main__':
    main()
