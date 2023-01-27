import { View, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import DetoxCard from './DetoxCard';
import { useEffect } from 'react';

const ITEM_HEIGHT = 60

const DetoxesList = ({ changeSelectedDetox, selectedDetox, onDelete }) => {
  const detoxes = useSelector((state) => Object.keys(state.detoxes));
  let flatListRef = null;

  useEffect(() => {
    flatListRef.scrollToItem({
      animated: true,
      item: selectedDetox,
      viewPosition: 0.5, // sets the position of the item in the view (0-1)
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        ref={(ref) => {
          flatListRef = ref;
        }}
        getItemLayout={(data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index,
        })}
        data={detoxes.reverse()}
        renderItem={({ item }) => (
          <DetoxCard
            active={item == selectedDetox}
            name={item}
            onClick={changeSelectedDetox}
            onDelete={() => onDelete(item)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default gestureHandlerRootHOC(DetoxesList);
