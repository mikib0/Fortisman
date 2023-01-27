import { useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  Dialog,
  Portal,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';

const FortisDialog = ({
  title,
  message,
  placeholder,
  cancelable,
  onCancel,
  onOk,
  okText = 'OK',
  type,
}) => {
  const [text, setText] = useState('');
  const theme = useTheme()

  return (
    <Portal>
      <Dialog visible={true} dismissable={cancelable} onDismiss={onCancel}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Text variant='bodyMedium' style={{ color: theme.colors.onSurfaceVariant }}>{message}</Text>
          {type == 'prompt' ? (
            <TextInput
              placeholder='e.g Eating junk food'
              value={text}
              onChangeText={setText}
            />
          ) : null}
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            textColor={theme.colors.secondary}
            disabled={!cancelable}
            onPress={cancelable ? onCancel : () => {}}>
            Cancel
          </Button>
          <Button onPress={() => onOk(text)}>{okText}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00000066',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  prompt: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
});

export default FortisDialog;
