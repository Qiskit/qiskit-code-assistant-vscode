import * as Q from "q";
import * as nodeChildProcess from "child_process";

interface IExecOptions {
    cwd?: string;
    stdio?: any;
    env?: any;
    encoding?: string;
    timeout?: number;
    maxBuffer?: number;
    killSignal?: string;
}

export class CommandExecutor {
    private childProcess = nodeChildProcess;

    public exec(command: string, args: string[] = [], options: IExecOptions = {}): Q.Promise<string> {
        let outcome = Q.defer<string>();
        
        this.childProcess.exec(command + " " + args.join(" "), options,
            (error: Error, stdout: string, stderr: string) => {
            if (error) {
                // Dirty trick, read below.
                let errorString = stdout + stderr;
                outcome.reject(errorString);
            } else {
                // Dirty trick, some commands outputs successfully commands,
                // like --version to stderr (WTF!). Python interpreter is an
                // example, unfortunately.
                let outputString = stdout + stderr;
                outcome.resolve(outputString);
            }
        });
        
        return outcome.promise;
    }
}
