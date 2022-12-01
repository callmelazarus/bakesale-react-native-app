// all ajax requests to be used by app

// const apiHost = 'https://bakesaleforgood.com';

// export default {
//   async fetchInitialDeals() {
//     try {
//       const response = await fetch(apiHost + '/api/deals');
//       const json = await response.json();
//       return json;
//     } catch (error) {
//       console.error(error);
//     }
//   },
// };

import yelp_api_key from '../keys';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: yelp_api_key,
  },
};

const apiHost =
  'https://api.yelp.com/v3/businesses/search?categories=&price=1&sort_by=best_match&matches_party_size_param=true&limit=20';

export default {
  async fetchInitialDeals() {
    try {
      const response = await fetch(apiHost, options);
      const json = await response.json();
      console.warn(json)
      return json;
    } catch (error) {
      console.error(error);
    }
  },
};
