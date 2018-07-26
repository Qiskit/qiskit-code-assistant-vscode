/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */
import * as path from 'path';

export namespace Util {
    export function getOSDependentPath(_path: string): string {
        let pathInOS = path.resolve(__dirname, _path);
        if (process.platform === 'win32') {
            pathInOS = pathInOS.replace(/\\/g, '/');
        }
        return pathInOS;
    }
}
