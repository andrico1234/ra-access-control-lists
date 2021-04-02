import fakeRestProvider from 'ra-data-fakerest';
import { cacheDataProviderProxy } from 'ra-core';

import data from './data';

const dataProvider = fakeRestProvider(data, true);
const sometimesFailsDataProvider = new Proxy(dataProvider, {
  get: (target, name) => (resource, params) => {
    if (resource === 'posts' && params.data && params.data.title === 'f00bar') {
      return Promise.reject(new Error('this title cannot be used'));
    }
    return dataProvider[name as any](resource, params);
  },
});

const delayedDataProvider = new Proxy(sometimesFailsDataProvider, {
  get: (target, name) => (resource, params) =>
    new Promise(resolve =>
      setTimeout(
        () =>
          resolve(sometimesFailsDataProvider[name as any](resource, params)),
        300
      )
    ),
});

export default cacheDataProviderProxy(delayedDataProvider);
