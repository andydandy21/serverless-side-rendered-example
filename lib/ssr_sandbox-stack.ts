import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { join } from "path";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";

export class SsrSandboxStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambda = new NodejsFunction(this, "ssrSandboxLambda", {
      runtime: Runtime.NODEJS_18_X,
      entry: join(__dirname, "..", "lambda", "handler.tsx"),
      handler: "handler",
    });
    const lambdaIntegration = new LambdaIntegration(lambda);

    const api = new RestApi(this, "ssrSandboxApi");
    api.root.addMethod("GET", lambdaIntegration);
  }
}
