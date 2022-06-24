import * as http from "http";

const createHtmlContent = function (content: string) : string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta http-equiv="refresh" content="1">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Squid</title>
    </head>
    <body>
      ${content}
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
    this.server = http.createServer((req: any, res: any) => {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(this.content);
      res.end();
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