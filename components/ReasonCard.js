import { useNavigation } from '@react-navigation/core';
import { View, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import moment from 'moment';

import Swipeable from 'react-native-gesture-handler/Swipeable';

import { Avatar, Button, Card, Text, useTheme } from 'react-native-paper';
import DeleteButton from './DeleteButton';

const LeftContent = (props) => <Avatar.Icon {...props} icon='folder' />;

const ReasonCard = ({ relapse, onDelete, onSaveEdit }) => {
  const { title, text, startDate, endDate } = relapse;
  const daysCount = moment(endDate).diff(moment(startDate), 'days');
  const navigation = useNavigation();
  const theme = useTheme();

  const styles = StyleSheet.create({
    days: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.surface2,
      paddingHorizontal: 8,
    },
  });

  return (
    <Swipeable renderRightActions={() => <DeleteButton onPress={onDelete} />}>
      <Pressable
        style={{ flexDirection: 'row' }}
        onPress={() =>
          navigation.navigate('Reason', {
            relapse: { startDate, endDate, title, text },
            onSave: (data) => onSaveEdit(relapse.id, data),
          })
        }>
        <View style={styles.days}>
          <Text variant='titleLarge'>{daysCount}</Text>
          <Text variant='labelSmall'>DAYS</Text>
        </View>
        <Card
          style={{
            width: '90%',
            borderTopLeftRadius: 0,
            borderBottomLeftRadius: 0,
          }}>
          <Card.Title
            titleVariant='titleMedium'
            title={title}
          />
          <Card.Content style={{ marginTop: -16 }}>
            <Text
              style={{ lineHeight: 16 }}
              numberOfLines={2}
              variant='bodyMedium'>
              {text}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingRight: 8,
                marginTop: 8,
                marginBottom: -8,
              }}>
              <Text
                style={{
                  color: theme.colors.onSurfaceVariant,
                  marginRight: 8,
                }}>
                {moment(startDate).format('DD MMM, YYYY')}
              </Text>
              <Text
                style={{
                  color: theme.colors.onSurfaceVariant,
                  marginRight: 8,
                }}>
                {'->'}
              </Text>
              <Text
                style={{
                  color: theme.colors.onSurfaceVariant,
                  marginRight: 8,
                }}>
                {moment(endDate).format('DD MMM, YYYY')}
              </Text>
            </View>
          </Card.Content>
        </Card>
      </Pressable>
    </Swipeable>
  );
};

export default ReasonCard;
