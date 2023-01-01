import { Pressable, Text, View, Image, StyleSheet } from 'react-native';
import { write, save } from '../assets';

const FAButton = ({ style, type, onPress }) => {
  style = style ? style : {};
  const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      bottom: 48,
      right: 24,
      backgroundColor: '#565656',
      padding: 8,
      borderRadius: 16,
      ...style,
    },
  });

  return (
    <Pressable
      style={styles.fab}
      onPress={onPress}>
      <Image source={type == 'save' ? save : write} />
    </Pressable>
  );
};

export default FAButton;
