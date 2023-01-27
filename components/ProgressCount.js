import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useTheme } from 'react-native-paper';

import { getProgressCount } from '../utils';
import getActiveRank from '../utils/getActiveRank';

// TODO: make progress count freeze when first time detox prompt is displayed
const ProgressCount = ({ startDate, onClick }) => {
  const [progress, setProgress] = useState(getProgressCount(startDate));
  const { daysCount, timeElapsed, seconds } = progress;
  const theme = useTheme();

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
      backgroundColor: theme.colors.surface2,
    },
  });

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
    <TouchableOpacity onPress={onClick}>
    <AnimatedCircularProgress
      size={180}
      width={4}
      rotation={0}
      fill={(100 / 86400) * seconds}
      tintColor={theme.colors.onTertiaryContainer}
      backgroundColor={theme.colors.tertiaryContainer}
      style={styles.container}>
      {() => (
        <View style={styles.counter}>
          <Text style={{ color: theme.colors.onSurfaceVariant }}>
            {getActiveRank(daysCount).toUpperCase()}
          </Text>
          <Text style={{ fontSize: 64, color: theme.colors.onSurface }}>
            {daysCount}
          </Text>
          <Text style={{ color: theme.colors.onSurface }}>
            {timeElapsed}
          </Text>
        </View>
      )}
    </AnimatedCircularProgress>
    </TouchableOpacity>
      
  );
};

export default ProgressCount;
