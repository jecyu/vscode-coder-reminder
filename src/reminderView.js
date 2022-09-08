const vscode = require('vscode');

function ReminderView() {
    this.panel = undefined;
}

ReminderView.prototype.show = function show(content) {
    if (this.panel) {
        this.panel.webview.html = this.generateHtml(content);
    } else {
        this.panel = vscode.window.createWebviewPanel('jecyu', '编程思想', vscode.ViewColumn.Two, {
            enableScripts: true,
            retainContextWhenHidden: true,
        });
        this.panel.webview.html = this.generateHtml(content);
        this.panel.onDidDispose(() => {
            this.panel = undefined;
        });
    }
}


ReminderView.prototype.generateHtml = function generateHtml(content) {
    const { title, detail } = content;
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>杨超越</title>
    </head>
    <body>
        <div><h1>${title}</h1></div>
        <p>${detail}</p>
    </body>
    </html>`;

    return html;
}

module.exports = ReminderView;
