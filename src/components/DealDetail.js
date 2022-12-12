import React from 'react'
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {priceDisplay} from '../util'

// shows just the deal detail when it is pressed

class DealDetail extends React.Component{

  static propTypes = {
    initialDealData: PropTypes.object.isRequired
  }

  // we are getting initial deal data from the original ajax call that sets up the detail list
  // now we want to get more deal information, but not rerender for that additional information
  state = {
    deal: this.props.initialDealData
  }



  render() {
// destructure props so that we don't keep typing this.props.deal
const {deal} = this.state
    

    return (
<View
style={styles.deal}
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
  <Text>...</Text>
</View>
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
    marginTop: 50
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

export default DealDetail