/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

export namespace PackageInfoParser {
    export function parseName(input: string): string {
        return /Name:\s*(.+)/g.exec(input)[1].trim();
    }

    export function parseVersion(input: string): string {
        return /Version:\s*(.+)/g.exec(input)[1].trim();
    }

    export function parseSummary(input: string): string {
        return /Summary:\s*(.+)/g.exec(input)[1].trim();
    }

    export function parseLocation(input: string): string {
        return /Location:\s*(.+)/g.exec(input)[1].trim();
    }

    export function parseDependencies(input: string): string {
        return /Requires:\s*(.+)/g.exec(input)[1].trim();
    }
}
