import moment from 'moment';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useState } from 'react';

import { expand_more } from '../assets';
import DTPicker from './DTPicker';
import { Text, Button, IconButton, useTheme } from 'react-native-paper';

const Timestamp = ({ date, onChange }) => {
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const theme = useTheme();

  return (
    <View style={{ position: 'relative' }}>
      {/* <Button
        compact
        contentStyle={{ flexDirection: 'row-reverse' }}
        style={{ marginLeft: -8 }}
        icon='menu-down'>
        <Text variant='bodySmall' style={{ color: theme.colors.onSurface }}>
          {moment(date).format('DD MMM YYYY, hh:mmA')}
        </Text>
      </Button> */}
      <TouchableOpacity
        onPress={() => {
          setShowDateTimePicker(true);
        }}>
        <View style={styles.container}>
          <Text variant='bodySmall'>
            {moment(date).format('DD MMM YYYY, hh:mmA')}
          </Text>
          <IconButton icon='menu-down' style={{ marginHorizontal: -8 }} />
        </View>
      </TouchableOpacity>

      {showDateTimePicker ? (
        <DTPicker
          date={date}
          onCancel={() => setShowDateTimePicker(false)}
          onChange={(date) => {
            setShowDateTimePicker(false);
            onChange(date);
          }}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Timestamp;
