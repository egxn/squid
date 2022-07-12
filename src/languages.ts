
interface SupportedLanguages {
  [key: string]: string;
};

const supportedLanguages: SupportedLanguages = {
  "css": "css",
  "html": "html",
  "javascript": "javascript",
  "undefinded": "plaintext"
};

// @TODO: add support for
const requireGrammar = {
  "abap": "abap",
  "c": "c",
  "clojure": "clojure",
  "coffeescript": "coffeescript",
  "csharp": "csharp",
  "diff": "diff",
  "dockerfile": "dockerfile",
  "fsharp": "fsharp",
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "git-commit": "git",
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "git-rebase": "git",
  "go": "go",
  "groovy": "groovy",
  "haml": "haml",
  "handlebars": "handlebars",
  "ignore": "ignore",
  "ini": "ini",
  "jade": "pug",
  "java": "java",
  "javascriptreact": "jsx",
  "json": "json",
  "latex": "latex",
  "less": "less",
  "lua": "lua",
  "makefile": "makefile",
  "markdown": "markdown",
  // eslint-disable-next-line @typescript-eslint/naming-convention
  "objective-c": "objectivec",
  "perl": "perl",
  "perl6": "perl",
  "php": "php",
  "powershell": "powershell",
  "pug": "pug",
  "python": "python",
  "r": "r",
  "razor": "cshtml",
  "ruby": "ruby",
  "rust": "rust",
  "sass": "sass",
  "scss": "scss",
  "sql": "sql",
  "stylus": "stylus",
  "swift": "swift",
  "tex": "latex",
  "typescript": "typescript",
  "typescriptreact": "tsx",
  "vb": "visual-basic",
  "yaml": "yaml"
};

export default supportedLanguages;
export { requireGrammar };