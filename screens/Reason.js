import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import moment from 'moment';

import { AppBar, Timestamp, Navigation, FAButton } from '../components';
import { historyActions } from '../redux/history';
import { DATE_FORMAT } from '../constants';

const Reason = ({ navigation }) => {
  const { params } = useRoute();
  const { relapse, mode, onSave } = params;
  
  const [startDate, setStartDate] = useState(relapse.startDate);
  const [endDate, setEndDate] = useState(relapse.endDate);

  const [text, setText] = useState(relapse ? relapse.text : '');
  const [title, setTitle] = useState(relapse ? relapse.title : '');

  const dispatch = useDispatch();

  const { registerRelapse, updateRelapse } = historyActions;

  // TODO: memoize
  const saveReason = () => {
    const data = { title, text, startDate, endDate };
    if (mode == 'new' || mode == 'streak_reset')
      dispatch(registerRelapse(data));
    else if (mode == 'edit')
      dispatch(updateRelapse({ id: relapse.id, ...data }));

    navigation.goBack();
    onSave && onSave();
  };

  return (
    <View style={styles.container}>
      <AppBar title='What happened?' />
      <View style={{ flex: 1 }}>
        <View style={styles.date}>
          <Timestamp
            date={startDate}
            onChange={(date) => {
              setStartDate(moment(date).format(DATE_FORMAT))
              }}
          />
          <Text>{'—'}</Text>
          <Timestamp date={endDate} onChange={(date) => {
              setEndDate(moment(date).format(DATE_FORMAT))
              }} />
        </View>
        <TextInput
          style={styles.titleInput}
          placeholder='it was a stressfull day...'
          onChangeText={setTitle}
          value={title}
        />
        <TextInput
          style={styles.reasonInput}
          placeholder='why the hell did you?!'
          placeholderTextColor='#fff'
          multiline={true}
          onChangeText={setText}
          value={text}
          keyboardType='text'
        />
      </View>
      <FAButton type='save' onPress={saveReason} />
      <Navigation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  date: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reasonInput: {
    backgroundColor: 'blue',
    flex: 1,
  },
  titleInput: {
    fontWeight: '800',
  },
});

export default Reason;
