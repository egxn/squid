const window = {
  createStatusBarItem: jest.fn(() => ({
    command: '',
    text: '',
    tooltip: '',
    show: jest.fn(),
    hide: jest.fn(),
  })),
};

const workspace = {
  onDidChangeTextDocument: jest.fn(),
  onDidOpenTextDocument: jest.fn(),
};

const StatusBarAlignment = {
  Left: 'left',
  Right: 'right',
};

const vscode = {
  window,
  workspace,
  StatusBarAlignment,
};

module.exports = vscode;