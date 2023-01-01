import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { arrow_back, dark_mode } from '../assets';

const AppBar = ({ title, isHome }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {!isHome && (
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}>
            <Image source={arrow_back} />
          </Pressable>
        )}
        <Text>{title}</Text>
      </View>
      <Image source={dark_mode} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});

export default AppBar;
