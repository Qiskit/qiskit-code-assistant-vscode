import * as Q from "q";
import {CommandExecutor} from "./commandExecutor";
import {IPackageInfo, IVersion} from "./interfaces";
import {Version} from "./version";

type ParserFunction = (out: string) => string;

export class PipWrapper implements IPackageInfo {
    public Name: string;
    public Version: IVersion;
    public Summary: string;
    public Location: string;
    public Dependencies: string;
    
    private static PIP_COMMAND = "pip";

    constructor(){}

    public getPackageInfo(pkgStr: string) : Q.Promise<IPackageInfo> {
        return this.show(pkgStr)
        .then((stdout: string) => {
            let regEx = new RegExp(/(Name:\ |Version:\ |Summary:\ |Location:\ |Requires:\ )(.+?(?=\n))/g);
            let pkg = new PipWrapper();
            let pkgInfo;
            let failed: boolean = false;
            pkgInfo = regEx.exec(stdout);
            failed = failed || pkgInfo == null;
            pkg.Name = pkgInfo[2];
            pkgInfo = regEx.exec(stdout);
            failed = failed || pkgInfo == null;
            pkg.Version = Version.fromString(pkgInfo[2]);
            pkgInfo = regEx.exec(stdout);
            failed = failed || pkgInfo == null;
            pkg.Summary = pkgInfo[2];
            pkgInfo = regEx.exec(stdout);
            failed = failed || pkgInfo == null;
            pkg.Location = pkgInfo[2];
            pkgInfo = regEx.exec(stdout);
            failed = failed || pkgInfo == null;
            pkg.Dependencies = pkgInfo[2];
            if(failed){
                return Q.reject(`ERROR: Couldn't parse package information from
                               'pip show' command output!`);
            }
            return Q.resolve(pkg);
        });
    }

    public show(pkg: string): Q.Promise<string> {
        let parserFunc : ParserFunction = (stdout: string) => {
            return stdout;
        };
        return this.exec("show", [pkg], parserFunc);
    }

    public search(pkg: string): Q.Promise<boolean> {
        let parserFunc : ParserFunction = () => {
            return "Need to implement this method!";
        };
        return this.exec("search", [pkg], parserFunc);
    }

    public install(pkg: string): Q.Promise<string>{
        let parserFunc : ParserFunction = () => {
            return "Need to implement this method!";
        };
        return this.exec("install", [pkg], parserFunc);
    }

    public update(pkg: string): Q.Promise<string>{
        let parserFunc : ParserFunction = (stdout: string) => {
            return stdout;
        };
        return this.exec("install", ["-U", "--no-cache-dir", pkg], parserFunc);
    }



    private exec(command: string, args:string [], parser: ParserFunction): 
        Q.Promise<string> {
        return (new CommandExecutor).exec(PipWrapper.PIP_COMMAND,[command].concat(args))
        .then((stdout) => {
            return Q.resolve(parser(stdout));
        });
    }
}