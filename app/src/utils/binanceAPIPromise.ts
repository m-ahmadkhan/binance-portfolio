import queryString from 'query-string';
import { createHmac } from 'crypto';

const binanceBaseRoute = 'https://api.binance.com';

const getTimeStamp = () => new Date().getTime();

const getSignature = (queryParamStr: string, apiSecret: string) =>
  createHmac('sha256', apiSecret).update(queryParamStr).digest('hex');

const binanceAPIPromise =
  (method: string) =>
  async ({
    apiRoute,
    queryParams,
    apiKey,
    apiSecret,
    headers,
  }: {
    apiRoute: string;
    queryParams?: Object;
    apiKey: string;
    apiSecret: string;
    headers?: Object;
  }) => {
    apiRoute = apiRoute.startsWith('/') ? apiRoute.slice(1) : apiRoute;
    const headersObj = {
      ...headers,
      'X-MBX-APIKEY': apiKey,
    };

    const timestamp = getTimeStamp();
    const queryParamsObj = {
      ...queryParams,
      timestamp,
      signature: getSignature(
        queryString.stringify({
          ...queryParams,
          timestamp,
        }),
        apiSecret,
      ),
    };

    const requestHeaders: HeadersInit = new Headers();
    Object.entries(headersObj).forEach(([key, value]: [string, any]) => {
      requestHeaders.set(key, value);
    });

    const apiUrl = `${binanceBaseRoute}/${apiRoute}?${queryString.stringify(queryParamsObj)}`;
    const xhr = await fetch(apiUrl, {
      method,
      mode: method === 'GET' ? 'no-cors' : undefined,
      headers: requestHeaders,
    });

    if (Math.floor(xhr.status / 200) === 1) {
      return await xhr.text();
    } else {
      throw xhr;
    }
  };

export const binanceAPI = {
  get: binanceAPIPromise('GET'),
  post: binanceAPIPromise('POST'),
  put: binanceAPIPromise('PUT'),
  delete: binanceAPIPromise('DELETE'),
};

export default binanceAPIPromise;
