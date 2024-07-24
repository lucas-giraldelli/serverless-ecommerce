#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ProductsAppStack } from '../lib/productsAppStack';
import { EcommerceApiStack } from '../lib/ecommerceApiStack';

const app = new cdk.App();

const env: cdk.Environment = {
  account: "008971636148",
  region: "us-east-1"
}

const tags = {
  cost: "Ecommerce",
}

const productsAppStack = new ProductsAppStack(app, "ProductApp", {
  tags,
  env
});

const eCommerceApiStack = new EcommerceApiStack(app, "EcommerceApi", {
  productsFetchHandler: productsAppStack.productsFetchHandler,
  tags,
  env
});

eCommerceApiStack.addDependency(productsAppStack);