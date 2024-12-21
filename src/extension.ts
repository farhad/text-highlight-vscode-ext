import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    // Create a text decoration type
    const decorationTypeKeyTitle = vscode.window.createTextEditorDecorationType({
        color: '#8C9EFF'
    });

    const decorationTypeEnTitle = vscode.window.createTextEditorDecorationType({
        color: '#E53935'
    });

    const decorationTypeEnValue = vscode.window.createTextEditorDecorationType({
        color: '#EEEEEE'
    });

    const decorationTypeFrTitle = vscode.window.createTextEditorDecorationType({
        color: '#42A5F5'
    });

    const decorationTypeFrValue = vscode.window.createTextEditorDecorationType({
        color: '#BDBDBD'
    });


    const applyHighlighting = (document: vscode.TextDocument) => {
        const editor = vscode.window.activeTextEditor;
        if (!editor || editor.document !== document) {
            return;
        }

        // Match lines with the bilingual entry pattern
        const pattern = /^\[.+\]\s*\r?\n\s*en\s*=\s*.+\r?\n\s*fr\s*=\s*.+$/gm;
        const text = document.getText();
        const matches: vscode.Range[] = [];

        let match;
        while ((match = pattern.exec(text)) !== null) {
            const startPos = document.positionAt(match.index);
            const endPos = document.positionAt(match.index + match[0].length);
            matches.push(new vscode.Range(startPos, endPos));
        }

        // Apply decorations to matched ranges
        editor.setDecorations(decorationTypeEnTitle, matches);
    };

    // Listen for changes in text documents
    const textDocumentChangeListener = vscode.workspace.onDidChangeTextDocument((event) => {
        applyHighlighting(event.document);
    });

    // Listen for active editor changes
    const activeEditorChangeListener = vscode.window.onDidChangeActiveTextEditor((editor) => {
        if (editor) {
            applyHighlighting(editor.document);
        }
    });


    const openFileListener = vscode.workspace.onDidOpenTextDocument((document) => {
        if(document) {
            applyHighlighting(document);
        }
    });

    context.subscriptions.push(textDocumentChangeListener, activeEditorChangeListener, openFileListener);
}

export function deactivate() { }