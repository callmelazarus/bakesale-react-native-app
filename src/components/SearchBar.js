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
// we want a 300 ms delay before a search actually occurs
// eg. we want the actual search to happen AFTER a user is done typing the entire word
// we don't want to search EVERY time the user puts in a character
debouncedSearchDeals = debounce(this.props.searchDeals, 300)

// add handle change fxn, which will receive the text the user types, and set teh state
handleChange = (searchTerm) => {
  // second argument is a callback function after the setstate is done
  this.setState({searchTerm}, () => {
//debounce the operation for searching. This will prevent searches for every character input
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
