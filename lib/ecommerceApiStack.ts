
import * as lambdaNodeJs from "aws-cdk-lib/aws-lambda-nodejs";
import * as cdk from "aws-cdk-lib";
import * as apiGateWay from "aws-cdk-lib/aws-apigateway";
import * as cwlogs from "aws-cdk-lib/aws-logs";
import { Construct } from "constructs"

interface EcommerceApiStackProps extends cdk.StackProps {
  productsFetchHandler: lambdaNodeJs.NodejsFunction;
}

export class EcommerceApiStack extends cdk.Stack {

  constructor(scope: Construct, id: string, props: EcommerceApiStackProps) {
    super(scope, id, props);

    const logGroup = new cwlogs.LogGroup(this, "EcommerceApiLogs")
    const api = new apiGateWay.RestApi(this, "EcommerceApi", {
      cloudWatchRole: true,
      restApiName: "EcommerceApi",
      deployOptions: {
        accessLogDestination: new apiGateWay.LogGroupLogDestination(logGroup),
        accessLogFormat: apiGateWay.AccessLogFormat.jsonWithStandardFields({
          httpMethod: true,
          ip: true,
          protocol: true,
          requestTime: true,
          resourcePath: true,
          responseLength: true,
          status: true,
          caller: true,
          user: true
        })
      }
    });

    const productFetchIntegration = new apiGateWay.LambdaIntegration(props.productsFetchHandler)

    // /products
    const productsResource = api.root.addResource("products");
    productsResource.addMethod("GET", productFetchIntegration)
  }

}
