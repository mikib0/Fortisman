import { View, Text, StyleSheet, Modal } from 'react-native';
import { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

const DTPicker = ({ date: dateProp, onChange }) => {
  const [date, setDate] = useState(new Date(moment(dateProp).utc())); // convert local date to utc and then pass it to Date as Date assumes to get a date in utc
  const [showDatePicker, setShowDatePicker] = useState(true);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const onDateChange = (_, selectedDate) => {
    setShowTimePicker(() => {
      setShowDatePicker(false);
      setDate(selectedDate);
      return true;
    });
  };

  const onTimeChange = (_, selectedDate) => {
    selectedDate.setSeconds(0)
    onChange(selectedDate)
  };

  return (
    <View>
      <Modal visible={showDatePicker} transparent={true} animationType='none'>
        <DateTimePicker
          value={date}
          mode='date'
          display='default'
          onChange={onDateChange}
        />
      </Modal>
      <Modal visible={showTimePicker} transparent={true} animationType='none'>
        <DateTimePicker
          value={date}
          mode='time'
          display='default'
          onChange={onTimeChange}
        />
      </Modal>

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
