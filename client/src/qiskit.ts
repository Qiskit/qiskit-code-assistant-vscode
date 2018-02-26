import * as Q from "q";
import {IPackage} from "./interfaces"

export class Qiskit implements IPackage {
    public Info;
    update() : Q.Promise<string> {
        return Q.reject("Not implemented!");
    }

    check() : Q.Promise<void> {
        return Q.reject("Not implemented!");
    }
}