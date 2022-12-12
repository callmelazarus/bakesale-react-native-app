import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import ajax from '../ajax';
import DealList from './DealList';
import DealDetail from './DealDetail';

class App extends React.Component {
  state = {
    deals: [],
    currentDealId: null,
  };

  async componentDidMount() {
    const deals = await ajax.fetchInitialDeals();
    // lets store the deals in the state
    this.setState({deals});
  }

  //set current deal based on pressed DealItem
  // this is passed down to DealList, which is then passed down to dealItem
  setCurrentDeal = (dealId) => {
    this.setState({
      currentDealId: dealId
  })}

  // set up what is the current deal
  currentDeal = () => {
    return this.state.deals.find(
      (deal) => deal.key === this.state.currentDealId
    )
  }
  
  render() {
    if(this.state.currentDealId) {
      return <DealDetail initialDealData={this.currentDeal()} />
    }
    if (this.state.deals.length > 0) {
      return <DealList deals={this.state.deals} onItemPress={this.setCurrentDeal}/>
    }
    return (
      <View style={styles.container}>
          <Text style={styles.header}>Bake it up!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 40,
  },
});

export default App;
