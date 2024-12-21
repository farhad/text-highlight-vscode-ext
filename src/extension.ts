import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const emoji = "🇨🇦";

    let disposable = vscode.workspace.onDidChangeTextDocument((event) => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        const document = editor.document;
        if (document.languageId !== 'plaintext' || !document.fileName.endsWith('.txt')) {
            return;
        }

        const text = document.getText();
        const pattern = /^\[.+\]\s*[\r\n]+en\s*=\s*.+[\r\n]+fr\s*=\s*.+$/gm;

        if (pattern.test(text)) {
            vscode.window.setStatusBarMessage(`File matches the pattern! ${emoji}`, 5000);
        } else {
            vscode.window.setStatusBarMessage('');
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}