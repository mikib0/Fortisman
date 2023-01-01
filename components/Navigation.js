import { StyleSheet, Text, View, Button } from 'react-native'
import NavButton from './NavButton';

const Navigation = ( props ) => {
  const styles = StyleSheet.create({
    nav: {
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#eee',
    // height: 'auto',
      ...props.style,
    },
  });

  return (
    <View style={styles.nav}>
      <NavButton screenName='Home'/>
      <NavButton screenName='Quotes'/>
      <NavButton screenName='History'/>
      <NavButton screenName='Ranks'/>
    </View>
  );
}

export default Navigation