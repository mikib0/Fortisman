import { TouchableOpacity } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';

export default ({ onPress }) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 70,
        height: '100%',
        backgroundColor: theme.colors.error,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <IconButton
        icon='delete'
        iconColor={theme.colors.onError}
        size={20}
      />
    </TouchableOpacity>
  );
};
