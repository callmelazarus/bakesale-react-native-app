import React from 'react';

import {View, Text, StyleSheet} from 'react-native';
import ajax from '../ajax';

class App extends React.Component {
  async componentDidMount() {
    const deals = await ajax.fetchInitialDeals();
    console.logs(deals);
  }

  render() {
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
