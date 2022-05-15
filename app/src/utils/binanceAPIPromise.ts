import queryString from 'query-string';
import { JSHmac, CONSTANTS } from 'react-native-hash';
import netInfo from '@react-native-community/netinfo';

const binanceBaseRoute = 'https://api.binance.com';

const getTimeStamp = () => new Date().getTime();

const getSignature = async (queryParamStr: string, apiSecret: string) =>
  await JSHmac(queryParamStr, apiSecret, CONSTANTS.HmacAlgorithms.HmacSHA256);

const binanceAPIPromise =
  (method: string) =>
  async ({
    url,
    queryParams,
    apiKey,
    apiSecret,
    headers,
  }: {
    url: string;
    queryParams?: Object;
    apiKey: string;
    apiSecret: string;
    headers?: Object;
  }) => {
    const networkInfo = await netInfo.fetch();
    if (!networkInfo.isConnected || !networkInfo.isInternetReachable) {
      throw {
        message: 'No internet connection found.',
      };
    }

    url = url.startsWith('/') ? url.slice(1) : url;
    const headersObj = {
      ...headers,
      'X-MBX-APIKEY': apiKey,
    };

    const timestamp = getTimeStamp();
    const signature = await getSignature(
      queryString.stringify({
        ...queryParams,
        timestamp,
      }),
      apiSecret,
    );

    const requestHeaders: HeadersInit = new Headers();
    Object.entries(headersObj).forEach(([key, value]: [string, any]) => {
      requestHeaders.set(key, value);
    });

    const apiUrl = `${binanceBaseRoute}/${url}?${queryString.stringify({
      ...queryParams,
      timestamp,
      signature,
    })}`;
    const xhr = await fetch(apiUrl, {
      method,
      mode: method === 'GET' ? 'no-cors' : undefined,
      headers: requestHeaders,
    });

    if (Math.floor(xhr.status / 200) === 1) {
      return await xhr.json();
    } else {
      throw await xhr.json();
    }
  };

export const binanceAPI = {
  get: binanceAPIPromise('GET'),
  post: binanceAPIPromise('POST'),
  put: binanceAPIPromise('PUT'),
  delete: binanceAPIPromise('DELETE'),
};

export default binanceAPIPromise;
