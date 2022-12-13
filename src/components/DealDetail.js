import React from 'react'
import PropTypes from 'prop-types';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {priceDisplay} from '../util'
import ajax from '../ajax'


// shows just the deal detail when it is pressed

class DealDetail extends React.Component{

  static propTypes = {
    initialDealData: PropTypes.object.isRequired,
    onBack: PropTypes.func.isRequired,
  }

  // we are getting initial deal data from the original ajax call that sets up the detail list
  // now we want to get more deal information, but not rerender for that additional information
  state = {
    deal: this.props.initialDealData
  }

  // get the deal details upon mounting
  async componentDidMount() {
// get the specific deal ID
    const fullDeal = await ajax.fetchDealDetail(this.state.deal.key)
    this.setState({deal:fullDeal})
  }



  render() {
// destructure props so that we don't keep typing this.props.deal
const {deal} = this.state
    

    return (
<View
style={styles.deal}
> 
<TouchableOpacity onPress ={this.props.onBack}>
<Text style={styles.backLink}> Back </Text>
</TouchableOpacity>
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
  
{deal.user && (<View>
  <Image source={{ uri: deal.user.avatar }} style={styles.avatar}/>
  <Text>{deal.user.name}</Text>
</View>)}
<View>
  <Text>{deal.description}</Text>
</View>
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
  backLink: {
    marginBottom: 5,
    color: '#22f'
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
  avatar: {
    width: 60,
    height: 60,
  },
}

)

export default DealDetail