import { CONFIG } from './constants';
import { createSendData } from './create-send-data';
import { specs } from './specs';
import { WebApi } from './web-api';
import { RpcRequest, decodeRpcResponse } from './types';
import { CodedError } from '@carnesen/coded-error';
import { ValidationError } from './validation-error';

export function createWebApi(config = CONFIG) {
  const sendData = createSendData(config);

  const webApi: any = {};
  for (const [methodName, { argsC, resultC }] of Object.entries(specs)) {
    webApi[methodName] = async (...args: any[]) => {
      // Client-side validation of args
      const decodedArgs = argsC.decode(args);
      if (decodedArgs.isLeft()) {
        throw new ValidationError(decodedArgs);
      }

      // Prepare request
      const rpcRequest: RpcRequest = {
        methodName,
        args: decodedArgs.value,
      };
      const data = JSON.stringify(rpcRequest);

      // Send request
      const responseData = await sendData(data);

      // Process response
      const rpcResponse = decodeRpcResponse(JSON.parse(responseData));
      if (rpcResponse.isLeft()) {
        const { message, code, data } = rpcResponse.value;
        throw new CodedError(message, code, data);
      }
      const { result } = rpcResponse.value;
      const decodedResult = resultC.decode(result);
      if (decodedResult.isLeft()) {
        throw new ValidationError(decodedResult);
      }
      return decodedResult.value;
    };
  }
  return webApi as WebApi;
}
