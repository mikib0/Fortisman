import { useNavigation } from '@react-navigation/core';
import { FlatList, View, StyleSheet, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import moment from 'moment';

import { Navigation, AppBar, ReasonCard, FAButton } from '../components';
import { historyActions } from '../redux/history';
import { DATE_FORMAT } from '../constants';
import { isEqual } from 'lodash';

// let history = null

const History = () => {
  const navigation = useNavigation();
  const history = useSelector((state) => state.history.concat().reverse());
  // const historyDraft = useSelector((state) => state.history.concat().reverse());
  // assign history a new reference if relapses change
  // if (!isEqual(history, historyDraft))
  // history = historyDraft

  // const [relapses, setRelapses] = useState(history);
  const dispatch = useDispatch();

  const recordNewRelapse = () => {
    navigation.navigate('Reason', {
      relapse: {
        startDate: moment().format(DATE_FORMAT),
        endDate: moment().format(DATE_FORMAT),
      },
      mode: 'new',
    });
  };

  const onDelete = (item) => {
    // TODO: create my own alert modal
    Alert.alert(
      'Delete relapse record',
      'Are you sure you want to delete this ?',
      [
        {
          text: 'No',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            dispatch(historyActions.deleteRelapse(item));
            // setRelapses(relapses.filter((relapse) => relapse.id !== item.id));
          },
          // TODO: style: 'yes'
        },
      ]
    );
  };

  // useEffect(() => {
  //   setRelapses(history);
  // }, [history]);

  return (
    <View style={styles.container}>
      <AppBar title='History' />
      <FlatList
        data={history}
        renderItem={({ item }) => {
          return <ReasonCard relapse={item} onDelete={() => onDelete(item)} />;
        }}
        ItemSeparatorComponent={() => <View style={styles.separator}></View>}
        keyExtractor={(item, index) => item.title + index}
      />
      <FAButton type='write' onPress={recordNewRelapse} />
      <Navigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  separator: {
    height: 1,
    backgroundColor: 'black',
  },
});

export default gestureHandlerRootHOC(History);
