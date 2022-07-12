import * as vscode from 'vscode';
import inkServer from './sever';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('squid.toInkScreen', () => {
		const text = vscode.window?.activeTextEditor?.document?.getText() || '';
		inkServer.setContent(text);
		inkServer.start();
		if (inkServer.status === 200) {
			vscode.window.showInformationMessage('Up and running on http://localhost:8888');
		}

		vscode.workspace.onDidChangeTextDocument((e: vscode.TextDocumentChangeEvent) => {
			inkServer.setContent(e?.document?.getText() || '');
		});
	});
	context.subscriptions.push(disposable);
}

export function deactivate() {
	if (inkServer.status === 200) {
		inkServer.stop();
	}
}
