import React from 'react';
import {TextInput, StyleSheet} from 'react-native';
import PropTypes from 'prop-types'

import debounce from 'lodash.debounce'

class SearchBar extends React.Component {
static propTypes = {
  searchDeals: PropTypes.func.isRequired
}

state = {
  searchTerm: '',
}

debouncedSearchDeals = debounce(this.props.searchDeals, 300)

// add handle change fxn, which will receive the text the user types, and set teh state
handleChange = (searchTerm) => {
  // second argument is a callback function after the setstate is done
  this.setState({searchTerm}, () => {
//debounce the operation for searching
this.debouncedSearchDeals(this.state.searchTerm)
  })
}

  render() {
    return <TextInput placeholder="Search All deals" style={styles.input} 
    onChangeText={this.handleChange}
    />;
  }
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    marginHorizontal: 12
  },
});

export default SearchBar;
