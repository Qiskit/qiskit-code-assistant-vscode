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
