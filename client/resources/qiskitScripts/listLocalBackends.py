# Copyright (c) 2018, IBM.
#
# This source code is licensed under the Apache License, Version 2.0 found in
# the LICENSE.txt file in the root directory of this source tree.

import warnings  # noqa
from marshmallow.warnings import ChangedInMarshmallow3Warning  # noqa
warnings.simplefilter('ignore', category=ChangedInMarshmallow3Warning)  # noqa

import warnings
import json
from qiskit import __version__
from packaging import version
from qiskitTools import QiskitTools


def main():
    warnings.simplefilter('ignore')

    backs = QiskitTools().listLocalBackends()
    print(json.dumps(backs, indent=2, sort_keys=True))


if __name__ == '__main__':
    main()
