/**
 * @license
 *
 * Copyright (c) 2018, IBM.
 *
 * This source code is licensed under the Apache License, Version 2.0 found in
 * the LICENSE.txt file in the root directory of this source tree.
 */

import { IVersion, IVersionInfo } from "./interfaces";

export class Version implements IVersion {
    Info: IVersionInfo = { Major: -1, Minor: -1, Maintenance: -1 };
    constructor(major: Number, minor: Number, maintenance: Number) {
        this.Info.Major = major;
        this.Info.Minor = minor;
        this.Info.Maintenance = maintenance;
    }

    public static fromString(versionString: string): IVersion {
        let versionStrings = versionString.split('.') || versionString;
        let major: Number = -1;
        let minor: Number = -1;
        let maintenance: Number = -1;
        if (versionStrings[0] !== null) {
            major = Number(versionStrings[0]);
        }
        if (versionStrings[1] !== null) {
            minor = Number(versionStrings[1]);
        }
        if (versionStrings[2] !== null) {
            maintenance = Number(versionStrings[2]);
        }
        return new Version(major, minor, maintenance);
    }

    toString(): string {
        let version = "Invalid version";
        if (this.Info.Major > -1) {
            version = this.Info.Major.toString();
        }
        if (this.Info.Minor > -1) {
            version = version.concat('.' + this.Info.Minor.toString());
        }
        if (this.Info.Maintenance > -1) {
            version = version.concat('.' + this.Info.Maintenance.toString());
        }

        return version;
    }

    isEqual(version: IVersion): boolean {
        if (version.Info.Major === this.Info.Major ||
            version.Info.Minor === this.Info.Minor ||
            version.Info.Maintenance === this.Info.Maintenance) {
            return true;
        } else {
            return false;
        }
    }

    isGreater(version: IVersion): boolean {
        if (version.Info.Major < this.Info.Major) {
            return true;
        } else if (version.Info.Major === this.Info.Major) {
            if (version.Info.Minor < this.Info.Minor) {
                return true;
            } else if (version.Info.Minor === this.Info.Minor) {
                if (version.Info.Maintenance < this.Info.Maintenance) {
                    return true;
                }
            }
        }
        return false;
    }

    isLesser(version: IVersion): boolean {
        if (version.Info.Major > this.Info.Major) {
            return true;
        } else if (version.Info.Major === this.Info.Major) {
            if (version.Info.Minor > this.Info.Minor) {
                return true;
            } else if (version.Info.Minor === this.Info.Minor) {
                if (version.Info.Maintenance > this.Info.Maintenance) {
                    return true;
                }
            }
        }
        return false;
    }
}
