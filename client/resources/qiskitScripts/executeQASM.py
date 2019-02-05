# Copyright (c) 2018, IBM.
#
# This source code is licensed under the Apache License, Version 2.0 found in
# the LICENSE.txt file in the root directory of this source tree.

import warnings  # noqa
from marshmallow.warnings import ChangedInMarshmallow3Warning  # noqa
warnings.simplefilter('ignore', category=ChangedInMarshmallow3Warning)  # noqa

from qiskitTools import QiskitTools
import os
import subprocess
import json
import argparse
from packaging import version


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--file')
    args = vars(parser.parse_args())
    _result_qasm = QiskitTools().executeQASM(args['file'])
    print(json.dumps(_result_qasm, indent=2, sort_keys=True))


if __name__ == '__main__':
    main()
