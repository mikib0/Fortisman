import { useTheme } from 'react-native-paper'
import { View, FlatList } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux';

import { TopAppbar, RankCard } from '../components';
import { getActiveRank, getProgressCount } from '../utils';
import { ranks } from '../constants';
import { withElevateAppBarOnScroll } from '../hocs'

const Ranks = ({ onScroll, elevated }) => {
  const theme = useTheme();
  const currentStreakStartDate = useSelector(
    (state) => state.detoxes[state.selectedDetox].currentStreakStartDate
  );
  const { daysCount } = getProgressCount(currentStreakStartDate);
  const currentRank = getActiveRank(daysCount);

  return (
    <View style={{ flex: 1 }}>
      <TopAppbar title='Ranks' elevated={elevated} />
      <FlatList
      // TODO: scroll to current rank
        onScroll={onScroll}
        style={{
          paddingHorizontal: 16,
          backgroundColor: theme.colors.background,
        }}
        data={ranks}
        renderItem={({ item }) => (
          <RankCard current={item.name === currentRank} rank={item} />
        )}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

export default withElevateAppBarOnScroll(Ranks)