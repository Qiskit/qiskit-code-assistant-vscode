/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

'use strict';

import * as winston from 'winston';
import { FileTransportOptions } from 'winston/lib/winston/transports';

export namespace QLogger {
    const { printf } = winston.format;

    const logFormat = printf(event => `${event.level} - ${event.label}: ${event.message}`);

    const fileTransport = new winston.transports.File({
        filename: 'qiskit-vscode-log.out',
        maxsize: 1000000,
        maxFiles: 1,
        tailable: true
    } as FileTransportOptions);

    const logger = winston.createLogger({
        level: 'silly',
        format: logFormat,
        transports: [new winston.transports.Console(), fileTransport]
    });

    export function error(message: string, reference: any) {
        logger.error(message, meta(reference));
    }

    export function info(message: string, reference: any) {
        logger.info(message, meta(reference));
    }

    export function verbose(message: string, reference: any) {
        logger.verbose(message, meta(reference));
    }

    export function debug(message: string, reference: any) {
        logger.debug(message, meta(reference));
    }

    function meta(reference?: any) {
        let label = reference ? reference.constructor.name : 'unknown';
        return { label };
    }
}
