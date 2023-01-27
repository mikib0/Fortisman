import { View, Text, StyleSheet, Modal } from 'react-native';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TimePickerModal, DatePickerModal } from 'react-native-paper-dates';
import moment from 'moment';

const DTPicker = ({ date: dateProp, onChange, onCancel }) => {
  const [date, setDate] = useState(new Date(moment(dateProp).utc())); // convert local date to utc and then pass it to Date as Date assumes to get a date in utc
  const [showDatePicker, setShowDatePicker] = useState(true);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onDateSelect = ({ date }) => {
    setShowTimePicker(() => {
      setShowDatePicker(false);
      setDate(date);
      return true;
    });
  };

  const onTimeSelect = ({ hours, minutes }) => {
    date.setSeconds(0);
    date.setHours(hours);
    date.setMinutes(minutes);
    onChange(date);
  };

  return (
    <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
      <TimePickerModal
        visible={showTimePicker}
        onDismiss={() => onCancel()}
        onConfirm={onTimeSelect}
        hours={date.getHours()}
        minutes={date.getMinutes()}
      />
      <DatePickerModal
        mode='single'
        visible={showDatePicker}
        onDismiss={() => onCancel()}
        date={date}
        onConfirm={onDateSelect}
      />
      {/* <Modal visible={showDatePicker} transparent={true} animationType='none'>
        <DateTimePicker
          value={date}
          mode='date'
          display='default'
          onChange={onDateSelect}
        />
      </Modal> */}
      {/* <Modal visible={showTimePicker} transparent={true} animationType='none'>
        <DateTimePicker
          value={date}
          mode='time'
          display='default'
          onChange={onTimeChange}
        />
      </Modal> */}
      {/* <Modal visible={showTimePicker} animationType='none'>
        <DateTimePicker
          value={date}
          mode='time'
          display='default'
          onChange={onTimeChange}
        />
      </Modal> */}
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#00000088',
  },
});
export default DTPicker;
