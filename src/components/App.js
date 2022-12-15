import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import ajax from '../ajax';
import DealList from './DealList';
import DealDetail from './DealDetail';
import SearchBar from './SearchBar';

class App extends React.Component {
  // starting using animcated values
  titleXPos = new Animated.Value(0);

  state = {
    deals: [], // default search items upon component mounting
    dealsFromSearch: [], // create an array for searched items
    currentDealId: null, // dealID based on item pressed
    activeSearchTerm: '', // persist the search Term
  };
  //animation to have word bounce left to right,considering the dimension of the screen
  // used Dimension library, and the Easing library
  animateTitle = (direction = 1) => {
    const width = Dimensions.get('window').width - 200;
    Animated.timing(this.titleXPos, {
      toValue: (direction * width) / 2,
      duration: 1000,
      easing: Easing.ease,
    }).start(({finished}) => {
      //cleanup fxn to prevent animation from moving on forever
      if (finished) {
        this.animateTitle(-1 * direction);
      }
    });
  };

  async componentDidMount() {
    this.animateTitle();

    const deals = await ajax.fetchInitialDeals();
    // lets store the deals in the state
    this.setState({deals});
  }

  // set state of deals from search, calling ajax function that searches API
  searchDeals = async searchTerm => {
    // initialize search as empty
    let dealsFromSearch = [];

    // if search term exists, then run the fetch call
    if (searchTerm) {
      dealsFromSearch = await ajax.fetchDealsSearchResults(searchTerm);
    }
    this.setState({dealsFromSearch, activeSearchTerm: searchTerm});
  };

  //set current deal based on pressed DealItem
  // this is passed down to DealList, which is then passed down to dealItem
  setCurrentDeal = dealId => {
    this.setState({
      currentDealId: dealId,
    });
  };

  // used for back button on dealDetail. Makes the DealID -> null
  unsetCurrentDeal = () => {
    this.setState({
      currentDealId: null,
    });
  };

  // set up what is the current deal
  currentDeal = () => {
    return this.state.deals.find(deal => deal.key === this.state.currentDealId);
  };

  render() {
    if (this.state.currentDealId) {
      return (
        <View style={styles.main}>
          <DealDetail
            initialDealData={this.currentDeal()}
            onBack={this.unsetCurrentDeal}
          />
        </View>
      );
    }
    const dealsToDisplay =
      this.state.dealsFromSearch.length > 0
        ? this.state.dealsFromSearch
        : this.state.deals;
    if (dealsToDisplay.length > 0) {
      return (
        <View style={styles.main}>
          <SearchBar
            searchDeals={this.searchDeals}
            initialSearchTerm={this.state.activeSearchTerm}
          />
          <DealList deals={dealsToDisplay} onItemPress={this.setCurrentDeal} />
        </View>
      );
    }
    return (
      <Animated.View style={[{left: this.titleXPos}, styles.container]}>
        <Text style={styles.header}>Bake it up!</Text>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  main: {
    marginTop: 50,
  },
  header: {
    fontSize: 40,
  },
});

export default App;
