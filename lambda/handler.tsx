import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from "aws-lambda";
import * as fs from "fs";
import { join } from "path";

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
        <!--app-script-->
      </body>
    </html>
  `;

  const html = template.replace("<!--app-html-->", "<h1>hello world</h1>");

  return {
    statusCode: 200,
    body: html,
    headers: {
      "Content-Type": "text/html",
    },
  };
}
