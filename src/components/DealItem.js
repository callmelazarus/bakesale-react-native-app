import React from 'react'
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Image, Touchable, TouchableOpacity} from 'react-native';
import {priceDisplay} from '../util'
import ScrollViewCommands from 'react-native/Libraries/Components/ScrollView/ScrollViewCommands';


class DealItem extends React.Component{

  static propTypes = {
    deal: PropTypes.object.isRequired,

    //onPress is being passed down from the DealList, which was passed on from App.js
    onPress: PropTypes.func.isRequired,
  }

  // setups the state of the deal with its unique identifier: 'key'
  handlePress = () => {
    this.props.onPress(this.props.deal.key)
  }

  render() {
// destructure props so that we don't keep typing this.props.deal
const {deal} = this.props
    

    return (
<TouchableOpacity
style={styles.deal}
onPress={this.handlePress}
> 
  <Image source= {{uri:deal.media[0]}}
  style={styles.image}
  />
  <View style={styles.info}>
    <Text style={styles.title}>{deal.title}</Text>
    <View style={styles.footer}>
    <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
    <Text style={styles.cause}>{deal.cause.name}</Text>
    </View>
  </View>
</TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 150,
    backgroundColor: '#ccc'
  },
  deal: {
    marginHorizontal: 12,
    marginTop: 12
  },
  info: {
    padding: 10,
    backgroundColor: '#fff',
    borderColor: '#bbb',
    borderWidth: 1,
    borderTopWidth: 0
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
  footer: {
    flexDirection: 'row'
  },
  cause: {
    flex: 1,
    textAlign: 'right'
  },
  price: {
    flex:2,

  },
}

)

export default DealItem