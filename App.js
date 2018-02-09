import React from 'react'
import Tabs from './src/Tabs'

import AWSAppSyncClient from "aws-appsync";
import { Rehydrated } from 'aws-appsync-react';
import { ApolloProvider } from 'react-apollo';
import * as AWS from 'aws-sdk';

import awsconfig from './aws-exports';

AWS.config.update({
  region: awsconfig.region,
  credentials: new AWS.Credentials({
      accessKeyId: awsconfig.accessKeyId,
      secretAccessKey: awsconfig.secretAccessKey
  })
});

const client = new AWSAppSyncClient({
  disableOffline: true,
  url: awsconfig.graphqlEndpoint,
  region: AWS.config.region,
  auth: {
    type: "API_KEY",
    apiKey: awsconfig.apiKey,
  }
});

const WithProvider = () => (
  <ApolloProvider client={client}>
      <Rehydrated>
          <Tabs />
      </Rehydrated>
  </ApolloProvider>
);

export default WithProvider