import { useNavigation } from '@react-navigation/core';
import { FlatList, View, StyleSheet, Alert, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { useState } from 'react';
import { Divider, useTheme } from 'react-native-paper';

import { TopAppbar, ReasonCard, FAB, FortisDialog } from '../components';
import { formattedDate } from '../utils';
import { newRelapse, deleteRelapse, editRelapse } from '../redux/actions';
import { withElevateAppBarOnScroll } from '../hocs';

const HistoryScreen = ({ onScroll, elevated }) => {
  const navigation = useNavigation();
  const [history, selectedDetox] = useSelector((state) => [
    state.detoxes[state.selectedDetox].relapses.concat().reverse(),
    state.selectedDetox,
  ]);
  const [showDeleteAlert, setshowDeleteAlert] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const dispatch = useDispatch();
  const theme = useTheme();

  const recordNewRelapse = () => {
    navigation.navigate('Reason', {
      relapse: {
        startDate: formattedDate(),
        endDate: formattedDate(),
        title: '',
        text: '',
      },
      onSave(relapse) {
        dispatch(
          newRelapse({ detox: selectedDetox, relapse, resetStreak: false })
        );
      },
    });
  };

  const saveEdit = (id, data) => {
    dispatch(editRelapse({ detox: selectedDetox, id, data }));
  };

  const onDelete = (item) => {
    setItemToDelete(item);
    setshowDeleteAlert(true);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <TopAppbar title='History' elevated={elevated} />
      {history.length ? (
        <FlatList
          onScroll={onScroll}
          data={history}
          renderItem={({ item }) => {
            return (
              <ReasonCard
                relapse={item}
                onSaveEdit={saveEdit}
                onDelete={() => onDelete(item)}
              />
            );
          }}
          ItemSeparatorComponent={() => <Divider />}
          keyExtractor={(item, index) => item.title + index}
        />
      ) : (
        <Text
          style={{
            position: 'absolute',
            top: '50%',
            width: '100%',
            textAlign: 'center',
            color: theme.colors.onBackground,
          }}>
          Looks like you've never relapsed. Keep going💪
        </Text>
      )}
      {showDeleteAlert ? (
        <FortisDialog
          type='alert'
          okText='Delete'
          title='Delete relapse record?'
          message='Are you sure you want to delete this ?'
          onCancel={() => setshowDeleteAlert(false)}
          cancelable={true}
          onOk={() => {
            dispatch(
              deleteRelapse({ detox: selectedDetox, id: itemToDelete.id })
            );
            setshowDeleteAlert(false);
          }}
        />
      ) : null}
      <FAB icon='pen' onPress={recordNewRelapse} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default gestureHandlerRootHOC(withElevateAppBarOnScroll(HistoryScreen));
