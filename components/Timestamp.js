import moment from 'moment';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';

import { expand_more } from '../assets';
import { DTPicker } from '.';

const Timestamp = ({ date, onChange }) => {
  const [showDateModal, setShowDateModal] = useState(false);

  return (
    <View style={{ position: 'relative' }}>
      <TouchableOpacity
        onPress={() => {
          setShowDateModal(true);
        }}>
        <View style={styles.container}>
          <Text>{moment(date).format('DD MMM YYYY, hh:mmA')}</Text>
          <Image source={expand_more} />
          {/* <Icon name='arrow_downward' size={20} /> */}
        </View>
      </TouchableOpacity>

      {showDateModal ? (
        <DTPicker
          date={date}
          onChange={(date) => {
            setShowDateModal(false);
            onChange(date);
          }}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 2,
  },
});

export default Timestamp;
