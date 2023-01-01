import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

import { getProgressCount } from '../utils';

const ProgressCount = ({ startDate, onClick }) => {
  const [progress, setProgress] = useState(getProgressCount(startDate));
  const { daysCount, timeElapsed, seconds } = progress;

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(() => {
        return getProgressCount(startDate);
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [startDate]);

  return (
    <AnimatedCircularProgress
      size={240}
      width={8}
      rotation={0}
      fill={(100 / 86400) * seconds}
      tintColor='#00ff00'
      // onAnimationComplete={() => console.log('onAnimationComplete')}
      backgroundColor='#0000ff'
      style={styles.container}>
      {() => (
        <Pressable onPress={onClick} style={styles.counter}>
          <Text>SCOUT</Text>
          <Text style={{ fontSize: 64 }}>{daysCount}</Text>
          <Text>{timeElapsed}</Text>
        </Pressable>
      )}
    </AnimatedCircularProgress>
  );
};

const styles = StyleSheet.create({
  container: {
    // width: 240,
    // height: 240,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counter: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 100,
    backgroundColor: '#008080',
  },
});

export default ProgressCount;
