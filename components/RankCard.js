import { View, Text, Image, StyleSheet } from 'react-native'
import { circle, line } from '../assets'

const RankCard = ({ name }) => {
  return (
    <View style={styles.container}>
      <Image source={circle} />
      <View style={styles.right}>
        <Text>{name}</Text>
        <Image source={line} />
        <Text>Reach 0 Days</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8
  },
  right: {
    justifyContent: 'space-between',
    alignItems: 'center'

  }
})

export default RankCard