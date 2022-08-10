import * as http from "http";

const createHtmlContent = function (content: string) : string {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="refresh" content="0.3">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>🦑 Squid</title>
    <style>
      body { margin: 4px; font-family: sans-serif; }
      pre { tab-width: 2; font-size: 24px; }
      .property, .attr-name, .keyword { font-weight: bold; }
      .attr-value, .function-variable , .function, .string , .number
        { font-style: italic; font-size: 24px; }
    </style>
  </head>
  <body>
    <div classname="container">
      <pre><code>${content}</code></pre>
    </div>
  </body>
  <script type="text/javascript">
  </script>
  </html>`;
};


interface InkServer {
  content: string;
  setContent: (content: string) => void;
  server: null | http.Server;
  status: number;
  start: () => void;
  stop: () => void;
};

const inkServer: InkServer = {
  content: '',
  setContent: function (content: string) {
    this.content = createHtmlContent(content);
  },
  server: null,
  status: 503,
  start: function () {
    this.status = 200;
    this.server = http.createServer((req: http.IncomingMessage , res : http.ServerResponse) => {
      res.setHeader("Content-Type", "text/html");
      res.writeHead(200);
      res.end(this.content);
    });
    this.server.listen(8888);
  },
  stop: function () {
    if (this.status === 200) {
      this.server?.close();
    }
  },
};


export default inkServer;
export type { InkServer };