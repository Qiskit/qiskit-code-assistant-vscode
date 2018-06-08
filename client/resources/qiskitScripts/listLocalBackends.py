# Copyright (c) 2018, IBM.
#
# This source code is licensed under the Apache License, Version 2.0 found in
# the LICENSE.txt file in the root directory of this source tree.

from qiskit import available_backends
import json

def main():
    print(json.dumps(available_backends({'local': True}), indent=2, sort_keys=True))

if __name__ == '__main__':
    main()