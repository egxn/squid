import * as vscode from 'vscode';
import inkServer from './sever';

export function activate(context: vscode.ExtensionContext) {	
	let disposable = vscode.commands.registerCommand('squid.toInkScreen', () => {
		const { fileName, getText }  = vscode.window?.activeTextEditor?.document;
		const text = getText();
		if (text) {
			inkServer.setContent(text);
			inkServer.start();
			if (inkServer.status === 200) {
				vscode.window.showInformationMessage('Running on http://localhost:8888');
			}
		}
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {
	if (inkServer.status === 200) {
		inkServer.stop();
	}
}
