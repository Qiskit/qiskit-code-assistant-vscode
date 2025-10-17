/**
* This code is part of Qiskit.
*
* (C) Copyright IBM 2025.
*
* This code is licensed under the Apache License, Version 2.0. You may
* obtain a copy of this license in the LICENSE.txt file in the root directory
* of this source tree or at http:*www.apache.org/licenses/LICENSE-2.0.
*
* Any modifications or derivative works of this code must retain this
* copyright notice, and modified files need to carry a notice indicating
* that they have been altered from the originals.
*/

export function modelDisclaimerHTML(model: ModelInfo, disclaimer: ModelDisclaimer): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Model Disclaimer | ${model.display_name}</title>
</head>
<body>
    <h1>${disclaimer.title}</h1>
    <div>
     ${disclaimer.body}
    </div>
    <p>
        Click <b>Accept</b> below if you understand all of the above and you wish to use
        this model. If you do NOT wish to use this model, simply close this disclaimer page.
    </p>
    <button id="accept-button" type="input">Accept</button>
    <script>
        let [accept] = (function () {
        const vscode = acquireVsCodeApi();
        return [
            () => vscode.postMessage({"command": "accept"})
        ];
        })();
        document.getElementById("accept-button").addEventListener('click', accept);
    </script>
</body>
</html>`;
}


export function migrationDisclaimerHTML(disclaimer: ModelDisclaimer): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Migration Disclaimer</title>
</head>
<body>
    <h1>${disclaimer.title}</h1>
    <div>
     ${disclaimer.body}
    </div>
    <p>
        Click <b>Accept</b> below if you understand all of the above and you wish to use
        this model. If you do NOT wish to use this model, simply close this disclaimer page.
    </p>
    <button id="accept-button" type="input">Accept</button>
    <script>
        let [accept] = (function () {
        const vscode = acquireVsCodeApi();
        return [
            () => vscode.postMessage({"command": "accept"})
        ];
        })();
        document.getElementById("accept-button").addEventListener('click', accept);
    </script>
</body>
</html>`;
}

