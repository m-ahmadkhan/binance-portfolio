import { binanceAPI } from 'utils/binanceAPIPromise';

export const verifyAPIRestrictions = (apiKey: string, apiSecret: string) =>
  binanceAPI
    .get({
      url: '/sapi/v1/account/apiRestrictions',
      apiKey,
      apiSecret,
      headers: { 'Content-Type': 'application/json' },
    })
    .then((response: string) => {
      console.log(response);
    });
