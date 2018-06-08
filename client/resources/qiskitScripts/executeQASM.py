# Copyright (c) 2018, IBM.
#
# This source code is licensed under the Apache License, Version 2.0 found in
# the LICENSE.txt file in the root directory of this source tree.

from qiskit.wrapper import load_qasm_file
from qiskit import execute
import argparse
import json

def main():
    parser = argparse.ArgumentParser()

    parser.add_argument('--file')

    args = vars(parser.parse_args())

    qc = load_qasm_file(args['file'])

    job_sim = execute(qc, "local_qasm_simulator")
    result = job_sim.result()

    print(json.dumps(result._result, indent=2, sort_keys=True))

if __name__ == '__main__':
    main()