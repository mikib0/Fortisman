import { View, FlatList } from 'react-native'
import React from 'react'
import { Navigation, AppBar, RankCard } from '../components'

const Ranks = () => {
  const rankNames = [
  'Newcomer',
  'Novice',
  'Intermediate',
  'Experienced',
  'Expert',
  'Master',
  'Grandmaster',
  'Sage',
  'Prodigy',
  'Talent',
  'Ace',
  'Champion',
  'Icon',
  'Legend',
  'Elite',
  'Pro',
  'Superstar',
  'All-star',
  'MVP',
  'Hall of Famer',
];

  return (
    <View style={{ flex: 1 }}>
      <AppBar title='Ranks' />
      <FlatList
        data={rankNames}
        renderItem={({ item }) => <RankCard name={item} />}
        keyExtractor={(item) => item}
      />
      <Navigation />
    </View>
  );
}

export default Ranks