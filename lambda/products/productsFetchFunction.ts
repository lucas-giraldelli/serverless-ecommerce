import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from "aws-lambda";

export async function handler(event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult> {
  const METHOD = event.httpMethod
  const LAMBDA_REQUEST_ID = context.awsRequestId;
  const API_REQUEST_ID = event.requestContext.requestId;

  console.log(`API Gateway Request id ${API_REQUEST_ID} - Lambda Request Id ${LAMBDA_REQUEST_ID}`)

  if (event.resource === "/products") {
    if (METHOD === "GET") {
      console.log("GET /products");

      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "GET products - OK"
        })
      }
    }
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      message: "Bad request"
    })
  }
}