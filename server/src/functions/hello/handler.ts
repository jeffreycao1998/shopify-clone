import 'source-map-support/register';

import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';

const hello = async (event) => {
  return formatJSONResponse({
    message: `Hello ${event.body.name}, welcome to the exciting Serverless world!`,
    event,
  });
}

export const main = middyfy(hello);
