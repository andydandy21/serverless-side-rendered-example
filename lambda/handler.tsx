import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import ReactDOMServer from "react-dom/server";
import React from "react";
import App from "../src/App";

export async function handler(
  event: APIGatewayProxyEvent,
  context: Context,
): Promise<APIGatewayProxyResult> {
  const template = `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Vite + React</title>
        <!--app-head-->
      </head>
      <body>
        <div id="root"><!--app-html--></div>
        <script type="module" crossorigin src="https://${process.env.BUCKET_URL}/index.js"></script>
      </body>
    </html>
  `;

  const html = template.replace(
    "<!--app-html-->",
    ReactDOMServer.renderToString(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    ),
  );

  return {
    statusCode: 200,
    body: html,
    headers: {
      "Content-Type": "text/html",
    },
  };
}
