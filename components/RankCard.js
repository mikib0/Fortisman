import { View, Image, StyleSheet } from 'react-native';
import { Divider, Text, useTheme } from 'react-native-paper';

const RankCard = ({ rank: { name, days }, current }) => {
  const theme = useTheme();

  const { textStyle } = StyleSheet.create({
    textStyle: {
      color: theme.colors.onSurfaceVariant,
      textAlign: 'center',
    },
  });

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.surface1 },
        current
          ? {
              borderStyle: 'solid',
              borderColor: theme.colors.primary,
              borderWidth: 2,
            }
          : {},
      ]}>
      {/* <Image source={circle} /> */}
      <Text variant='titleMedium' style={[textStyle, { marginBottom: 8 }]}>
        {name}
      </Text>
      <Divider />
      <Text variant='bodyMedium' style={[textStyle, { marginTop: 8 }]}>
        Reach {days} Days
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    padding: 8,
    marginBottom: 8,
  },
});

export default RankCard;
