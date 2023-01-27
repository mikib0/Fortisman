import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import moment from 'moment';

import { TopAppbar, Timestamp, FAB } from '../components';
import { DATE_FORMAT } from '../constants';
import { Text, TextInput, useTheme } from 'react-native-paper';

const Reason = ({ navigation }) => {
  const { params } = useRoute();
  const { relapse, onSave } = params;
  const theme = useTheme();

  const [startDate, setStartDate] = useState(relapse.startDate);
  const [endDate, setEndDate] = useState(relapse.endDate);
  const [text, setText] = useState(relapse.text);
  const [title, setTitle] = useState(relapse.title);

  const saveReason = () => {
    if(title.length == 0 || text.length == 0) return; // TODO: toast a message instead of just returning
    const data = { startDate, endDate, title, text };

    navigation.goBack();
    onSave(data);
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <TopAppbar title='What happened?' />
      <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <View style={styles.date}>
          <Timestamp
            date={startDate}
            onChange={(date) => {
              setStartDate(moment(date).format(DATE_FORMAT));
            }}
          />
          <Text style={{ marginLeft: -4, marginRight: 4 }}>{'—'}</Text>
          <Timestamp
            date={endDate}
            onChange={(date) => {
              setEndDate(moment(date).format(DATE_FORMAT));
            }}
          />
        </View>
        <TextInput
          style={{
            backgroundColor: theme.colors.surface,
            color: theme.colors.onSurface,
            fontWeight: '500',
          }}
          placeholder='Title'
          onChangeText={setTitle}
          value={title}
        />
        <TextInput
          style={[
            styles.reasonInput,
            {
              backgroundColor: theme.colors.surface,
              color: theme.colors.onSurface,
            },
          ]}
          placeholder='Write more here...'
          textAlignVertical='top'
          multiline={true}
          onChangeText={setText}
          value={text}
          keyboardType='text'
        />
      </View>
      <FAB icon='content-save-outline' onPress={saveReason} />
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
  },
  reasonInput: {
    flex: 1,
    paddingVertical: 16,
  },
});

export default Reason;
