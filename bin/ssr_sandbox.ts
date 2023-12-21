#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { SsrSandboxStack } from "../lib/ssr_sandbox-stack";

const app = new cdk.App();
new SsrSandboxStack(app, "SsrSandboxStack");
