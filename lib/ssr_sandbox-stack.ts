import {
  BlockPublicAccess,
  Bucket,
  ObjectOwnership,
  HttpMethods,
} from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Runtime } from "aws-cdk-lib/aws-lambda";
import { join } from "path";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";

export class SsrSandboxStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const bucket = new Bucket(this, "ssrSandboxBucket", {
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      publicReadAccess: true,
      objectOwnership: ObjectOwnership.OBJECT_WRITER,
      blockPublicAccess: new BlockPublicAccess({
        blockPublicAcls: false,
        ignorePublicAcls: false,
        blockPublicPolicy: false,
        restrictPublicBuckets: false,
      }),
      cors: [
        {
          allowedHeaders: ["*"],
          allowedMethods: [HttpMethods.GET],
          allowedOrigins: ["*"],
        },
      ],
    });

    new BucketDeployment(this, "ssrSandboxBucketDeploy", {
      sources: [Source.asset(join(__dirname, "..", "dist"))],
      destinationBucket: bucket,
    });

    const lambda = new NodejsFunction(this, "ssrSandboxLambda", {
      runtime: Runtime.NODEJS_18_X,
      entry: join(__dirname, "..", "lambda", "handler.tsx"),
      handler: "handler",
      environment: {
        BUCKET_URL: bucket.bucketDomainName,
      },
    });
    const lambdaIntegration = new LambdaIntegration(lambda);

    const api = new RestApi(this, "ssrSandboxApi");
    api.root.addMethod("GET", lambdaIntegration);
  }
}
