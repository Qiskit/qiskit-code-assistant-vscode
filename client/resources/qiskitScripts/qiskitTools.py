import json
from qiskit import __version__
from IBMQuantumExperience import IBMQuantumExperience
from packaging import version
import argparse
import warnings
from qiskit.wrapper import load_qasm_file
from qiskit import execute

if (version.parse(__version__) > version.parse("0.5") and
        version.parse(__version__) < version.parse("0.6")):
    from qiskit import register, available_backends, get_backend

if (version.parse(__version__) > version.parse("0.6")):
    from qiskit import IBMQ
    from qiskit import Aer


class QiskitUnsupportedVersion(Exception):
    def __init__(self, value):
        self.value = value

    def __str__(self):
        return repr(self.value)


class QiskitTools(object):
    """
    Utilities for CLI
    """

    def executeQASM(self, filename):

        if (version.parse(__version__) > version.parse("0.5") and
                version.parse(__version__) < version.parse("0.6")):

            qc = load_qasm_file(filename)
            job_sim = execute(qc, "local_qasm_simulator")
            result = job_sim.result()
            return result._result

        elif (version.parse(__version__) > version.parse("0.6")):

            qc = load_qasm_file(filename)
            job_sim = execute(qc, Aer.get_backend("qasm_simulator"))
            result = job_sim.result()
            return result.get_counts()

        else:
            raise QiskitUnsupportedVersion(
                'Qiskit-terra version must be v0.5 or v0.6')

    def listRemoteBackends(self, apiToken, url,
                           hub=None, group=None, project=None):

        if (version.parse(__version__) > version.parse("0.5") and
                version.parse(__version__) < version.parse("0.6")):

            if (hub is None or group is None or project is None):
                register(apiToken, url)
            else:
                register(apiToken, url, hub, group, project)

            backs = available_backends({'local': False})

        if (version.parse(__version__) > version.parse("0.6")):

            if (hub is None or group is None or project is None):
                IBMQ.enable_account(apiToken, url)
            else:
                IBMQ.enable_account(apiToken, url=url,
                                    hub=hub, group=group,
                                    project=project)

            backs = [backend.name() for backend in IBMQ.backends()]

        return backs

    def getBackendStatus(self, back, apiToken, url, hub=None, group=None, project=None):
        if (version.parse(__version__) > version.parse("0.5") and
                version.parse(__version__) < version.parse("0.6")):

            if (hub is None or group is None
                    or project is None):
                api = IBMQuantumExperience(
                    apiToken, {'url': url})
            else:
                api = IBMQuantumExperience(apiToken,
                                           {'url': url,
                                            'hub': hub,
                                            'group': group,
                                            'project': project})

            return api.backend_status(back)

        if (version.parse(__version__) > version.parse("0.6")):

            if (hub is None or group is None or project is None):
                IBMQ.enable_account(apiToken, url)
            else:
                IBMQ.enable_account(apiToken, url,
                                    hub=hub, group=group,
                                    project=project)

            return self.parseBackendStatus(IBMQ.get_backend(back).status())

    def parseBackendStatus(self, backendStatus):
        return {
            'name': backendStatus['name'],
            'pending_jobs': backendStatus['pending_jobs'],
            'available': self.parseAvailability(backendStatus)
        }

    def parseAvailability(self, backendStatus):
        try:
            return backendStatus['available']
        except KeyError:
            return backendStatus['operational']
