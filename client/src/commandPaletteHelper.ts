import * as Q from "q";

export class CommandPaletteHelper {
    public static run(): Q.Promise<any>{
        // TODO: Run the program asynchronously
        return Q.Promise<any>((resolve) => {
            resolve("Run!");
        });
    }
}