// all ajax requests to be used by app

const apiHost = 'https://bakesaleforgood.com';

export default {
  async fetchInitialDeals() {
    try {
      const response = await fetch(apiHost + '/api/deals');
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    }
  },
};
