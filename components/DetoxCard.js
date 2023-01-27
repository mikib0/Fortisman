import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { Text, useTheme } from 'react-native-paper';

import DeleteButton from './DeleteButton';
import FortisDialog from './FortisDialog';

const DetoxCard = ({ name, active, onClick, onDelete }) => {
  const theme = useTheme();
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);


  const styles = StyleSheet.create({
    card: {
      // paddingVertical: 16,
      height: 60,
      justifyContent: 'center',
      paddingHorizontal: 64,
      backgroundColor: active
        ? theme.colors.secondaryContainer
        : theme.colors.surface1,
    },
  });

  return (
    <Swipeable renderRightActions={() => <DeleteButton onPress={()=>setShowDeleteAlert(true)} />}>
      <Pressable onPress={() => onClick(name)} style={styles.card}>
        <Text
          style={{
            fontSize: 20,
            color: active
              ? theme.colors.onSecondaryContainer
              : theme.colors.onSurface,
          }}>
          {name}
        </Text>
      </Pressable>
      {showDeleteAlert ? (
        <FortisDialog
          type='alert'
          okText='Delete'
          cancelable={true}
          onCancel={() => setShowDeleteAlert(false)}
          title='Delete detox?'
          message='All streak records will be deleted'
          onOk={()=> {
            onDelete()
            setShowDeleteAlert(false)
          }}
        />
      ) : null}
    </Swipeable>
  );
};

export default DetoxCard;
