// all ajax requests to be used by app


const apiHost = 'https://bakesaleforgood.com';


// create API to fetch deals as a list
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


// lets get the information for specific deals now

async fetchDealDetail(dealId) {
  try {
    const response = await fetch(apiHost + '/api/deals/' + dealId);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
},

// ajax call for searches based on searchterm

async fetchDealsSearchResults(searchTerm) {
  try {
    const response = await fetch(apiHost + '/api/deals?searchTerm=' + searchTerm);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
},


};




// yelp api below (not used)

// import yelp_api_key from '../keys';

// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: yelp_api_key,
//   },
// };

// const apiHost =
//   'https://api.yelp.com/v3/businesses/search?categories=&price=1&sort_by=best_match&matches_party_size_param=true&limit=20';

// export default {
//   async fetchInitialDeals() {
//     try {
//       const response = await fetch(apiHost, options);
//       const json = await response.json();
//       console.warn(json)
//       return json;
//     } catch (error) {
//       console.error(error);
//     }
//   },
// };
