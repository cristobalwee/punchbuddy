import Carousel from 'react-native-snap-carousel';

import styles from '../styles.js';
import WorkoutCard from '../components/workoutcard.js';

export class CardList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM
      data: ['boxing', 'running', 'cycling', 'tabata', 'sparring', 'weights']
    }
  }
  _renderItem ({item, index}) {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{ item.title }</Text>
      </View>
    );
  }

  render () {
    return (
      <Carousel
        ref={(c) => { this._carousel = c; }}
        data={this.state.entries}
        renderItem={this._renderItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
      />
    );
  }
}

export default CardList;
