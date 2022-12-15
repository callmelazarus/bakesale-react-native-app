import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  PanResponder,
  Dimensions,
  Button,
  Animated,
  Linking,
  ScrollView,
} from 'react-native';
import {priceDisplay} from '../util';
import ajax from '../ajax';

// shows just the deal detail when it is pressed

class DealDetail extends React.Component {
  // animation variables for swiping
  imageXPos = new Animated.Value(0);

  // swipe abilities
  imagePanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gs) => {
      console.log('moving', gs.dx);
      this.imageXPos.setValue(gs.dx); // this will set the value of the image position to match the finger's movement
    },
    onPanResponderRelease: (evt, gs) => {
      console.log('released');
      // animate the image off the screen if the swipe is large enough
      this.width = Dimensions.get('window').width;

      // swipe image , if the swipe is more than 40% of screen width
      if (Math.abs(gs.dx) > 0.4 * this.width) {
        // -1 for left, 1 for right swipes
        const direction = Math.sign(gs.dx);

        Animated.timing(this.imageXPos, {
          toValue: direction * this.width,
          duration: 250,
        }).start(() => this.handleSwipe(-1 * direction));
      } else {
        Animated.spring(this.imageXPos, {
          toValue: 0,
        }).start();
      }
    },
  });

  // changing images when we swipe
  // indexDirection will tell us if we are going right or left
  handleSwipe = indexDirection => {
    // guard if image doesn't exist (image index doesn't exceed 1)
    if (!this.state.deal.media[this.state.imageIndex + indexDirection]) {
      //reset partial swipe
      Animated.spring(this.imageXPos, {
        toValue: 0,
      }).start();
      return;
    }

    // advancing the image
    this.setState(
      prevState => ({
        imageIndex: prevState.imageIndex + indexDirection,
      }),
      () => {
        // after setState is complete, let's animate next image
        this.imageXPos.setValue(this.width);
        Animated.spring(this.imageXPos, {
          toValue: 0,
        }).start();
      },
    );
  };

  static propTypes = {
    initialDealData: PropTypes.object.isRequired,
    onBack: PropTypes.func.isRequired,
  };

  // we are getting initial deal data from the original ajax call that sets up the detail list
  // now we want to get more deal information, but not rerender for that additional information
  state = {
    deal: this.props.initialDealData,
    imageIndex: 0,
  };

  // get the deal details upon mounting
  async componentDidMount() {
    // get the specific deal ID
    const fullDeal = await ajax.fetchDealDetail(this.state.deal.key);
    this.setState({deal: fullDeal});
  }

  openDealUrl = () => {
    Linking.openURL(this.state.deal.url);
  };

  render() {
    // destructure props so that we don't keep typing this.props.deal
    const {deal} = this.state;

    return (
      <ScrollView style={styles.deal}>
        <TouchableOpacity onPress={this.props.onBack}>
          <Text style={styles.backLink}> Back </Text>
        </TouchableOpacity>

        <Animated.Image
          {...this.imagePanResponder.panHandlers}
          source={{uri: deal.media[this.state.imageIndex]}}
          style={[{left: this.imageXPos}, styles.image]}
        />

          <View style={styles.info}>
            <Text style={styles.title}>{deal.title}</Text>
            <View style={styles.footer}>
              <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
              <Text style={styles.cause}>{deal.cause.name}</Text>
            </View>
          </View>

          {deal.user && (
            <View>
              <Image source={{uri: deal.user.avatar}} style={styles.avatar} />
              <Text>{deal.user.name}</Text>
            </View>
          )}
          <View>
            <Text>{deal.description}</Text>
          </View>
          <Button title="Buy this deal" onPress={this.openDealUrl} />

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  deal: {
    marginBottom: 30,
  },
  image: {
    width: '100%',
    height: 150,
    backgroundColor: '#ccc',
  },
  backLink: {
    marginBottom: 5,
    color: '#22f',
    marginLeft: 10,
  },

  info: {
    padding: 10,
    backgroundColor: '#fff',
    borderColor: '#bbb',
    borderWidth: 1,
    borderTopWidth: 0,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  footer: {
    flexDirection: 'row',
  },
  cause: {
    flex: 1,
    textAlign: 'right',
  },
  price: {
    flex: 2,
  },
  avatar: {
    width: 60,
    height: 60,
  },
});

export default DealDetail;
