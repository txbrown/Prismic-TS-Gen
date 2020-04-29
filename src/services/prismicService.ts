import { store } from '../lib/config';
import { REPO_KEY, TOKEN_KEY } from '../lib/constants';

const Prismic = require('prismic-javascript');

export const API_TOKEN = store.get(TOKEN_KEY);

const apiEndpoint = `https://${store.get(REPO_KEY)}.prismic.io/api/v2`;
const accessToken = API_TOKEN; // This is where you would add your access token for a Private repository
export const client = Prismic.client(apiEndpoint, { accessToken });

class PrismicService {
  async getDocumentByType(type: string, previewRef = undefined) {
    const prismicAPI = await client.getApi();

    return client.query(Prismic.Predicates.at('document.type', type), {
      ref: previewRef || prismicAPI.masterRef.ref,
    });
  }

  async getAllDocuments() {
    return client.query('');
  }
}

export default new PrismicService();
