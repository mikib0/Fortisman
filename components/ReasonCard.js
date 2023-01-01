import { useNavigation } from '@react-navigation/core';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import { useEffect } from 'react';

const ReasonCard = ({ relapse, onDelete, onSaveEdit }) => {
  const { title, text, startDate, endDate } = relapse;
  const daysCount = moment(moment(endDate)).diff(startDate, 'days');
  const navigation = useNavigation();

  const rightActions = (progress, dragX) => {
    return (
      <TouchableOpacity onPress={onDelete}>
        <View
          style={{
            width: 75,
            height: '100%',
            backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: 'white' }}>Delete</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Swipeable renderRightActions={rightActions}>
      <Pressable
        style={styles.card}
        onPress={() =>
          navigation.navigate('Reason', {
            relapse,
            mode: 'edit',
            // onSave: onSaveEdit,
          })
        }>
        <View style={styles.days}>
          <Text>{daysCount}</Text>
          <Text>DAYS</Text>
        </View>
        <View style={{ marginLeft: 8 }}>
          <Text>{title}</Text>
          <Text>
            {
              // todo: truncate the text length to a threshold
            }
            {text}
          </Text>
          <Text>
            {moment(startDate).format('DD MMM, YYYY')} -{'>'}{' '}
            {moment(endDate).format('DD MMM, YYYY')}
          </Text>
        </View>
      </Pressable>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#008080',
    flexDirection: 'row',
  },
  days: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'blue',
  },
});

export default ReasonCard;
