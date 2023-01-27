import { StyleSheet } from "react-native";
import { FAB } from "react-native-paper";

export default ({ onPress, icon }) => (
  <FAB icon={icon} style={styles.fab} onPress={onPress} />
);

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 8,
  },
});