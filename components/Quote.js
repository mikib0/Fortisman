import { StyleSheet, View } from 'react-native';
import { Text, useTheme } from 'react-native-paper';

const Quote = ({ quote: { text, author } }) => {
  const theme = useTheme()

  return (
    <View style={[styles.quoteContainer]}>
      <Text style={styles.text}>{text}</Text>
      <Text style={[styles.author, { color: theme.colors.onSurfaceVariant }]}>
        — {author}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  quoteContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
  },
  author: {
    fontSize: 14,
  },
});

export default Quote;
