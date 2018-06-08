// Copyright 2018 IBM RESEARCH. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// =============================================================================

'use strict';

import * as winston from 'winston';

export namespace QLogger {
    const { printf } = winston.format;

    const logFormat = printf(event => `${event.level} - ${event.label}: ${event.message}`);

    const logger = winston.createLogger({
        level: 'silly',
        format: logFormat,
        transports: [new winston.transports.Console()]
    });

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
        return {
            label: label
        };
    }
}
