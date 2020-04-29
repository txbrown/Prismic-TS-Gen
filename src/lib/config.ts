import ConfigStore from 'configstore';

export const store = new ConfigStore('prismic-ts-gen');

export const clearItem = (key: string) => {
  store.delete(key);
};
