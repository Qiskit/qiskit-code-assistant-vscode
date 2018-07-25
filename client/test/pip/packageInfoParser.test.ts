/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

import { PackageInfoParser } from '../../src/pip/packageInfoParser';

describe('A PackageInfoParser', () => {
    describe('with a qiskit package info', () => {
        let packageInfo = `
        Name: qiskit   
        Version: 0.5.5   
        Summary: Software for developing quantum computing programs
        Home-page: https://github.com/Qiskit/qiskit-terra
        Author: Qiskit Development Team
        Author-email: qiskit@us.ibm.com
        License: Apache 2.0
        Location: /Users/qiskitter/Documents/workspace/qiskit-vscode/pyenv/lib/python3.6/site-packages
        Requires: IBMQuantumExperience, sympy, networkx, numpy, matplotlib, pillow, scipy, ply
        Required-by: qiskit-acqua, qiskit-acqua-chemistry
        `;

        it('should detect the package name', () => {
            expect(PackageInfoParser.parseName(packageInfo)).toBe('qiskit');
        });

        it('should detect the package version', () => {
            expect(PackageInfoParser.parseVersion(packageInfo)).toBe('0.5.5');
        });

        it('should detect the package summary', () => {
            expect(PackageInfoParser.parseSummary(packageInfo)).toBe(
                'Software for developing quantum computing programs'
            );
        });

        it('should detect the package location', () => {
            expect(PackageInfoParser.parseLocation(packageInfo)).toBe(
                '/Users/qiskitter/Documents/workspace/qiskit-vscode/pyenv/lib/python3.6/site-packages'
            );
        });

        it('should detect the package location', () => {
            expect(PackageInfoParser.parseDependencies(packageInfo)).toBe(
                'IBMQuantumExperience, sympy, networkx, numpy, matplotlib, pillow, scipy, ply'
            );
        });
    });
});
