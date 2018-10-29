# Copyright (c) 2018, IBM.
#
# This source code is licensed under the Apache License, Version 2.0 found in
# the LICENSE.txt file in the root directory of this source tree.
import warnings
import json
from qiskit import __version__
from packaging import version

if (version.parse(__version__) > version.parse("0.5") and
        version.parse(__version__) < version.parse("0.6")):
    from qiskit import available_backends

if (version.parse(__version__) > version.parse("0.6")):
    from qiskit import Aer


def main():
    warnings.simplefilter('ignore')

    if (version.parse(__version__) > version.parse("0.5")
            and version.parse(__version__) < version.parse("0.6")):
        print(json.dumps(available_backends(
            {'local': True}), indent=2, sort_keys=True))

    if (version.parse(__version__) > version.parse("0.6")):
        print(json.dumps([backend.name()
                          for backend in Aer.backends()],
                         indent=2, sort_keys=True))


if __name__ == '__main__':
    main()
