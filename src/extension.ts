import * as vscode from 'vscode';
import inkServer, { InkServer } from './sever';
import * as prism from 'prismjs';
import supportedLanguages from './languages';


function saveText(inkServer: InkServer, document: vscode.TextDocument) {
  const text = document.getText() || '';
  const language = document.languageId;
  const supportedLanguage = supportedLanguages?.[`${language}`];

  if (supportedLanguage) {
    try {
      const html = prism.highlight(text, prism.languages?.[supportedLanguage], supportedLanguage);
      inkServer.setContent(html);
    } catch (error) {
      inkServer.setContent(text);
    }
  } else {
    inkServer.setContent(text);
  }
}

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('squid.toInkScreen', () => {
    if (vscode?.window?.activeTextEditor?.document) {
      saveText(inkServer, vscode.window.activeTextEditor.document);
    }

    inkServer.start();

    if (inkServer.status === 200) {
      vscode.window.showInformationMessage('🦑 Swimming on http://localhost:8888');
    }

    vscode.workspace.onDidChangeTextDocument((e: vscode.TextDocumentChangeEvent) => saveText(inkServer, e.document));
  });
  context.subscriptions.push(disposable);
}

export function deactivate() {
  if (inkServer.status === 200) {
    inkServer.stop();
  }
}
