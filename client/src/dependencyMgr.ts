import * as Q from "q";

import {IDependency} from "./interfaces";
import {Dependency} from "./dependency";
import {Version} from "./version";

export class DependencyMgr {
    private static dependencies : IDependency[] = [
        new Dependency('pip', Version.fromString('9')),
        new Dependency('python', Version.fromString('3.5'))
    ];

    constructor() {
    }

    public static checkDependencies() : Q.Promise {
        // TODO: Read depdencies from external file
        // Check for python > 3.5
        // Check for pip
        let packages: Q.Promise<IDependency>[] = [];
        DependencyMgr.dependencies.forEach(dep => {
            packages.push(dep.isInstalled());
        });
        
        return Q.all(packages);
    }
}