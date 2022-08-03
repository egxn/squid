import * as vscode from 'vscode';
import inkServer, { InkServer } from './sever';
import * as prism from 'prismjs';
import supportedLanguages from './languages';

function getButtonBarItem(command: string) : vscode.StatusBarItem {
  let buttonBarItem: vscode.StatusBarItem;
  buttonBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
  buttonBarItem.command = command;
  buttonBarItem.text = '[🦑]';
  buttonBarItem.tooltip = 'Create an ink server';

  return buttonBarItem;
}

function saveText(inkServer: InkServer, document: vscode.TextDocument) : void {
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

function createInkServer(inkServer : InkServer) : void {
  if (vscode?.window?.activeTextEditor?.document) {
    saveText(inkServer, vscode.window.activeTextEditor.document);
  }

  inkServer.start();
  if (inkServer.status === 200) {
    vscode.window.showInformationMessage('🦑 on http://localhost:8888');
  }


  vscode.workspace.onDidChangeTextDocument((e: vscode.TextDocumentChangeEvent) => saveText(inkServer, e.document));
  vscode.workspace.onDidOpenTextDocument((e: vscode.TextDocument) => saveText(inkServer, e));
}

export function activate(context: vscode.ExtensionContext) {
  const createInkServerCommand = 'squid.createInkServer';
  const buttonBarItem = getButtonBarItem(createInkServerCommand);
  let disposable = vscode.commands.registerCommand(createInkServerCommand, () => createInkServer(inkServer));

  context.subscriptions.push(disposable);
  context.subscriptions.push(buttonBarItem);

  buttonBarItem.show();
}

export function deactivate() {
  if (inkServer.status === 200) {
    inkServer.stop();
  }
}
