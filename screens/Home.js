import moment from 'moment';
import { useEffect, useState } from 'react';
import { View, Text, Pressable, Image, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { resetIcon } from '../assets';
import { Navigation, AppBar, ProgressCount, DTPicker
 } from '../components';
import { currentStreakActions } from '../redux/currentStreak';
import { DATE_FORMAT } from '../constants';

const Home = ({ navigation: { navigate } }) => {
  const dispatch = useDispatch();
  let currentStreak = useSelector((state) => state.currentStreak);
  if (!currentStreak) {
    currentStreak = moment().format(DATE_FORMAT);
    dispatch(currentStreakActions.resetStreak());
  }
  // const [startDate, setStartDate] = useState(currentStreak);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false)

  const handleResetStreak = () => {
    const endDate = moment().format(DATE_FORMAT);
    const streak = { startDate: currentStreak, endDate };
    navigate('Reason', {
      relapse: streak,
      mode: 'streak_reset',
      onSave: () => {
        const newStreak = moment().format(DATE_FORMAT);
        dispatch(currentStreakActions.resetStreak(newStreak));
        // setStartDate(newStreak);
      },
    });
  };

  return (
    <View style={styles.container}>
      <AppBar title='Fortisman' isHome={true} />
      <View style={{ flex: 1, justifyContent: 'center', gap: 32 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <ProgressCount
            startDate={currentStreak}
            onClick={() => setShowDateTimePicker(true)}
          />
          <Pressable onPress={handleResetStreak}>
            <Image source={resetIcon} />
          </Pressable>
        </View>
        <View>
          <Text style={{ textAlign: 'left' }}>
            Strength doesnt come from physical capacity, it comes from an
            indomitable will
          </Text>
          <Text style={{ textAlign: 'right' }}>‒ Mahatma Ghandi</Text>
        </View>
      </View>
      {showDateTimePicker ? (
        <DTPicker
          date={currentStreak}
          onChange={(date) => {
            console.log(moment(date).format(DATE_FORMAT));
            setShowDateTimePicker(false);
            dispatch(currentStreakActions.setStreakStartDate(date));
          }}
        />
      ) : null}
      <Navigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00808066',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'red',
  },
});

export default Home;
