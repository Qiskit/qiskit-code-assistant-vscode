# Copyright (c) 2018, IBM.
#
# This source code is licensed under the Apache License, Version 2.0 found in
# the LICENSE.txt file in the root directory of this source tree.

from qiskit.wrapper import load_qasm_file
from qiskit import execute, Aer
import argparse
import json


def process(filename):
    qc = load_qasm_file(filename)

    job_sim = execute(qc, Aer.get_backend("qasm_simulator"))
    result = job_sim.result()
    return result.get_counts()
